export default function handler(req, res) {
  const { name = 'Skill', prog = '50', color = 'blue' } = req.query;

  const progressWidth = (parseInt(prog) / 100) * 180;

  const svg = `
    <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
      <!-- Фон -->
      <rect width="200" height="50" rx="8" fill="#222" />
      
      <!-- Текст (Название навыка) -->
      <text x="10" y="20" fill="white" font-family="Arial" font-size="12" font-weight="bold">
        ${name}
      </text>

      <!-- Текст (Процент) -->
      <text x="160" y="20" fill="#aaa" font-family="Arial" font-size="10">
        ${prog}%
      </text>

      <!-- Серая полоска (фон прогресса) -->
      <rect x="10" y="30" width="180" height="8" rx="4" fill="#444" />
      
      <!-- Цветная полоска (текущий прогресс) -->
      <rect x="10" y="30" width="${progressWidth}" height="8" rx="4" fill="${color}">
        <animate attributeName="width" from="0" to="${progressWidth}" dur="0.8s" fill="freeze" />
      </rect>
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-cache');
  
  res.status(200).send(svg);
}