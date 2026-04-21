const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || '';
const TG_CHAT_ID = process.env.TG_CHAT_ID || '';

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const DIST_DIR = path.join(__dirname, 'dist');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Static: uploads first, then dist (React SPA)
app.use('/uploads', express.static(UPLOAD_DIR));
app.use(express.static(DIST_DIR));

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.random().toString(36).substr(2, 6) + ext);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/image\/(jpeg|png|webp|gif)/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Только изображения'));
  }
});

function readJSON(file) {
  const fp = path.join(DATA_DIR, file);
  if (!fs.existsSync(fp)) return [];
  return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function writeJSON(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

function sendTelegram(text) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;
  const chatIds = TG_CHAT_ID.split(',');
  const encoded = encodeURIComponent(text);
  for (const cid of chatIds) {
    https.get(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?chat_id=${cid.trim()}&text=${encoded}`, () => {});
  }
}

// Upload
app.post('/api/upload', upload.array('photos', 10), (req, res) => {
  const urls = req.files.map(f => `/uploads/${f.filename}`);
  res.json({ urls });
});

// Messages
app.post('/api/messages', (req, res) => {
  const msg = { ...req.body, date: new Date().toISOString() };
  const msgs = readJSON('messages.json');
  msgs.push(msg);
  writeJSON('messages.json', msgs);
  sendTelegram(`📨 Новое сообщение с сайта\n👤 ${msg.name}\n📞 ${msg.contact}\n💬 ${msg.message}`);
  res.json({ ok: true });
});

// Products & Collections
app.get('/api/products', (req, res) => res.json(readJSON('products.json')));
app.put('/api/products', (req, res) => { writeJSON('products.json', req.body); res.json({ ok: true }); });
app.get('/api/collections', (req, res) => res.json(readJSON('collections.json')));
app.put('/api/collections', (req, res) => { writeJSON('collections.json', req.body); res.json({ ok: true }); });

// Chat API
const CHAT_DIR = path.join(DATA_DIR, 'chat');
if (!fs.existsSync(CHAT_DIR)) fs.mkdirSync(CHAT_DIR, { recursive: true });

function readChat(vid) {
  const fp = path.join(CHAT_DIR, `${vid}.json`);
  if (!fs.existsSync(fp)) return { visitor_id: vid, name: null, messages: [] };
  return JSON.parse(fs.readFileSync(fp, 'utf8'));
}
function writeChat(vid, data) {
  fs.writeFileSync(path.join(CHAT_DIR, `${vid}.json`), JSON.stringify(data, null, 2));
}

app.get('/api/chat/:visitor_id', (req, res) => res.json(readChat(req.params.visitor_id)));
app.post('/api/chat/:visitor_id', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: 'empty' });
  const vid = req.params.visitor_id;
  const chat = readChat(vid);
  const msg = { role: 'visitor', text: text.trim(), time: new Date().toISOString() };
  chat.messages.push(msg);
  writeChat(vid, chat);
  sendTelegram(`💬 ${chat.name || 'Гость'}: ${text.trim()}\nvisitor_id: ${vid}`);
  res.json({ ok: true, message: msg });
});
app.post('/api/chat/:visitor_id/name', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'empty' });
  const chat = readChat(req.params.visitor_id);
  chat.name = name.trim();
  writeChat(req.params.visitor_id, chat);
  res.json({ ok: true });
});
app.get('/api/messages', (req, res) => res.json(readJSON('messages.json')));
app.delete('/api/messages', (req, res) => { writeJSON('messages.json', []); res.json({ ok: true }); });

// SPA fallback — serve index.html for any non-API, non-static route
app.get('*', (req, res) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(PORT, () => console.log(`ЕРМАК сервер на http://localhost:${PORT}`));
