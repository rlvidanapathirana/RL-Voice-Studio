/* ================================================================
   RL Voice Studio — Main Application Logic
   Author: V.P.R. Lakshan Vidanapathirana
   ================================================================ */

'use strict';

// ═══════════════════════════════════════════════════════════
//  TTS VOICE DEFINITIONS
// ═══════════════════════════════════════════════════════════
const TTS_VOICES = [
  // ── Pro Natural Voices ────────────────────────────────────────────────────
  {
    id: 'dialog-vits-f1',
    name: 'අරවින්දි (Pro Natural)', nameEn: 'Aravindi (Pro)', gender: 'female', engine: 'dialog-vits', lang: 'Sinhala',
    voiceName: 'Female Voice 1', quality: 'Ultra HD', qualityScore: 100,
    desc: 'Highly natural female Sinhala voice.',
    badge: 'PRO NATURAL', badgeColor: '#F59E0B', color: '#FBBF24',
    gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)', avatar: '👑',
    requiresKey: false
  },
  {
    id: 'dialog-vits-f2',
    name: 'කනිශ්කා (Pro Natural)', nameEn: 'Kanishka (Pro)', gender: 'female', engine: 'dialog-vits', lang: 'Sinhala',
    voiceName: 'Female Voice 2', quality: 'Ultra HD', qualityScore: 100,
    desc: 'Soft and sweet natural female Sinhala voice.',
    badge: 'PRO NATURAL', badgeColor: '#F59E0B', color: '#FBBF24',
    gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)', avatar: '👑',
    requiresKey: false
  },
  {
    id: 'dialog-vits-m1',
    name: 'කසුන් (Pro Natural)', nameEn: 'Kasun (Pro)', gender: 'male', engine: 'dialog-vits', lang: 'Sinhala',
    voiceName: 'Male Voice 1', quality: 'Ultra HD', qualityScore: 100,
    desc: 'Deep and highly realistic male Sinhala voice.',
    badge: 'PRO NATURAL', badgeColor: '#F59E0B', color: '#FBBF24',
    gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)', avatar: '👑',
    requiresKey: false
  },
  {
    id: 'dialog-vits-m2',
    name: 'දසුන් (Pro Natural)', nameEn: 'Dasun (Pro)', gender: 'male', engine: 'dialog-vits', lang: 'Sinhala',
    voiceName: 'Male Voice 2', quality: 'Ultra HD', qualityScore: 100,
    desc: 'Clear and bright male Sinhala voice.',
    badge: 'PRO NATURAL', badgeColor: '#F59E0B', color: '#FBBF24',
    gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)', avatar: '👑',
    requiresKey: false
  },
  // ── Edge Neural Voices ────────────────────────────────────────────────────
  {
    id: 'edge-thilini-natural',
    name: 'තිලිනි (Natural)', nameEn: 'Thilini (Natural)', gender: 'female', engine: 'edge', lang: 'Sinhala',
    voiceName: 'si-LK-ThiliniNeural', quality: 'Ultra Realistic', qualityScore: 100,
    desc: 'Fine-tuned Thilini voice for maximum realism (slower & deeper).',
    badge: 'NEW', badgeColor: '#F59E0B', color: '#FBBF24',
    gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)', avatar: '👩',
    requiresKey: false, pitchOffset: -4, rateOffset: -8
  },
  {
    id: 'edge-sameera-natural',
    name: 'සමීර (Natural)', nameEn: 'Sameera (Natural)', gender: 'male', engine: 'edge', lang: 'Sinhala',
    voiceName: 'si-LK-SameeraNeural', quality: 'Ultra Realistic', qualityScore: 100,
    desc: 'Fine-tuned Sameera voice for a deep, natural male tone.',
    badge: 'NEW', badgeColor: '#8B5CF6', color: '#A855F7',
    gradient: 'linear-gradient(135deg,#8B5CF6,#EC4899)', avatar: '👨',
    requiresKey: false, pitchOffset: -6, rateOffset: -5
  },
  {
    id: 'edge-thilini',
    name: 'තිලිනි (Standard)', nameEn: 'Thilini (Standard)', gender: 'female', engine: 'edge', lang: 'Sinhala',
    voiceName: 'si-LK-ThiliniNeural', quality: 'Neural Free', qualityScore: 98,
    desc: 'Standard high-quality Sinhala female voice.',
    badge: 'STANDARD', badgeColor: '#10B981', color: '#34D399',
    gradient: 'linear-gradient(135deg,#059669,#8B5CF6)', avatar: '👩',
    requiresKey: false
  },
  {
    id: 'edge-sameera',
    name: 'සමීර (Standard)', nameEn: 'Sameera (Standard)', gender: 'male', engine: 'edge', lang: 'Sinhala',
    voiceName: 'si-LK-SameeraNeural', quality: 'Neural Free', qualityScore: 98,
    desc: 'Standard high-quality Sinhala male voice.',
    badge: 'STANDARD', badgeColor: '#06B6D4', color: '#22D3EE',
    gradient: 'linear-gradient(135deg,#0891B2,#10B981)', avatar: '👨',
    requiresKey: false
  },
  {
    id: 'local-mms',
    name: 'MMS (Local Browser AI)', nameEn: 'Meta MMS (Offline English)', gender: 'neutral', engine: 'local-mms', lang: 'English',
    voiceName: 'Xenova/mms-tts-eng', quality: '100% Offline AI', qualityScore: 95,
    desc: 'Runs completely inside your browser using WebGPU/WASM. Zero server connection! (Currently English only)',
    badge: 'OFFLINE AI', badgeColor: '#8B5CF6', color: '#A855F7',
    gradient: 'linear-gradient(135deg,#8B5CF6,#EC4899)', avatar: '🧠',
    requiresKey: false
  },
  {
    id: 'google-free',
    name: 'අකිල (Google Free)', nameEn: 'Akila (Google)', gender: 'neutral', engine: 'google-free', lang: 'Sinhala',
    voiceName: 'si-LK-Google', quality: 'Basic Online', qualityScore: 80,
    desc: 'Free Google Translate Sinhala voice (from Akila-Prabath repo).',
    badge: 'GOOGLE FREE', badgeColor: '#EA4335', color: '#F87171',
    gradient: 'linear-gradient(135deg,#EA4335,#FBBC04)', avatar: '🌐',
    requiresKey: false
  },

  {
    id: 'edge-mett',
    name: 'මෙත්තානන්ද (Mettananda)', nameEn: 'Mettananda (Path Nirvana)', gender: 'male', engine: 'edge', lang: 'Sinhala',
    voiceName: 'si-LK-SameeraNeural', quality: 'Ultra Realistic', qualityScore: 100,
    desc: 'Deep Male voice. A tribute fine-tune to sound like Ven. Mettananda from the Path Nirvana dataset.',
    badge: 'PATH NIRVANA', badgeColor: '#10B981', color: '#34D399',
    gradient: 'linear-gradient(135deg,#059669,#1D4ED8)', avatar: '🧔',
    requiresKey: false, pitchOffset: -12, rateOffset: -10
  },
  {
    id: 'edge-oshadi',
    name: 'ඕෂධී (Oshadi)', nameEn: 'Oshadi (Path Nirvana)', gender: 'female', engine: 'edge', lang: 'Sinhala',
    voiceName: 'si-LK-ThiliniNeural', quality: 'Ultra Realistic', qualityScore: 100,
    desc: 'Sweet Female voice. A tribute fine-tune to sound like Oshadi from the Path Nirvana dataset.',
    badge: 'PATH NIRVANA', badgeColor: '#EC4899', color: '#F472B6',
    gradient: 'linear-gradient(135deg,#EC4899,#8B5CF6)', avatar: '👩🏻',
    requiresKey: false, pitchOffset: +8, rateOffset: -3
  },
  // ── English Voices ────────────────────────────────────────────────────────
  {
    id: 'edge-ava',
    name: 'ඒවා (Ava)', nameEn: 'Ava (EN)', gender: 'female', engine: 'edge', lang: 'English',
    voiceName: 'en-US-AvaNeural', quality: 'Neural Free', qualityScore: 99,
    desc: 'High quality American English female voice.',
    badge: 'US ENG', badgeColor: '#8B5CF6', color: '#A855F7',
    gradient: 'linear-gradient(135deg,#8B5CF6,#EC4899)', avatar: '👩🏼',
    requiresKey: false
  },
  {
    id: 'edge-guy',
    name: 'ගයි (Guy)', nameEn: 'Guy (EN)', gender: 'male', engine: 'edge', lang: 'English',
    voiceName: 'en-US-GuyNeural', quality: 'Neural Free', qualityScore: 99,
    desc: 'High quality American English male voice.',
    badge: 'US ENG', badgeColor: '#3B82F6', color: '#60A5FA',
    gradient: 'linear-gradient(135deg,#3B82F6,#06B6D4)', avatar: '👨🏼',
    requiresKey: false
  },
  {
    id: 'edge-sonia',
    name: 'සෝනියා (Sonia)', nameEn: 'Sonia (UK)', gender: 'female', engine: 'edge', lang: 'English',
    voiceName: 'en-GB-SoniaNeural', quality: 'Neural Free', qualityScore: 99,
    desc: 'High quality British English female voice.',
    badge: 'UK ENG', badgeColor: '#EC4899', color: '#F472B6',
    gradient: 'linear-gradient(135deg,#EC4899,#8B5CF6)', avatar: '👩🏽',
    requiresKey: false
  },
  {
    id: 'edge-ryan',
    name: 'රයන් (Ryan)', nameEn: 'Ryan (UK)', gender: 'male', engine: 'edge', lang: 'English',
    voiceName: 'en-GB-RyanNeural', quality: 'Neural Free', qualityScore: 99,
    desc: 'High quality British English male voice.',
    badge: 'UK ENG', badgeColor: '#14B8A6', color: '#2DD4BF',
    gradient: 'linear-gradient(135deg,#14B8A6,#3B82F6)', avatar: '👨🏽',
    requiresKey: false
  },
  {
    id: 'edge-neerja',
    name: 'නීරජා (Neerja)', nameEn: 'Neerja (IN)', gender: 'female', engine: 'edge', lang: 'English',
    voiceName: 'en-IN-NeerjaNeural', quality: 'Neural Free', qualityScore: 98,
    desc: 'High quality Indian English female voice.',
    badge: 'IN ENG', badgeColor: '#F59E0B', color: '#FBBF24',
    gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)', avatar: '👩🏾',
    requiresKey: false
  }
];

