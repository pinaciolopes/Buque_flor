const NS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('bouquet');

function el(tag, attrs = {}) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

/* ---------- 1. Desenhar o buquê ---------- */

const palette = [
  { dark: '#8b0a1f', mid: '#c4122f', light: '#e63950' },
  { dark: '#a3112a', mid: '#d81e3c', light: '#f0506a' }
];

// [x, y, tamanho] — ordenado de cima p/ baixo para as de baixo ficarem na frente
// [tipo, x, y, tamanho]: ordenado de cima p/ baixo
const flowers = [
  ['lily', 200, 150, 52],
  ['rose', 135, 215, 42], ['rose', 265, 215, 42],
  ['lily', 85, 285, 44],  ['lily', 315, 285, 44],
  ['rose', 160, 290, 34], ['rose', 240, 290, 34]
];
let roseCount = 0;

function spiral(max) {
  let d = 'M0 0';
  const total = Math.PI * 5;
  for (let t = 0.2; t <= total; t += 0.2) {
    const r = max * (t / total);
    d += ` L${(r * Math.cos(t)).toFixed(1)} ${(r * Math.sin(t)).toFixed(1)}`;
  }
  return d;
}

function createRose(x, y, s, c) {
  const outer = el('g', { transform: `translate(${x} ${y})` });
  const g = el('g', { class: 'flower' });
  for (let i = 0; i < 6; i++) {
    g.appendChild(el('ellipse', {
      cx: 0, cy: -s * 0.55, rx: s * 0.5, ry: s * 0.55,
      fill: c.dark, stroke: '#5c0614', 'stroke-width': 1,
      transform: `rotate(${i * 60})`
    }));
  }
  g.appendChild(el('circle', { r: s * 0.75, fill: c.mid }));
  g.appendChild(el('circle', { r: s * 0.5, fill: c.light }));
  g.appendChild(el('path', {
    d: spiral(s * 0.42), fill: 'none', stroke: c.dark,
    'stroke-width': 2, 'stroke-linecap': 'round'
  }));
  outer.appendChild(g);
  return outer;
}

// Caules
const stems = flowers.map(([, x, y]) => {
  const p = el('path', {
    class: 'stem',
    d: `M200 560 Q ${(200 + x) / 2} ${(560 + y) / 2 + 40} ${x} ${y}`,
    fill: 'none', stroke: '#2e7d32', 'stroke-width': 5, 'stroke-linecap': 'round'
  });
  svg.appendChild(p);
  return p;
});

// Folhas
[[150, 360, -50], [250, 360, 50], [120, 340, -70], [280, 340, 70], [170, 330, -30], [230, 330, 30]]
  .forEach(([x, y, rot]) => {
    svg.appendChild(el('ellipse', {
      class: 'leaf', cx: x, cy: y, rx: 12, ry: 34,
      fill: '#388e3c', transform: `rotate(${rot} ${x} ${y})`
    }));
  });

// Rosas
flowers.forEach(([type, x, y, s]) => {
  svg.appendChild(
    type === 'lily'
      ? createLily(x, y, s)
      : createRose(x, y, s, palette[roseCount++ % 2])
  );
});

// Embalagem + laço
const wrap = el('g', { class: 'wrap' });
wrap.appendChild(el('polygon', { points: '105,395 295,395 218,580 182,580', fill: '#f8c8d4', stroke: '#e89ab0', 'stroke-width': 2 }));
wrap.appendChild(el('polygon', { points: '200,395 295,395 218,580 200,580', fill: 'rgba(200,100,130,.25)' }));
wrap.appendChild(el('ellipse', { cx: 168, cy: 430, rx: 34, ry: 16, fill: '#ff5c7a', transform: 'rotate(-20 168 430)' }));
wrap.appendChild(el('ellipse', { cx: 232, cy: 430, rx: 34, ry: 16, fill: '#ff5c7a', transform: 'rotate(20 232 430)' }));
wrap.appendChild(el('circle', { cx: 200, cy: 432, r: 11, fill: '#d81e3c' }));
svg.appendChild(wrap);

/* ---------- 2. Texto letra por letra ---------- */

/* ---------- 2. Texto letra por letra ---------- */

const title = document.getElementById('title');
title.innerHTML = title.textContent
  .trim()
  .split(' ')
  .map(word =>
    `<span class="word">${[...word].map(c => `<span class="char">${c}</span>`).join('')}</span>`
  )
  .join(' ');

/* ---------- 3. Pétalas caindo ---------- */

