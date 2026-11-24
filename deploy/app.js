(() => {
  'use strict';

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
      speech: '까꿍! 불도저와 중장비 친구들! 함께 놀아볼까요?',
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
      speech: '똑똑똑! 따뜻한 나무 차고 안에 누가 숨어 있을까? 문을 눌러 보세요!',
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
      soundWord: '부릉부릉~ 큰 삽날로 흙을 밀어요!',
      pillClass: 'sound-word-pill--yellow',
      tapHint: '불도저를 톡! 눌러 보세요',
      popText: '까꿍! 불도저!',
      speech: '까꿍! 안녕, 노란 불도저야! 부릉부릉, 흙을 쓱싹 밀어요!',
      soundKind: 'bulldozer',
      sparkles: ['⭐', '✨', '💛'],
    },
    {
      id: 'excavator',
      type: 'hero',
      accent: 'orange',
      asset: 'images/img_excavator_hero.jpg',
      filename: 'img_excavator_hero.jpg',
      assetDesc: '모래산 옆에서 웃고 있는 귀여운 주황 포크레인 일러스트',
      title: '까꿍! 주황 포크레인이야!',
      soundWord: '영차영차~ 모래를 푹푹 떠요!',
      pillClass: 'sound-word-pill--orange',
      tapHint: '포크레인을 톡! 눌러 보세요',
      popText: '까꿍! 포크레인!',
      speech: '까꿍! 귀여운 주황 포크레인이야! 영차영차, 모래산에서 모래를 푹푹 떠요!',
      soundKind: 'excavator',
      sparkles: ['🧡', '✨', '🌼'],
    },
    {
      id: 'dumptruck',
      type: 'hero',
      accent: 'blue',
      asset: 'images/img_dumptruck_hero.jpg',
      filename: 'img_dumptruck_hero.jpg',
      assetDesc: '공사장 배경의 듬직한 파란 덤프트럭 일러스트',
      title: '까꿍! 파란 덤프트럭이야!',
      soundWord: '빵빵~ 흙을 싣고 씽씽 달려요!',
      pillClass: 'sound-word-pill--blue',
      tapHint: '덤프트럭을 톡! 눌러 보세요',
      popText: '까꿍! 덤프트럭!',
      speech: '까꿍! 듬직한 파란 덤프트럭이야! 빵빵, 모래를 가득 싣고 달려요!',
      soundKind: 'dumptruck',
      sparkles: ['💙', '☁️', '✨'],
    },
    {
      id: 'sleepy',
      type: 'sleepy',
      accent: 'sleepy',
      asset: 'images/img_sleepy_garage.jpg',
      filename: 'img_sleepy_garage.jpg',
      assetDesc: '노을 지는 저녁, 차고 안에서 졸린 눈으로 인사하는 중장비 마무리 일러스트',
      title: '잘 자, 중장비 친구들!',
      soundWord: '반짝반짝~ 내일 또 만나요',
      pillClass: 'sound-word-pill--sleepy',
      tapHint: '하늘을 톡! 누르면 별이 반짝',
      popText: '잘 자요~ 🌙',
      speech: '노을이 졌어요. 잘 자, 중장비 친구들! 내일 또 만나요.',
      soundKind: 'lullaby',
      sparkles: ['🌙', '⭐', '✨'],
    },
  ];

  let currentIndex = 0;
  let soundEnabled = true;
  let isPeekCovered = false;
  let audioCtx = null;

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

  const assetGalleryBtn = document.getElementById('assetGalleryBtn');
  const assetModal = document.getElementById('assetModal');
  const closeAssetModalBtn = document.getElementById('closeAssetModalBtn');
  const assetGrid = document.getElementById('assetGrid');

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

  function playTone(freq, startOffset, duration, type = 'sine', volume = 0.14) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime + startOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function playSoundEffect(kind) {
    if (!soundEnabled) return;
    switch (kind) {
      case 'knock':
        playTone(170, 0, 0.11, 'triangle', 0.22);
        playTone(150, 0.16, 0.11, 'triangle', 0.20);
        playTone(185, 0.32, 0.12, 'triangle', 0.22);
        break;
      case 'peekaboo':
        playTone(523.25, 0, 0.18, 'sine', 0.15);
        playTone(659.25, 0.12, 0.2, 'sine', 0.16);
        playTone(783.99, 0.24, 0.34, 'sine', 0.18);
        break;
      case 'bulldozer':
        playTone(220, 0, 0.16, 'triangle', 0.14);
        playTone(261.63, 0.12, 0.18, 'triangle', 0.15);
        playTone(392.0, 0.25, 0.28, 'sine', 0.15);
        break;
      case 'excavator':
        playTone(329.63, 0, 0.15, 'sine', 0.15);
        playTone(440.0, 0.12, 0.18, 'sine', 0.16);
        playTone(523.25, 0.25, 0.3, 'sine', 0.15);
        break;
      case 'dumptruck':
        playTone(293.66, 0, 0.16, 'triangle', 0.15);
        playTone(369.99, 0.16, 0.26, 'triangle', 0.15);
        break;
      case 'lullaby':
        playTone(523.25, 0, 0.45, 'sine', 0.11);
        playTone(440.0, 0.32, 0.45, 'sine', 0.11);
        playTone(392.0, 0.64, 0.65, 'sine', 0.11);
        break;
      case 'chime':
      default:
        playTone(440, 0, 0.18, 'sine', 0.13);
        playTone(554.37, 0.1, 0.22, 'sine', 0.14);
        playTone(659.25, 0.2, 0.32, 'sine', 0.15);
        break;
    }
  }

  function speakKorean(text) {
    if (!soundEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      utterance.pitch = 1.15;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (_) {
      // Gracefully ignore speech synthesis errors
    }
  }

  function spawnSparkles(clientX, clientY, icons = ['⭐', '✨', '💛']) {
    const count = 6;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'sparkle-item';
      el.textContent = icons[i % icons.length];
      const offsetX = (Math.random() - 0.5) * 140;
      const offsetY = (Math.random() - 0.5) * 90;
      el.style.left = `${clientX + offsetX}px`;
      el.style.top = `${clientY + offsetY}px`;
      el.style.animationDelay = `${i * 45}ms`;
      sparkleLayer.appendChild(el);
      setTimeout(() => el.remove(), 1300);
    }
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

    const showCurtain = scene.type === 'hero';
    bookStage.innerHTML = `
      <section class="story-card">
        <div class="picture-frame" id="pictureFrame" role="button" tabindex="0" aria-label="${scene.title}">
          <img
            class="picture-img ${scene.type === 'door' || scene.type === 'sleepy' ? 'cover-fit' : ''}"
            src="${scene.asset}"
            alt="${scene.assetDesc}"
          />
          ${
            showCurtain
              ? `<div class="peek-curtain ${isPeekCovered ? '' : 'is-open'}" id="peekCurtain">
                  <img src="images/img_garage_door.jpg" alt="따뜻한 나무 차고 문" />
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
            <span aria-hidden="true">🎵</span>
            <span id="soundWordText">${isPeekCovered ? '나무 문을 톡 눌러 열어 보세요!' : scene.soundWord}</span>
          </button>
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

    const revealFromCurtain = (cx, cy) => {
      isPeekCovered = false;
      if (peekCurtain) peekCurtain.classList.add('is-open');
      sceneTitle.textContent = scene.title;
      soundWordText.textContent = scene.soundWord;
      tapHintBadge.textContent = scene.tapHint;
      playSoundEffect('peekaboo');
      showPopBanner(peekabooPop, scene.popText);
      spawnSparkles(cx, cy, scene.sparkles);
      triggerBounce(pictureFrame);
      speakKorean(scene.speech);
      updateChrome();
    };

    const handleFrameTap = (e) => {
      const rect = pictureFrame.getBoundingClientRect();
      const cx = e.clientX || rect.left + rect.width / 2;
      const cy = e.clientY || rect.top + rect.height / 2;

      if (scene.type === 'door') {
        playSoundEffect('knock');
        pictureFrame.classList.remove('is-knocking');
        void pictureFrame.offsetWidth;
        pictureFrame.classList.add('is-knocking');
        showPopBanner(peekabooPop, '똑똑똑!');
        spawnSparkles(cx, cy, ['🚪', '✨', '💛']);
        speakKorean('똑똑똑! 누구세요? 까꿍!');
        setTimeout(() => {
          if (currentIndex === 1) {
            goToScene(2, false, true);
          }
        }, 680);
        return;
      }

      if (scene.type === 'hero' && isPeekCovered) {
        revealFromCurtain(cx, cy);
        return;
      }

      playSoundEffect(scene.soundKind);
      triggerBounce(pictureFrame);
      showPopBanner(peekabooPop, scene.popText);
      spawnSparkles(cx, cy, scene.sparkles);
      speakKorean(scene.speech);
    };

    pictureFrame.addEventListener('click', handleFrameTap);
    pictureFrame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleFrameTap(e);
      }
    });

    soundWordPill.addEventListener('click', (e) => {
      const rect = soundWordPill.getBoundingClientRect();
      if (scene.type === 'hero' && isPeekCovered) {
        revealFromCurtain(rect.left + rect.width / 2, rect.top);
      } else {
        playSoundEffect(scene.soundKind);
        speakKorean(scene.speech);
        spawnSparkles(rect.left + rect.width / 2, rect.top, scene.sparkles || ['✨', '💛']);
      }
    });

    if (scene.type === 'sleepy') {
      playSoundEffect('lullaby');
    }
  }

  function triggerBounce(el) {
    el.classList.remove('is-bouncing');
    void el.offsetWidth;
    el.classList.add('is-bouncing');
  }

  function goToScene(index, startCovered = false, celebrateOnArrival = false) {
    if (index < 0 || index >= SCENES.length) return;
    currentIndex = index;
    renderScene(startCovered);

    const scene = SCENES[currentIndex];
    if (celebrateOnArrival && scene.type === 'hero') {
      const popEl = document.getElementById('peekabooPop');
      const frame = document.getElementById('pictureFrame');
      playSoundEffect('peekaboo');
      showPopBanner(popEl, scene.popText);
      if (frame) triggerBounce(frame);
      spawnSparkles(window.innerWidth / 2, window.innerHeight * 0.42, scene.sparkles);
      speakKorean(scene.speech);
    } else if (!startCovered && scene.type !== 'cover') {
      speakKorean(scene.speech);
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
    // For Excavator and Dump Truck, start behind the peek-a-boo wooden door for extra toddler joy!
    const shouldCover = nextScene.id === 'excavator' || nextScene.id === 'dumptruck';
    playSoundEffect('chime');
    goToScene(currentIndex + 1, shouldCover);
  });

  peekToggleBtn.addEventListener('click', () => {
    const scene = SCENES[currentIndex];
    if (scene.type !== 'hero') return;
    const peekCurtain = document.getElementById('peekCurtain');
    const sceneTitle = document.getElementById('sceneTitle');
    const soundWordText = document.getElementById('soundWordText');
    const tapHintBadge = document.getElementById('tapHintBadge');
    const peekabooPop = document.getElementById('peekabooPop');
    const frame = document.getElementById('pictureFrame');

    isPeekCovered = !isPeekCovered;
    if (peekCurtain) {
      peekCurtain.classList.toggle('is-open', !isPeekCovered);
    }
    if (isPeekCovered) {
      playSoundEffect('knock');
      sceneTitle.textContent = '똑똑똑! 이번엔 누가 숨었을까?';
      soundWordText.textContent = '나무 문을 톡 눌러 열어 보세요!';
      tapHintBadge.textContent = '똑똑똑! 문을 톡 눌러 까꿍!';
      speakKorean('어디 갔지? 문을 눌러 까꿍 해 보세요!');
    } else {
      playSoundEffect('peekaboo');
      sceneTitle.textContent = scene.title;
      soundWordText.textContent = scene.soundWord;
      tapHintBadge.textContent = scene.tapHint;
      showPopBanner(peekabooPop, scene.popText);
      if (frame) triggerBounce(frame);
      spawnSparkles(window.innerWidth / 2, window.innerHeight * 0.42, scene.sparkles);
      speakKorean(scene.speech);
    }
    updateChrome();
  });

  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggleBtn.setAttribute('aria-pressed', String(soundEnabled));
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    soundLabel.textContent = soundEnabled ? '소리 켜짐' : '소리 꺼짐';
    if (!soundEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    } else if (soundEnabled) {
      playSoundEffect('chime');
    }
  });

  // Asset Gallery Modal
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
    if (!assetModal.hidden && e.key === 'Escape') {
      assetModal.hidden = true;
      return;
    }
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });

  // Initial render
  renderScene(false);
})();
