const TYPES = [
  { num: 1, color: '#6290AA', label: 'Strict Perfectionist' },
  { num: 2, color: '#3D6EA6', label: 'Considerate Helper' },
  { num: 3, color: '#6B2D8F', label: 'Competitive Achiever' },
  { num: 4, color: '#923B50', label: 'Intense Creative' },
  { num: 5, color: '#CC3333', label: 'Quiet Specialist' },
  { num: 6, color: '#E88A00', label: 'Loyal Sceptic' },
  { num: 7, color: '#E8C840', label: 'Enthusiastic Visionary' },
  { num: 8, color: '#A8B820', label: 'Active Controller' },
  { num: 9, color: '#5A8A20', label: 'Adaptive Peacemaker' },
];

// ── DOM refs ──
const canvas       = document.getElementById('canvas');
const ctx          = canvas.getContext('2d');
const photoInput   = document.getElementById('photoInput');
const previewWrap  = document.querySelector('.preview-wrap');
const type1El      = document.getElementById('type1');
const type2El      = document.getElementById('type2');
const group2El     = document.getElementById('group2');
const addType2Btn  = document.getElementById('addType2Btn');
const removeType2  = document.getElementById('removeType2');
const downloadBtn  = document.getElementById('downloadBtn');

let userPhoto = null;

// ── Populate selects ──
function fillSelect(el, exclude = [], placeholder = '— None —') {
  const prev = el.value;
  el.innerHTML = `<option value="">${placeholder}</option>`;
  TYPES.forEach(t => {
    if (exclude.includes(String(t.num))) return;
    const opt = document.createElement('option');
    opt.value = String(t.num);
    opt.textContent = `${t.num}. ${t.label}`;
    el.appendChild(opt);
  });
  if ([...el.options].some(o => o.value === prev)) el.value = prev;
}

function initType1() {
  fillSelect(type1El, [], '— Select type —');
}

// ── Sync UI state after any selection change ──
function sync() {
  const v1 = type1El.value;
  const v2 = type2El.value;

  // "Add a second type" button appears once type 1 is chosen and group2 is hidden
  addType2Btn.hidden = !v1 || !group2El.hidden === false ? (!v1 || !group2El.hidden) : false;
  // Simpler: show the add button only when type1 has a value AND group2 is hidden
  addType2Btn.hidden = !(v1 && group2El.hidden);

  if (v1) {
    fillSelect(type2El, [v1]);
  }

  redraw();
}

// ── Drawing ──
const CANVAS_SIZE = 512;
const BADGE_SIZE  = 75;
const MARGIN      = 20;
const GAP         = 10;

function drawRoundedRect(x, y, w, h, r, color) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawBadge(num, x, y, size) {
  const type = TYPES.find(t => t.num === num);
  if (!type) return;
  drawRoundedRect(x, y, size, size, size * 0.18, type.color);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${Math.round(size * 0.52)}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(num), x + size / 2, y + size / 2 + size * 0.03);
}

function redraw() {
  canvas.width  = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  if (!userPhoto) return;

  // Cover-fit the photo
  const s  = Math.max(CANVAS_SIZE / userPhoto.width, CANVAS_SIZE / userPhoto.height);
  const sw = userPhoto.width  * s;
  const sh = userPhoto.height * s;
  ctx.drawImage(userPhoto, (CANVAS_SIZE - sw) / 2, (CANVAS_SIZE - sh) / 2, sw, sh);

  // Draw badges bottom-left
  const badges = [type1El.value, type2El.hidden ? '' : type2El.value]
    .filter(Boolean)
    .map(Number);

  const yPos = CANVAS_SIZE - BADGE_SIZE - MARGIN;
  let xPos = MARGIN;
  badges.forEach(num => {
    drawBadge(num, xPos, yPos, BADGE_SIZE);
    xPos += BADGE_SIZE + GAP;
  });
}

// ── Event listeners ──
photoInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      userPhoto = img;
      previewWrap.classList.add('has-photo');
      downloadBtn.disabled = false;
      sync();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

previewWrap.addEventListener('dragover', e => { e.preventDefault(); previewWrap.style.opacity = '.7'; });
previewWrap.addEventListener('dragleave', () => { previewWrap.style.opacity = ''; });
previewWrap.addEventListener('drop', e => {
  e.preventDefault();
  previewWrap.style.opacity = '';
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    photoInput.files = e.dataTransfer.files;
    photoInput.dispatchEvent(new Event('change'));
  }
});

type1El.addEventListener('change', sync);
type2El.addEventListener('change', sync);

addType2Btn.addEventListener('click', () => {
  group2El.hidden = false;
  addType2Btn.hidden = true;
  fillSelect(type2El, [type1El.value]);
  redraw();
});

removeType2.addEventListener('click', () => {
  type2El.value = '';
  group2El.hidden = true;
  // Show the add button again if type1 has a value
  addType2Btn.hidden = !type1El.value;
  redraw();
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href     = canvas.toDataURL('image/png');
  link.download = 'slack-profile.png';
  link.click();
});

// ── Init ──
initType1();