// ═══════════════════════════════════════════════════════════
//  VOICE CHANGER PRESETS
// ═══════════════════════════════════════════════════════════
const VC_PRESETS = [
  {
    id: 'natural',   name: 'Natural',   sub: 'No Change',   emoji: '🎤',
    color: '#64748B',
    playbackRate: 1.0, pitchBonus: 0, reverb: 0, distortion: 0, filters: []
  },
  {
    id: 'female',    name: 'Female',    sub: 'Male→Female', emoji: '👩',
    color: '#EC4899',
    playbackRate: 1.35, pitchBonus: 0, reverb: 0.05, distortion: 0,
    filters: [
      { type: 'highpass',  frequency: 250, Q: 1.0, gain: 0 },
      { type: 'peaking',   frequency: 2500, Q: 1.5, gain: 6 },
      { type: 'peaking',   frequency: 4000, Q: 1.5, gain: 5 },
      { type: 'highshelf', frequency: 6000, Q: 0.7, gain: 3 }
    ]
  },
  {
    id: 'female-soft',    name: 'Soft Female',    sub: 'Smooth', emoji: '🌸',
    color: '#F472B6',
    playbackRate: 1.28, pitchBonus: 0, reverb: 0.15, distortion: 0,
    filters: [
      { type: 'highpass',  frequency: 200, Q: 0.7, gain: 0 },
      { type: 'peaking',   frequency: 2000, Q: 1.0, gain: 4 },
      { type: 'highshelf', frequency: 5000, Q: 0.7, gain: 1 }
    ]
  },
  {
    id: 'female-bright',  name: 'Bright Female',  sub: 'Crisp', emoji: '✨',
    color: '#D946EF',
    playbackRate: 1.45, pitchBonus: 0, reverb: 0.02, distortion: 0.05,
    filters: [
      { type: 'highpass',  frequency: 280, Q: 1.2, gain: 0 },
      { type: 'peaking',   frequency: 3000, Q: 1.8, gain: 8 },
      { type: 'highshelf', frequency: 7000, Q: 0.7, gain: 4 }
    ]
  },
  {
    id: 'male-deep', name: 'Deep Male', sub: 'Female→Male', emoji: '👨',
    color: '#3B82F6',
    playbackRate: 0.82, pitchBonus: 0, reverb: 0.08, distortion: 0,
    filters: [
      { type: 'lowshelf', frequency: 280, Q: 0.7, gain: 7 },
      { type: 'peaking',  frequency: 120, Q: 1.5, gain: 4 },
      { type: 'lowpass',  frequency: 7000, Q: 0.7, gain: 0 }
    ]
  },
  {
    id: 'child',     name: 'Child',     sub: 'Young Voice',  emoji: '👧',
    color: '#F59E0B',
    playbackRate: 1.42, pitchBonus: 0, reverb: 0.14, distortion: 0,
    filters: [
      { type: 'highpass', frequency: 200, Q: 0.7, gain: 0 },
      { type: 'peaking',  frequency: 3000, Q: 1.2, gain: 2 }
    ]
  },
  {
    id: 'robot',     name: 'Robot',     sub: 'Cybernetic',   emoji: '🤖',
    color: '#06B6D4',
    playbackRate: 1.0, pitchBonus: 0, reverb: 0.1, distortion: 0.7,
    filters: [
      { type: 'bandpass', frequency: 1000, Q: 5, gain: 0 },
      { type: 'peaking',  frequency: 500, Q: 3, gain: 5 }
    ]
  },
  {
    id: 'radio',     name: 'Radio DJ',  sub: 'Broadcast',    emoji: '📻',
    color: '#8B5CF6',
    playbackRate: 1.0, pitchBonus: 0, reverb: 0, distortion: 0.22,
    filters: [
      { type: 'highpass', frequency: 300, Q: 0.9, gain: 0 },
      { type: 'lowpass',  frequency: 3400, Q: 0.9, gain: 0 },
      { type: 'peaking',  frequency: 1200, Q: 1.5, gain: 3 }
    ]
  },
  {
    id: 'giant',     name: 'Giant',     sub: 'Massive Deep', emoji: '👹',
    color: '#7C3AED',
    playbackRate: 0.65, pitchBonus: 0, reverb: 0.3, distortion: 0.1,
    filters: [
      { type: 'lowshelf', frequency: 200, Q: 0.7, gain: 9 },
      { type: 'peaking',  frequency: 80, Q: 2, gain: 5 }
    ]
  },
  {
    id: 'helium',    name: 'Helium',    sub: 'Super High',   emoji: '🎈',
    color: '#F43F5E',
    playbackRate: 1.72, pitchBonus: 0, reverb: 0.05, distortion: 0,
    filters: [
      { type: 'highpass', frequency: 250, Q: 0.7, gain: 0 }
    ]
  },
  {
    id: 'echo',      name: 'Echo',      sub: 'Chamber',      emoji: '🏛️',
    color: '#10B981',
    playbackRate: 1.0, pitchBonus: 0, reverb: 0.88, distortion: 0, filters: []
  },
  {
    id: 'alien',     name: 'Alien',     sub: 'Extraterrestrial', emoji: '👽',
    color: '#84CC16',
    playbackRate: 0.95, pitchBonus: 0, reverb: 0.2, distortion: 0.35,
    filters: [
      { type: 'peaking', frequency: 600, Q: 4, gain: 6 },
      { type: 'peaking', frequency: 1800, Q: 3, gain: -4 },
      { type: 'peaking', frequency: 3600, Q: 4, gain: 5 }
    ]
  }
];

// ═══════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════
const state = {
  // TTS
  selectedVoiceId: 'edge-thilini',
  speed: 1.0, pitch: 0, volume: 100,
  ttsPlaying: false, ttsAudioBlob: null,
  azureKey: '', azureRegion: 'eastus', googleKey: '',
  edgeTtsUrl: 'http://localhost:5050',  // openai-edge-tts server URL
  // Voice Changer
  selectedPresetId: 'natural',
  inputAudioBuffer: null, processedAudioBuffer: null,
  inputAudioBlob: null, processedAudioBlob: null,
  vcPitch: 0, vcReverb: 0, vcDistortion: 0,
  isRecording: false, recTimer: null, recSeconds: 0,
  mediaRecorder: null, audioChunks: [],
  vcPlaying: false, currentWfView: 'original',
  inputMode: 'record'
};

// Audio context
let audioCtx = null;
let ttsAnalyser = null, ttsSource = null;
let ttsVizId = null, fakeTtsVizId = null;
let micStream = null, micAnalyser = null, micVizId = null;
let vcSource = null;

// ═══════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  renderVoicePills();
  renderVoiceCards();
  renderPresetGrid();
  setupTTSControls();
  setupVCControls();
  setupModal();
  setupTabs();
  setupHeader();
  initParticles();
  initTTSVisualizer();
  updateCharCounter();

  // scroll header style
  window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
  });
});

// ═══════════════════════════════════════════════════════════
//  TAB SWITCHING
// ═══════════════════════════════════════════════════════════
function setupTabs() {
  document.getElementById('tabTTS').addEventListener('click', () => switchTab('tts'));
  document.getElementById('tabVC').addEventListener('click', () => switchTab('vc'));
}

function switchTab(tab) {
  document.getElementById('panelTTS').classList.toggle('hidden', tab !== 'tts');
  document.getElementById('panelVC').classList.toggle('hidden', tab !== 'vc');
  document.getElementById('tabTTS').classList.toggle('active', tab === 'tts');
  document.getElementById('tabVC').classList.toggle('active', tab === 'vc');

  // Sync mobile menu items
  document.querySelectorAll('.mobile-menu-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tab);
  });

  // scroll to workspace
  document.getElementById('workspace').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ═══════════════════════════════════════════════════════════
//  HEADER HAMBURGER
// ═══════════════════════════════════════════════════════════
function setupHeader() {
  const hbg = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hbg || !mobileMenu) return;
  hbg.addEventListener('click', () => {
    const open = hbg.getAttribute('aria-expanded') === 'true';
    hbg.setAttribute('aria-expanded', String(!open));
    mobileMenu.classList.toggle('open', !open);
  });
}

