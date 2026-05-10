// Enneagram type definitions — color + label
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

// Shiftmove logo as base64 PNG
const LOGO_B64 = 'data:image/png;base64,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';

// ── DOM refs ──
const canvas      = document.getElementById('canvas');
const ctx         = canvas.getContext('2d');
const photoInput  = document.getElementById('photoInput');
const uploadLabel = document.getElementById('upload-label');
const previewWrap = document.querySelector('.preview-wrap');
const type1El     = document.getElementById('type1');
const type2El     = document.getElementById('type2');
const type3El     = document.getElementById('type3');
const group2El    = document.getElementById('group2');
const group3El    = document.getElementById('group3');
const showLogoEl  = document.getElementById('showLogo');
const downloadBtn = document.getElementById('downloadBtn');

// ── State ──
let userPhoto = null;
const logoImg = new Image();
logoImg.src = LOGO_B64;
logoImg.onload = redraw;

// ── Populate selects ──
function populateSelect(el, exclude = []) {
  const prev = el.value;
  el.innerHTML = '<option value="">— None —</option>';
  TYPES.forEach(t => {
    if (exclude.includes(String(t.num))) return;
    const opt = document.createElement('option');
    opt.value = String(t.num);
    opt.textContent = `${t.num}. ${t.label}`;
    el.appendChild(opt);
  });
  if ([...el.options].some(o => o.value === prev)) el.value = prev;
}

function initSelects() {
  // First select always has all options
  type1El.innerHTML = '<option value="">— Select type —</option>';
  TYPES.forEach(t => {
    const opt = document.createElement('option');
    opt.value = String(t.num);
    opt.textContent = `${t.num}. ${t.label}`;
    type1El.appendChild(opt);
  });
}

function syncSelects() {
  const v1 = type1El.value;
  const v2 = type2El.value;

  // Show/hide second row
  group2El.hidden = !v1;

  if (v1) {
    populateSelect(type2El, [v1]);
    group3El.hidden = !v2;
    if (v2) {
      populateSelect(type3El, [v1, v2]);
    } else {
      type3El.value = '';
      group3El.hidden = true;
    }
  } else {
    type2El.value = '';
    type3El.value = '';
    group2El.hidden = true;
    group3El.hidden = true;
  }
}

// ── Drawing helpers ──
const CANVAS_SIZE = 512;
const BADGE_SIZE  = 75;  // px on 512 canvas
const LOGO_W      = 190;
const LOGO_H      = 75;
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
  const r = size * 0.18;
  drawRoundedRect(x, y, size, size, r, type.color);
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

  // Draw photo scaled to fill canvas
  const s  = Math.max(CANVAS_SIZE / userPhoto.width, CANVAS_SIZE / userPhoto.height);
  const sw = userPhoto.width  * s;
  const sh = userPhoto.height * s;
  ctx.drawImage(userPhoto, (CANVAS_SIZE - sw) / 2, (CANVAS_SIZE - sh) / 2, sw, sh);

  // Build list of overlay items (logo first, then badges)
  const badges = [type1El.value, type2El.value, type3El.value]
    .filter(Boolean)
    .map(Number);

  let xPos = MARGIN;
  const yPos = CANVAS_SIZE - BADGE_SIZE - MARGIN;

  if (showLogoEl.checked && logoImg.complete) {
    ctx.drawImage(logoImg, xPos, yPos + (BADGE_SIZE - LOGO_H) / 2, LOGO_W, LOGO_H);
    xPos += LOGO_W + GAP;
  }

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
      redraw();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

// Drag-and-drop onto canvas
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

type1El.addEventListener('change', () => { syncSelects(); redraw(); });
type2El.addEventListener('change', () => { syncSelects(); redraw(); });
type3El.addEventListener('change', () => { redraw(); });
showLogoEl.addEventListener('change', redraw);

downloadBtn.addEventListener('click', () => {
  // Export at full 512×512 resolution
  const link = document.createElement('a');
  link.href     = canvas.toDataURL('image/png');
  link.download = 'slack-profile.png';
  link.click();
});

// ── Init ──
initSelects();
syncSelects();
