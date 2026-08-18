const URL = require("url");
const VM = require("vm");

const SuccessStatus = 200;
const ErrorStatus = 400;

module.exports = (Request, Result) => {
	try{
		const QueryObject = URL.parse(Request.url, true).query || {};
		const Type = QueryObject.type || "notype";

		Result.setHeader("Content-Type", "text/plain; charset=utf-8");

		if(Type === "notype"){
			Result.end("Не указан тип");
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

			Result.statusCode = SuccessStatus;
			Result.end(String(Sandbox.Result || "Код был успешно вызван, используйте \"Result = ...\" в вашем коде что-бы вывести результат!"))
			return
		}

		throw new Error("Неизвестный \"type\"!");
	}catch(e){
		Result.statusCode = ErrorStatus;
		Result.end("Ошибка серверного скрипта: " + e.message)
	}
};