// ═══════════════════════════════════════════════════════════
//  SETTINGS
// ═══════════════════════════════════════════════════════════
function loadSettings() {
  state.azureKey    = localStorage.getItem('rlvs_azure_key')    || '';
  state.azureRegion = localStorage.getItem('rlvs_azure_region') || 'eastus';
  state.googleKey   = localStorage.getItem('rlvs_google_key')   || '';
  state.edgeTtsUrl  = localStorage.getItem('rlvs_edge_url')     || 'http://localhost:5050';
  const ak = document.getElementById('azureKey');
  const ar = document.getElementById('azureRegion');
  const gk = document.getElementById('googleKey');
  const eu = document.getElementById('edgeTtsUrl');
  if (ak) ak.value = state.azureKey;
  if (ar) ar.value = state.azureRegion;
  if (gk) gk.value = state.googleKey;
  if (eu) eu.value = state.edgeTtsUrl;
}

function saveSettings() {
  const azureKey    = document.getElementById('azureKey').value.trim();
  const azureRegion = document.getElementById('azureRegion').value;
  const googleKey   = document.getElementById('googleKey').value.trim();
  const edgeTtsUrl  = (document.getElementById('edgeTtsUrl')?.value || '').trim().replace(/\/+$/, '') || 'http://localhost:5050';
  localStorage.setItem('rlvs_azure_key', azureKey);
  localStorage.setItem('rlvs_azure_region', azureRegion);
  localStorage.setItem('rlvs_google_key', googleKey);
  localStorage.setItem('rlvs_edge_url', edgeTtsUrl);
  state.azureKey = azureKey; state.azureRegion = azureRegion;
  state.googleKey = googleKey; state.edgeTtsUrl = edgeTtsUrl;
  closeModal(); showToast('✓ Settings saved!');
  renderVoicePills(); renderVoiceCards();
}

function setupModal() {
  // Modal has been removed
}

// ═══════════════════════════════════════════════════════════
//  TTS — VOICE RENDERING
// ═══════════════════════════════════════════════════════════
function renderVoicePills() {
  const container = document.getElementById('voicePills');
  if (!container) return;
  container.innerHTML = '';

  const groups = { 'Sinhala': [], 'English': [] };
  TTS_VOICES.forEach(v => {
    if (groups[v.lang]) groups[v.lang].push(v);
  });

  for (const [lang, voices] of Object.entries(groups)) {
    if (voices.length === 0) continue;
    
    const groupLabel = document.createElement('div');
    groupLabel.className = 'pill-group-title';
    groupLabel.style.cssText = 'width: 100%; font-size: 0.75rem; font-weight: 700; color: var(--t3); margin: 8px 0 4px 4px; text-transform: uppercase;';
    groupLabel.textContent = `${lang} Voices`;
    container.appendChild(groupLabel);

    voices.forEach(v => {
      const locked = v.requiresKey && !state[v.requiresKey + 'Key'];
      const isActive = v.id === state.selectedVoiceId;
      const pill = document.createElement('button');
      pill.className = 'voice-pill' + (isActive ? ' active' : '');
      pill.setAttribute('role', 'radio');
      pill.setAttribute('aria-checked', String(isActive));
      pill.style.cssText = isActive
        ? `border-color:${v.color};background:${v.color}22;color:${v.color}`
        : '';
      pill.innerHTML = `
        <span class="pill-avatar">${locked ? '🔒' : v.avatar}</span>
        <span class="pill-name">${v.name}</span>
        <span class="pill-badge" style="background:${v.badgeColor}22;color:${v.badgeColor}">${v.badge}</span>`;
      pill.addEventListener('click', () => selectVoice(v.id));
      container.appendChild(pill);
    });
  }
}

function renderVoiceCards() {
  const container = document.getElementById('voiceCards');
  if (!container) return;
  container.innerHTML = '';

  const groups = { 'Sinhala': [], 'English': [] };
  TTS_VOICES.forEach(v => {
    if (groups[v.lang]) groups[v.lang].push(v);
  });

  for (const [lang, voices] of Object.entries(groups)) {
    if (voices.length === 0) continue;

    const groupTitle = document.createElement('div');
    groupTitle.style.cssText = 'width: 100%; font-size: 1.1rem; font-weight: 700; color: var(--t2); margin: 16px 0 8px 4px; border-bottom: 1px solid var(--border); padding-bottom: 8px; grid-column: 1 / -1;';
    groupTitle.textContent = `${lang} Voice Details`;
    container.appendChild(groupTitle);

    voices.forEach(v => {
      const locked = v.requiresKey && !state[v.requiresKey + 'Key'];
      const card = document.createElement('div');
      card.className = 'voice-card';
      card.innerHTML = `
        <div class="vc-avatar" style="background:${v.gradient};box-shadow:0 8px 28px ${v.color}44">
          ${locked ? '🔒' : v.avatar}
        </div>
        <div class="vc-name">${v.name}</div>
        <div class="vc-name-en">${v.nameEn} · ${v.gender === 'male' ? '♂ Male' : v.gender === 'female' ? '♀ Female' : '⊕'}</div>
        <span class="vc-badge" style="background:${v.badgeColor}22;color:${v.badgeColor};border:1px solid ${v.badgeColor}44">${v.badge}</span>
        <p class="vc-desc">${v.desc}</p>
        <div class="vc-quality">
          <span>${v.quality}</span>
          <div class="q-bar"><div class="q-fill" style="width:${v.qualityScore}%;background:${v.gradient}"></div></div>
          <span>${v.qualityScore}%</span>
        </div>
        <div class="vc-actions">
          <button class="vc-btn preview-btn" data-id="${v.id}" style="color:${v.color};border:1px solid ${v.color}44;background:${v.color}15">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Preview
          </button>
          <button class="vc-btn primary-btn use-btn" data-id="${v.id}" style="background:${v.gradient}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg> Use
          </button>
        </div>
        ${locked ? `<div class="vc-locked-note">⚠ Requires ${v.requiresKey === 'azure' ? 'Azure' : 'Google'} API key</div>` : ''}`;
      
      card.addEventListener('mouseenter', () => { card.style.borderColor = v.color + '60'; card.style.boxShadow = `0 20px 50px ${v.color}20`; });
      card.addEventListener('mouseleave', () => { card.style.borderColor = ''; card.style.boxShadow = ''; });
      
      const previewBtn = card.querySelector('.preview-btn');
      if (previewBtn) {
        previewBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          previewTTSVoice(v.id);
        });
      }
      
      const useBtn = card.querySelector('.use-btn');
      if (useBtn) {
        useBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectVoiceAndGo(v.id);
        });
      }
      
      container.appendChild(card);
    });
  }
}

function selectVoice(id) {
  const v = TTS_VOICES.find(x => x.id === id);
  if (!v) return;
  // Edge engine only needs server URL (always has a default)
  if (v.requiresKey === 'edge') {
    // No key check needed — just needs server running
  } else if (v.requiresKey && !state[v.requiresKey + 'Key']) {
    showToast('⚠ API Key required — Settings open කරන්න'); openModal(); return;
  }
  state.selectedVoiceId = id;
  renderVoicePills();
  setTTSStatus(`Voice: ${v.name} (${v.nameEn}) selected`, 'ready');
}

function selectVoiceAndGo(id) { selectVoice(id); switchTab('tts'); }
function previewTTSVoice(id) {
  const v = TTS_VOICES.find(x => x.id === id);
  if (!v || (v.requiresKey && !state[v.requiresKey + 'Key'])) { showToast('⚠ API Key required'); return; }
  
  const prev = state.selectedVoiceId;
  state.selectedVoiceId = id;
  
  // Set UI immediately
  setVoicePreviewState(id, 'loading');

  speakText(`ආයුබෝවන් මම ${v.name}. මගේ කටහඬ තෝරගන්න කැමතිද ඔයා?`, true)
    .catch(err => {
      console.error("Preview error:", err);
      showToast('❌ Preview failed: ' + err.message);
    })
    .finally(() => {
      if (state.selectedVoiceId === id) {
        state.selectedVoiceId = prev;
        renderVoicePills(); // restore visual state if needed
      }
    });
}

// ═══════════════════════════════════════════════════════════
//  TTS — CONTROLS
// ═══════════════════════════════════════════════════════════
function setupTTSControls() {
  document.getElementById('speakBtn').addEventListener('click', () => {
    if (state.ttsPlaying) stopTTS();
    else speakText(document.getElementById('ttsText').value.trim());
  });
  document.getElementById('playTtsBtn').addEventListener('click', () => {
    if (state.ttsAudioBlob && state.selectedVoiceId) {
      const v = TTS_VOICES.find(x => x.id === state.selectedVoiceId);
      if (v) playTTSBlob(state.ttsAudioBlob, v);
    } else {
      showToast('⚠ No audio to play. Convert text first.');
    }
  });
  document.getElementById('stopBtn').addEventListener('click', stopTTS);
  document.getElementById('ttsDownloadBtn').addEventListener('click', downloadTTSAudio);
  document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('ttsText').value = '';
    updateCharCounter(); showToast('✓ Cleared');
  });
  document.getElementById('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('ttsText').value).then(() => showToast('✓ Copied!'));
  });
  document.getElementById('ttsText').addEventListener('input', updateCharCounter);
  document.querySelectorAll('.chip').forEach(c => {
    c.addEventListener('click', () => { document.getElementById('ttsText').value = c.dataset.text; updateCharCounter(); });
  });

  const speedSl = document.getElementById('speedSlider');
  const pitchSl = document.getElementById('pitchSlider');
  const volSl   = document.getElementById('volumeSlider');

  speedSl.addEventListener('input', () => { state.speed = parseFloat(speedSl.value); document.getElementById('speedVal').textContent = state.speed.toFixed(2).replace(/\.?0+$/,'') + 'x'; updateSliderFill(speedSl); });
  pitchSl.addEventListener('input', () => { state.pitch = parseInt(pitchSl.value); document.getElementById('pitchVal').textContent = state.pitch; updateSliderFill(pitchSl); });
  volSl.addEventListener('input',   () => { state.volume = parseInt(volSl.value); document.getElementById('volumeVal').textContent = state.volume + '%'; updateSliderFill(volSl); });

  [speedSl, pitchSl, volSl].forEach(updateSliderFill);

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); speakText(document.getElementById('ttsText').value.trim()); }
  });
}

