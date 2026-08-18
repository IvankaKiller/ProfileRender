module.exports = (req, res) => {
	// 1. Безопасно получаем параметры из ссылки
	const { name = 'Skill', prog = '50', color = 'blue' } = req.query;

	// 2. Превращаем строку в число и ограничиваем (от 0 до 100)
	const numericProg = Math.min(Math.max(parseInt(prog) || 0, 0), 100);
	const progressWidth = (numericProg / 100) * 180;

	// 3. Формируем SVG (убрал лишние комментарии внутри строки, чтобы не было ошибок)
	const svg = `
	<svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
		<rect width="200" height="50" rx="8" fill="#222" />
		<text x="10" y="20" fill="white" font-family="Arial" font-size="12" font-weight="bold">${name}</text>
		<text x="160" y="20" fill="#aaa" font-family="Arial" font-size="10">${numericProg}%</text>
		<rect x="10" y="30" width="180" height="8" rx="4" fill="#444" />
		<rect x="10" y="30" width="${progressWidth}" height="8" rx="4" fill="${color}">
			<animate attributeName="width" from="0" to="${progressWidth}" dur="0.8s" fill="freeze" />
		</rect>
	</svg>
	`.trim();

	// 4. Заголовки ответа
	res.setHeader('Content-Type', 'image/svg+xml');
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

	// 5. Отправка
	res.status(200).send(svg);
};