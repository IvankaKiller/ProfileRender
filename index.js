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

const WrapInSVG = (Text, BackgroundColor = "#222", TextColor = "#0FA") => {
	if(Text.trim().startsWith("<svg")){ return Text; }

	const Lines = Text.split("\n");
	const LineHeight = 20;
	const Padding = 30;
	const Width = 650;

	const DisplayLines = Lines.slice(0, 50);
	const Height = Math.max(60, DisplayLines.length * LineHeight + Padding);

	let TextElements = DisplayLines.map((line, index) =>
		`<text x="20" y="${30 + index * LineHeight}" fill="${TextColor}" font-family="monospace" font-size="12" xml:space="preserve">${EscapeXML(line)}</text>`
	).join("");

	return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}">
      <rect width="100%" height="100%" rx="6" fill="${BackgroundColor}" />
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

		function Run(){
			if(Type === "notype"){
				return "Не указан тип";
			}

			if(Type === "text"){
				return QueryObject.text || "Не указан текст";
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

		Result.end(WrapInSVG(Result__));
	}catch(e){
		Result.end(WrapInSVG("Ошибка скрипта: " + e.stack, "#411", "#ff7878"));
	}
};