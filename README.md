# 까꿍! 불도저와 중장비 친구들 (Peek-a-boo Heavy Machines)

1~3세(12~36개월) 비주얼 러너 영아를 위한 따뜻한 수채화 동화책 + 알파벳 그림 단어 웹 앱 제작 정리본입니다.

---

## 1. 주요 링크 및 프로젝트 정보
- **라이브 웹 앱 (Netlify 무료 배포)**: https://peekaboo-bulldozer.netlify.app/
- **GitHub 저장소**: https://github.com/chefjeffkim-ai/peekaboo-bulldozer (`main` 브랜치 자동 배포 연동)
- **로컬 작업 원본 폴더**: `/Users/firstmacbook/.gemini/antigravity/scratch/peek-a-boo-heavy-machines`
- **유지비 / 보안**: 정적 호스팅 100%(유지비 0원), API 키 노출 0%(`.env`는 `.gitignore` 차단)

---

## 2. 데스크탑 정리 폴더 구조

```text
까꿍_불도저와_중장비_친구들/
├── README.md                          # 이 정리 문서
├── 01_배포용_웹앱(deploy)/             # 완성 웹앱 (Netlify Drop 가능, 이미지·음성 포함)
├── 02_원본_고화질_일러스트(6종)/       # 1024×1024 앱 아이콘 PNG + 1200×896 원본 JPG 5종
├── 03_제미나이_음성_에셋(52종)/
│   ├── 중장비_음성(26종)/              # 중장비 까꿍·터치·2지선다·마무리 WAV 26종
│   ├── 알파벳_AZ_음성(26종)/           # A~Z 알파벳 그림 단어 WAV 26종
│   └── audio_manifest.json            # 전체 52종 파일-대사 매핑표
└── 04_소스코드_및_스크립트/            # 소스 파일, netlify.toml, .env.example, TTS 생성 스크립트
```

---

## 3. 아트 스타일 & 일러스트 에셋 (6종 · 글자 0%)
따뜻한 미색(`#FFFDF7`) 바탕에 부드러운 파스텔 수채화 동화책 톤으로 제작했습니다.

| 파일명 | 원본 해상도 | 용도 |
| :--- | :--- | :--- |
| `ic_bulldozer_logo.png` | `1024×1024` (투명 둥근 모서리 PNG) | 앱 아이콘 · 표지 로고 · 파비콘 |
| `img_garage_door.jpg` | `1200×896` (JPG) | 까꿍 놀이 나무 차고 문 & 커튼 |
| `img_bulldozer_hero.jpg` | `1200×896` (JPG) | 노란 불도저 메인 일러스트 |
| `img_excavator_hero.jpg` | `1200×896` (JPG) | 주황 포크레인 메인 일러스트 |
| `img_dumptruck_hero.jpg` | `1200×896` (JPG) | 파란 덤프트럭 메인 일러스트 |
| `img_sleepy_garage.jpg` | `1200×896` (JPG) | 노을 지는 저녁 잘 자요 마무리 일러스트 |

---

## 4. 구현된 핵심 기능 요약

### ① 홈 화면 2가지 모드 선택
- **[🚜 중장비 놀이]**: 나무 차고 문 까꿍 놀이 → 불도저 → 포크레인 → 덤프트럭 → 노을 잘 자요 마무리
- **[🔤 A~Z 단어 놀이]**: A(Apple)~Z(Zebra) 26개 따뜻한 파스텔 동화책 SVG 그림 단어 놀이터
- 상단 **`🏠 홈`** 버튼으로 언제든 모드 전환, **`⚙️ 부모 메뉴`**에서 음성 속도(`🐢 Slow 0.85×` / `🐇 Normal 1.0×`) 및 오디오 엔진 상태 확인 가능

### ② 중장비 몸통 직접 터치(Direct Tap) 4종 순환 + 2지선다 놀이
- `pointerdown` + `active:scale-95` 적용으로 **0.1초 이내 즉각 반응** 및 빠른 연타 시 이전 음성·효과음 자동 정리(겹침 방지)
- **노란 불도저**: ① 몸체 진동·연기(`bd_tap_1`) → ② 라이트·경적(`bd_tap_2`) → ③ 앞으로 힘차게 밀기(`bd_tap_3`) → ④ 바운스·별(`bd_tap_4`) + 2지선다(`🪨 큰 돌 밀기`, `🍮 젤리 밀기`)
- **주황 포크레인**: ① 모래 파기(`ex_tap_1`) → ② 좌우 돌리기(`ex_tap_2`) → ③ 라이트·경적(`ex_tap_3`) → ④ 바운스·별(`ex_tap_4`) + 2지선다(`🏜️ 모래 푸기`, `🦆 오리 찾기`)
- **파란 덤프트럭**: ① 짐칸 쏟기(`dt_tap_1`) → ② 라이트·트럭 경적(`dt_tap_2`) → ③ 부릉 전진(`dt_tap_3`) → ④ 바운스·별(`dt_tap_4`) + 2지선다(`🪨 돌 싣기`, `🍎 사과 싣기`)

### ③ A~Z 알파벳 그림 단어 놀이터
- 상단 A~Z 선택 바 + **`🗂️ 전체 A~Z 보기`**(26카드 그리드) + 큰 카드 좌우 `◀` / `▶` 넘기기
- 터치 시 맞춤 효과음(실로폰, 강아지, 코끼리, 물 첨벙, 사자, 토끼, 얼룩말 등) + 제미나이 음성 재생 후 **3초 동안 귀 기울임(`👂`) + 소리 물결 바**가 반짝여 아이의 따라 말하기 유도

