const URL = require("url");
const VM = require("vm");
const FS = require("fs");
const PATH = require("path");

const EscapeXML = function(S){
	if(typeof S !== "string"){ S = String(S); }
	return S.replace(/[<>&"']/g, (C) => ({
		"<": "&lt;",
		">": "&gt;",
		"&": "&amp;",
		"\"": "&quot;",
		"'": "&apos;"
	}[C])).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "");
};

const WrapInSVG = function(Text, Options = {}){
	Text = Text.trim();
	if(Text.startsWith("<svg")){
		if(!Text.startsWith("<?xml")){
			return `<?xml version="1.0" encoding="UTF-8"?>\n${Text}`;
		}
		return Text;
	}

	const FixColor = (C) => C && !C.startsWith("#") ? "#" + C : C;

	const Background = FixColor(Options.Background);
	const Color = FixColor(Options.Color);
	const FontSize = parseInt(Options.FontSize);
	const LineHeight = parseInt(Options.LineHeight) || Math.floor(FontSize * 1.5);
	const Padding = parseInt(Options.Padding);

	const Lines = Text.split("\n");
	const DisplayLines = Lines.slice(0, parseInt(Options.MaxLines));

	const MaxChars = Math.max(...DisplayLines.map(L => L.length), 1);
	const ContentWidth = Math.floor(MaxChars * FontSize * 0.6) + (Padding * 2);
	const Width= parseInt(Options.Width) || ContentWidth;

	const ContentHeight = (DisplayLines.length - 1) * LineHeight + FontSize;
	const Height = parseInt(Options.Height) || (ContentHeight + Padding * 2);

	const FirstLineY = Padding + FontSize - Math.floor(FontSize * 0.15);

	let TextElements = DisplayLines.map((Line, Index) =>
		`<text x="${Padding}" y="${FirstLineY + Index * LineHeight}" fill="${Color}" font-family="monospace" font-size="${FontSize}" xml:space="preserve">${EscapeXML(Line)}</text>`
	).join("");

	return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}">
      <rect width="100%" height="100%" rx="6" fill="${Background}" />
      ${TextElements}
    </svg>`.trim();
};

const __CacheSVG = {};
const GetIconSVG = function(IconID, UniquePrefix){
	let SVG = "";
	if(__CacheSVG[IconID]){
		SVG = __CacheSVG[IconID];
	}else{
		const IconPath = PATH.join(IconsPath, IconID + ".svg");
		SVG = FS.readFileSync(IconPath, "utf8");
		__CacheSVG[IconID] = SVG;
	}

	SVG = SVG.replace(/<\?xml.*?\?>/gi, "");
	SVG = SVG.replace(/<!DOCTYPE.*?>/gi, "");
	SVG = SVG.replace(/<!--.*?-->/gs, "");

	SVG = SVG.replace(/(id=")([^"]*)(")/g, `$1${UniquePrefix}_$2$3`);
	SVG = SVG.replace(/(url\(#)([^)]*)(\))/g, `$1${UniquePrefix}_$2$3`);
	SVG = SVG.replace(/xlink:href="#([^"]*)"/g, `xlink:href="#${UniquePrefix}_$1"`);

	return SVG.trim();
}

// ----------------------------------------------------------------------

const IconsPath = PATH.join(process.cwd(), "resources", "icons");
const IconsInfoPath = PATH.join(IconsPath, "icons.json");

if(!FS.existsSync(IconsInfoPath)){ throw new Error("icons.json не найден!"); }

const IconsInfo = JSON.parse(FS.readFileSync(IconsInfoPath, "utf8"));

// ----------------------------------------------------------------------

module.exports = (Request, Result) => {
	const DefaultOptions = {
		Background: "#555555",
		Color     : "#FFFFFF",
		Width     : null,
		Height    : null,
		LineHeight: null,
		Padding   : 30,
		MaxLines  : 100,
		FontSize  : 12
	};

	try{
		Result.statusCode = 200;

		const QueryObject = URL.parse(Request.url, true).query || {};
		const Type = QueryObject.type || "notype";

		Result.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
		Result.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

		let Options = { ...DefaultOptions };

		Options.Background = QueryObject.t_bg  || Options.Background;
		Options.Color      = QueryObject.t_c   || Options.Color     ;
		Options.Width      = QueryObject.t_w   || Options.Width     ;
		Options.Height     = QueryObject.t_h   || Options.Height    ;
		Options.LineHeight = QueryObject.t_lh  || Options.LineHeight;
		Options.Padding    = QueryObject.t_pad || Options.Padding   ;
		Options.MaxLines   = QueryObject.t_ml  || Options.MaxLines  ;
		Options.FontSize   = QueryObject.t_fs  || Options.FontSize  ;

		function Run(){
			if(Type === "notype"){
				return "Не указан тип";
			}

			if(Type === "simple"){
				return (QueryObject.text || "Не указан \"text\"").replace(/\\n/g, "\n").replace(/nbsp;?/g, " ");
			}

			if(Type === "js"){
				const Base64Code = QueryObject.code || "UmVzdWx0ID0gItCd0LUg0YPQutCw0LfQsNC9IFwiY29kZVwiIg==";

				const Code = Buffer.from(Base64Code.replace(/ /g, "+"), "base64").toString("utf8");

				const Sandbox = {
					console,
					Result: null,
					Request,
					process: { env: {} }
				};

				VM.createContext(Sandbox);
				VM.runInContext(Code, Sandbox);

				return String(Sandbox.Result || "Код был успешно вызван, используйте \"Result = ...\" в вашем коде что-бы вывести результат!");
			}

			if(Type === "icon"){
				if(!QueryObject.icon || QueryObject.icon === ""){ return "Не указан \"icon\""; }

				const Key = QueryObject.icon;
				let IconID = IconsInfo["Names"][Key] || "error";

				let SVGData = GetIconSVG(IconID, "woowz");

				const Size = 75;
				return `<svg xmlns="http://www.w3.org/2000/svg" width="${Size}" height="${Size}">
					<g>${SVGData}</g>
				</svg>`;
			}

			if(Type === "icons"){
				if(!QueryObject.icons || QueryObject.icons === ""){ return "Не указан \"icons\""; }

				const IconKeys = QueryObject.icons.split(",");

				let X = 0;
				const Size = 75;
				const Gap = 5;
				let CombinedContent = "";

				IconKeys.forEach((Key, Index) => {
					Key = Key.trim();
					let IconID = IconsInfo["Names"][Key] || "error";

					let SVGData = GetIconSVG(IconID, `woowz_${Index}`);

					CombinedContent += `<svg x="${X}" y="0" width="${Size}" height="${Size}"><g>${SVGData}</g></svg>`;

					X += Size + Gap;
				});

				const TotalWidth = X - Gap;
				return `<svg xmlns="http://www.w3.org/2000/svg" width="${TotalWidth}" height="${Size}">${CombinedContent}</svg>`;
			}

			if(Type === "debug"){
				if(!QueryObject.debug || QueryObject.debug === ""){ return "Не указан \"debug\""; }
				const Debug = QueryObject.debug;

				if(Debug === "icons"){
					const Names = IconsInfo.Names || {};
					const Categories = IconsInfo.Categories || {};

					// Группируем по ID
					const AllIcons = {};
					for(const [key, value] of Object.entries(Names)){
						if(!AllIcons[value]){
							AllIcons[value] = { id: value, names: [] };
						}
						AllIcons[value].names.push(key);
					}

					// Распределяем по категориям
					const CategoryMap = {};
					const Uncategorized = [];
					const SortedIDs = Object.keys(AllIcons).sort();

					for(const id of SortedIDs){
						let found = false;
						for(const [category, icons] of Object.entries(Categories)){
							if(icons.includes(id)){
								if(!CategoryMap[category]) CategoryMap[category] = [];
								CategoryMap[category].push(id);
								found = true;
								break;
							}
						}
						if(!found) Uncategorized.push(id);
					}

					// Строим SVG
					let Y = 30;
					const RowHeight = 30;
					const ColID = 10;
					const ColNames = 100;
					const ColIcon = 350;
					const IconSize = 20;

					// Высчитываем высоту
					let totalRows = SortedIDs.length + Object.keys(CategoryMap).length + (Uncategorized.length > 0 ? 1 : 0);
					let totalHeight = totalRows * RowHeight + 60;

					let SVGContent = `<svg xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12" width="500" height="${totalHeight}">
    <rect width="100%" height="100%" fill="#1a1a2e"/>`;

					// Шапка
					SVGContent += `
    <text x="${ColID}" y="${Y}" fill="#4fc3f7" font-weight="bold" font-size="14">ID</text>
    <text x="${ColNames}" y="${Y}" fill="#4fc3f7" font-weight="bold" font-size="14">Алиасы</text>
    <text x="${ColIcon}" y="${Y}" fill="#4fc3f7" font-weight="bold" font-size="14">Иконка</text>`;
					Y += RowHeight + 5;

					// Функция рендера строки
					const RenderRow = (id, names, Ypos) => {
						const iconSVG = GetIconSVG(id, `debug_${id}`);
						const namesStr = names.filter(n => n !== id).join(', ');

						// ⭐ ПРАВИЛЬНОЕ МАСШТАБИРОВАНИЕ: сохраняем пропорции
						return `
    <rect x="0" y="${Ypos - 12}" width="100%" height="${RowHeight}" fill="#16213e" rx="3"/>
    <text x="${ColID}" y="${Ypos + 4}" fill="#ffffff">${id}</text>
    <text x="${ColNames}" y="${Ypos + 4}" fill="#b0b0d0" font-size="11">${namesStr}</text>
    <svg x="${ColIcon}" y="${Ypos - 10}" width="${IconSize}" height="${IconSize}" viewBox="0 0 19.84375 19.84375" preserveAspectRatio="xMidYMid meet"><g fill="#ffffff">${iconSVG}</g></svg>`;
					};

					// Категории
					for(const category of Object.keys(CategoryMap).sort()){
						SVGContent += `
    <text x="${ColID}" y="${Y}" fill="#4fc3f7" font-weight="bold" font-size="14">📁 ${category}</text>`;
						Y += RowHeight + 5;

						for(const id of CategoryMap[category].sort()){
							SVGContent += RenderRow(id, AllIcons[id].names, Y);
							Y += RowHeight;
						}
						Y += 5;
					}

					// Без категории
					if(Uncategorized.length > 0){
						SVGContent += `
    <text x="${ColID}" y="${Y}" fill="#ffb74d" font-weight="bold" font-size="14">📂 Без категории</text>`;
						Y += RowHeight + 5;

						for(const id of Uncategorized.sort()){
							SVGContent += RenderRow(id, AllIcons[id].names, Y);
							Y += RowHeight;
						}
					}

					// Итог
					SVGContent += `
    <text x="${ColID}" y="${Y + 10}" fill="#666" font-size="11">Всего: ${SortedIDs.length} иконок</text>`;

					SVGContent += `
</svg>`;

					return SVGContent;
				}

				return "Неизвестный тип \"debug\"!";
			}

			return undefined;
		}

		let Result__ = Run();
		if(Result__ === undefined){ throw new Error("Неизвестный \"type\"!"); }

		Result.end(WrapInSVG(Result__, Options));
	}catch(e){
		let Options = { ...DefaultOptions };

		Options.Background = "#411";
		Options.Color      = "#FF7878";

		Result.end(WrapInSVG("Ошибка скрипта: " + e.stack, Options));
	}
};