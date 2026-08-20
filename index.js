const URL = require("url");
const VM = require("vm");

const { EscapeXML, WrapInSVG, GetIconSVG, IconsInfo, SplitParams, ParseLocalParams, FixColor, EscapeText } = require("./global.js");

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
				return EscapeText(QueryObject.text || "Не указан \"text\"");
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

			if(Type === "icon" || Type === "icons"){
				const RawInput = QueryObject.icons || QueryObject.icon || "";
				if(!RawInput){ return "Не указаны \"icon\" или \"icons\""; }

				const GlobalSize = parseInt(QueryObject.size) || 75;
				const GlobalBackground = QueryObject.bg || "transparent";
				const GlobalRadius = parseInt(QueryObject.radius) || 0;
				const Gap = parseInt(QueryObject.gap) || 5;
				const MaxRow = parseInt(QueryObject.max_row) || 0;
				const Align = QueryObject.align || "left";

				const IconItems = SplitParams(RawInput).map((Item, Idx) => {
					const Local = ParseLocalParams(Item, {
						size: GlobalSize,
						bg: GlobalBackground,
						radius: GlobalRadius,
						tip: ""
					}, "icon");

					Local["tip"] = EscapeText(Local["tip"]);

					const IconID = IconsInfo["Names"][Local.name] || "error";
					const SVGData = GetIconSVG(IconID, `idx${Idx}`);
					return { ...Local, SVGData, id: Idx };
				});

				let Rows = [];
				if(MaxRow > 0){
					for(let i = 0; i < IconItems.length; i += MaxRow){ Rows.push(IconItems.slice(i, i + MaxRow)); }
				}else{
					Rows.push(IconItems);
				}

				let CanvasWidth = 0;
				const RowMetrics = Rows.map(Row => {
					const RowW = Row.reduce((Sum, Icon) => Sum + Icon.size, 0) + (Row.length - 1) * Gap;
					const RowH = Math.max(...Row.map(i => i.size));
					if(RowW > CanvasWidth){ CanvasWidth = RowW; }
					return { W: RowW, H: RowH };
				});
				const CanvasHeight = RowMetrics.reduce((Sum, M) => Sum + M.H, 0) + (Rows.length - 1) * Gap;

				let CurrentY = 0;
				let SVGContent = "";
				let Defs = "";

				Rows.forEach((Row, RIdx) => {
					const Metrics = RowMetrics[RIdx];
					let CurrentX = 0;

					if(Align === "center"){ CurrentX = (CanvasWidth - Metrics.W) / 2; }
					if(Align === "right" ){ CurrentX = CanvasWidth - Metrics.W; }

					Row.forEach(Icon => {
						const BGColor = FixColor(Icon.bg);
						const BGRect = (BGColor && BGColor !== "transparent") ? `<rect width="${Icon.size}" height="${Icon.size}" fill="${BGColor}" />` : "";
						const Tooltip = Icon.tip ? `<title>${EscapeXML(Icon.tip)}</title>` : "";

						let ClipAttribute = "";
						if(Icon.radius > 0){
							const ClipID = `round_${Icon.id}`;
							Defs += `<clipPath id="${ClipID}"><rect width="${Icon.size}" height="${Icon.size}" rx="${Icon.radius}" /></clipPath>`;
							ClipAttribute = `clip-path="url(#${ClipID})"`;
						}

						SVGContent += `<svg x="${CurrentX}" y="${CurrentY}" width="${Icon.size}" height="${Icon.size}">${Tooltip}${BGRect}<g ${ClipAttribute}>${Icon.SVGData || ""}</g></svg>`;

						CurrentX += Icon.size + Gap;
					});
					CurrentY += Metrics.H + Gap;
				});

				return `<svg xmlns="http://www.w3.org/2000/svg" width="${CanvasWidth}" height="${CanvasHeight}">
					<defs>${Defs}</defs>
					${SVGContent}
				</svg>`;
			}

			if(Type === "debug"){
				if(!QueryObject.debug || QueryObject.debug === ""){ return "Не указан \"debug\""; }
				const Debug = QueryObject.debug;

				if(Debug === "icons"){

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