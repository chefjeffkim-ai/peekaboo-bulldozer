(() => {
  'use strict';

  // Handcrafted warm pastel storybook SVG illustrations for 1-3yo visual learners (#FFFDF7 palette, soft cocoa stroke #6E5847)
  const S = 'stroke="#6E5847" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"';
  const FACE = (cx, cy, r = 3.2) => `
    <circle cx="${cx - 11}" cy="${cy}" r="${r}" fill="#574537"/>
    <circle cx="${cx - 12}" cy="${cy - 1}" r="${r * 0.35}" fill="#FFFDF7"/>
    <circle cx="${cx + 11}" cy="${cy}" r="${r}" fill="#574537"/>
    <circle cx="${cx + 10}" cy="${cy - 1}" r="${r * 0.35}" fill="#FFFDF7"/>
    <ellipse cx="${cx - 18}" cy="${cy + 5}" rx="5" ry="3" fill="#F6B2A6" opacity="0.72"/>
    <ellipse cx="${cx + 18}" cy="${cy + 5}" rx="5" ry="3" fill="#F6B2A6" opacity="0.72"/>
    <path d="M ${cx - 5} ${cy + 5} Q ${cx} ${cy + 11} ${cx + 5} ${cy + 5}" fill="none" stroke="#574537" stroke-width="2.6" stroke-linecap="round"/>
  `;

  window.AZ_WORDS = [
    {
      letter: 'A', lower: 'a', word: 'Apple', ko: '사과', audioId: 'az_a',
      sentence: 'A! Apple! Crunch, crunch!',
      pop: '아삭아삭! Crunch!',
      sfx: 'az_crunch', anim: 'anim-bounce', accent: '#F4A9A0', bg: '#FFF3F0',
      sparkles: ['🍎', '✨', '💚'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="148" rx="52" ry="11" fill="#EFE4D2"/>
        <path d="M100 44 C72 34 46 58 48 94 C50 128 74 146 100 142 C126 146 150 128 152 94 C154 58 128 34 100 44 Z" fill="#F6A69B" ${S}/>
        <path d="M70 64 Q62 78 65 92" fill="none" stroke="#FFFDF7" stroke-width="4.5" stroke-linecap="round" opacity="0.7"/>
        <path d="M100 46 Q102 28 110 22" fill="none" stroke="#8C684C" stroke-width="5" stroke-linecap="round"/>
        <path d="M105 32 Q128 18 136 34 Q120 44 105 32 Z" fill="#B5D8A9" ${S}/>
        ${FACE(100, 96, 3.6)}
      </svg>`
    },
    {
      letter: 'B', lower: 'b', word: 'Bulldozer', ko: '불도저', audioId: 'az_b',
      sentence: 'B! Bulldozer! Rumble-rumble!',
      pop: '부르르~ Rumble!',
      sfx: 'engine_rumble', anim: 'anim-rumble', accent: '#EBC968', bg: '#FFF9E8',
      sparkles: ['🚜', '💛', '💨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="102" cy="146" rx="68" ry="11" fill="#EFE4D2"/>
        <rect x="64" y="54" width="66" height="58" rx="18" fill="#FCE08B" ${S}/>
        <rect x="74" y="64" width="38" height="30" rx="10" fill="#FFFDF7" ${S}/>
        <rect x="122" y="74" width="32" height="38" rx="12" fill="#F8D26E" ${S}/>
        <rect x="136" y="52" width="10" height="24" rx="5" fill="#C9BEB0" ${S}/>
        <path d="M34 84 Q34 126 56 126 L68 126 L68 92 L50 84 Z" fill="#F5C76B" ${S}/>
        <line x1="66" y1="108" x2="84" y2="108" ${S}/>
        <rect x="70" y="110" width="84" height="32" rx="16" fill="#C8B9A6" ${S}/>
        <circle cx="88" cy="126" r="10" fill="#FFF7E4" ${S}/>
        <circle cx="112" cy="126" r="8" fill="#FFF7E4" ${S}/>
        <circle cx="136" cy="126" r="10" fill="#FFF7E4" ${S}/>
        ${FACE(93, 79, 2.8)}
      </svg>`
    },
    {
      letter: 'C', lower: 'c', word: 'Car', ko: '자동차', audioId: 'az_c',
      sentence: 'C! Car! Beep-beep!',
      pop: '빵빵! Beep-beep!',
      sfx: 'beep_beep', anim: 'anim-push-right', accent: '#9CC7E6', bg: '#F0F7FC',
      sparkles: ['🚗', '💙', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="146" rx="68" ry="10" fill="#EFE4D2"/>
        <path d="M40 116 L44 92 Q48 78 66 76 L80 54 Q90 46 116 46 Q134 46 142 66 L154 78 Q166 84 166 102 L166 116 Q166 126 154 126 L52 126 Q40 126 40 116 Z" fill="#B5D8F0" ${S}/>
        <path d="M84 56 L116 56 Q128 56 134 74 L74 74 Z" fill="#FFFDF7" ${S}/>
        <circle cx="156" cy="100" r="8" fill="#FCE69C" ${S}/>
        <circle cx="68" cy="126" r="18" fill="#A6998C" ${S}/>
        <circle cx="68" cy="126" r="8" fill="#FFF9EC" ${S}/>
        <circle cx="136" cy="126" r="18" fill="#A6998C" ${S}/>
        <circle cx="136" cy="126" r="8" fill="#FFF9EC" ${S}/>
        ${FACE(104, 96, 3)}
      </svg>`
    },
    {
      letter: 'D', lower: 'd', word: 'Dog', ko: '강아지', audioId: 'az_d',
      sentence: 'D! Dog! Woof-woof!',
      pop: '멍멍! Woof-woof!',
      sfx: 'az_woof', anim: 'anim-bounce', accent: '#DDB38B', bg: '#FDF6EE',
      sparkles: ['🐶', '🦴', '💛'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="148" rx="54" ry="10" fill="#EFE4D2"/>
        <ellipse cx="52" cy="84" rx="18" ry="34" transform="rotate(14 52 84)" fill="#D8AD86" ${S}/>
        <ellipse cx="148" cy="84" rx="18" ry="34" transform="rotate(-14 148 84)" fill="#D8AD86" ${S}/>
        <rect x="64" y="114" width="72" height="32" rx="16" fill="#EAD0B3" ${S}/>
        <circle cx="100" cy="84" r="44" fill="#F2DEC6" ${S}/>
        <ellipse cx="100" cy="96" rx="20" ry="14" fill="#FFFDF7"/>
        <ellipse cx="100" cy="90" rx="8" ry="6" fill="#6E5847"/>
        <path d="M92 98 Q100 106 108 98" fill="none" stroke="#6E5847" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M96 102 Q100 113 104 102" fill="#F4A9A0" stroke="#6E5847" stroke-width="2"/>
        <circle cx="84" cy="78" r="4" fill="#574537"/><circle cx="83" cy="76.5" r="1.4" fill="#FFFDF7"/>
        <circle cx="116" cy="78" r="4" fill="#574537"/><circle cx="115" cy="76.5" r="1.4" fill="#FFFDF7"/>
        <ellipse cx="74" cy="88" rx="6" ry="3.5" fill="#F6B2A6" opacity="0.7"/>
        <ellipse cx="126" cy="88" rx="6" ry="3.5" fill="#F6B2A6" opacity="0.7"/>
      </svg>`
    },
    {
      letter: 'E', lower: 'e', word: 'Elephant', ko: '코끼리', audioId: 'az_e',
      sentence: 'E! Elephant! Pawoo!',
      pop: '뿌우~! Pawoo!',
      sfx: 'az_elephant', anim: 'anim-swivel', accent: '#A8C5DE', bg: '#F2F7FB',
      sparkles: ['🐘', '💙', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="148" rx="58" ry="10" fill="#EFE4D2"/>
        <ellipse cx="52" cy="84" rx="28" ry="36" fill="#C4DAEA" ${S}/>
        <ellipse cx="54" cy="86" rx="16" ry="22" fill="#F5D3CF"/>
        <ellipse cx="148" cy="84" rx="28" ry="36" fill="#C4DAEA" ${S}/>
        <ellipse cx="146" cy="86" rx="16" ry="22" fill="#F5D3CF"/>
        <circle cx="100" cy="86" r="44" fill="#CBE0F0" ${S}/>
        <path d="M92 98 Q92 134 114 134 Q124 134 124 124 Q124 116 116 118 Q108 120 108 98" fill="#CBE0F0" ${S}/>
        <circle cx="84" cy="78" r="4" fill="#574537"/><circle cx="83" cy="76.5" r="1.4" fill="#FFFDF7"/>
        <circle cx="116" cy="78" r="4" fill="#574537"/><circle cx="115" cy="76.5" r="1.4" fill="#FFFDF7"/>
        <ellipse cx="75" cy="90" rx="6" ry="3.5" fill="#F6B2A6" opacity="0.7"/>
        <ellipse cx="125" cy="90" rx="6" ry="3.5" fill="#F6B2A6" opacity="0.7"/>
      </svg>`
    },
    {
      letter: 'F', lower: 'f', word: 'Fish', ko: '물고기', audioId: 'az_f',
      sentence: 'F! Fish! Splash, splash!',
      pop: '첨벙첨벙! Splash!',
      sfx: 'az_splash', anim: 'anim-swivel', accent: '#8CC4DE', bg: '#EFF8FC',
      sparkles: ['🐟', '🫧', '💧'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <circle cx="162" cy="46" r="7" fill="#D4ECF7" ${S}/>
        <circle cx="172" cy="30" r="4.5" fill="#D4ECF7" ${S}/>
        <path d="M56 88 L26 60 Q22 88 26 116 Z" fill="#F8C699" ${S}/>
        <path d="M98 46 Q116 32 126 52" fill="#F8C699" ${S}/>
        <ellipse cx="108" cy="88" rx="54" ry="38" fill="#A6D4EC" ${S}/>
        <path d="M100 54 Q112 88 100 122" fill="none" stroke="#FFFDF7" stroke-width="4" opacity="0.65"/>
        <path d="M84 56 Q96 88 84 120" fill="none" stroke="#FFFDF7" stroke-width="4" opacity="0.65"/>
        <circle cx="136" cy="82" r="4.5" fill="#574537"/><circle cx="135" cy="80.5" r="1.5" fill="#FFFDF7"/>
        <ellipse cx="130" cy="92" rx="6" ry="3.5" fill="#F6B2A6" opacity="0.75"/>
        <path d="M144 94 Q152 99 156 93" fill="none" stroke="#574537" stroke-width="2.6" stroke-linecap="round"/>
      </svg>`
    },
    {
      letter: 'G', lower: 'g', word: 'Grapes', ko: '포도', audioId: 'az_g',
      sentence: 'G! Grapes! Yummy, yummy!',
      pop: '냠냠! Yummy!',
      sfx: 'yay_bounce', anim: 'anim-jelly', accent: '#BCA4D9', bg: '#F7F3FC',
      sparkles: ['🍇', '💜', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="150" rx="44" ry="9" fill="#EFE4D2"/>
        <path d="M100 44 Q102 24 114 20" fill="none" stroke="#8C684C" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M104 30 Q128 20 134 38 Q116 44 104 30 Z" fill="#B5D8A9" ${S}/>
        <circle cx="76" cy="64" r="18" fill="#CCB9E6" ${S}/>
        <circle cx="100" cy="62" r="18" fill="#D7C6EE" ${S}/>
        <circle cx="124" cy="64" r="18" fill="#CCB9E6" ${S}/>
        <circle cx="84" cy="90" r="18" fill="#D7C6EE" ${S}/>
        <circle cx="116" cy="90" r="18" fill="#CCB9E6" ${S}/>
        <circle cx="100" cy="116" r="19" fill="#C4AEE2" ${S}/>
        ${FACE(100, 88, 2.8)}
      </svg>`
    },
    {
      letter: 'H', lower: 'h', word: 'Hat', ko: '모자', audioId: 'az_h',
      sentence: 'H! Hat! Put it on!',
      pop: '쏙! Put it on!',
      sfx: 'chime', anim: 'anim-bounce', accent: '#E6B97A', bg: '#FDF8EE',
      sparkles: ['👒', '🌼', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="142" rx="68" ry="11" fill="#EFE4D2"/>
        <ellipse cx="100" cy="114" rx="74" ry="20" fill="#F8DCA4" ${S}/>
        <path d="M54 108 C54 54 146 54 146 108 Z" fill="#FCE5B6" ${S}/>
        <path d="M55 96 Q100 108 145 96 L146 108 Q100 120 54 108 Z" fill="#F4A9A0" ${S}/>
        <circle cx="132" cy="100" r="9" fill="#FFFDF7" ${S}/>
        <circle cx="132" cy="100" r="4" fill="#F5C76B"/>
        ${FACE(96, 80, 3)}
      </svg>`
    },
    {
      letter: 'I', lower: 'i', word: 'Ice cream', ko: '아이스크림', audioId: 'az_i',
      sentence: 'I! Ice cream! So sweet!',
      pop: '달콤해! So sweet!',
      sfx: 'yay_bounce', anim: 'anim-jelly', accent: '#F2B4C2', bg: '#FFF4F6',
      sparkles: ['🍦', '🍓', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="152" rx="34" ry="8" fill="#EFE4D2"/>
        <path d="M72 90 L100 150 L128 90 Z" fill="#EAC696" ${S}/>
        <line x1="82" y1="108" x2="118" y2="108" stroke="#C49A6C" stroke-width="2.2"/>
        <line x1="90" y1="126" x2="110" y2="126" stroke="#C49A6C" stroke-width="2.2"/>
        <circle cx="100" cy="70" r="36" fill="#FAD1DC" ${S}/>
        <circle cx="76" cy="86" r="13" fill="#FAD1DC" ${S}/>
        <circle cx="100" cy="90" r="14" fill="#FAD1DC" ${S}/>
        <circle cx="124" cy="86" r="13" fill="#FAD1DC" ${S}/>
        <circle cx="100" cy="30" r="10" fill="#F28F8B" ${S}/>
        ${FACE(100, 68, 3.2)}
      </svg>`
    },
    {
      letter: 'J', lower: 'j', word: 'Jelly', ko: '젤리', audioId: 'az_j',
      sentence: 'J! Jelly! Boing, boing!',
      pop: '출렁출렁! Boing!',
      sfx: 'jelly_boing', anim: 'anim-jelly', accent: '#F2A59B', bg: '#FFF3F1',
      sparkles: ['🍮', '✨', '💛'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="136" rx="70" ry="16" fill="#FFFDF7" ${S}/>
        <path d="M52 132 L64 62 Q70 46 100 46 Q130 46 136 62 L148 132 Q100 144 52 132 Z" fill="#FBE09B" ${S}/>
        <path d="M63 66 Q70 46 100 46 Q130 46 137 66 Q126 78 114 68 Q100 80 86 68 Q74 78 63 66 Z" fill="#D59B76" ${S}/>
        <circle cx="100" cy="38" r="9" fill="#F2948E" ${S}/>
        ${FACE(100, 102, 3.3)}
      </svg>`
    },
    {
      letter: 'K', lower: 'k', word: 'Kite', ko: '연', audioId: 'az_k',
      sentence: 'K! Kite! Fly up high!',
      pop: '훨훨! Fly up high!',
      sfx: 'swivel_whir', anim: 'anim-swivel', accent: '#9CC7E6', bg: '#F0F7FC',
      sparkles: ['🪁', '☁️', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 120 Q92 142 114 148 Q134 154 144 142" fill="none" stroke="#857060" stroke-width="3" stroke-linecap="round"/>
        <polygon points="100,24 146,72 100,122 54,72" fill="#FCE39D" ${S}/>
        <polygon points="100,24 146,72 100,72" fill="#F8C6B0" ${S}/>
        <polygon points="54,72 100,122 100,72" fill="#B8D9EE" ${S}/>
        <polygon points="108,136 122,140 116,152" fill="#F4A9A0" ${S}/>
        <polygon points="130,144 144,136 144,152" fill="#B5D8A9" ${S}/>
        ${FACE(100, 74, 2.8)}
      </svg>`
    },
    {
      letter: 'L', lower: 'l', word: 'Lion', ko: '사자', audioId: 'az_l',
      sentence: 'L! Lion! Roar!',
      pop: '어흥! Roar!',
      sfx: 'az_roar', anim: 'anim-rumble', accent: '#E8B36F', bg: '#FDF6EA',
      sparkles: ['🦁', '🧡', '⭐'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="150" rx="54" ry="9" fill="#EFE4D2"/>
        <g fill="#EBB478" ${S}>
          <circle cx="100" cy="40" r="18"/><circle cx="132" cy="52" r="18"/>
          <circle cx="146" cy="84" r="18"/><circle cx="132" cy="116" r="18"/>
          <circle cx="100" cy="128" r="18"/><circle cx="68" cy="116" r="18"/>
          <circle cx="54" cy="84" r="18"/><circle cx="68" cy="52" r="18"/>
        </g>
        <circle cx="100" cy="84" r="38" fill="#FBE09B" ${S}/>
        <polygon points="94,90 106,90 100,97" fill="#6E5847"/>
        <path d="M92 100 Q100 107 108 100" fill="none" stroke="#6E5847" stroke-width="2.6" stroke-linecap="round"/>
        <circle cx="86" cy="78" r="3.8" fill="#574537"/><circle cx="85" cy="76.5" r="1.3" fill="#FFFDF7"/>
        <circle cx="114" cy="78" r="3.8" fill="#574537"/><circle cx="113" cy="76.5" r="1.3" fill="#FFFDF7"/>
        <ellipse cx="77" cy="88" rx="5.5" ry="3.2" fill="#F6B2A6" opacity="0.72"/>
        <ellipse cx="123" cy="88" rx="5.5" ry="3.2" fill="#F6B2A6" opacity="0.72"/>
      </svg>`
    },
    {
      letter: 'M', lower: 'm', word: 'Monkey', ko: '원숭이', audioId: 'az_m',
      sentence: 'M! Monkey! Ooh-ooh, aah-aah!',
      pop: '우끼끼! Ooh-ooh!',
      sfx: 'az_monkey', anim: 'anim-bounce', accent: '#CCA383', bg: '#FBF5EE',
      sparkles: ['🐵', '🍌', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="148" rx="52" ry="9" fill="#EFE4D2"/>
        <circle cx="52" cy="82" r="18" fill="#C99E7B" ${S}/>
        <circle cx="52" cy="82" r="10" fill="#F7DEC4"/>
        <circle cx="148" cy="82" r="18" fill="#C99E7B" ${S}/>
        <circle cx="148" cy="82" r="10" fill="#F7DEC4"/>
        <circle cx="100" cy="84" r="44" fill="#C99E7B" ${S}/>
        <path d="M68 88 C68 62 94 62 100 74 C106 62 132 62 132 88 C132 114 114 124 100 124 C86 124 68 114 68 88 Z" fill="#F7DEC4"/>
        ${FACE(100, 92, 3.6)}
      </svg>`
    },
    {
      letter: 'N', lower: 'n', word: 'Nose', ko: '코', audioId: 'az_n',
      sentence: 'N! Nose! Boop!',
      pop: '콕! Boop!',
      sfx: 'az_boop', anim: 'anim-jelly', accent: '#F2B2A2', bg: '#FFF5F2',
      sparkles: ['👃', '✨', '💛'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="86" r="56" fill="#FCE3CE" ${S}/>
        <path d="M74 72 Q82 64 90 72" fill="none" stroke="#574537" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M110 72 Q118 64 126 72" fill="none" stroke="#574537" stroke-width="3.2" stroke-linecap="round"/>
        <ellipse cx="70" cy="92" rx="9" ry="5.5" fill="#F6B2A6" opacity="0.72"/>
        <ellipse cx="130" cy="92" rx="9" ry="5.5" fill="#F6B2A6" opacity="0.72"/>
        <circle cx="100" cy="90" r="13" fill="#F4A599" ${S}/>
        <circle cx="96" cy="86" r="3.5" fill="#FFFDF7" opacity="0.8"/>
        <path d="M88 112 Q100 122 112 112" fill="none" stroke="#574537" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    {
      letter: 'O', lower: 'o', word: 'Orange', ko: '오렌지', audioId: 'az_o',
      sentence: 'O! Orange! Juicy!',
      pop: '상큼해! Juicy!',
      sfx: 'chime', anim: 'anim-bounce', accent: '#F2AE79', bg: '#FFF6EE',
      sparkles: ['🍊', '🧡', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="148" rx="48" ry="10" fill="#EFE4D2"/>
        <circle cx="100" cy="92" r="48" fill="#FBC48C" ${S}/>
        <circle cx="72" cy="74" r="3" fill="#E89D5C" opacity="0.6"/>
        <circle cx="128" cy="108" r="3" fill="#E89D5C" opacity="0.6"/>
        <circle cx="124" cy="70" r="2.5" fill="#E89D5C" opacity="0.6"/>
        <path d="M100 44 Q102 28 110 24" fill="none" stroke="#8C684C" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M104 34 Q126 22 134 36 Q118 46 104 34 Z" fill="#B5D8A9" ${S}/>
        ${FACE(100, 94, 3.6)}
      </svg>`
    },
    {
      letter: 'P', lower: 'p', word: 'Pig', ko: '돼지', audioId: 'az_p',
      sentence: 'P! Pig! Oink-oink!',
      pop: '꿀꿀! Oink-oink!',
      sfx: 'az_oink', anim: 'anim-bounce', accent: '#F2AEC0', bg: '#FFF3F6',
      sparkles: ['🐷', '🩷', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="148" rx="52" ry="9" fill="#EFE4D2"/>
        <path d="M62 60 L54 32 L84 48 Z" fill="#F8C4D2" ${S}/>
        <path d="M138 60 L146 32 L116 48 Z" fill="#F8C4D2" ${S}/>
        <circle cx="100" cy="88" r="46" fill="#FAD2DD" ${S}/>
        <ellipse cx="100" cy="96" rx="19" ry="13" fill="#F4AFC1" ${S}/>
        <circle cx="94" cy="96" r="3" fill="#6E5847"/>
        <circle cx="106" cy="96" r="3" fill="#6E5847"/>
        <circle cx="82" cy="76" r="4" fill="#574537"/><circle cx="81" cy="74.5" r="1.4" fill="#FFFDF7"/>
        <circle cx="118" cy="76" r="4" fill="#574537"/><circle cx="117" cy="74.5" r="1.4" fill="#FFFDF7"/>
        <path d="M92 114 Q100 120 108 114" fill="none" stroke="#574537" stroke-width="2.6" stroke-linecap="round"/>
      </svg>`
    },
    {
      letter: 'Q', lower: 'q', word: 'Queen', ko: '여왕님', audioId: 'az_q',
      sentence: 'Q! Queen! Sparkle, sparkle!',
      pop: '반짝반짝! Sparkle!',
      sfx: 'yay_bounce', anim: 'anim-flash', accent: '#DFBA73', bg: '#FDF8EC',
      sparkles: ['👑', '✨', '🌟'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="146" rx="54" ry="9" fill="#EFE4D2"/>
        <path d="M46 122 L56 58 L82 88 L100 44 L118 88 L144 58 L154 122 Z" fill="#FCE08B" ${S}/>
        <rect x="46" y="114" width="108" height="16" rx="8" fill="#F4C967" ${S}/>
        <circle cx="56" cy="54" r="6" fill="#F4A9A0" ${S}/>
        <circle cx="100" cy="40" r="7.5" fill="#B5D8F0" ${S}/>
        <circle cx="144" cy="54" r="6" fill="#F4A9A0" ${S}/>
        <circle cx="100" cy="98" r="7" fill="#F4A9A0" ${S}/>
        <circle cx="72" cy="102" r="5" fill="#C9B6E4" ${S}/>
        <circle cx="128" cy="102" r="5" fill="#C9B6E4" ${S}/>
      </svg>`
    },
    {
      letter: 'R', lower: 'r', word: 'Rabbit', ko: '토끼', audioId: 'az_r',
      sentence: 'R! Rabbit! Hop, hop, hop!',
      pop: '깡충깡충! Hop, hop!',
      sfx: 'az_hop', anim: 'anim-bounce', accent: '#E8B8C4', bg: '#FDF6F8',
      sparkles: ['🐰', '🥕', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="150" rx="48" ry="9" fill="#EFE4D2"/>
        <ellipse cx="82" cy="48" rx="13" ry="34" transform="rotate(-8 82 48)" fill="#FFFDF7" ${S}/>
        <ellipse cx="82" cy="50" rx="6" ry="22" transform="rotate(-8 82 50)" fill="#FAD2DD"/>
        <ellipse cx="118" cy="48" rx="13" ry="34" transform="rotate(8 118 48)" fill="#FFFDF7" ${S}/>
        <ellipse cx="118" cy="50" rx="6" ry="22" transform="rotate(8 118 50)" fill="#FAD2DD"/>
        <circle cx="100" cy="104" r="40" fill="#FFFDF7" ${S}/>
        <ellipse cx="100" cy="108" rx="5" ry="3.5" fill="#F29EA8"/>
        ${FACE(100, 102, 3.5)}
      </svg>`
    },
    {
      letter: 'S', lower: 's', word: 'Sun', ko: '해님', audioId: 'az_s',
      sentence: 'S! Sun! Good morning!',
      pop: '안녕! Good morning!',
      sfx: 'chime', anim: 'anim-flash', accent: '#F0C562', bg: '#FFFBEB',
      sparkles: ['☀️', '💛', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#F3C567" stroke-width="7" stroke-linecap="round">
          <line x1="100" y1="18" x2="100" y2="34"/><line x1="100" y1="138" x2="100" y2="154"/>
          <line x1="32" y1="86" x2="48" y2="86"/><line x1="152" y1="86" x2="168" y2="86"/>
          <line x1="52" y1="38" x2="64" y2="50"/><line x1="136" y1="122" x2="148" y2="134"/>
          <line x1="148" y1="38" x2="136" y2="50"/><line x1="64" y1="122" x2="52" y2="134"/>
        </g>
        <circle cx="100" cy="86" r="42" fill="#FCE38F" ${S}/>
        ${FACE(100, 86, 3.6)}
      </svg>`
    },
    {
      letter: 'T', lower: 't', word: 'Truck', ko: '트럭', audioId: 'az_t',
      sentence: 'T! Truck! Honk-honk!',
      pop: '빵빵! Honk-honk!',
      sfx: 'truck_honk', anim: 'anim-dump', accent: '#8FBDE0', bg: '#F0F7FC',
      sparkles: ['🚚', '💙', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="146" rx="68" ry="10" fill="#EFE4D2"/>
        <path d="M36 68 L108 68 L102 118 L44 118 Z" fill="#B5D8F0" ${S}/>
        <rect x="108" y="64" width="52" height="56" rx="14" fill="#A0CBE8" ${S}/>
        <rect x="122" y="72" width="30" height="24" rx="8" fill="#FFFDF7" ${S}/>
        <circle cx="68" cy="124" r="18" fill="#A6998C" ${S}/><circle cx="68" cy="124" r="8" fill="#FFF9EC" ${S}/>
        <circle cx="136" cy="124" r="18" fill="#A6998C" ${S}/><circle cx="136" cy="124" r="8" fill="#FFF9EC" ${S}/>
        ${FACE(137, 84, 2.4)}
      </svg>`
    },
    {
      letter: 'U', lower: 'u', word: 'Umbrella', ko: '우산', audioId: 'az_u',
      sentence: 'U! Umbrella! Rain, rain!',
      pop: '주룩주룩! Rain, rain!',
      sfx: 'az_rain', anim: 'anim-swivel', accent: '#9ABFE2', bg: '#F1F7FC',
      sparkles: ['☂️', '💧', '☁️'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 32 L100 132 Q100 146 86 146 Q74 146 74 134" fill="none" stroke="#8C684C" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M34 94 C34 44 166 44 166 94 Q146 84 128 94 Q114 84 100 94 Q86 84 72 94 Q54 84 34 94 Z" fill="#C2DCF2" ${S}/>
        <path d="M72 94 C72 52 128 52 128 94 Q114 84 100 94 Q86 84 72 94 Z" fill="#FCE39D" ${S}/>
        <circle cx="52" cy="36" r="4" fill="#A6D4EC"/><circle cx="148" cy="40" r="4" fill="#A6D4EC"/><circle cx="164" cy="62" r="3.5" fill="#A6D4EC"/>
        ${FACE(100, 72, 2.8)}
      </svg>`
    },
    {
      letter: 'V', lower: 'v', word: 'Van', ko: '승합차', audioId: 'az_v',
      sentence: 'V! Van! Vroom-vroom!',
      pop: '부릉부릉! Vroom!',
      sfx: 'engine_vroom', anim: 'anim-push-right', accent: '#9EC9A8', bg: '#F2F9F3',
      sparkles: ['🚐', '💚', '💨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="146" rx="68" ry="10" fill="#EFE4D2"/>
        <rect x="38" y="54" width="124" height="68" rx="22" fill="#C4E2C2" ${S}/>
        <rect x="52" y="66" width="34" height="24" rx="8" fill="#FFFDF7" ${S}/>
        <rect x="94" y="66" width="54" height="24" rx="8" fill="#FFFDF7" ${S}/>
        <circle cx="152" cy="104" r="6" fill="#FCE69C" ${S}/>
        <circle cx="68" cy="124" r="17" fill="#A6998C" ${S}/><circle cx="68" cy="124" r="7.5" fill="#FFF9EC" ${S}/>
        <circle cx="134" cy="124" r="17" fill="#A6998C" ${S}/><circle cx="134" cy="124" r="7.5" fill="#FFF9EC" ${S}/>
        ${FACE(121, 78, 2.5)}
      </svg>`
    },
    {
      letter: 'W', lower: 'w', word: 'Water', ko: '물', audioId: 'az_w',
      sentence: 'W! Water! Gulp, gulp!',
      pop: '꿀꺽꿀꺽! Gulp!',
      sfx: 'az_splash', anim: 'anim-jelly', accent: '#8CC4DE', bg: '#EFF8FC',
      sparkles: ['💧', '🫧', '💙'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="150" rx="44" ry="9" fill="#EFE4D2"/>
        <path d="M100 24 C100 24 54 78 54 106 C54 132 74 148 100 148 C126 148 146 132 146 106 C146 78 100 24 100 24 Z" fill="#B5DDF2" ${S}/>
        <path d="M74 96 Q70 112 78 122" fill="none" stroke="#FFFDF7" stroke-width="5" stroke-linecap="round" opacity="0.75"/>
        ${FACE(100, 108, 3.6)}
      </svg>`
    },
    {
      letter: 'X', lower: 'x', word: 'Xylophone', ko: '실로폰', audioId: 'az_x',
      sentence: 'X! Xylophone! Ding-dong-dang!',
      pop: '딩동댕! Ding-dong-dang!',
      sfx: 'az_xylophone', anim: 'anim-bounce', accent: '#E5A8B8', bg: '#FDF5F7',
      sparkles: ['🎵', '🎶', '✨'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="146" rx="70" ry="10" fill="#EFE4D2"/>
        <line x1="36" y1="84" x2="164" y2="84" stroke="#B6997D" stroke-width="8" stroke-linecap="round"/>
        <line x1="36" y1="114" x2="164" y2="114" stroke="#B6997D" stroke-width="8" stroke-linecap="round"/>
        <rect x="42" y="46" width="20" height="92" rx="10" fill="#F6A69B" ${S}/>
        <rect x="68" y="54" width="20" height="80" rx="10" fill="#FAD09F" ${S}/>
        <rect x="94" y="62" width="20" height="68" rx="10" fill="#FCE69C" ${S}/>
        <rect x="120" y="70" width="20" height="56" rx="10" fill="#BFE0B8" ${S}/>
        <rect x="146" y="76" width="20" height="46" rx="10" fill="#B5D8F0" ${S}/>
        <line x1="126" y1="22" x2="96" y2="54" stroke="#8C684C" stroke-width="4" stroke-linecap="round"/>
        <circle cx="94" cy="56" r="8" fill="#F4A9A0" ${S}/>
      </svg>`
    },
    {
      letter: 'Y', lower: 'y', word: 'Yo-yo', ko: '요요', audioId: 'az_y',
      sentence: 'Y! Yo-yo! Up and down!',
      pop: '올라갔다 내려갔다! Up & down!',
      sfx: 'swivel_whir', anim: 'anim-bounce', accent: '#E6B28B', bg: '#FDF6F0',
      sparkles: ['🪀', '✨', '💛'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <line x1="100" y1="14" x2="100" y2="66" stroke="#857060" stroke-width="3.2" stroke-dasharray="5 4"/>
        <circle cx="100" cy="18" r="7" fill="none" stroke="#857060" stroke-width="3"/>
        <circle cx="100" cy="104" r="44" fill="#F8C699" ${S}/>
        <circle cx="100" cy="104" r="30" fill="#FCE69C" ${S}/>
        ${FACE(100, 104, 3.2)}
      </svg>`
    },
    {
      letter: 'Z', lower: 'z', word: 'Zebra', ko: '얼룩말', audioId: 'az_z',
      sentence: 'Z! Zebra! Gallop, gallop!',
      pop: '따그닥! Gallop, gallop!',
      sfx: 'az_gallop', anim: 'anim-push-right', accent: '#A8A0B8', bg: '#F6F5FA',
      sparkles: ['🦓', '✨', '⭐'],
      svg: `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="150" rx="50" ry="9" fill="#EFE4D2"/>
        <path d="M74 50 L62 24 L90 42 Z" fill="#FFFDF7" ${S}/>
        <path d="M126 50 L138 24 L110 42 Z" fill="#FFFDF7" ${S}/>
        <path d="M90 38 Q100 22 110 38" fill="#7D7268" ${S}/>
        <rect x="64" y="46" width="72" height="92" rx="34" fill="#FFFDF7" ${S}/>
        <path d="M66 68 L84 74" stroke="#7D7268" stroke-width="6" stroke-linecap="round"/>
        <path d="M134 68 L116 74" stroke="#7D7268" stroke-width="6" stroke-linecap="round"/>
        <path d="M65 86 L80 90" stroke="#7D7268" stroke-width="6" stroke-linecap="round"/>
        <path d="M135 86 L120 90" stroke="#7D7268" stroke-width="6" stroke-linecap="round"/>
        <ellipse cx="100" cy="116" rx="28" ry="18" fill="#EAE0D5" ${S}/>
        <circle cx="91" cy="114" r="2.8" fill="#6E5847"/>
        <circle cx="109" cy="114" r="2.8" fill="#6E5847"/>
        <circle cx="85" cy="84" r="3.8" fill="#574537"/><circle cx="84" cy="82.5" r="1.3" fill="#FFFDF7"/>
        <circle cx="115" cy="84" r="3.8" fill="#574537"/><circle cx="114" cy="82.5" r="1.3" fill="#FFFDF7"/>
        <path d="M93 124 Q100 130 107 124" fill="none" stroke="#574537" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`
    }
  ];
})();
