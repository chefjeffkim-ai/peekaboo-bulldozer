#!/usr/bin/env python3
"""
Local Gemini TTS Voice Asset Generator for 'Peek-a-boo Heavy Machines' (1-3yo)
==============================================================================
Generates static .mp3 / .wav voice clips into deploy/audio/ and audio/ using
the official Google GenAI SDK (`gemini-2.5-flash-preview-tts`) so the deployed
Netlify app has $0 runtime API cost and never exposes any API key.

Setup (local Mac only):
    pip install google-genai
    cp .env.example .env
    # Edit .env and set GEMINI_API_KEY=... (never commit .env!)

Usage:
    # 1) Generate all voice lines with Gemini TTS (default voice: Puck)
    python3 scripts/generate_gemini_tts.py

    # 2) Use Zephyr voice or regenerate specific lines
    python3 scripts/generate_gemini_tts.py --voice Zephyr --only bd_tap_1 bd_tap_2 --overwrite

    # 3) Import files downloaded from Google AI Studio Speech Generation (~/Downloads)
    python3 scripts/generate_gemini_tts.py --import-downloads

    # 4) Refresh audio_manifest.json after manually placing files in deploy/audio/
    python3 scripts/generate_gemini_tts.py --sync-manifest
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import shutil
import subprocess
import sys
import time
import wave
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
DEPLOY_AUDIO_DIR = ROOT_DIR / "deploy" / "audio"
ROOT_AUDIO_DIR = ROOT_DIR / "audio"
MANIFEST_PATH = DEPLOY_AUDIO_DIR / "audio_manifest.json"
ENV_PATH = ROOT_DIR / ".env"

MODEL_ID = "gemini-2.5-flash-preview-tts"
DEFAULT_VOICE = "Puck"

STYLE_DIRECTOR_PROMPT = (
    "Speak like a warm, gentle, playful preschool teacher reading a picture book "
    "to a happy 2-year-old toddler. Use a bright smile in your voice, clear and "
    "friendly pronunciation, slightly slow cozy pacing, and joyful excitement "
    "without ever sounding loud or startling. Say ONLY the exact line below:\n\n"
)


def load_dotenv(path: Path) -> None:
    """Minimal zero-dependency .env loader (does not overwrite existing env vars)."""
    if not path.is_file():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def load_manifest() -> dict:
    if not MANIFEST_PATH.is_file():
        raise FileNotFoundError(f"Manifest not found: {MANIFEST_PATH}")
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


def save_manifests(manifest: dict) -> None:
    DEPLOY_AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    ROOT_AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(manifest, indent=2, ensure_ascii=False) + "\n"
    MANIFEST_PATH.write_text(payload, encoding="utf-8")
    (ROOT_AUDIO_DIR / "audio_manifest.json").write_text(payload, encoding="utf-8")


def sync_manifest_from_disk(manifest: dict) -> int:
    """Scan deploy/audio/ for .mp3 or .wav files matching manifest lines and mirror to audio/."""
    DEPLOY_AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    ROOT_AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    files_map: dict[str, str] = {}
    for audio_id in manifest.get("lines", {}):
        found_file = None
        for ext in (".mp3", ".wav"):
            candidate = DEPLOY_AUDIO_DIR / f"{audio_id}{ext}"
            if candidate.is_file() and candidate.stat().st_size > 0:
                found_file = candidate
                break
        if found_file:
            files_map[audio_id] = found_file.name
            mirror_target = ROOT_AUDIO_DIR / found_file.name
            if not mirror_target.exists() or mirror_target.stat().st_mtime < found_file.stat().st_mtime:
                shutil.copy2(found_file, mirror_target)
    manifest["files"] = files_map
    save_manifests(manifest)
    return len(files_map)


def import_from_downloads(manifest: dict, downloads_dir: Path) -> int:
    """Copy matching <audio_id>.mp3/.wav files from ~/Downloads into deploy/audio/."""
    if not downloads_dir.is_dir():
        print(f"Downloads directory not found: {downloads_dir}")
        return 0

    DEPLOY_AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    imported = 0
    for audio_id in manifest.get("lines", {}):
        for ext in (".mp3", ".wav"):
            src = downloads_dir / f"{audio_id}{ext}"
            if src.is_file() and src.stat().st_size > 0:
                dst = DEPLOY_AUDIO_DIR / src.name
                shutil.copy2(src, dst)
                print(f"[IMPORTED] {src.name} -> deploy/audio/{dst.name}")
                imported += 1
                break
    total = sync_manifest_from_disk(manifest)
    print(f"Imported {imported} file(s). Manifest now tracks {total}/{len(manifest['lines'])} audio clips.")
    return imported


def write_pcm_as_wav(pcm_bytes: bytes, wav_path: Path, sample_rate: int = 24000) -> None:
    with wave.open(str(wav_path), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)  # 16-bit signed linear PCM
        wf.setframerate(sample_rate)
        wf.writeframes(pcm_bytes)


def maybe_convert_to_mp3(wav_path: Path, mp3_path: Path) -> Path:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        return wav_path
    cmd = [
        ffmpeg,
        "-y",
        "-loglevel",
        "error",
        "-i",
        str(wav_path),
        "-codec:a",
        "libmp3lame",
        "-b:a",
        "96k",
        str(mp3_path),
    ]
    subprocess.run(cmd, check=True)
    wav_path.unlink(missing_ok=True)
    return mp3_path


def extract_audio_payload(response) -> tuple[bytes, str]:
    """Extract raw audio bytes and MIME type from a google-genai response."""
    candidates = getattr(response, "candidates", None) or []
    for cand in candidates:
        content = getattr(cand, "content", None)
        parts = getattr(content, "parts", None) or []
        for part in parts:
            inline = getattr(part, "inline_data", None)
            if inline and getattr(inline, "data", None):
                data = inline.data
                if isinstance(data, str):
                    data = base64.b64decode(data)
                mime = getattr(inline, "mime_type", "audio/L16;rate=24000") or "audio/L16;rate=24000"
                return data, mime
    raise RuntimeError("No audio inline_data returned by Gemini TTS response.")


def generate_lines(
    manifest: dict,
    voice_name: str,
    fmt: str,
    only_ids: list[str] | None,
    overwrite: bool,
    delay_sec: float,
) -> None:
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key or api_key == "your_gemini_api_key_here":
        print(
            "ERROR: GEMINI_API_KEY is not set.\n"
            "Create a local .env file (cp .env.example .env) and set GEMINI_API_KEY=...\n"
            "Note: .env is in .gitignore and will never be pushed to GitHub.",
            file=sys.stderr,
        )
        sys.exit(1)

    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print(
            "ERROR: google-genai SDK is not installed.\n"
            "Install it locally with: pip install google-genai",
            file=sys.stderr,
        )
        sys.exit(1)

    client = genai.Client(api_key=api_key)
    lines: dict[str, str] = manifest.get("lines", {})
    target_ids = only_ids if only_ids else list(lines.keys())

    DEPLOY_AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    use_mp3 = fmt == "mp3" or (fmt == "auto" and shutil.which("ffmpeg") is not None)

    generated_count = 0
    for idx, audio_id in enumerate(target_ids, start=1):
        if audio_id not in lines:
            print(f"[SKIP] Unknown audio ID: {audio_id}")
            continue

        existing = [
            DEPLOY_AUDIO_DIR / f"{audio_id}{ext}"
            for ext in (".mp3", ".wav")
            if (DEPLOY_AUDIO_DIR / f"{audio_id}{ext}").is_file()
        ]
        if existing and not overwrite:
            print(f"[EXISTS] {existing[0].name} (use --overwrite to regenerate)")
            continue

        text = lines[audio_id]
        prompt = f"{STYLE_DIRECTOR_PROMPT}{text}"
        print(f"[{idx}/{len(target_ids)}] Generating {audio_id} ({voice_name}): {text}")

        response = client.models.generate_content(
            model=MODEL_ID,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["AUDIO"],
                speech_config=types.SpeechConfig(
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(
                            voice_name=voice_name
                        )
                    )
                ),
            ),
        )

        audio_bytes, mime_type = extract_audio_payload(response)
        wav_path = DEPLOY_AUDIO_DIR / f"{audio_id}.wav"
        mp3_path = DEPLOY_AUDIO_DIR / f"{audio_id}.mp3"

        if "wav" in mime_type.lower():
            wav_path.write_bytes(audio_bytes)
        else:
            # Default Gemini TTS output is 24kHz 16-bit mono linear PCM
            write_pcm_as_wav(audio_bytes, wav_path, sample_rate=24000)

        final_path = maybe_convert_to_mp3(wav_path, mp3_path) if use_mp3 else wav_path
        # Clean up alternate extension if regenerating
        alt_path = wav_path if final_path == mp3_path else mp3_path
        alt_path.unlink(missing_ok=True)

        print(f"  -> Saved {final_path.relative_to(ROOT_DIR)} ({final_path.stat().st_size / 1024:.1f} KB)")
        generated_count += 1
        if idx < len(target_ids) and delay_sec > 0:
            time.sleep(delay_sec)

    manifest["defaultVoice"] = voice_name
    total = sync_manifest_from_disk(manifest)
    print(f"\nDone! Generated {generated_count} clip(s). Total ready in deploy/audio/: {total}/{len(lines)}.")


def main() -> None:
    load_dotenv(ENV_PATH)

    parser = argparse.ArgumentParser(description="Generate Gemini TTS audio assets for Peek-a-boo Heavy Machines.")
    parser.add_argument(
        "--voice",
        default=os.environ.get("GEMINI_TTS_VOICE", DEFAULT_VOICE),
        help="Gemini prebuilt voice name (e.g. Puck, Zephyr). Default: Puck",
    )
    parser.add_argument(
        "--format",
        choices=("auto", "mp3", "wav"),
        default="auto",
        help="Output format (auto picks mp3 when ffmpeg is available, otherwise wav).",
    )
    parser.add_argument("--only", nargs="+", help="Generate only specific audio IDs (e.g. bd_tap_1 az_a).")
    parser.add_argument("--az-only", action="store_true", help="Generate only A-Z alphabet lines (az_a through az_z).")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite existing audio files.")
    parser.add_argument("--delay", type=float, default=0.6, help="Pause in seconds between API requests.")
    parser.add_argument(
        "--import-downloads",
        action="store_true",
        help="Copy matching .mp3/.wav files from ~/Downloads into deploy/audio/ and update manifest.",
    )
    parser.add_argument(
        "--sync-manifest",
        action="store_true",
        help="Scan deploy/audio/ and sync audio_manifest.json without calling Gemini API.",
    )
    args = parser.parse_args()

    manifest = load_manifest()

    if args.import_downloads:
        import_from_downloads(manifest, Path.home() / "Downloads")
        return

    if args.sync_manifest:
        total = sync_manifest_from_disk(manifest)
        print(f"Synced audio_manifest.json ({total}/{len(manifest['lines'])} files present).")
        return

    only_ids = args.only
    if args.az_only and not only_ids:
        only_ids = [k for k in manifest.get("lines", {}) if k.startswith("az_")]

    generate_lines(
        manifest=manifest,
        voice_name=args.voice,
        fmt=args.format,
        only_ids=only_ids,
        overwrite=args.overwrite,
        delay_sec=args.delay,
    )


if __name__ == "__main__":
    main()
