const URL = require("url");

module.exports = (Request, Result) => {
	try{
		const QueryObject = URL.parse(Request.url, true).query || {};
		const Type = QueryObject.type || "notype";

		if(Type === "notype"){
			Result.end("Не указан тип");
		}

		if(Type === "js"){
			Result.end("привет)))");
		}

		Result.statusCode = 400;
		Result.end("Неизвестный \"type\"!")
	}catch(e){
		Result.statusCode = 500;
		Result.end("Ошибка серверного скрипта: " + e.message)
	}
};