function startPetals() {
  const total = window.innerWidth < 600 ? 12 : 25; // menos pétalas = mais leve no celular
  for (let i = 0; i < total; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = gsap.utils.random(0, 100) + 'vw';
    p.style.transform = `scale(${gsap.utils.random(0.6, 1.4)})`;
    document.body.appendChild(p);

    gsap.to(p, {
      y: '110vh', // acompanha a altura da tela, mesmo ao girar o celular
      x: `+=${gsap.utils.random(-80, 80)}`,
      rotation: gsap.utils.random(180, 540),
      duration: gsap.utils.random(6, 11),
      delay: gsap.utils.random(0, 8),
      repeat: -1,
      ease: 'none'
    });
  }
}

function sway() {
  gsap.to('#bouquet', {
    rotation: 1.5, transformOrigin: '50% 100%',
    duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut'
  });
}

/* ---------- 4. Linha do tempo (a animação em si) ---------- */

stems.forEach(s => {
  const len = s.getTotalLength();
  gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
});

const tl = gsap.timeline({ paused: true });

tl.from('.wrap', { y: 80, opacity: 0, duration: 0.8, ease: 'power2.out' })
  .to('.stem', { strokeDashoffset: 0, duration: 1.2, stagger: 0.12, ease: 'power2.out' }, '-=0.2')
  .from('.leaf', { scale: 0, transformOrigin: '50% 100%', duration: 0.6, stagger: 0.08, ease: 'back.out(2)' }, '-=0.8')
  .from('.flower', { scale: 0, rotation: -120, opacity: 0, transformOrigin: '50% 50%', duration: 1, stagger: 0.25, ease: 'back.out(1.7)' }, '-=0.4')
  .from('.char', { opacity: 0, y: 20, duration: 0.5, stagger: 0.07 }, '-=0.2')
  .from('#subtitle', { opacity: 0, y: 10, duration: 1 }, '-=0.2')
  .add(startPetals)
  .add(sway);

/* ---------- 5. Música e botão de início ---------- */

const music = document.getElementById('music');
const intro = document.getElementById('intro');

document.getElementById('start').addEventListener('click', () => {
  music.volume = 0;
  music.play().catch(() => {});
  gsap.to(music, { volume: 0.6, duration: 4 }); // música entra suave

  gsap.to(intro, {
    opacity: 0, duration: 1,
    onComplete: () => (intro.style.display = 'none')
  });
  tl.play();
});

const muteBtn = document.getElementById('mute');
muteBtn.addEventListener('click', () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? '🔇' : '🔊';
});

function createLily(x, y, s) {
  const outer = el('g', { transform: `translate(${x} ${y})` });
  const g = el('g', { class: 'flower' });

  // formato de uma pétala pontuda
  const petal = (len, wid) =>
    `M0 0 C ${-wid} ${-len * 0.3}, ${-wid * 0.8} ${-len * 0.8}, 0 ${-len} ` +
    `C ${wid * 0.8} ${-len * 0.8}, ${wid} ${-len * 0.3}, 0 0 Z`;

  // 3 pétalas de trás (mais escuras)
  [60, 180, 300].forEach(a => {
    g.appendChild(el('path', {
      d: petal(s * 1.15, s * 0.4), fill: '#1e4fb8',
      stroke: '#12307a', 'stroke-width': 1, transform: `rotate(${a})`
    }));
  });

  // 3 pétalas da frente (mais claras) com uma nervura no meio
  [0, 120, 240].forEach(a => {
    g.appendChild(el('path', {
      d: petal(s * 1.2, s * 0.42), fill: '#3b82f6',
      stroke: '#1e4fb8', 'stroke-width': 1, transform: `rotate(${a})`
    }));
    g.appendChild(el('line', {
      x1: 0, y1: -s * 0.1, x2: 0, y2: -s * 0.9,
      stroke: '#bfe0ff', 'stroke-width': 1.5, opacity: 0.6,
      'stroke-linecap': 'round', transform: `rotate(${a})`
    }));
  });

  // miolo e estames dourados
  g.appendChild(el('circle', { r: s * 0.12, fill: '#bfe0ff' }));
  for (let i = 0; i < 6; i++) {
    const rot = i * 60 + 30;
    const len = s * (0.45 + (i % 2) * 0.1);
    g.appendChild(el('line', {
      x1: 0, y1: 0, x2: 0, y2: -len,
      stroke: '#ffe082', 'stroke-width': 1.5, transform: `rotate(${rot})`
    }));
    g.appendChild(el('circle', {
      cx: 0, cy: -len, r: 3, fill: '#ffb300', transform: `rotate(${rot})`
    }));
  }

  outer.appendChild(g);
  return outer;
}