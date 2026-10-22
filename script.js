// 명함 템플릿(이름 영역 제거본) 위에 강사명을 그려 PNG/PDF로 저장
const W = 1063, H = 591;
const NAME_X = 83;          // 이름 왼쪽 시작 x
const NAME_BOX = { top: 290, bottom: 420, maxW: 330 };  // 이름이 들어갈 영역
const NAME_SIZE = 128;      // 기본 글자 크기(px) — 영역을 넘으면 자동 축소
const FONT = '"Love Rose", cursive';

const canvas = document.getElementById('card');
const ctx = canvas.getContext('2d');
const nameEl = document.getElementById('name');
let template;

const loadImage = src => new Promise((res, rej) => {
  const img = new Image(); img.onload = () => res(img); img.onerror = rej; img.src = src;
});

async function init() {
  template = await loadImage('card-template.png');
  await document.fonts.load(`${NAME_SIZE}px "Love Rose"`).catch(() => {});
  update();
}

function draw(c, name) {
  const g = c.getContext('2d');
  g.clearRect(0, 0, W, H);
  g.drawImage(template, 0, 0, W, H);
  if (!name) return;
  let size = NAME_SIZE;
  g.fillStyle = '#fff'; g.textBaseline = 'alphabetic'; g.textAlign = 'left';
  g.font = `${size}px ${FONT}`;
  const w = g.measureText(name).width;
  if (w > NAME_BOX.maxW) { size = Math.floor(size * NAME_BOX.maxW / w); g.font = `${size}px ${FONT}`; }
  const m = g.measureText(name);
  const asc = m.actualBoundingBoxAscent, desc = m.actualBoundingBoxDescent;
  const mid = (NAME_BOX.top + NAME_BOX.bottom) / 2;
  g.fillText(name, NAME_X, mid + (asc - desc) / 2);
}

function update() { draw(canvas, nameEl.value.trim()); }
nameEl.addEventListener('input', update);

const fileName = () => (nameEl.value.trim() || 'card').replace(/[\\/:*?"<>|]/g, '_');
function save(blob, name) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

document.getElementById('png').onclick = () => canvas.toBlob(b => save(b, fileName() + '.png'));

document.getElementById('pdf').onclick = () => {
  // 명함 규격 90×50mm
  const pdf = new jspdf.jsPDF({ orientation: 'landscape', unit: 'mm', format: [90, 50.03] });
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 90, 50.03);
  pdf.save(fileName() + '.pdf');
};

init();
