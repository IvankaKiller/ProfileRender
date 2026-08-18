const url = require('url');

module.exports = (req, res) => {
  try {
    // 1. Разбираем параметры из URL (нативный способ)
    const queryObject = url.parse(req.url, true).query || {};

    const name = queryObject.name || 'Skill';
    const prog = queryObject.prog || '50';
    const color = queryObject.color || 'blue';

    const numericProg = Math.min(Math.max(parseInt(prog) || 0, 0), 100);
    const progressWidth = (numericProg / 100) * 180;

    // 2. Генерируем SVG
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

    // 3. Используем НАТИВНЫЕ методы Node.js вместо Express
    res.statusCode = 200; // Вместо res.status(200)
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    // Отправляем результат и закрываем соединение
    res.end(svg); // Вместо res.send(svg)

  } catch (error) {
    res.statusCode = 500;
    res.end("Error: " + error.message);
  }
};