function updateSliderFill(slider) {
  const min = parseFloat(slider.min), max = parseFloat(slider.max), val = parseFloat(slider.value);
  const pct = ((val - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(90deg,var(--violet) ${pct}%,var(--border-md) ${pct}%)`;
}

function updateCharCounter() {
  const len = document.getElementById('ttsText').value.length;
  document.getElementById('charCount').textContent = len;
  const fill = document.getElementById('charFill');
  fill.style.width = (len / 5000 * 100) + '%';
  fill.style.background = len > 4500 ? 'var(--rose)' : len > 3000 ? 'var(--amber)' : 'linear-gradient(90deg,var(--emerald),var(--violet))';
}

// ═══════════════════════════════════════════════════════════
//  TTS — ENGINE
// ═══════════════════════════════════════════════════════════
async function speakText(text, isPreview = false) {
  if (!text) { showToast('⚠ Text type කරන්න!'); return; }
  const v = TTS_VOICES.find(x => x.id === state.selectedVoiceId);
  if (!v) return;
  setTTSStatus(isPreview ? 'Generating preview...' : 'Generating audio...', 'loading');
  setTTSSpeaking(true);
  showTTSProgress(true, 'Connecting...', 10);
  
  // Hide play button during generation
  const playBtn = document.getElementById('playTtsBtn');
  if (playBtn) playBtn.style.display = 'none';
  
  try {
    let generatedBlob = null;
    switch (v.engine) {
      case 'edge':            
        showTTSProgress(true, 'Connecting to Edge TTS...', 20);
        generatedBlob = await speakEdgeTTS(text, v); 
        break;
      case 'local-mms':       
        showTTSProgress(true, 'Loading AI Model...', 15, Math.max(5, Math.ceil(text.length * 0.1)));
        generatedBlob = await speakLocalMMS(text, v); 
        break;
      case 'dialog-vits':     
        showTTSProgress(true, "Connecting to Lakshan Voice Lab's RL Voice Server...", 20, Math.max(8, Math.ceil(text.length * 0.15)));
        generatedBlob = await speakDialogVITS(text, v); 
        break;
      case 'google-free':     
        showTTSProgress(true, 'Connecting to Google...', 20);
        generatedBlob = await speakGoogleFree(text, v); 
        break;
      case 'webspeech':       
        showTTSProgress(true, 'Preparing Browser Voice...', 30);
        await speakWebSpeech(text, v); 
        break;
    }
    
    if (generatedBlob) {
      state.ttsAudioBlob = generatedBlob;
      if (isPreview) {
        showTTSProgress(true, 'Playing preview...', 90);
        await playTTSBlob(generatedBlob, v);
      } else {
        // Show Play button
        if (playBtn) playBtn.style.display = 'inline-flex';
        setTTSStatus('Voice Generated! Click Play to listen.', 'ready');
        setTTSSpeaking(false);
        showTTSProgress(false);
      }
    }
  } catch(err) {
    console.error('TTS Error:', err);
    setTTSStatus('Error: ' + err.message, 'error');
    showToast('❌ ' + err.message);
    setTTSSpeaking(false);
    showTTSProgress(false);
  }
}

// ─────────────────────────────────────────────────────────────────

async function speakEdgeTTS(text, v) {
  const baseUrl = state.edgeTtsUrl || 'http://localhost:5050';
  setTTSStatus('Connecting to local Edge TTS server...', 'loading');
  showTTSProgress(true, 'Sending to Edge TTS...', 35);

  // Build speed/pitch params
  const baseRate = v.rateOffset || 0;
  const basePitch = v.pitchOffset || 0;

  const rateVal = Math.round((state.speed - 1) * 100) + baseRate;
  const rateStr = rateVal >= 0 ? `+${rateVal}%` : `${rateVal}%`;
  
  const pitchVal = state.pitch + basePitch;
  const pitchStr = pitchVal >= 0 ? `+${pitchVal}Hz` : `${pitchVal}Hz`;

  // Use the /v1/audio/speech endpoint (OpenAI-compatible) on our Node.js server
  const body = {
    model: 'tts-1',
    input: text,
    voice: v.voiceName,
    speed: state.speed
  };

  let resp;
  try {
    resp = await fetch(`${baseUrl}/v1/audio/speech`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  } catch (fetchErr) {
    throw new Error(`Local backend unreachable (${baseUrl}). Please run 'node server.js' first!`);
  }

  if (!resp.ok) {
    const errText = await resp.text().catch(() => '');
    throw new Error(`Edge TTS Error ${resp.status}: ${errText.substring(0, 120)}`);
  }

  const blob = await resp.blob();
  return blob;
}

async function speakGoogleFree(text, v) {
  setTTSStatus('Connecting to Google Free TTS...', 'loading');
  try {
    const url = `${baseUrl}/v1/audio/google-free?q=${encodeURIComponent(text)}`;
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`Google Free TTS Error: ${resp.status}`);
    }
    const blob = await resp.blob();
    return blob;
  } catch (err) {
    throw new Error(`Local backend unreachable (${baseUrl}). Please run 'node server.js' first!`);
  }
}

// ─────────────────────────────────────────────────────────────────
// BROWSER NATIVE AI (Transformers.js)
// ─────────────────────────────────────────────────────────────────

let hfPipeline = null;
let hfSynthesizer = null;

async function speakLocalMMS(text, v) {
  setTTSStatus('Loading Offline AI Model... (May take a moment on first run)', 'loading');
  
  if (!hfPipeline) {
    try {
      const transformers = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0/dist/transformers.min.js');
      hfPipeline = transformers.pipeline;
      transformers.env.allowLocalModels = false;
    } catch (e) {
      throw new Error("Failed to load Transformers.js. Check your internet connection for the initial download.");
    }
  }

  if (!hfSynthesizer) {
    // Attempt WebGPU, fallback to WASM if not supported
    try {
      hfSynthesizer = await hfPipeline('text-to-speech', v.voiceName, { device: 'webgpu' });
    } catch (e) {
      console.warn("WebGPU not available, falling back to WebAssembly (WASM).", e);
      hfSynthesizer = await hfPipeline('text-to-speech', v.voiceName, { device: 'wasm' });
    }
  }

  setTTSStatus('Synthesizing speech locally...', 'loading');
  
  // The MMS model takes the text and generates audio
  const output = await hfSynthesizer(text);
  
  // output is { audio: Float32Array, sampling_rate: int }
  const wavBlob = floatToWav(output.audio, output.sampling_rate);
  return wavBlob;
}

function floatToWav(audioData, sampleRate) {
  const numChannels = 1;
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = audioData.length * 2;
  
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);
  
  let offset = 44;
  for (let i = 0; i < audioData.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, audioData[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  
  return new Blob([view], { type: 'audio/wav' });
}

// ─────────────────────────────────────────────────────────────────
// DIALOG VITS (Hugging Face Gradio API)
// ─────────────────────────────────────────────────────────────────
let gradioClient = null;

async function speakDialogVITS(text, v) {
  setTTSStatus('Connecting to Pro Natural Serverless Engine...', 'loading');
  
  if (!gradioClient) {
    try {
      const module = await import('https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js');
      gradioClient = module.Client;
    } catch (e) {
      throw new Error("Failed to load Gradio Client. Check your internet connection.");
    }
  }

  setTTSStatus('Generating Pro Natural speech...', 'loading');
  
  try {
    const app = await gradioClient.connect("dialoglk/SinhalaVITS");
    const result = await app.predict("/generate_speech", [		
      text, // string  in 'sinhala_text' Textbox component		
      v.voiceName, // string  in 'speaker' Dropdown component
    ]);
    
    // result.data[0] contains the audio filepath URL structure
    if (result && result.data && result.data[0]) {
      const audioUrl = result.data[0].url;
      // Fetch the audio blob from the URL
      const audioResponse = await fetch(audioUrl);
      if (!audioResponse.ok) throw new Error("Failed to download audio from Hugging Face.");
      const wavBlob = await audioResponse.blob();
      return wavBlob;
    } else {
      throw new Error("Unexpected response format from Hugging Face Space.");
    }
  } catch (error) {
    console.error("Dialog VITS Error:", error);
    throw new Error("Dialog VITS API Error: " + error.message);
  }
}


// ─────────────────────────────────────────────────────────────────
// BROWSER WEB SPEECH API (100% built-in, no CDN, no key)
// Works in Chrome, Edge, Firefox. Voices depend on OS/browser.
// ─────────────────────────────────────────────────────────────────
function speakWebSpeech(text, v) {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error('Web Speech API ප්‍රතිල Browser එක  support නල්ල'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Voice picker — tries si-LK, then any Sinhala, then any available
    const pickVoice = () => {
      const all = window.speechSynthesis.getVoices();
      if (!all.length) return null;
      const gender = v.gender;

      // 1. Exact si-LK match with gender hint
      let pick = all.find(x =>
        (x.lang === 'si-LK' || x.lang === 'si') &&
        (gender === 'female' ? /female|woman|girl/i.test(x.name) : gender === 'male' ? /male|man/i.test(x.name) : true)
      );
      // 2. Any si-LK
      if (!pick) pick = all.find(x => x.lang === 'si-LK' || x.lang === 'si' || x.lang.startsWith('si'));
      // 3. Any voice (last resort)
      if (!pick) pick = all[0];
      return pick;
    };

    const buildAndSpeak = () => {
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang   = 'si-LK';
      utt.rate   = Math.max(0.1, Math.min(10, state.speed));
      // Apply gender pitch modifier on top of user pitch
      const genderPitch = v.pitchMod || 1.0;
      utt.pitch  = Math.max(0, Math.min(2, genderPitch + (state.pitch / 40)));
      utt.volume = state.volume / 100;

      const chosen = pickVoice();
      if (chosen) {
        utt.voice = chosen;
        utt.lang  = chosen.lang; // match lang to chosen voice
      }

      const voiceLabel = chosen ? chosen.name : 'Default';
      setTTSStatus(`කතා කරන්න... (${voiceLabel})`, 'speaking');
      showTTSIdleViz(false);
      startFakeTTSViz(v.color);

      utt.onend = () => {
        setTTSSpeaking(false); stopFakeTTSViz(); showTTSIdleViz(true);
        setTTSStatus('Done! ✓', 'ready'); resolve();
      };
      utt.onerror = e => {
        // 'interrupted' is not a real error — ignore it
        if (e.error === 'interrupted' || e.error === 'canceled') { resolve(); return; }
        setTTSSpeaking(false); stopFakeTTSViz(); showTTSIdleViz(true);
        reject(new Error('Browser speech error: ' + e.error));
      };

      window.speechSynthesis.speak(utt);
    };

    // Voices may not be ready immediately — wait for them
    if (window.speechSynthesis.getVoices().length > 0) {
      buildAndSpeak();
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', buildAndSpeak, { once: true });
      // Safety timeout in case voiceschanged never fires
      setTimeout(() => buildAndSpeak(), 500);
    }
  });
}

async function playTTSBlob(blob, v) {
  const player = document.getElementById('audioPlayer');
  player.src = URL.createObjectURL(blob);
  setTTSStatus(`Playing: ${v.name} (${v.nameEn})...`, 'speaking');
  
  // Now actually playing, so update the preview button
  setVoicePreviewState(v.id, 'playing');
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') await audioCtx.resume();
    
    if (!ttsAnalyser) {
        ttsAnalyser = audioCtx.createAnalyser(); 
        ttsAnalyser.fftSize = 256;
    }
    
    if (!ttsSource) {
        ttsSource = audioCtx.createMediaElementSource(player);
    }
    
    ttsSource.disconnect();
    ttsSource.connect(ttsAnalyser); 
    ttsAnalyser.connect(audioCtx.destination);
    
    showTTSIdleViz(false); startTTSViz(v.color);
  } catch(e) { 
    console.error("Audio Routing Error:", e);
    startFakeTTSViz(v.color); 
    showTTSIdleViz(false); 
  }

  return new Promise((resolve, reject) => {
    player.onended = () => { 
      setTTSSpeaking(false); stopTTSViz(); showTTSIdleViz(true); 
      setTTSStatus('Done! ✓', 'ready'); 
      showTTSProgress(false);
      resolve(); 
    };
    player.onerror = () => { 
      setTTSSpeaking(false); stopTTSViz(); showTTSIdleViz(true); 
      showTTSProgress(false);
      reject(new Error('Playback error')); 
    };
    player.volume = state.volume / 100;
    player.play().catch(reject);
  });
}

function stopTTS() {
  const p = document.getElementById('audioPlayer');
  p.pause(); p.src = '';
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  stopTTSViz(); stopFakeTTSViz(); showTTSIdleViz(true);
  setTTSSpeaking(false); setTTSStatus('Stopped', 'ready');
  showTTSProgress(false);
}

async function downloadTTSAudio() {
  if (!state.ttsAudioBlob) {
    showToast('⚠ කරුණාකර පළමුව Play Button එක ඔබන්න!');
    return;
  }
  const v = TTS_VOICES.find(x => x.id === state.selectedVoiceId);
  downloadBlob(state.ttsAudioBlob, `VoiceChangerStudio_${v.nameEn}_${Date.now()}.wav`);
  showToast('✓ Downloaded successfully!');
}

// ═══════════════════════════════════════════════════════════
//  TTS — VISUALIZER
// ═══════════════════════════════════════════════════════════
function initTTSVisualizer() {
  const canvas = document.getElementById('ttsVisualizer');
  if (!canvas) return;
  const resize = () => {
    const r = canvas.parentElement.getBoundingClientRect();
    canvas.width  = r.width  * (window.devicePixelRatio || 1);
    canvas.height = r.height * (window.devicePixelRatio || 1);
  };
  resize(); window.addEventListener('resize', resize);
}

function startTTSViz(color) {
  if (ttsVizId) cancelAnimationFrame(ttsVizId);
  const canvas = document.getElementById('ttsVisualizer');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  function draw() {
    if (!ttsAnalyser) return;
    const data = new Uint8Array(ttsAnalyser.frequencyBinCount);
    ttsAnalyser.getByteFrequencyData(data);
    const W = canvas.width / dpr, H = canvas.height / dpr;
    ctx.clearRect(0, 0, W, H);
    const bars = 64, bw = (W / bars) - 1.5;
    for (let i = 0; i < bars; i++) {
      const val = data[Math.floor(i * data.length / bars)] / 255;
      const bh = Math.max(2, val * (H - 6));
      const y = H - bh;
      const g = ctx.createLinearGradient(0, y, 0, H);
      g.addColorStop(0, color + 'ff'); g.addColorStop(1, color + '22');
      ctx.fillStyle = g;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(i * (bw + 1.5) + 2, y, bw, bh, 3);
      else ctx.rect(i * (bw + 1.5) + 2, y, bw, bh);
      ctx.fill();
    }
    ttsVizId = requestAnimationFrame(draw);
  }
  draw();
}

function stopTTSViz() {
  if (ttsVizId) { cancelAnimationFrame(ttsVizId); ttsVizId = null; }
  const c = document.getElementById('ttsVisualizer');
  if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
}

function startFakeTTSViz(color = '#8B5CF6') {
  stopFakeTTSViz();
  const canvas = document.getElementById('ttsVisualizer');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  let t = 0;
  fakeTtsVizId = setInterval(() => {
    const W = canvas.width / dpr, H = canvas.height / dpr;
    ctx.clearRect(0, 0, W, H);
    const bars = 64, bw = (W / bars) - 1.5;
    for (let i = 0; i < bars; i++) {
      const val = 0.15 + 0.65 * Math.abs(Math.sin(t + i * 0.28) * Math.cos(t * 0.6 + i * 0.12));
      const bh = Math.max(2, val * (H - 6));
      const g = ctx.createLinearGradient(0, H - bh, 0, H);
      g.addColorStop(0, color + 'ee'); g.addColorStop(1, color + '22');
      ctx.fillStyle = g;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(i * (bw + 1.5) + 2, H - bh, bw, bh, 3);
      else ctx.rect(i * (bw + 1.5) + 2, H - bh, bw, bh);
      ctx.fill();
    }
    t += 0.09;
  }, 45);
}

function stopFakeTTSViz() {
  if (fakeTtsVizId) { clearInterval(fakeTtsVizId); fakeTtsVizId = null; }
  const c = document.getElementById('ttsVisualizer');
  if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
}

function showTTSIdleViz(show) {
  const el = document.getElementById('ttsVizIdle');
  if (el) el.style.display = show ? 'flex' : 'none';
}

// ═══════════════════════════════════════════════════════════
//  TTS — UI HELPERS
// ═══════════════════════════════════════════════════════════
function setTTSStatus(text, type = 'ready') {
  const dot = document.getElementById('ttsStatusDot');
  const txt = document.getElementById('ttsStatusText');
  if (txt) txt.textContent = text;
  if (dot) { dot.className = 'status-dot'; if (type !== 'ready') dot.classList.add(type); }
}

function setVoicePreviewState(id, stateStr) {
  const allSampleBtns = document.querySelectorAll('.vc-btn.preview-btn');
  allSampleBtns.forEach(b => {
    b.classList.remove('playing');
    b.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Preview';
  });
  
  if (id && stateStr) {
    const activeBtn = document.querySelector(`.vc-btn.preview-btn[data-id="${id}"]`);
    if (activeBtn) {
      activeBtn.classList.add('playing');
      if (stateStr === 'loading') {
        activeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-dasharray="31.4 31.4" stroke-dashoffset="0"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg> Connecting...';
      } else if (stateStr === 'playing') {
        activeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Playing...';
      }
    }
  }
}

function setTTSSpeaking(speaking) {
  state.ttsPlaying = speaking;
  const btn = document.getElementById('speakBtn');
  const btxt = document.getElementById('speakBtnText');
  const stop = document.getElementById('stopBtn');
  if (btn) btn.classList.toggle('speaking', speaking);
  if (btxt) btxt.textContent = speaking ? 'Generating...' : 'Convert';
  if (stop) stop.disabled = !speaking;
  
  if (!speaking) {
    setVoicePreviewState(null, null);
  }
}

// ═══════════════════════════════════════════════════════════
//  VOICE CHANGER — PRESET RENDERING
// ═══════════════════════════════════════════════════════════
function renderPresetGrid() {
  const grid = document.getElementById('presetGrid');
  if (!grid) return;
  grid.innerHTML = '';
  VC_PRESETS.forEach(p => {
    const item = document.createElement('div');
    item.className = 'preset-item' + (p.id === state.selectedPresetId ? ' selected' : '');
    item.innerHTML = `
      <span class="preset-emoji">${p.emoji}</span>
      <span class="preset-name">${p.name}</span>
      <span class="preset-sub">${p.sub}</span>`;
    item.style.setProperty('--pc', p.color);
    item.addEventListener('click', () => {
      state.selectedPresetId = p.id;
      document.querySelectorAll('.preset-item').forEach(x => x.classList.remove('selected'));
      item.classList.add('selected');
      item.style.borderColor = p.color;
      item.style.boxShadow = `0 0 0 2px ${p.color}44`;
      // Sync fine controls with preset
      const vcP = document.getElementById('vcPitchSlider');
      const vcR = document.getElementById('vcReverbSlider');
      const vcD = document.getElementById('vcDistortionSlider');
      vcP.value = 0; document.getElementById('vcPitchVal').textContent = '0 st'; updateSliderFill(vcP);
      vcR.value = p.reverb; document.getElementById('vcReverbVal').textContent = Math.round(p.reverb * 100) + '%'; updateSliderFill(vcR);
      vcD.value = p.distortion; document.getElementById('vcDistortionVal').textContent = Math.round(p.distortion * 100) + '%'; updateSliderFill(vcD);
      setVCStatus(`Preset: ${p.name} (${p.sub}) selected`, 'ready');
    });
    item.addEventListener('mouseenter', () => { item.style.borderColor = p.color; item.style.boxShadow = `0 4px 20px ${p.color}33`; });
    item.addEventListener('mouseleave', () => {
      if (p.id !== state.selectedPresetId) { item.style.borderColor = ''; item.style.boxShadow = ''; }
    });
    grid.appendChild(item);
  });
}

// ═══════════════════════════════════════════════════════════
//  VOICE CHANGER — CONTROLS
// ═══════════════════════════════════════════════════════════
function setupVCControls() {
  // Mode tabs
  document.getElementById('modeRecord').addEventListener('click', () => setInputMode('record'));
  document.getElementById('modeUpload').addEventListener('click', () => setInputMode('upload'));

  // Record
  document.getElementById('recordBtn').addEventListener('click', toggleRecording);
  document.getElementById('recStopBtn').addEventListener('click', stopRecording);

  // Upload
  document.getElementById('dropzone').addEventListener('click', () => document.getElementById('audioUpload').click());
  document.getElementById('dropzone').addEventListener('dragover', e => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); });
  document.getElementById('dropzone').addEventListener('dragleave', e => e.currentTarget.classList.remove('drag-over'));
  document.getElementById('dropzone').addEventListener('drop', e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); handleAudioFile(e.dataTransfer.files[0]); });
  document.getElementById('audioUpload').addEventListener('change', e => handleAudioFile(e.target.files[0]));
  document.getElementById('clearUploadBtn').addEventListener('click', clearUpload);

  // Waveform tabs
  document.querySelectorAll('.wf-tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.wf-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      state.currentWfView = t.dataset.wf;
      drawWaveform();
    });
  });

  // Playback
  document.getElementById('playOriginalBtn').addEventListener('click', () => playVCAudio('original'));
  document.getElementById('playProcessedBtn').addEventListener('click', () => playVCAudio('processed'));
  document.getElementById('vcDownloadBtn').addEventListener('click', downloadVCAudio);

  // Fine controls
  const vcp = document.getElementById('vcPitchSlider');
  const vcr = document.getElementById('vcReverbSlider');
  const vcd = document.getElementById('vcDistortionSlider');
  vcp.addEventListener('input', () => { state.vcPitch = parseFloat(vcp.value); document.getElementById('vcPitchVal').textContent = state.vcPitch + ' st'; updateSliderFill(vcp); });
  vcr.addEventListener('input', () => { state.vcReverb = parseFloat(vcr.value); document.getElementById('vcReverbVal').textContent = Math.round(state.vcReverb * 100) + '%'; updateSliderFill(vcr); });
  vcd.addEventListener('input', () => { state.vcDistortion = parseFloat(vcd.value); document.getElementById('vcDistortionVal').textContent = Math.round(state.vcDistortion * 100) + '%'; updateSliderFill(vcd); });
  [vcp, vcr, vcd].forEach(updateSliderFill);

  // Convert
  document.getElementById('convertBtn').addEventListener('click', convertVoice);
}

function setInputMode(mode) {
  state.inputMode = mode;
  document.getElementById('modeRecord').classList.toggle('active', mode === 'record');
  document.getElementById('modeUpload').classList.toggle('active', mode === 'upload');
  document.getElementById('recordMode').classList.toggle('hidden', mode !== 'record');
  document.getElementById('uploadMode').classList.toggle('hidden', mode !== 'upload');
}

// ═══════════════════════════════════════════════════════════
//  VOICE CHANGER — RECORDING
// ═══════════════════════════════════════════════════════════
async function toggleRecording() {
  if (state.isRecording) { stopRecording(); return; }
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 44100, channelCount: 1, echoCancellation: true, noiseSuppression: true } });
    state.audioChunks = [];
    state.mediaRecorder = new MediaRecorder(micStream, { mimeType: getSupportedMimeType() });
    state.mediaRecorder.ondataavailable = e => { if (e.data.size > 0) state.audioChunks.push(e.data); };
    state.mediaRecorder.onstop = processRecordedAudio;
    state.mediaRecorder.start(100);
    state.isRecording = true;
    state.recSeconds = 0;
    startRecTimer();
    startMicViz();
    document.getElementById('recordBtn').classList.add('recording');
    document.getElementById('recordBtn').innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><circle cx="12" cy="12" r="6"/></svg> Recording...`;
    document.getElementById('recStopBtn').disabled = false;
    document.getElementById('recStatus').textContent = '🔴 Recording... Speak now!';
    document.getElementById('micRing').classList.add('active');
    setVCStatus('Recording...', 'speaking');
  } catch(err) {
    showToast('❌ Microphone access denied');
    setVCStatus('Mic access failed: ' + err.message, 'error');
  }
}

function stopRecording() {
  if (!state.isRecording) return;
  state.isRecording = false;
  if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') state.mediaRecorder.stop();
  if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
  clearInterval(state.recTimer); state.recTimer = null;
  stopMicViz();
  document.getElementById('recordBtn').classList.remove('recording');
  document.getElementById('recordBtn').innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><circle cx="12" cy="12" r="6"/></svg> Record`;
  document.getElementById('recStopBtn').disabled = true;
  document.getElementById('recStatus').textContent = 'Processing recording...';
  document.getElementById('micRing').classList.remove('active');
}

function processRecordedAudio() {
  if (state.audioChunks.length === 0) { setVCStatus('No audio recorded', 'error'); return; }
  const blob = new Blob(state.audioChunks, { type: getSupportedMimeType() });
  state.inputAudioBlob = blob;
  decodeAudioBlob(blob).then(buffer => {
    state.inputAudioBuffer = buffer;
    state.processedAudioBuffer = null; state.processedAudioBlob = null;
    document.getElementById('recStatus').textContent = `✓ ${formatDuration(buffer.duration)} recorded`;
    enableVCPlayback();
    drawWaveform();
    setVCStatus(`✓ Recorded ${formatDuration(buffer.duration)} — Preset select කර Convert click!`, 'ready');
    showToast(`✓ ${formatDuration(buffer.duration)} recorded!`);
    document.getElementById('convertBtn').disabled = false;
  }).catch(err => { setVCStatus('Audio decode failed: ' + err.message, 'error'); });
}

function startRecTimer() {
  state.recTimer = setInterval(() => {
    state.recSeconds++;
    document.getElementById('recTimer').textContent = formatDuration(state.recSeconds);
    if (state.recSeconds >= 120) stopRecording();
  }, 1000);
}

// ═══════════════════════════════════════════════════════════
//  VOICE CHANGER — UPLOAD
// ═══════════════════════════════════════════════════════════
function handleAudioFile(file) {
  if (!file || !file.type.startsWith('audio/')) { showToast('❌ Audio file select කරන්න'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const blob = new Blob([e.target.result], { type: file.type });
    state.inputAudioBlob = blob;
    decodeAudioBlob(blob).then(buffer => {
      state.inputAudioBuffer = buffer;
      state.processedAudioBuffer = null; state.processedAudioBlob = null;
      document.getElementById('uploadInfo').style.display = 'flex';
      document.getElementById('uploadFileName').textContent = file.name;
      document.getElementById('uploadDuration').textContent = formatDuration(buffer.duration);
      enableVCPlayback();
      drawWaveform();
      setVCStatus(`✓ Loaded: ${file.name} (${formatDuration(buffer.duration)}) — Convert click!`, 'ready');
      document.getElementById('convertBtn').disabled = false;
      showToast(`✓ ${file.name} loaded!`);
    }).catch(() => { showToast('❌ Audio decode failed'); });
  };
  reader.readAsArrayBuffer(file);
}

function clearUpload() {
  state.inputAudioBlob = null; state.inputAudioBuffer = null;
  state.processedAudioBuffer = null; state.processedAudioBlob = null;
  document.getElementById('uploadInfo').style.display = 'none';
  document.getElementById('audioUpload').value = '';
  document.getElementById('convertBtn').disabled = true;
  disableVCPlayback(); clearWaveform();
  setVCStatus('Record or upload audio to start', 'ready');
}

// ═══════════════════════════════════════════════════════════
//  VOICE CHANGER — AUDIO PROCESSING
// ═══════════════════════════════════════════════════════════
async function convertVoice() {
  if (!state.inputAudioBuffer) { showToast('⚠ Record or upload audio first!'); return; }
  const preset = VC_PRESETS.find(p => p.id === state.selectedPresetId);
  if (!preset) return;

  document.getElementById('convertBtn').disabled = true;
  document.getElementById('convertBtn').classList.add('processing');
  document.getElementById('convertProgress').style.display = 'flex';
  setProgress(0, 'Starting conversion...');
  setVCStatus('Processing voice...', 'loading');

  // Check if it's a realistic voice that needs AI (HuggingFace)
  const aiPresets = ['female', 'female-soft', 'female-bright', 'male-deep'];
  if (aiPresets.includes(preset.id)) {
    try {
      setProgress(20, 'Connecting to HuggingFace AI Engine...');
      if (!gradioClient) {
        const module = await import('https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js');
        gradioClient = module.Client;
      }
      
      // Connect to a public RVC space (or fallback to user-provided space)
      const app = await gradioClient.connect("r3gm/RVC_space"); 
      
      setProgress(50, 'Applying RMVPE Neural Voice Conversion...');
      
      // Convert current input to WAV blob if not already
      let audioBlob = state.inputAudioBlob;
      if (!audioBlob) {
        audioBlob = audioBufferToWav(state.inputAudioBuffer);
      }
      const audioFile = new File([audioBlob], "input.wav", { type: "audio/wav" });
      
      // Pitch shift: Female (+12), Male (-12)
      const pitchShift = preset.id.includes('female') ? 12 : -12;
      
      // Note: Space endpoints vary. This is a generic RVC /predict signature
      const result = await app.predict("/predict", [		
        audioFile, // audio input
        pitchShift, // pitch modification
        "rmvpe", // f0 extraction method (rmvpe is much more realistic than pm)
      ]);
      
      setProgress(85, 'Downloading Neural Audio...');
      if (result && result.data && result.data[0]) {
        let audioUrl = typeof result.data[0] === 'string' ? result.data[0] : result.data[0].url;
        const audioResponse = await fetch(audioUrl);
        if (!audioResponse.ok) throw new Error("Failed to fetch audio from HF");
        
        const wavBlob = await audioResponse.blob();
        state.processedAudioBlob = wavBlob;
        state.processedAudioBuffer = await decodeAudioBlob(wavBlob);
        
        finalizeVCConversion(preset);
        return; // Success!
      } else {
        throw new Error("Invalid response from HuggingFace space");
      }
    } catch (apiError) {
      console.warn("HuggingFace API failed or rate-limited. Falling back to local offline processing:", apiError);
      showToast('⚠ AI server busy (HuggingFace). Using local offline fallback.');
      setProgress(20, 'AI busy. Starting local fallback...');
      // Fallback to local processing if API fails (common with free HF spaces)
      await convertVoiceLocal(preset);
    }
  } else {
    // For non-realistic presets (Robot, Echo, Alien), use local offline processing instantly
    await convertVoiceLocal(preset);
  }
}

function finalizeVCConversion(preset) {
  // Auto-switch waveform to processed
  state.currentWfView = 'processed';
  document.querySelectorAll('.wf-tab').forEach(t => t.classList.toggle('active', t.dataset.wf === 'processed'));
  drawWaveform();
  enableVCPlayback();
  document.getElementById('vcDownloadBtn').disabled = false;

  setProgress(100, 'Done!');
  setVCStatus(`✓ Voice transformed! (${preset.name} — ${preset.sub})`, 'ready');
  showToast(`✓ ${preset.name} voice ready!`);

  setTimeout(() => {
    document.getElementById('convertProgress').style.display = 'none';
    document.getElementById('convertBtn').disabled = false;
    document.getElementById('convertBtn').classList.remove('processing');
  }, 1200);
}

async function convertVoiceLocal(preset) {
  try {
    setProgress(15, 'Preparing local audio pipeline...');
    const inputBuf = state.inputAudioBuffer;
    const sampleRate = inputBuf.sampleRate;

    // Build effective preset with fine control overrides
    const effectivePlaybackRate = preset.playbackRate;
    const effectiveReverb       = Math.min(1, preset.reverb + state.vcReverb);
    const effectiveDistortion   = Math.min(1, preset.distortion + state.vcDistortion);
    const semitoneRate = Math.pow(2, state.vcPitch / 12);
    const finalPlaybackRate = effectivePlaybackRate * semitoneRate;

    const outputDuration = inputBuf.duration / finalPlaybackRate;
    const numChannels    = inputBuf.numberOfChannels;

    setProgress(25, 'Creating offline audio context...');
    const offCtx = new OfflineAudioContext(
      numChannels,
      Math.ceil(outputDuration * sampleRate + sampleRate * (effectiveReverb > 0 ? 3 : 0.5)), 
      sampleRate
    );

    const src = offCtx.createBufferSource();
    src.buffer = inputBuf;
    src.playbackRate.value = finalPlaybackRate;

    setProgress(40, 'Building effects chain...');
    let lastNode = src;

    const filters = preset.filters;
    for (const f of filters) {
      const filter = offCtx.createBiquadFilter();
      filter.type      = f.type;
      filter.frequency.value = f.frequency;
      filter.Q.value   = f.Q || 1;
      filter.gain.value = f.gain || 0;
      lastNode.connect(filter);
      lastNode = filter;
    }

    setProgress(55, 'Applying distortion/warmth...');
    if (effectiveDistortion > 0.02) {
      const wv = offCtx.createWaveShaper();
      wv.curve = makeDistortionCurve(effectiveDistortion * 350);
      wv.oversample = '4x';
      lastNode.connect(wv);
      lastNode = wv;
      const lpf = offCtx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.value = 5000;
      lastNode.connect(lpf);
      lastNode = lpf;
    }

    setProgress(68, 'Adding reverb...');
    if (effectiveReverb > 0.05) {
      const convolver = offCtx.createConvolver();
      convolver.buffer = createImpulseResponse(offCtx, effectiveReverb);
      const dryGain = offCtx.createGain();
      const wetGain = offCtx.createGain();
      dryGain.gain.value = 1 - effectiveReverb * 0.6;
      wetGain.gain.value = effectiveReverb * 0.8;
      lastNode.connect(dryGain);
      lastNode.connect(convolver);
      convolver.connect(wetGain);
      const merger = offCtx.createGain();
      dryGain.connect(merger);
      wetGain.connect(merger);
      lastNode = merger;
    }

    setProgress(80, 'Compressing and normalizing...');
    const comp = offCtx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value      = 6;
    comp.ratio.value     = 4;
    comp.attack.value    = 0.003;
    comp.release.value   = 0.25;
    lastNode.connect(comp);
    comp.connect(offCtx.destination);

    src.start(0);

    setProgress(88, 'Rendering audio...');
    const renderedBuffer = await offCtx.startRendering();

    setProgress(95, 'Encoding to WAV...');
    const wavBlob = audioBufferToWav(renderedBuffer);
    state.processedAudioBuffer = renderedBuffer;
    state.processedAudioBlob   = wavBlob;

    finalizeVCConversion(preset);

  } catch(err) {
    console.error('Voice conversion error:', err);
    document.getElementById('convertProgress').style.display = 'none';
    document.getElementById('convertBtn').disabled = false;
    document.getElementById('convertBtn').classList.remove('processing');
    setVCStatus('Conversion failed: ' + err.message, 'error');
    showToast('❌ Conversion failed: ' + err.message);
  }
}

// ═══════════════════════════════════════════════════════════
//  AUDIO PROCESSING UTILITIES
// ═══════════════════════════════════════════════════════════
function makeDistortionCurve(amount) {
  const n = 256, curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

function createImpulseResponse(ctx, decay) {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * (0.5 + decay * 3.5));
  const buf = ctx.createBuffer(2, length, sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 1.5 + decay * 2);
    }
  }
  return buf;
}

async function decodeAudioBlob(blob) {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const arrayBuf = await blob.arrayBuffer();
  return await audioCtx.decodeAudioData(arrayBuf);
}

function getSupportedMimeType() {
  const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
  return types.find(t => MediaRecorder.isTypeSupported(t)) || '';
}

function audioBufferToWav(buffer) {
  const numCh = buffer.numberOfChannels, sr = buffer.sampleRate;
  const bps = 2, ba = numCh * bps;
  const channels = Array.from({ length: numCh }, (_, i) => buffer.getChannelData(i));
  const len = channels[0].length;
  const interleaved = numCh === 1 ? channels[0] : (() => {
    const arr = new Float32Array(len * 2);
    for (let i = 0; i < len; i++) { arr[i*2] = channels[0][i]; arr[i*2+1] = channels[1][i]; }
    return arr;
  })();
  const dataLen = interleaved.length * bps;
  const ab = new ArrayBuffer(44 + dataLen);
  const view = new DataView(ab);
  const ws = (o, s) => { for (let i = 0; i < s.length; i++) view.setUint8(o+i, s.charCodeAt(i)); };
  ws(0,'RIFF'); view.setUint32(4,36+dataLen,true); ws(8,'WAVE'); ws(12,'fmt ');
  view.setUint32(16,16,true); view.setUint16(20,1,true); view.setUint16(22,numCh,true);
  view.setUint32(24,sr,true); view.setUint32(28,sr*ba,true);
  view.setUint16(32,ba,true); view.setUint16(34,16,true);
  ws(36,'data'); view.setUint32(40,dataLen,true);
  let off = 44;
  for (let i = 0; i < interleaved.length; i++) {
    const s = Math.max(-1, Math.min(1, interleaved[i]));
    view.setInt16(off, s < 0 ? s*32768 : s*32767, true);
    off += 2;
  }
  return new Blob([ab], { type: 'audio/wav' });
}

// ═══════════════════════════════════════════════════════════
//  VOICE CHANGER — PLAYBACK
// ═══════════════════════════════════════════════════════════
function enableVCPlayback() {
  document.getElementById('playOriginalBtn').disabled   = !state.inputAudioBuffer;
  document.getElementById('playProcessedBtn').disabled  = !state.processedAudioBlob;
}

function disableVCPlayback() {
  document.getElementById('playOriginalBtn').disabled   = true;
  document.getElementById('playProcessedBtn').disabled  = true;
  document.getElementById('vcDownloadBtn').disabled     = true;
}

async function playVCAudio(which) {
  const player = document.getElementById('vcAudioPlayer');
  player.pause();
  let blob = which === 'original' ? state.inputAudioBlob : state.processedAudioBlob;
  if (!blob) { showToast(which === 'processed' ? '⚠ Convert first!' : '⚠ No audio'); return; }
  player.src = URL.createObjectURL(blob);
  player.play();
  setVCStatus(`Playing ${which} audio...`, 'speaking');
  player.onended = () => setVCStatus('Playback done', 'ready');
}

function downloadVCAudio() {
  if (!state.processedAudioBlob) { showToast('⚠ Convert voice first!'); return; }
  const preset = VC_PRESETS.find(p => p.id === state.selectedPresetId);
  downloadBlob(state.processedAudioBlob, `rl_voice_${preset?.nameEn || preset?.id}_${Date.now()}.wav`);
  showToast('✓ Downloaded!');
}

// ═══════════════════════════════════════════════════════════
//  WAVEFORM DRAWING
// ═══════════════════════════════════════════════════════════
function drawWaveform() {
  const canvas = document.getElementById('waveformCanvas');
  const empty  = document.getElementById('wfEmpty');
  const buf = state.currentWfView === 'processed' ? state.processedAudioBuffer : state.inputAudioBuffer;
  if (!buf) { if (empty) empty.style.display = 'flex'; return; }
  if (empty) empty.style.display = 'none';

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const W   = canvas.parentElement.offsetWidth;
  const H   = canvas.parentElement.offsetHeight || 110;
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  const data = buf.getChannelData(0);
  const step = Math.floor(data.length / W);
  const mid  = H / 2;

  const preset = VC_PRESETS.find(p => p.id === state.selectedPresetId);
  const color = state.currentWfView === 'processed' ? (preset?.color || '#06B6D4') : '#8B5CF6';

  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x < W; x++) {
    let max = 0;
    for (let j = 0; j < step; j++) { const v = Math.abs(data[x * step + j] || 0); if (v > max) max = v; }
    const h = max * (mid - 4);
    ctx.moveTo(x, mid - h);
    ctx.lineTo(x, mid + h);
  }
  ctx.stroke();

  // Gradient overlay
  const grd = ctx.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, color + '33');
  grd.addColorStop(0.5, color + '11');
  grd.addColorStop(1, color + '33');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);
}

function clearWaveform() {
  const canvas = document.getElementById('waveformCanvas');
  if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  const empty = document.getElementById('wfEmpty');
  if (empty) empty.style.display = 'flex';
}

// ═══════════════════════════════════════════════════════════
//  MIC VISUALIZER
// ═══════════════════════════════════════════════════════════
function startMicViz() {
  if (!micStream) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  micAnalyser = audioCtx.createAnalyser();
  micAnalyser.fftSize = 256;
  const src = audioCtx.createMediaStreamSource(micStream);
  src.connect(micAnalyser);

  const canvas = document.getElementById('micCanvas');
  if (!canvas) return;
  canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
  canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  function draw() {
    if (!state.isRecording) return;
    const data = new Uint8Array(micAnalyser.frequencyBinCount);
    micAnalyser.getByteTimeDomainData(data);
    const W = canvas.width / dpr, H = canvas.height / dpr;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = '#F43F5E';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = (i / data.length) * W;
      const y = ((data[i] / 128) - 1) * (H / 2) + H / 2;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    micVizId = requestAnimationFrame(draw);
  }
  draw();
}

function stopMicViz() {
  if (micVizId) { cancelAnimationFrame(micVizId); micVizId = null; }
  const c = document.getElementById('micCanvas');
  if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
  if (micAnalyser) { micAnalyser.disconnect(); micAnalyser = null; }
}

// ═══════════════════════════════════════════════════════════
//  VC UI HELPERS
// ═══════════════════════════════════════════════════════════
function setVCStatus(text, type = 'ready') {
  const dot = document.getElementById('vcStatusDot');
  const txt = document.getElementById('vcStatusText');
  if (txt) txt.textContent = text;
  if (dot) { dot.className = 'status-dot'; if (type !== 'ready') dot.classList.add(type); }
}

function setProgress(pct, text) {
  const fill = document.getElementById('progressFill');
  const txt  = document.getElementById('progressText');
  const pctEl = document.getElementById('convertPct');
  if (fill) fill.style.width = pct + '%';
  if (txt)  txt.textContent  = text;
  if (pctEl) pctEl.textContent = Math.round(pct) + '%';
}

// ═══════════════════════════════════════════════════════════
//  PARTICLE SYSTEM
// ═══════════════════════════════════════════════════════════
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize(); window.addEventListener('resize', resize);

  const sinChars = ['ස','ි','ං','හ','ල','ා','ේ','ෝ','ු','ූ','ක','ර','ව','ත','ද','ම','න','ප','ශ','ධ'];
  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    char: sinChars[Math.floor(Math.random() * sinChars.length)],
    size: 12 + Math.random() * 22,
    speed: 0.18 + Math.random() * 0.42,
    opacity: 0.04 + Math.random() * 0.12,
    drift: (Math.random() - 0.5) * 0.25
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.font = `${p.size}px "Noto Sans Sinhala"`;
      ctx.fillStyle = `rgba(139,92,246,${p.opacity})`;
      ctx.fillText(p.char, p.x, p.y);
      p.y -= p.speed; p.x += p.drift;
      p.opacity += (Math.random() - 0.5) * 0.004;
      p.opacity = Math.max(0.02, Math.min(0.18, p.opacity));
      if (p.y < -40) { p.y = canvas.height + 40; p.x = Math.random() * canvas.width; }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ═══════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════
function escapeXml(t) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}

function formatDuration(sec) {
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const text  = document.getElementById('toastText');
  if (text) text.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ═══════════════════════════════════════════════════════════
//  TTS PROGRESS OVERLAY
// ═══════════════════════════════════════════════════════════
let ttsProgressInterval = null;
let ttsProgressTimeLeft = 0;

function showTTSProgress(show, label, pct, estimatedTime = null) {
  const overlay = document.getElementById('ttsProgressOverlay');
  if (!overlay) return;
  
  clearInterval(ttsProgressInterval);
  const timeEl = document.getElementById('ttsProgressTime');
  
  if (!show) {
    overlay.style.display = 'none';
    if(timeEl) timeEl.style.display = 'none';
    return;
  }
  
  overlay.style.display = 'flex';
  const pctEl = document.getElementById('ttsProgressPct');
  const labelEl = document.getElementById('ttsProgressLabel');
  const ring = document.getElementById('ttsProgressRing');
  
  const circumference = 2 * Math.PI * 38; // r=38
  
  if (pctEl) pctEl.textContent = Math.round(pct || 0) + '%';
  if (labelEl) labelEl.textContent = label || 'Processing...';
  if (ring) {
    const offset = circumference - (circumference * (pct || 0) / 100);
    ring.style.strokeDashoffset = offset;
  }
  
  if (estimatedTime && timeEl) {
    timeEl.style.display = 'block';
    ttsProgressTimeLeft = estimatedTime;
    timeEl.textContent = `Estimated time: ${ttsProgressTimeLeft}s`;
    
    let currentPct = pct || 0;
    const targetPct = 95;
    const step = (targetPct - currentPct) / estimatedTime;
    
    ttsProgressInterval = setInterval(() => {
      ttsProgressTimeLeft--;
      if (ttsProgressTimeLeft <= 0) {
        timeEl.textContent = `Almost done, finalizing audio...`;
        clearInterval(ttsProgressInterval);
      } else {
        timeEl.textContent = `Estimated time: ${ttsProgressTimeLeft}s`;
        currentPct = Math.min(98, currentPct + step);
        if (pctEl) pctEl.textContent = Math.round(currentPct) + '%';
        if (ring) {
            const offset = circumference - (circumference * currentPct / 100);
            ring.style.strokeDashoffset = offset;
        }
      }
    }, 1000);
  } else if (timeEl) {
    timeEl.style.display = 'none';
  }
}

// ═══════════════════════════════════════════════════════════
//  BUTTON RIPPLE EFFECT
// ═══════════════════════════════════════════════════════════
function initRippleEffects() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-ripple');
    if (!btn) return;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    
    // Also add bounce class
    btn.classList.add('btn-clicked');
    
    setTimeout(() => {
      ripple.remove();
      btn.classList.remove('btn-clicked');
    }, 600);
  });
}

// ═══════════════════════════════════════════════════════════
//  MOBILE MENU
// ═══════════════════════════════════════════════════════════
function closeMobileMenu() {
  const hbg = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (hbg) hbg.setAttribute('aria-expanded', 'false');
  if (menu) menu.classList.remove('open');
}

// Init ripple effects on load
document.addEventListener('DOMContentLoaded', () => {
  initRippleEffects();
});
