(() => {
  'use strict';

  // --- Full Audio Manifest (maps every voice ID to audio/<id>.mp3|.wav + en-US fallback text) ---
  const AUDIO_MANIFEST = {
    cover_welcome: "Peek-a-boo! Heavy machines! Let's play!",
    door_knock: 'Knock, knock! Who is inside?',
    door_open: 'Knock, knock! Peek-a-boo!',
    bd_peekaboo: 'Peek-a-boo! Big yellow bulldozer!',
    bd_tap_1: 'Rumble-rumble! Big yellow bulldozer!',
    bd_tap_2: 'Beep-beep! Watch out!',
    bd_tap_3: 'Push, push, push! So strong!',
    bd_tap_4: 'Yay! Go, bulldozer, go!',
    bd_choice_rock: 'Push the big rock! Crunch, push, push!',
    bd_choice_jelly: 'Push the bouncy jelly! Boing, wiggle, giggle!',
    ex_peekaboo: 'Peek-a-boo! Cute orange excavator!',
    ex_tap_1: 'Dig, dig, scoop! Big orange excavator!',
    ex_tap_2: 'Turn around! Swish, swish, swish!',
    ex_tap_3: 'Beep-beep! Ready to dig!',
    ex_tap_4: 'Yay! Go, excavator, go!',
    ex_choice_sand: 'Scoop the golden sand! Dig, dig, hooray!',
    ex_choice_duck: 'Surprise! A little yellow duck! Quack, quack!',
    dt_peekaboo: 'Peek-a-boo! Strong blue dump truck!',
    dt_tap_1: 'Tip and dump! Whoosh goes the sand!',
    dt_tap_2: 'Honk-honk! Big blue dump truck!',
    dt_tap_3: 'Vroom-vroom! Carry the rocks!',
    dt_tap_4: 'Yay! Go, dump truck, go!',
    dt_choice_stones: 'Load the heavy stones! Clunk, clunk, dump!',
    dt_choice_apples: 'Carry the sweet red apples! Yummy, zoom, zoom!',
    peek_hide: 'Where did it go? Tap the wooden door!',
    bd_bye: 'Goodnight, big machines! Bye-bye! See you tomorrow!',
  };

  const ANIM_CLASSES = [
    'anim-rumble',
    'anim-flash',
    'anim-push',
    'anim-push-right',
    'anim-bounce',
    'anim-scoop',
    'anim-swivel',
    'anim-dump',
    'anim-jelly',
    'is-bouncing',
    'is-knocking',
  ];

  const SCENES = [
    {
      id: 'cover',
      type: 'cover',
      accent: 'yellow',
      asset: 'images/ic_bulldozer_logo.png',
      filename: 'ic_bulldozer_logo.png',
      assetDesc: '환하게 웃는 노란 미니 불도저 둥근 앱 아이콘',
      title: '까꿍! 불도저와 중장비 친구들',
      subtitle: 'Peek-a-boo Heavy Machines',
      badge: '1~3세 그림책 놀이',
      audioId: 'cover_welcome',
      soundKind: 'chime',
    },
    {
      id: 'garage',
      type: 'door',
      accent: 'yellow',
      asset: 'images/img_garage_door.jpg',
      filename: 'img_garage_door.jpg',
      assetDesc: '까꿍 놀이를 위한 따뜻한 나무 차고 문과 흙더미 배경',
      title: '똑똑똑! 차고 안에 누가 있을까?',
      soundWord: '나무 문을 톡톡 눌러 보세요!',
      pillClass: 'sound-word-pill--door',
      tapHint: '문을 톡! 두드려 까꿍!',
      audioId: 'door_knock',
      openAudioId: 'door_open',
      soundKind: 'knock',
    },
    {
      id: 'bulldozer',
      type: 'hero',
      accent: 'yellow',
      asset: 'images/img_bulldozer_hero.jpg',
      filename: 'img_bulldozer_hero.jpg',
      assetDesc: '커다란 삽날을 든 친근한 노란 불도저 메인 일러스트',
      title: '까꿍! 노란 불도저야!',
      soundWord: '불도저 몸통을 톡톡 눌러 보세요!',
      pillClass: 'sound-word-pill--yellow',
      tapHint: '불도저 몸통을 톡! 눌러 보세요',
      popText: '까꿍! 불도저!',
      revealAudioId: 'bd_peekaboo',
      sparkles: ['⭐', '✨', '💛'],
      reactions: [
        {
          audioId: 'bd_tap_1',
          anim: 'anim-rumble',
          sfx: 'engine_rumble',
          fx: 'smoke_dust',
          pop: '부르르~ Rumble-rumble!',
          sparkles: ['💨', '💛', '✨'],
        },
        {
          audioId: 'bd_tap_2',
          anim: 'anim-flash',
          sfx: 'beep_beep',
          fx: 'headlights',
          pop: '빵빵! Beep-beep!',
          sparkles: ['💡', '✨', '💛'],
        },
        {
          audioId: 'bd_tap_3',
          anim: 'anim-push',
          sfx: 'push_strong',
          fx: 'push_dirt',
          pop: '영차! Push, push!',
          sparkles: ['💪', '💨', '⭐'],
        },
        {
          audioId: 'bd_tap_4',
          anim: 'anim-bounce',
          sfx: 'yay_bounce',
          fx: 'stars',
          pop: '야호! Go, bulldozer!',
          sparkles: ['⭐', '🌟', '✨', '💛'],
        },
      ],
      choices: [
        {
          emoji: '🪨',
          label: '큰 돌 밀기',
          audioId: 'bd_choice_rock',
          anim: 'anim-push',
          sfx: 'push_strong',
          fx: 'push_dirt',
          pop: '영차! Big rock!',
          sparkles: ['🪨', '💨', '💪'],
        },
        {
          emoji: '🍮',
          label: '젤리 밀기',
          audioId: 'bd_choice_jelly',
          anim: 'anim-jelly',
          sfx: 'jelly_boing',
          fx: 'stars',
          pop: '출렁출렁! Boing!',
          sparkles: ['🍮', '✨', '💛'],
        },
      ],
    },
    {
      id: 'excavator',
      type: 'hero',
      accent: 'orange',
      asset: 'images/img_excavator_hero.jpg',
      filename: 'img_excavator_hero.jpg',
      assetDesc: '모래산 옆에서 웃고 있는 귀여운 주황 포크레인 일러스트',
      title: '까꿍! 주황 포크레인이야!',
      soundWord: '포크레인 몸통을 톡톡 눌러 보세요!',
      pillClass: 'sound-word-pill--orange',
      tapHint: '포크레인 몸통을 톡! 눌러 보세요',
      popText: '까꿍! 포크레인!',
      revealAudioId: 'ex_peekaboo',
      sparkles: ['🧡', '✨', '🌼'],
      reactions: [
        {
          audioId: 'ex_tap_1',
          anim: 'anim-scoop',
          sfx: 'dig_scoop',
          fx: 'sand_scoop',
          pop: '푹푹! Dig & scoop!',
          sparkles: ['🧡', '✨', '🌼'],
        },
        {
          audioId: 'ex_tap_2',
          anim: 'anim-swivel',
          sfx: 'swivel_whir',
          fx: 'smoke_dust',
          pop: '빙글빙글! Turn around!',
          sparkles: ['🌀', '✨', '🧡'],
        },
        {
          audioId: 'ex_tap_3',
          anim: 'anim-flash',
          sfx: 'beep_beep_high',
          fx: 'headlights',
          pop: '빵빵! Beep-beep!',
          sparkles: ['💡', '✨', '🌼'],
        },
        {
          audioId: 'ex_tap_4',
          anim: 'anim-bounce',
          sfx: 'yay_bounce',
          fx: 'stars',
          pop: '야호! Go, excavator!',
          sparkles: ['⭐', '🌟', '🧡', '✨'],
        },
      ],
      choices: [
        {
          emoji: '🏜️',
          label: '모래 푸기',
          audioId: 'ex_choice_sand',
          anim: 'anim-scoop',
          sfx: 'dig_scoop',
          fx: 'sand_scoop',
          pop: '푹푹! Golden sand!',
          sparkles: ['🏜️', '✨', '🧡'],
        },
        {
          emoji: '🦆',
          label: '오리 찾기',
          audioId: 'ex_choice_duck',
          anim: 'anim-bounce',
          sfx: 'duck_quack',
          fx: 'stars',
          pop: '꽥꽥! Little duck!',
          sparkles: ['🦆', '💛', '✨'],
        },
      ],
    },
    {
      id: 'dumptruck',
      type: 'hero',
      accent: 'blue',
      asset: 'images/img_dumptruck_hero.jpg',
      filename: 'img_dumptruck_hero.jpg',
      assetDesc: '공사장 배경의 듬직한 파란 덤프트럭 일러스트',
      title: '까꿍! 파란 덤프트럭이야!',
      soundWord: '덤프트럭 몸통을 톡톡 눌러 보세요!',
      pillClass: 'sound-word-pill--blue',
      tapHint: '덤프트럭 몸통을 톡! 눌러 보세요',
      popText: '까꿍! 덤프트럭!',
      revealAudioId: 'dt_peekaboo',
      sparkles: ['💙', '☁️', '✨'],
      reactions: [
        {
          audioId: 'dt_tap_1',
          anim: 'anim-dump',
          sfx: 'dump_whoosh',
          fx: 'pebble_dump',
          pop: '와르르! Tip & dump!',
          sparkles: ['💨', '💙', '✨'],
        },
        {
          audioId: 'dt_tap_2',
          anim: 'anim-flash',
          sfx: 'truck_honk',
          fx: 'headlights',
          pop: '빵빵! Honk-honk!',
          sparkles: ['💡', '✨', '💙'],
        },
        {
          audioId: 'dt_tap_3',
          anim: 'anim-push-right',
          sfx: 'engine_vroom',
          fx: 'smoke_dust',
          pop: '부릉부릉! Vroom-vroom!',
          sparkles: ['💨', '☁️', '💙'],
        },
        {
          audioId: 'dt_tap_4',
          anim: 'anim-bounce',
          sfx: 'yay_bounce',
          fx: 'stars',
          pop: '야호! Go, dump truck!',
          sparkles: ['⭐', '🌟', '💙', '✨'],
        },
      ],
      choices: [
        {
          emoji: '🪨',
          label: '돌 싣기',
          audioId: 'dt_choice_stones',
          anim: 'anim-dump',
          sfx: 'dump_whoosh',
          fx: 'pebble_dump',
          pop: '와르르! Heavy stones!',
          sparkles: ['🪨', '💨', '💙'],
        },
        {
          emoji: '🍎',
          label: '사과 싣기',
          audioId: 'dt_choice_apples',
          anim: 'anim-push-right',
          sfx: 'engine_vroom',
          fx: 'stars',
          pop: '씽씽! Sweet apples!',
          sparkles: ['🍎', '✨', '💙'],
        },
      ],
    },
    {
      id: 'sleepy',
      type: 'sleepy',
      accent: 'sleepy',
      asset: 'images/img_sleepy_garage.jpg',
      filename: 'img_sleepy_garage.jpg',
      assetDesc: '노을 지는 저녁, 차고 안에서 졸린 눈으로 인사하는 중장비 마무리 일러스트',
      title: '잘 자, 중장비 친구들!',
      soundWord: 'Goodnight, big machines! 🌙',
      pillClass: 'sound-word-pill--sleepy',
      tapHint: '하늘을 톡! 누르면 별이 반짝',
      popText: '잘 자요~ Bye-bye! 🌙',
      audioId: 'bd_bye',
      soundKind: 'lullaby',
      sparkles: ['🌙', '⭐', '✨'],
    },
  ];

  // --- App & Hybrid Audio Engine State ---
  const SPEED_STORAGE_KEY = 'peekaboo_voice_speed';
  const AUDIO_BASE_PATH = 'audio/';

  let currentIndex = 0;
  let soundEnabled = true;
  let isPeekCovered = false;
  let voiceSpeedMode = loadSavedSpeedMode(); // 'slow' | 'normal'

  let audioCtx = null;
  let activeSfxBus = null;
  let activeSfxNodes = [];
  let noiseBufferCache = null;

  let activeAudioEl = null;
  let speechTimer = null;
  let voicePlayToken = 0;
  let preferredEnVoice = null;

  // Preloaded Gemini audio elements & probe cache
  const audioPool = Object.create(null); // audioId -> HTMLAudioElement
  const probedMissing = new Set();       // audioIds confirmed not present on server
  let manifestLoadedFiles = 0;
  let manifestVoiceName = 'Puck';

  const reactionCursor = { bulldozer: 0, excavator: 0, dumptruck: 0 };

  // DOM References
  const bookStage = document.getElementById('bookStage');
  const progressDots = document.getElementById('progressDots');
  const bottomNav = document.getElementById('bottomNav');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const nextBtnText = document.getElementById('nextBtnText');
  const peekToggleBtn = document.getElementById('peekToggleBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundLabel = document.getElementById('soundLabel');
  const sparkleLayer = document.getElementById('sparkleLayer');

  const parentMenuBtn = document.getElementById('parentMenuBtn');
  const parentModal = document.getElementById('parentModal');
  const closeParentModalBtn = document.getElementById('closeParentModalBtn');
  const speedSlowBtn = document.getElementById('speedSlowBtn');
  const speedNormalBtn = document.getElementById('speedNormalBtn');
  const audioStatusBox = document.getElementById('audioStatusBox');

  const assetGalleryBtn = document.getElementById('assetGalleryBtn');
  const assetModal = document.getElementById('assetModal');
  const closeAssetModalBtn = document.getElementById('closeAssetModalBtn');
  const assetGrid = document.getElementById('assetGrid');

  function loadSavedSpeedMode() {
    try {
      const saved = window.localStorage.getItem(SPEED_STORAGE_KEY);
      if (saved === 'slow' || saved === 'normal') return saved;
    } catch (_) {}
    return 'normal';
  }

  function saveSpeedMode(mode) {
    voiceSpeedMode = mode === 'slow' ? 'slow' : 'normal';
    try {
      window.localStorage.setItem(SPEED_STORAGE_KEY, voiceSpeedMode);
    } catch (_) {}
    syncParentSpeedUI();
  }

  function getAudioPlaybackRate() {
    return voiceSpeedMode === 'slow' ? 0.85 : 1.0;
  }

  function getSpeechRate() {
    return voiceSpeedMode === 'slow' ? 0.8 : 0.96;
  }

  // --- Hybrid Audio Manifest Loader (Priority 1: Pre-generated Gemini Audio) ---
  function preloadAudioClip(audioId, filename) {
    const url = `${AUDIO_BASE_PATH}${filename}`;
    const el = new Audio();
    el.preload = 'auto';
    el.src = url;
    el.load();
    audioPool[audioId] = el;
  }

  async function initAudioManifest() {
    try {
      const res = await fetch(`${AUDIO_BASE_PATH}audio_manifest.json`, { cache: 'no-cache' });
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.defaultVoice) {
        manifestVoiceName = data.defaultVoice;
      }
      const files = (data && data.files) || {};
      const entries = Object.entries(files);
      manifestLoadedFiles = entries.length;
      entries.forEach(([id, filename]) => {
        if (typeof filename === 'string' && filename) {
          preloadAudioClip(id, filename);
        }
      });
    } catch (_) {
      // Offline / file:// mode gracefully falls back to Web Speech API
    } finally {
      updateAudioStatusBox();
    }
  }

  async function probeSingleAudioFile(audioId) {
    if (audioPool[audioId]) return audioPool[audioId];
    if (probedMissing.has(audioId)) return null;
    if (window.location.protocol === 'file:') {
      probedMissing.add(audioId);
      return null;
    }

    for (const ext of ['.mp3', '.wav']) {
      const url = `${AUDIO_BASE_PATH}${audioId}${ext}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 140);
      try {
        const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
        clearTimeout(timeoutId);
        const contentType = (res.headers.get('content-type') || '').toLowerCase();
        if (res.ok && (contentType.startsWith('audio/') || contentType.includes('octet-stream'))) {
          preloadAudioClip(audioId, `${audioId}${ext}`);
          manifestLoadedFiles = Object.keys(audioPool).length;
          updateAudioStatusBox();
          return audioPool[audioId];
        }
      } catch (_) {
        clearTimeout(timeoutId);
      }
    }

    probedMissing.add(audioId);
    return null;
  }

  // --- Warm Native English Voice Selection (Priority 2: Web Speech Fallback) ---
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || !voices.length) return;
    const enUS = voices.filter((v) => /^en[-_]US/i.test(v.lang));
    const priorityNames = ['Samantha', 'Ava', 'Aria', 'Google US English', 'Nicky', 'Allison', 'Zoe'];
    for (const name of priorityNames) {
      const match = enUS.find((v) => v.name.includes(name));
      if (match) {
        preferredEnVoice = match;
        return;
      }
    }
    preferredEnVoice = enUS[0] || voices.find((v) => /^en/i.test(v.lang)) || null;
  }

  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  // --- Rapid-Tap-Safe Voice Stopper ---
  function stopActiveVoice() {
    voicePlayToken += 1;
    if (speechTimer) {
      clearTimeout(speechTimer);
      speechTimer = null;
    }
    if (activeAudioEl) {
      try {
        activeAudioEl.pause();
        activeAudioEl.currentTime = 0;
      } catch (_) {}
      activeAudioEl = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }
  }

  function speakWebSpeechFallback(text, token) {
    if (!soundEnabled || !text || token !== voicePlayToken) return;
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      if (preferredEnVoice) u.voice = preferredEnVoice;
      u.rate = getSpeechRate();
      u.pitch = 1.12;
      u.volume = 0.96;
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }

  function playAudioElement(el, fallbackText, token) {
    if (!soundEnabled || token !== voicePlayToken) return;
    try {
      el.pause();
      el.currentTime = 0;
      el.playbackRate = getAudioPlaybackRate();
      el.volume = 1.0;
      activeAudioEl = el;
      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          if (token === voicePlayToken) {
            activeAudioEl = null;
            speakWebSpeechFallback(fallbackText, token);
          }
        });
      }
    } catch (_) {
      activeAudioEl = null;
      speakWebSpeechFallback(fallbackText, token);
    }
  }

  /**
   * Hybrid Voice Playback:
   *  1) Priority 1: Pre-generated Gemini audio in deploy/audio/ (<id>.mp3 or .wav) with playbackRate
   *  2) Priority 2: Automatic error-free fallback to browser Web Speech API (en-US)
   */
  function playVoiceLine(audioId, delayMs = 95) {
    stopActiveVoice();
    if (!soundEnabled || !audioId) return;
    const fallbackText = AUDIO_MANIFEST[audioId] || '';
    const token = voicePlayToken;

    speechTimer = setTimeout(async () => {
      speechTimer = null;
      if (!soundEnabled || token !== voicePlayToken) return;

      // Priority 1 (instant <0.01s if preloaded from audio_manifest.json)
      if (audioPool[audioId]) {
        playAudioElement(audioPool[audioId], fallbackText, token);
        return;
      }

      // One-time lightweight probe in case user manually dropped a file in deploy/audio/
      const probedEl = await probeSingleAudioFile(audioId);
      if (token !== voicePlayToken || !soundEnabled) return;

      if (probedEl) {
        playAudioElement(probedEl, fallbackText, token);
      } else {
        // Priority 2: Smooth en-US Web Speech API fallback
        speakWebSpeechFallback(fallbackText, token);
      }
    }, delayMs);
  }

  // --- Instant Zero-Overlap Web Audio SFX Engine (<0.01s response) ---
  function ensureAudio() {
    if (!soundEnabled) return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function getNoiseBuffer(ctx) {
    if (noiseBufferCache && noiseBufferCache.sampleRate === ctx.sampleRate) {
      return noiseBufferCache;
    }
    const len = Math.floor(ctx.sampleRate * 1.0);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.06 * white) / 1.06;
      lastOut = data[i];
      data[i] *= 3.2;
    }
    noiseBufferCache = buffer;
    return buffer;
  }

  function stopActiveSfx() {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    if (activeSfxBus) {
      try {
        activeSfxBus.gain.cancelScheduledValues(now);
        activeSfxBus.gain.setValueAtTime(Math.max(activeSfxBus.gain.value, 0.001), now);
        activeSfxBus.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);
      } catch (_) {}
      const oldBus = activeSfxBus;
      const oldNodes = activeSfxNodes;
      setTimeout(() => {
        oldNodes.forEach((n) => {
          try { n.stop(); } catch (_) {}
          try { n.disconnect(); } catch (_) {}
        });
        try { oldBus.disconnect(); } catch (_) {}
      }, 32);
    }
    activeSfxBus = null;
    activeSfxNodes = [];
  }

  function createSfxBus(ctx) {
    stopActiveSfx();
    const bus = ctx.createGain();
    bus.gain.setValueAtTime(1.0, ctx.currentTime);
    bus.connect(ctx.destination);
    activeSfxBus = bus;
    activeSfxNodes = [];
    return bus;
  }

  function addTone(ctx, bus, freq, offset, duration, type = 'sine', volume = 0.16, freqEnd = null) {
    const start = ctx.currentTime + offset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (freqEnd !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), start + duration);
    }
    gain.gain.setValueAtTime(0.0008, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.02, duration * 0.25));
    gain.gain.exponentialRampToValueAtTime(0.0008, start + duration);
    osc.connect(gain);
    gain.connect(bus);
    osc.start(start);
    osc.stop(start + duration + 0.02);
    activeSfxNodes.push(osc);
  }

  function addFilteredNoise(ctx, bus, offset, duration, startFreq, endFreq, volume = 0.16) {
    const start = ctx.currentTime + offset;
    const src = ctx.createBufferSource();
    src.buffer = getNoiseBuffer(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(1.2, start);
    filter.frequency.setValueAtTime(startFreq, start);
    filter.frequency.exponentialRampToValueAtTime(Math.max(60, endFreq), start + duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0008, start + duration);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(bus);
    src.start(start);
    src.stop(start + duration + 0.02);
    activeSfxNodes.push(src);
  }

  function playSoundEffect(kind) {
    if (!soundEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const bus = createSfxBus(ctx);

    switch (kind) {
      case 'engine_rumble': {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const sub = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(68, now);
        osc.frequency.linearRampToValueAtTime(92, now + 0.2);
        osc.frequency.linearRampToValueAtTime(72, now + 0.5);

        sub.type = 'triangle';
        sub.frequency.setValueAtTime(48, now);

        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(16, now);
        lfoGain.gain.setValueAtTime(0.09, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(240, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.24, now + 0.03);
        gain.gain.setValueAtTime(0.22, now + 0.34);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.56);

        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        osc.connect(filter);
        sub.connect(filter);
        filter.connect(gain);
        gain.connect(bus);

        osc.start(now); sub.start(now); lfo.start(now);
        osc.stop(now + 0.58); sub.stop(now + 0.58); lfo.stop(now + 0.58);
        activeSfxNodes.push(osc, sub, lfo);
        addFilteredNoise(ctx, bus, 0.04, 0.4, 300, 140, 0.1);
        break;
      }

      case 'beep_beep':
        addTone(ctx, bus, 523.25, 0.0, 0.14, 'triangle', 0.22);
        addTone(ctx, bus, 659.25, 0.0, 0.14, 'sine', 0.12);
        addTone(ctx, bus, 523.25, 0.18, 0.18, 'triangle', 0.24);
        addTone(ctx, bus, 659.25, 0.18, 0.18, 'sine', 0.14);
        break;

      case 'beep_beep_high':
        addTone(ctx, bus, 587.33, 0.0, 0.13, 'triangle', 0.2);
        addTone(ctx, bus, 783.99, 0.0, 0.13, 'sine', 0.11);
        addTone(ctx, bus, 587.33, 0.17, 0.17, 'triangle', 0.22);
        addTone(ctx, bus, 783.99, 0.17, 0.17, 'sine', 0.12);
        break;

      case 'truck_honk':
        addTone(ctx, bus, 261.63, 0.0, 0.16, 'triangle', 0.24);
        addTone(ctx, bus, 392.0, 0.0, 0.16, 'triangle', 0.16);
        addTone(ctx, bus, 261.63, 0.21, 0.22, 'triangle', 0.26);
        addTone(ctx, bus, 392.0, 0.21, 0.22, 'triangle', 0.18);
        break;

      case 'push_strong':
        addFilteredNoise(ctx, bus, 0.0, 0.44, 240, 720, 0.2);
        addTone(ctx, bus, 140, 0.0, 0.22, 'triangle', 0.2, 230);
        addTone(ctx, bus, 261.63, 0.14, 0.16, 'triangle', 0.15, 329.63);
        addTone(ctx, bus, 392.0, 0.28, 0.22, 'sine', 0.16);
        break;

      case 'jelly_boing':
        addTone(ctx, bus, 210, 0.0, 0.24, 'sine', 0.22, 620);
        addTone(ctx, bus, 560, 0.18, 0.24, 'sine', 0.18, 280);
        addTone(ctx, bus, 340, 0.34, 0.18, 'sine', 0.15, 520);
        break;

      case 'duck_quack':
        addTone(ctx, bus, 620, 0.0, 0.13, 'sawtooth', 0.11, 390);
        addTone(ctx, bus, 640, 0.16, 0.15, 'sawtooth', 0.11, 410);
        addTone(ctx, bus, 783.99, 0.32, 0.18, 'sine', 0.15);
        break;

      case 'yay_bounce':
        addTone(ctx, bus, 523.25, 0.0, 0.13, 'sine', 0.18);
        addTone(ctx, bus, 659.25, 0.08, 0.13, 'sine', 0.18);
        addTone(ctx, bus, 783.99, 0.16, 0.15, 'sine', 0.19);
        addTone(ctx, bus, 1046.5, 0.25, 0.28, 'sine', 0.2);
        break;

      case 'dig_scoop':
        addTone(ctx, bus, 340, 0.0, 0.18, 'triangle', 0.16, 210);
        addFilteredNoise(ctx, bus, 0.1, 0.34, 420, 960, 0.18);
        addTone(ctx, bus, 260, 0.18, 0.24, 'sine', 0.18, 520);
        break;

      case 'swivel_whir':
        addTone(ctx, bus, 300, 0.0, 0.18, 'sine', 0.16, 520);
        addTone(ctx, bus, 520, 0.18, 0.18, 'sine', 0.16, 330);
        addTone(ctx, bus, 440, 0.34, 0.16, 'sine', 0.14, 587.33);
        break;

      case 'dump_whoosh':
        addTone(ctx, bus, 220, 0.0, 0.22, 'triangle', 0.16, 360);
        addFilteredNoise(ctx, bus, 0.14, 0.36, 750, 240, 0.18);
        addTone(ctx, bus, 660, 0.18, 0.09, 'sine', 0.13);
        addTone(ctx, bus, 520, 0.24, 0.09, 'sine', 0.13);
        addTone(ctx, bus, 420, 0.30, 0.1, 'sine', 0.14);
        addTone(ctx, bus, 330, 0.36, 0.12, 'sine', 0.14);
        break;

      case 'engine_vroom':
        addTone(ctx, bus, 95, 0.0, 0.22, 'sawtooth', 0.11, 165);
        addTone(ctx, bus, 165, 0.2, 0.26, 'triangle', 0.18, 240);
        addFilteredNoise(ctx, bus, 0.05, 0.38, 220, 480, 0.12);
        break;

      case 'knock':
        addTone(ctx, bus, 175, 0.0, 0.1, 'triangle', 0.22);
        addTone(ctx, bus, 152, 0.14, 0.1, 'triangle', 0.2);
        addTone(ctx, bus, 190, 0.28, 0.11, 'triangle', 0.22);
        break;

      case 'peekaboo':
        addTone(ctx, bus, 523.25, 0.0, 0.14, 'sine', 0.17);
        addTone(ctx, bus, 659.25, 0.1, 0.16, 'sine', 0.18);
        addTone(ctx, bus, 783.99, 0.2, 0.3, 'sine', 0.2);
        break;

      case 'lullaby':
        addTone(ctx, bus, 523.25, 0.0, 0.42, 'sine', 0.12);
        addTone(ctx, bus, 440.0, 0.28, 0.42, 'sine', 0.12);
        addTone(ctx, bus, 392.0, 0.56, 0.62, 'sine', 0.12);
        break;

      case 'chime':
      default:
        addTone(ctx, bus, 440, 0.0, 0.16, 'sine', 0.14);
        addTone(ctx, bus, 554.37, 0.09, 0.18, 'sine', 0.15);
        addTone(ctx, bus, 659.25, 0.18, 0.26, 'sine', 0.16);
        break;
    }
  }

  // --- Instant Visual FX Helpers ---
  function spawnTouchRipple(frame, clientX, clientY) {
    const rect = frame.getBoundingClientRect();
    const x = clientX ? clientX - rect.left : rect.width / 2;
    const y = clientY ? clientY - rect.top : rect.height / 2;
    const ripple = document.createElement('span');
    ripple.className = 'tap-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    frame.appendChild(ripple);
    setTimeout(() => ripple.remove(), 480);
  }

  function spawnSparkles(clientX, clientY, icons = ['⭐', '✨', '💛'], count = 7) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'sparkle-item';
      el.textContent = icons[i % icons.length];
      const offsetX = (Math.random() - 0.5) * 160;
      const offsetY = (Math.random() - 0.5) * 100;
      el.style.left = `${clientX + offsetX}px`;
      el.style.top = `${clientY + offsetY}px`;
      el.style.animationDelay = `${i * 35}ms`;
      sparkleLayer.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }
  }

  function spawnPuffs(fxLayer, variant = 'smoke', originX = 50, originY = 66, count = 7) {
    if (!fxLayer) return;
    for (let i = 0; i < count; i++) {
      const puff = document.createElement('span');
      const cls =
        variant === 'sand'
          ? 'fx-puff fx-puff--sand'
          : variant === 'pebble'
            ? 'fx-puff fx-puff--pebble'
            : 'fx-puff';
      puff.className = cls;
      const size = variant === 'pebble' ? 14 + Math.random() * 14 : 22 + Math.random() * 26;
      puff.style.width = `${size}px`;
      puff.style.height = `${size}px`;
      puff.style.left = `${originX + (Math.random() - 0.5) * 26}%`;
      puff.style.top = `${originY + (Math.random() - 0.5) * 14}%`;

      const dirX = (Math.random() - 0.5) * 120;
      const dirY = variant === 'pebble' ? 20 + Math.random() * 60 : -(24 + Math.random() * 70);
      puff.style.setProperty('--dx', `${dirX * 0.55}px`);
      puff.style.setProperty('--dy', `${dirY * 0.55}px`);
      puff.style.setProperty('--dx2', `${dirX}px`);
      puff.style.setProperty('--dy2', `${dirY}px`);
      puff.style.animationDelay = `${i * 28}ms`;

      fxLayer.appendChild(puff);
      setTimeout(() => puff.remove(), 860);
    }
  }

  function triggerVisualFx(frame, fxLayer, headlightsEl, fxKind, cx, cy, sparkles) {
    if (fxKind === 'headlights' && headlightsEl) {
      headlightsEl.classList.remove('is-flashing');
      void headlightsEl.offsetWidth;
      headlightsEl.classList.add('is-flashing');
      spawnSparkles(cx, cy, sparkles, 6);
      return;
    }
    if (fxKind === 'smoke_dust') {
      spawnPuffs(fxLayer, 'smoke', 48, 36, 5);
      spawnPuffs(fxLayer, 'sand', 55, 76, 5);
      spawnSparkles(cx, cy, sparkles, 5);
      return;
    }
    if (fxKind === 'push_dirt') {
      spawnPuffs(fxLayer, 'sand', 26, 76, 8);
      spawnSparkles(cx, cy, sparkles, 6);
      return;
    }
    if (fxKind === 'sand_scoop') {
      spawnPuffs(fxLayer, 'sand', 72, 72, 8);
      spawnSparkles(cx, cy, sparkles, 6);
      return;
    }
    if (fxKind === 'pebble_dump') {
      spawnPuffs(fxLayer, 'pebble', 34, 48, 9);
      spawnSparkles(cx, cy, sparkles, 6);
      return;
    }
    spawnSparkles(cx, cy, sparkles, 10);
  }

  function triggerAnimation(frame, animClass) {
    frame.classList.remove(...ANIM_CLASSES);
    void frame.offsetWidth;
    frame.classList.add(animClass);
  }

  function showPopBanner(popEl, message) {
    if (!popEl) return;
    popEl.textContent = message;
    popEl.classList.remove('is-showing');
    void popEl.offsetWidth;
    popEl.classList.add('is-showing');
  }

  function renderDots() {
    progressDots.innerHTML = '';
    SCENES.forEach((scene, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `dot-btn${idx === currentIndex ? ' is-active' : ''}`;
      btn.dataset.accent = scene.accent;
      btn.setAttribute('aria-label', `${idx + 1}번째 화면: ${scene.title}`);
      btn.setAttribute('aria-selected', String(idx === currentIndex));
      btn.addEventListener('click', () => {
        goToScene(idx, false);
      });
      progressDots.appendChild(btn);
    });
  }

  function updateReactionDots(activeStep) {
    const container = document.getElementById('reactionDots');
    if (!container) return;
    const dots = container.querySelectorAll('.reaction-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-current', i === activeStep);
    });
  }

  function updateChrome() {
    const scene = SCENES[currentIndex];
    document.body.classList.toggle('theme-sleepy', scene.type === 'sleepy');
    renderDots();

    if (scene.type === 'cover') {
      bottomNav.style.visibility = 'hidden';
      bottomNav.style.pointerEvents = 'none';
    } else {
      bottomNav.style.visibility = 'visible';
      bottomNav.style.pointerEvents = 'auto';
    }

    prevBtn.disabled = currentIndex === 0;
    peekToggleBtn.hidden = scene.type !== 'hero';
    if (scene.type === 'hero') {
      peekToggleBtn.innerHTML = isPeekCovered
        ? '<span aria-hidden="true">✨</span><span>까꿍! 열어보기</span>'
        : '<span aria-hidden="true">🚪</span><span>까꿍! 다시 숨기</span>';
    }

    if (currentIndex === SCENES.length - 1) {
      nextBtnText.textContent = '처음으로';
    } else if (scene.type === 'door') {
      nextBtnText.textContent = '까꿍 열기';
    } else {
      nextBtnText.textContent = '다음 친구';
    }
  }

  function renderScene(startCovered = false) {
    const scene = SCENES[currentIndex];
    isPeekCovered = scene.type === 'hero' && startCovered;
    updateChrome();

    if (scene.type === 'cover') {
      bookStage.innerHTML = `
        <section class="story-card cover-card">
          <div class="cover-badge">${scene.badge}</div>
          <button class="cover-icon-btn" id="coverIconBtn" type="button" aria-label="노란 불도저 아이콘 눌러서 시작하기">
            <div class="cover-icon-frame">
              <img src="${scene.asset}" alt="${scene.assetDesc}" />
            </div>
          </button>
          <h1 class="cover-title">${scene.title}</h1>
          <p class="cover-subtitle">${scene.subtitle}</p>
          <button class="big-start-btn" id="startBookBtn" type="button">
            <span>까꿍 놀이 시작하기</span>
            <span aria-hidden="true">✨</span>
          </button>
        </section>
      `;

      const startHandler = (e) => {
        playSoundEffect('chime');
        spawnSparkles(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
        goToScene(1, false);
      };
      document.getElementById('startBookBtn').addEventListener('click', startHandler);
      document.getElementById('coverIconBtn').addEventListener('click', startHandler);
      return;
    }

    const isHero = scene.type === 'hero';
    const reactionCount = isHero && scene.reactions ? scene.reactions.length : 0;
    const choices = isHero && scene.choices ? scene.choices : [];

    bookStage.innerHTML = `
      <section class="story-card">
        <div class="picture-frame" id="pictureFrame" role="button" tabindex="0" aria-label="${scene.title}">
          <img
            class="picture-img ${scene.type === 'door' || scene.type === 'sleepy' ? 'cover-fit' : ''}"
            src="${scene.asset}"
            alt="${scene.assetDesc}"
            draggable="false"
          />
          <div class="fx-headlights" id="fxHeadlights" aria-hidden="true"></div>
          <div class="fx-layer" id="fxLayer" aria-hidden="true"></div>
          ${
            isHero
              ? `<div class="peek-curtain ${isPeekCovered ? '' : 'is-open'}" id="peekCurtain">
                  <img src="images/img_garage_door.jpg" alt="따뜻한 나무 차고 문" draggable="false" />
                </div>`
              : ''
          }
          <div class="peekaboo-pop" id="peekabooPop">${scene.popText || '까꿍!'}</div>
          <div class="tap-hint-badge" id="tapHintBadge">
            ${isPeekCovered ? '똑똑똑! 문을 톡 눌러 까꿍!' : scene.tapHint}
          </div>
        </div>

        <div class="caption-box">
          <h1 class="scene-title" id="sceneTitle">
            ${isPeekCovered ? '똑똑똑! 이번엔 누가 숨었을까?' : scene.title}
          </h1>
          <button class="sound-word-pill ${scene.pillClass}" id="soundWordPill" type="button">
            <span aria-hidden="true">🔊</span>
            <span id="soundWordText">${isPeekCovered ? '나무 문을 톡 눌러 열어 보세요!' : scene.soundWord}</span>
          </button>
          ${
            reactionCount > 0
              ? `<div class="reaction-dots" id="reactionDots" data-accent="${scene.accent}" aria-hidden="true">
                  ${Array.from({ length: reactionCount }, () => '<span class="reaction-dot"></span>').join('')}
                </div>`
              : ''
          }
          ${
            choices.length > 0
              ? `<div class="choice-row" id="choiceRow" ${isPeekCovered ? 'hidden' : ''}>
                  ${choices
                    .map(
                      (ch, i) => `
                        <button class="choice-btn ${i === 1 ? 'choice-btn--alt' : ''}" type="button" data-choice-idx="${i}">
                          <span class="choice-emoji" aria-hidden="true">${ch.emoji}</span>
                          <span>${ch.label}</span>
                        </button>
                      `
                    )
                    .join('')}
                </div>`
              : ''
          }
        </div>
      </section>
    `;

    const pictureFrame = document.getElementById('pictureFrame');
    const peekCurtain = document.getElementById('peekCurtain');
    const peekabooPop = document.getElementById('peekabooPop');
    const tapHintBadge = document.getElementById('tapHintBadge');
    const sceneTitle = document.getElementById('sceneTitle');
    const soundWordPill = document.getElementById('soundWordPill');
    const soundWordText = document.getElementById('soundWordText');
    const fxLayer = document.getElementById('fxLayer');
    const fxHeadlights = document.getElementById('fxHeadlights');
    const choiceRow = document.getElementById('choiceRow');

    const fireReactionObj = (rx, cx, cy, stepIdx = null) => {
      // 1) Instant (<0.01s) Web Audio SFX + juicy animation + visual FX
      playSoundEffect(rx.sfx);
      triggerAnimation(pictureFrame, rx.anim);
      spawnTouchRipple(pictureFrame, cx, cy);
      triggerVisualFx(pictureFrame, fxLayer, fxHeadlights, rx.fx, cx, cy, rx.sparkles);
      showPopBanner(peekabooPop, rx.pop);
      soundWordText.textContent = AUDIO_MANIFEST[rx.audioId] || rx.pop;
      if (stepIdx !== null) {
        updateReactionDots(stepIdx);
      }

      // 2) Hybrid Voice Engine (Gemini audio priority 1 -> Web Speech en-US fallback)
      playVoiceLine(rx.audioId, 90);
    };

    const fireHeroReaction = (cx, cy) => {
      const reactions = scene.reactions;
      if (!reactions || !reactions.length) return;
      const stepIdx = reactionCursor[scene.id] % reactions.length;
      reactionCursor[scene.id] = (stepIdx + 1) % reactions.length;
      fireReactionObj(reactions[stepIdx], cx, cy, stepIdx);
    };

    const revealFromCurtain = (cx, cy) => {
      isPeekCovered = false;
      if (peekCurtain) peekCurtain.classList.add('is-open');
      if (choiceRow) choiceRow.hidden = false;
      sceneTitle.textContent = scene.title;
      soundWordText.textContent = scene.soundWord;
      tapHintBadge.textContent = scene.tapHint;
      playSoundEffect('peekaboo');
      showPopBanner(peekabooPop, scene.popText);
      spawnSparkles(cx, cy, scene.sparkles, 8);
      triggerAnimation(pictureFrame, 'anim-bounce');
      playVoiceLine(scene.revealAudioId, 110);
      updateChrome();
    };

    let lastDirectTapTs = 0;

    const handleDirectTap = (e) => {
      const now = performance.now();
      if (now - lastDirectTapTs < 45) return;
      lastDirectTapTs = now;

      const rect = pictureFrame.getBoundingClientRect();
      const cx = e.clientX || rect.left + rect.width / 2;
      const cy = e.clientY || rect.top + rect.height / 2;

      if (scene.type === 'door') {
        playSoundEffect('knock');
        triggerAnimation(pictureFrame, 'is-knocking');
        spawnTouchRipple(pictureFrame, cx, cy);
        showPopBanner(peekabooPop, '똑똑똑! Knock, knock!');
        spawnSparkles(cx, cy, ['🚪', '✨', '💛'], 6);
        playVoiceLine(scene.openAudioId, 80);
        setTimeout(() => {
          if (currentIndex === 1) {
            goToScene(2, false, true);
          }
        }, 640);
        return;
      }

      if (scene.type === 'hero' && isPeekCovered) {
        revealFromCurtain(cx, cy);
        return;
      }

      if (scene.type === 'hero') {
        fireHeroReaction(cx, cy);
        return;
      }

      // Sleepy goodnight scene
      playSoundEffect(scene.soundKind);
      triggerAnimation(pictureFrame, 'anim-bounce');
      spawnTouchRipple(pictureFrame, cx, cy);
      showPopBanner(peekabooPop, scene.popText);
      spawnSparkles(cx, cy, scene.sparkles, 8);
      playVoiceLine(scene.audioId, 110);
    };

    // Instant pointerdown fires immediately on touch contact (<0.01s latency)
    pictureFrame.addEventListener('pointerdown', (e) => {
      if (e.button && e.button !== 0) return;
      handleDirectTap(e);
    });

    pictureFrame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleDirectTap(e);
      }
    });

    soundWordPill.addEventListener('pointerdown', (e) => {
      if (e.button && e.button !== 0) return;
      e.preventDefault();
      const rect = pictureFrame.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (scene.type === 'hero' && isPeekCovered) {
        revealFromCurtain(cx, cy);
      } else if (scene.type === 'hero') {
        fireHeroReaction(cx, cy);
      } else {
        handleDirectTap({ clientX: cx, clientY: cy });
      }
    });

    if (choiceRow) {
      choiceRow.querySelectorAll('.choice-btn').forEach((btn) => {
        btn.addEventListener('pointerdown', (e) => {
          if (e.button && e.button !== 0) return;
          e.preventDefault();
          const idx = Number(btn.dataset.choiceIdx);
          const ch = choices[idx];
          if (!ch) return;
          const rect = pictureFrame.getBoundingClientRect();
          fireReactionObj(ch, rect.left + rect.width / 2, rect.top + rect.height / 2, null);
        });
      });
    }

    if (scene.type === 'sleepy') {
      playSoundEffect('lullaby');
    }
  }

  function goToScene(index, startCovered = false, celebrateOnArrival = false) {
    if (index < 0 || index >= SCENES.length) return;
    stopActiveVoice();
    stopActiveSfx();
    currentIndex = index;
    renderScene(startCovered);

    const scene = SCENES[currentIndex];
    if (celebrateOnArrival && scene.type === 'hero') {
      const popEl = document.getElementById('peekabooPop');
      const frame = document.getElementById('pictureFrame');
      playSoundEffect('peekaboo');
      showPopBanner(popEl, scene.popText);
      if (frame) triggerAnimation(frame, 'anim-bounce');
      spawnSparkles(window.innerWidth / 2, window.innerHeight * 0.42, scene.sparkles, 8);
      playVoiceLine(scene.revealAudioId, 120);
    } else if (!startCovered && scene.type === 'sleepy') {
      playVoiceLine(scene.audioId, 180);
    } else if (!startCovered && scene.type === 'door') {
      playVoiceLine(scene.audioId, 130);
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      playSoundEffect('chime');
      goToScene(currentIndex - 1, false);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex === SCENES.length - 1) {
      playSoundEffect('chime');
      goToScene(0, false);
      return;
    }
    const current = SCENES[currentIndex];
    if (current.type === 'door') {
      goToScene(2, false, true);
      return;
    }
    const nextScene = SCENES[currentIndex + 1];
    const shouldCover = nextScene.id === 'excavator' || nextScene.id === 'dumptruck';
    playSoundEffect('chime');
    goToScene(currentIndex + 1, shouldCover);
  });

  peekToggleBtn.addEventListener('click', () => {
    const scene = SCENES[currentIndex];
    if (scene.type !== 'hero') return;
    const peekCurtain = document.getElementById('peekCurtain');
    const choiceRow = document.getElementById('choiceRow');
    const sceneTitle = document.getElementById('sceneTitle');
    const soundWordText = document.getElementById('soundWordText');
    const tapHintBadge = document.getElementById('tapHintBadge');
    const peekabooPop = document.getElementById('peekabooPop');
    const frame = document.getElementById('pictureFrame');

    isPeekCovered = !isPeekCovered;
    if (peekCurtain) {
      peekCurtain.classList.toggle('is-open', !isPeekCovered);
    }
    if (choiceRow) {
      choiceRow.hidden = isPeekCovered;
    }
    if (isPeekCovered) {
      playSoundEffect('knock');
      sceneTitle.textContent = '똑똑똑! 이번엔 누가 숨었을까?';
      soundWordText.textContent = '나무 문을 톡 눌러 열어 보세요!';
      tapHintBadge.textContent = '똑똑똑! 문을 톡 눌러 까꿍!';
      playVoiceLine('peek_hide', 100);
    } else {
      playSoundEffect('peekaboo');
      sceneTitle.textContent = scene.title;
      soundWordText.textContent = scene.soundWord;
      tapHintBadge.textContent = scene.tapHint;
      showPopBanner(peekabooPop, scene.popText);
      if (frame) triggerAnimation(frame, 'anim-bounce');
      spawnSparkles(window.innerWidth / 2, window.innerHeight * 0.42, scene.sparkles, 8);
      playVoiceLine(scene.revealAudioId, 110);
    }
    updateChrome();
  });

  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggleBtn.setAttribute('aria-pressed', String(soundEnabled));
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    soundLabel.textContent = soundEnabled ? '소리 켜짐' : '소리 꺼짐';
    if (!soundEnabled) {
      stopActiveVoice();
      stopActiveSfx();
    } else {
      playSoundEffect('chime');
    }
  });

  // --- Parent Menu (Speed Toggle & Audio Engine Status) ---
  function syncParentSpeedUI() {
    const isSlow = voiceSpeedMode === 'slow';
    speedSlowBtn.classList.toggle('is-selected', isSlow);
    speedSlowBtn.setAttribute('aria-checked', String(isSlow));
    speedNormalBtn.classList.toggle('is-selected', !isSlow);
    speedNormalBtn.setAttribute('aria-checked', String(!isSlow));
  }

  function updateAudioStatusBox() {
    if (!audioStatusBox) return;
    const totalLines = Object.keys(AUDIO_MANIFEST).length;
    const readyCount = manifestLoadedFiles;
    const modeLabel =
      readyCount > 0
        ? `Gemini 음성 활성 (${readyCount}/${totalLines}개)`
        : `Web Speech API (en-US) 자동 폴백 중`;
    audioStatusBox.innerHTML = `
      <div class="audio-status-badge">${modeLabel}</div>
      <div>
        1순위: <code>deploy/audio/</code> 사전 생성 Gemini 목소리 (${manifestVoiceName}, 유지비 0원)<br />
        2순위: 미생성 대사는 브라우저 영어 원어민 음성으로 즉시 자동 재생<br />
        현재 속도: <strong>${voiceSpeedMode === 'slow' ? '천천히 (0.85×)' : '보통 (1.0×)'}</strong>
      </div>
    `;
  }

  parentMenuBtn.addEventListener('click', () => {
    syncParentSpeedUI();
    updateAudioStatusBox();
    parentModal.hidden = false;
  });

  closeParentModalBtn.addEventListener('click', () => {
    parentModal.hidden = true;
  });

  parentModal.addEventListener('click', (e) => {
    if (e.target === parentModal) parentModal.hidden = true;
  });

  speedSlowBtn.addEventListener('click', () => {
    saveSpeedMode('slow');
    updateAudioStatusBox();
    playVoiceLine('bd_tap_1', 30);
  });

  speedNormalBtn.addEventListener('click', () => {
    saveSpeedMode('normal');
    updateAudioStatusBox();
    playVoiceLine('bd_tap_1', 30);
  });

  // --- Asset Gallery Modal ---
  function populateAssetGallery() {
    assetGrid.innerHTML = '';
    SCENES.forEach((scene, idx) => {
      const card = document.createElement('div');
      card.className = 'asset-item';
      card.innerHTML = `
        <div class="asset-thumb">
          <img src="${scene.asset}" alt="${scene.assetDesc}" loading="lazy" />
        </div>
        <span class="asset-filename">${scene.filename}</span>
        <div class="asset-desc">${scene.assetDesc}</div>
      `;
      card.addEventListener('click', () => {
        assetModal.hidden = true;
        goToScene(idx, false);
      });
      assetGrid.appendChild(card);
    });
  }

  assetGalleryBtn.addEventListener('click', () => {
    populateAssetGallery();
    assetModal.hidden = false;
  });

  closeAssetModalBtn.addEventListener('click', () => {
    assetModal.hidden = true;
  });

  assetModal.addEventListener('click', (e) => {
    if (e.target === assetModal) {
      assetModal.hidden = true;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!parentModal.hidden && e.key === 'Escape') {
      parentModal.hidden = true;
      return;
    }
    if (!assetModal.hidden && e.key === 'Escape') {
      assetModal.hidden = true;
      return;
    }
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });

  // Boot
  syncParentSpeedUI();
  initAudioManifest();
  renderScene(false);
})();