### ④ 제미나이(Gemini) 하이브리드 오디오 엔진 (52/52 완성)
- **1순위**: `deploy/audio/`의 사전 생성 제미나이 WAV 파일 52종 즉시 재생 (`playbackRate` 연동)
- **2순위**: 파일 미존재 시 브라우저 `Web Speech API (en-US)` 자동 폴백

---

## 5. 전체 제미나이 음성 파일 목록 (52종)

### A. 중장비 까꿍 놀이 음성 (26종)
| 파일명 | 영어 대사 |
| :--- | :--- |
| `cover_welcome.wav` | Peek-a-boo! Heavy machines! Let's play! |
| `door_knock.wav` | Knock, knock! Who is inside? |
| `door_open.wav` | Knock, knock! Peek-a-boo! |
| `bd_peekaboo.wav` | Peek-a-boo! Big yellow bulldozer! |
| `bd_tap_1.wav` | Rumble-rumble! Big yellow bulldozer! |
| `bd_tap_2.wav` | Beep-beep! Watch out! |
| `bd_tap_3.wav` | Push, push, push! So strong! |
| `bd_tap_4.wav` | Yay! Go, bulldozer, go! |
| `bd_choice_rock.wav` | Push the big rock! Crunch, push, push! |
| `bd_choice_jelly.wav` | Push the bouncy jelly! Boing, wiggle, giggle! |
| `ex_peekaboo.wav` | Peek-a-boo! Cute orange excavator! |
| `ex_tap_1.wav` | Dig, dig, scoop! Big orange excavator! |
| `ex_tap_2.wav` | Turn around! Swish, swish, swish! |
| `ex_tap_3.wav` | Beep-beep! Ready to dig! |
| `ex_tap_4.wav` | Yay! Go, excavator, go! |
| `ex_choice_sand.wav` | Scoop the golden sand! Dig, dig, hooray! |
| `ex_choice_duck.wav` | Surprise! A little yellow duck! Quack, quack! |
| `dt_peekaboo.wav` | Peek-a-boo! Strong blue dump truck! |
| `dt_tap_1.wav` | Tip and dump! Whoosh goes the sand! |
| `dt_tap_2.wav` | Honk-honk! Big blue dump truck! |
| `dt_tap_3.wav` | Vroom-vroom! Carry the rocks! |
| `dt_tap_4.wav` | Yay! Go, dump truck, go! |
| `dt_choice_stones.wav` | Load the heavy stones! Clunk, clunk, dump! |
| `dt_choice_apples.wav` | Carry the sweet red apples! Yummy, zoom, zoom! |
| `peek_hide.wav` | Where did it go? Tap the wooden door! |
| `bd_bye.wav` | Goodnight, big machines! Bye-bye! See you tomorrow! |

### B. A~Z 알파벳 그림 단어 음성 (26종)
| 파일명 | 알파벳 · 단어 | 영어 대사 |
| :--- | :--- | :--- |
| `az_a.wav` | Aa · Apple | A! Apple! Crunch, crunch! |
| `az_b.wav` | Bb · Bulldozer | B! Bulldozer! Rumble-rumble! |
| `az_c.wav` | Cc · Car | C! Car! Beep-beep! |
| `az_d.wav` | Dd · Dog | D! Dog! Woof-woof! |
| `az_e.wav` | Ee · Elephant | E! Elephant! Pawoo! |
| `az_f.wav` | Ff · Fish | F! Fish! Splash, splash! |
| `az_g.wav` | Gg · Grapes | G! Grapes! Yummy, yummy! |
| `az_h.wav` | Hh · Hat | H! Hat! Put it on! |
| `az_i.wav` | Ii · Ice cream | I! Ice cream! So sweet! |
| `az_j.wav` | Jj · Jelly | J! Jelly! Boing, boing! |
| `az_k.wav` | Kk · Kite | K! Kite! Fly up high! |
| `az_l.wav` | Ll · Lion | L! Lion! Roar! |
| `az_m.wav` | Mm · Monkey | M! Monkey! Ooh-ooh, aah-aah! |
| `az_n.wav` | Nn · Nose | N! Nose! Boop! |
| `az_o.wav` | Oo · Orange | O! Orange! Juicy! |
| `az_p.wav` | Pp · Pig | P! Pig! Oink-oink! |
| `az_q.wav` | Qq · Queen | Q! Queen! Sparkle, sparkle! |
| `az_r.wav` | Rr · Rabbit | R! Rabbit! Hop, hop, hop! |
| `az_s.wav` | Ss · Sun | S! Sun! Good morning! |
| `az_t.wav` | Tt · Truck | T! Truck! Honk-honk! |
| `az_u.wav` | Uu · Umbrella | U! Umbrella! Rain, rain! |
| `az_v.wav` | Vv · Van | V! Van! Vroom-vroom! |
| `az_w.wav` | Ww · Water | W! Water! Gulp, gulp! |
| `az_x.wav` | Xx · Xylophone | X! Xylophone! Ding-dong-dang! |
| `az_y.wav` | Yy · Yo-yo | Y! Yo-yo! Up and down! |
| `az_z.wav` | Zz · Zebra | Z! Zebra! Gallop, gallop! |

---

## 6. 향후 업데이트 팁
- **로컬에서 바로 실행**: `01_배포용_웹앱(deploy)/index.html`을 브라우저로 열거나, 터미널에서 `python3 -m http.server 8000` 실행 후 `http://localhost:8000` 접속 (로컬 서버 실행 시 제미나이 WAV 52종이 1순위로 완벽 재생됩니다).
- **특정 음성 교체**: 새 `.wav` 파일을 `deploy/audio/<파일명>.wav`에 덮어쓰고 GitHub `main`에 푸시하면 Netlify 라이브 사이트에 30초 내 자동 반영됩니다.
