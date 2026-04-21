// === State ===
let products = [];
let collections = [];
let currentProductImages = []; // array of filenames
const uploadQueue = []; // files to upload on save

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  setupProductModal();
  setupCollectionModal();
  setupSettings();
  loadProducts();
  loadCollections();
});

// === Navigation ===
function setupNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      item.classList.add('active');
      document.getElementById('sec-' + item.dataset.section).classList.add('active');
    });
  });
}

// === Products ===
async function loadProducts() {
  const res = await fetch('/api/products');
  products = await res.json();
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!products.length) { grid.innerHTML = '<div class="empty-state">Нет товаров</div>'; return; }
  grid.innerHTML = products.map(p => {
    const imgs = parseImages(p.images);
    const thumb = imgs[0] ? `/uploads/${imgs[0]}` : '';
    return `<div class="product-card" data-id="${p.id}">
      ${thumb ? `<img src="${thumb}" alt="">` : '<div style="height:180px;background:#1a1a1a;display:flex;align-items:center;justify-content:center;color:#444">Нет фото</div>'}
      <div class="info">
        <div class="name">${esc(p.name || '')}</div>
        <div class="meta">
          <span>${esc(p.category || '')} · ${p.price || 0}₽</span>
          <span>${p.badge ? `<span class="badge-tag">${esc(p.badge)}</span>` : ''} <span class="status-dot ${p.active !== false ? 'active' : 'inactive'}"></span></span>
        </div>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openProduct(card.dataset.id));
  });
}

function parseImages(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string' && v) { try { const a = JSON.parse(v); return Array.isArray(a) ? a : []; } catch { return []; } }
  return [];
}

function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

// === Product Modal ===
function setupProductModal() {
  document.getElementById('btn-add-product').addEventListener('click', () => openProduct(null));
  document.getElementById('modal-close').addEventListener('click', closeProductModal);
  document.getElementById('product-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeProductModal(); });
  document.getElementById('btn-save-product').addEventListener('click', saveProduct);
  document.getElementById('btn-delete-product').addEventListener('click', deleteProduct);

  // Dropzone
  const dz = document.getElementById('pf_dropzone');
  const fi = document.getElementById('pf_fileinput');
  dz.addEventListener('click', () => fi.click());
  dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('dragover'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
  dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('dragover'); handleFiles(e.dataTransfer.files); });
  fi.addEventListener('change', () => handleFiles(fi.files));
}

function handleFiles(files) {
  for (const f of files) {
    uploadQueue.push(f);
    const url = URL.createObjectURL(f);
    currentProductImages.push('__new__' + f.name);
    renderPreviews();
  }
}

function renderPreviews() {
  const container = document.getElementById('pf_previews');
  container.innerHTML = currentProductImages.map((img, i) => {
    const isFile = img.startsWith('__new__');
    const fname = isFile ? '' : img;
    const src = isFile ? '' : `/uploads/${img}`;
    return `<div class="preview-item" data-idx="${i}">
      ${isFile ? `<div style="width:100%;height:100%;background:#1a1a1a;display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--muted)">...</div>` : `<img src="${src}">`}
      <button class="remove-img" data-idx="${i}">×</button>
    </div>`;
  }).join('');
  container.querySelectorAll('.remove-img').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.idx);
      currentProductImages.splice(idx, 1);
      renderPreviews();
    });
  });
}

function openProduct(id) {
  const p = id ? products.find(x => String(x.id) === String(id)) : null;
  document.getElementById('modal-title').textContent = p ? 'Редактировать товар' : 'Добавить товар';
  document.getElementById('pf_id').value = p ? p.id : '';
  document.getElementById('pf_name').value = p ? p.name || '' : '';
  document.getElementById('pf_desc').value = p ? p.description || '' : '';
  document.getElementById('pf_price').value = p ? p.price || '' : '';
  document.getElementById('pf_oldprice').value = p ? p.old_price || '' : '';
  document.getElementById('pf_category').value = p ? p.category || 'Футболки' : 'Футболки';
  document.getElementById('pf_badge').value = p ? p.badge || '' : '';
  document.getElementById('pf_emoji').value = p ? p.emoji || '' : '';
  document.getElementById('pf_active').checked = p ? p.active !== false : true;

  // Sizes
  const sizes = p ? (Array.isArray(p.sizes) ? p.sizes : []) : [];
  document.querySelectorAll('#pf_dropzone').closest; // nop
  document.querySelectorAll('.checkbox-row input[type=checkbox]').forEach(cb => {
    cb.checked = sizes.includes(cb.value);
  });

  currentProductImages = p ? parseImages(p.images) : [];
  uploadQueue.length = 0;
  renderPreviews();

  document.getElementById('btn-delete-product').style.display = p ? 'inline-block' : 'none';
  document.getElementById('product-modal').style.display = 'flex';
}

function closeProductModal() {
  document.getElementById('product-modal').style.display = 'none';
}

async function saveProduct() {
  // Upload new files first
  const newFilenames = [];
  for (const f of uploadQueue) {
    const fd = new FormData();
    fd.append('image', f);
    const r = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await r.json();
    if (data.filename) newFilenames.push(data.filename);
  }

  // Merge images: keep existing, add new
  const finalImages = currentProductImages.map(img => {
    if (img.startsWith('__new__')) {
      const name = img.replace('__new__', '');
      return newFilenames.find(f => f.includes(name)) || newFilenames[0] || '';
    }
    return img;
  }).filter(Boolean);

  const sizes = [];
  document.querySelectorAll('.checkbox-row input[type=checkbox]').forEach(cb => {
    if (cb.checked) sizes.push(cb.value);
  });

  const id = document.getElementById('pf_id').value;
  const existing = id ? products.find(p => String(p.id) === String(id)) : null;

  const product = {
    id: id || String(Date.now()),
    name: document.getElementById('pf_name').value,
    description: document.getElementById('pf_desc').value,
    price: Number(document.getElementById('pf_price').value) || 0,
    old_price: Number(document.getElementById('pf_oldprice').value) || null,
    category: document.getElementById('pf_category').value,
    sizes,
    badge: document.getElementById('pf_badge').value,
    emoji: document.getElementById('pf_emoji').value,
    images: JSON.stringify(finalImages),
    active: document.getElementById('pf_active').checked,
  };

  if (existing) {
    Object.assign(existing, product);
  } else {
    products.push(product);
  }

  await fetch('/api/products', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(products) });
  closeProductModal();
  renderProducts();
}

async function deleteProduct() {
  const id = document.getElementById('pf_id').value;
  if (!id || !confirm('Удалить товар?')) return;
  products = products.filter(p => String(p.id) !== String(id));
  await fetch('/api/products', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(products) });
  closeProductModal();
  renderProducts();
}

// === Collections ===
async function loadCollections() {
  const res = await fetch('/api/collections');
  collections = await res.json();
  renderCollections();
}

function renderCollections() {
  const list = document.getElementById('collections-list');
  if (!collections.length) { list.innerHTML = '<div class="empty-state">Нет коллекций</div>'; return; }
  list.innerHTML = collections.map(c => {
    const pids = Array.isArray(c.product_ids) ? c.product_ids : [];
    return `<div class="collection-card" data-id="${c.id}">
      <div>
        <div class="col-name">${esc(c.name || '')}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px">${esc(c.description || '')}</div>
      </div>
      <div class="col-count">${pids.length} товаров</div>
    </div>`;
  }).join('');
  list.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', () => openCollection(card.dataset.id));
  });
}

function setupCollectionModal() {
  document.getElementById('btn-add-collection').addEventListener('click', () => openCollection(null));
  document.getElementById('col-modal-close').addEventListener('click', () => document.getElementById('collection-modal').style.display = 'none');
  document.getElementById('collection-modal').addEventListener('click', e => { if (e.target === e.currentTarget) e.target.style.display = 'none'; });
  document.getElementById('btn-save-collection').addEventListener('click', saveCollection);
  document.getElementById('btn-delete-collection').addEventListener('click', deleteCollection);
}

function openCollection(id) {
  const c = id ? collections.find(x => String(x.id) === String(id)) : null;
  document.getElementById('col-modal-title').textContent = c ? 'Редактировать коллекцию' : 'Добавить коллекцию';
  document.getElementById('cf_id').value = c ? c.id : '';
  document.getElementById('cf_name').value = c ? c.name || '' : '';
  document.getElementById('cf_desc').value = c ? c.description || '' : '';

  const pids = c ? (Array.isArray(c.product_ids) ? c.product_ids : []) : [];
  const container = document.getElementById('cf_products');
  container.innerHTML = products.map(p => `<label class="chk"><input type="checkbox" value="${p.id}" ${pids.includes(String(p.id)) || pids.includes(p.id) ? 'checked' : ''}> ${esc(p.name || p.id)}</label>`).join('') || '<span style="color:var(--muted)">Нет товаров</span>';

  document.getElementById('btn-delete-collection').style.display = c ? 'inline-block' : 'none';
  document.getElementById('collection-modal').style.display = 'flex';
}

async function saveCollection() {
  const id = document.getElementById('cf_id').value;
  const existing = id ? collections.find(c => String(c.id) === String(id)) : null;

  const product_ids = [];
  document.querySelectorAll('#cf_products input[type=checkbox]').forEach(cb => {
    if (cb.checked) product_ids.push(cb.value);
  });

  const col = {
    id: id || String(Date.now()),
    name: document.getElementById('cf_name').value,
    description: document.getElementById('cf_desc').value,
    product_ids,
  };

  if (existing) Object.assign(existing, col);
  else collections.push(col);

  await fetch('/api/collections', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(collections) });
  document.getElementById('collection-modal').style.display = 'none';
  renderCollections();
}

async function deleteCollection() {
  const id = document.getElementById('cf_id').value;
  if (!id || !confirm('Удалить коллекцию?')) return;
  collections = collections.filter(c => String(c.id) !== String(id));
  await fetch('/api/collections', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(collections) });
  document.getElementById('collection-modal').style.display = 'none';
  renderCollections();
}

// === Settings ===
function setupSettings() {
  document.getElementById('btn-save-settings').addEventListener('click', saveSettings);
  // Load from localStorage or API if available
  const s = JSON.parse(localStorage.getItem('ermak_settings') || '{}');
  document.getElementById('set-tg').value = s.tg || '';
  document.getElementById('set-ig').value = s.ig || '';
  document.getElementById('set-vk').value = s.vk || '';
  document.getElementById('set-hero-title').value = s.heroTitle || '';
  document.getElementById('set-hero-sub').value = s.heroSub || '';
  document.getElementById('set-phil-text').value = s.philText || '';
  document.getElementById('set-phil-quote').value = s.philQuote || '';
}

function saveSettings() {
  const s = {
    tg: document.getElementById('set-tg').value,
    ig: document.getElementById('set-ig').value,
    vk: document.getElementById('set-vk').value,
    heroTitle: document.getElementById('set-hero-title').value,
    heroSub: document.getElementById('set-hero-sub').value,
    philText: document.getElementById('set-phil-text').value,
    philQuote: document.getElementById('set-phil-quote').value,
  };
  localStorage.setItem('ermak_settings', JSON.stringify(s));
  alert('Настройки сохранены');
}
