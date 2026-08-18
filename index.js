const URL = require("url");
const VM = require("vm");

const EscapeXML = (S) => {
	if(typeof S !== "string"){ S = String(S); }
	return S.replace(/[<>&"']/g, (C) => ({
		"<": "&lt;",
		">": "&gt;",
		"&": "&amp;",
		"\"": "&quot;",
		"'": "&apos;"
	}[C])).replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/g, "?");
};

const WrapInSVG = (Text, Options = {}) => {
	if(Text.trim().startsWith("<svg")){ return Text; }

	const FixColor = (C) => C && !C.startsWith("#") ? "#" + C : C;

	const Background = FixColor(Options.Background);
	const Color = FixColor(Options.Color);
	const Width= parseInt(Options.Width);

	const LineHeight = parseInt(Options.LineHeight);
	const Padding = parseInt(Options.Padding);

	const Lines = Text.split("\n");
	const DisplayLines = Lines.slice(0, parseInt(Options.MaxLines));
	const Height = parseInt(Options.Height) || Math.max(60, DisplayLines.length * LineHeight + Padding);

	let TextElements = DisplayLines.map((Line, Index) =>
		`<text x="20" y="${30 + Index * LineHeight}" fill="${Color}" font-family="monospace" font-size="${Options.FontSize}" xml:space="preserve">${EscapeXML(Line)}</text>`
	).join("");

	return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}">
      <rect width="100%" height="100%" rx="6" fill="${Background}" />
      ${TextElements}
    </svg>`.trim();
};

module.exports = (Request, Result) => {
	try{
		Result.statusCode = 200;

		const QueryObject = URL.parse(Request.url, true).query || {};
		const Type = QueryObject.type || "notype";

		Result.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
		Result.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

		let Options = {
			Background: QueryObject.bg || "#555555",
			Color     : QueryObject.color || "#FFFFFF",
			Width     : QueryObject.w || 650,
			Height    : QueryObject.h || null,
			LineHeight: QueryObject.lh || 20,
			Padding   : QueryObject.pad || 30,
			MaxLines  : QueryObject.ml || 100,
			FontSize  : QueryObject.fs || 12
		};

		function Run(){
			if(Type === "notype"){
				return "Не указан тип";
			}

			if(Type === "text"){
				return (QueryObject.text || "Не указан текст").replace("nbsp;", " ");
			}

			if(Type === "js"){
				const Base64Code = QueryObject.code;

				if(!Base64Code){ throw new Error("Не указан код!"); }

				const Code = Buffer.from(Base64Code, "base64").toString("utf8");

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

			return undefined;
		}

		let Result__ = Run();
		if(Result__ === undefined){ throw new Error("Неизвестный \"type\"!"); }

		Result.end(WrapInSVG(Result__, Options));
	}catch(e){
		let Options = {
			Background: "#411",
			Color     : "#FF7878",
			Width     : 650,
			Height    : null
		};

		Result.end(WrapInSVG("Ошибка скрипта: " + e.stack, Options));
	}
};