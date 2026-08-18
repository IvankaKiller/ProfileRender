const URL = require("url");
const VM = require("vm");
const FS = require("fs");
const PATH = require("path");

const SiteURL = "https://profile-render-fawn.vercel.app/";
const RepoURL = "https://raw.githubusercontent.com/Woowz11/ProfileRender/refs/heads/main/";

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

const GetIconSVG = function(IconID, UniquePrefix){
	const IconPath = PATH.join(IconsPath, IconID + ".svg");
	let SVG = FS.readFileSync(IconPath, "utf8");

	// Удаляем метаданные
	SVG = SVG.replace(/<\?xml.*?\?>/gi, "");
	SVG = SVG.replace(/<!DOCTYPE.*?>/gi, "");
	SVG = SVG.replace(/<!--.*?-->/gs, "");

	// ✅ ДЕЛАЕМ ID УНИКАЛЬНЫМИ
	SVG = SVG.replace(/(id=")([^"]*)(")/g, `$1${UniquePrefix}_$2$3`);
	SVG = SVG.replace(/(url\(#)([^)]*)(\))/g, `$1${UniquePrefix}_$2$3`);
	SVG = SVG.replace(/xlink:href="#([^"]*)"/g, `xlink:href="#${UniquePrefix}_$1"`);

	// Заменяем цвета на currentColor
	SVG = SVG.replace(/fill="[^"]*"/gi, 'fill="currentColor"');
	SVG = SVG.replace(/stroke="[^"]*"/gi, 'stroke="currentColor"');

	// Удаляем inkscape/sodipodi
	SVG = SVG.replace(/inkscape:[a-z-]+="[^"]*"/gi, "");
	SVG = SVG.replace(/sodipodi:[a-z-]+="[^"]*"/gi, "");

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

	let Options = { ...DefaultOptions };

	try{
		Result.statusCode = 200;

		const QueryObject = URL.parse(Request.url, true).query || {};
		const Type = QueryObject.type || "notype";

		Result.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
		Result.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

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

			if(Type === "text"){
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
				let IconID = IconsInfo[Key] || "error";

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
					let IconID = IconsInfo[Key] || "error";

					let SVGData = GetIconSVG(IconID, `woowz_${Index}`);

					CombinedContent += `<svg x="${X}" y="0" width="${Size}" height="${Size}"><g>${SVGData}</g></svg>`;

					X += Size + Gap;
				});

				const TotalWidth = X - Gap;
				return `<svg xmlns="http://www.w3.org/2000/svg" width="${TotalWidth}" height="${Size}">${CombinedContent}</svg>`;
			}

			return undefined;
		}

		let Result__ = Run();
		if(Result__ === undefined){ throw new Error("Неизвестный \"type\"!"); }

		Result.end(WrapInSVG(Result__, Options));
	}catch(e){
		Options.Background = "#411";
		Options.Color      = "#FF7878";

		Result.end(WrapInSVG("Ошибка скрипта: " + e.stack, Options));
	}
};