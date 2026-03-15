#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "cloudinary",
# ]
# ///
"""
Upload images to Cloudinary.

Usage:
  uv run --script scripts/upload_to_cloudinary.py [folder]

  folder: Cloudinary folder under 'krushna/' to upload to (default: paintings)

Images are read from frontend/public/images/<folder>/
Credentials are retrieved via the 'pass' utility.
"""

import subprocess
import sys
from pathlib import Path

import cloudinary
import cloudinary.uploader


CLOUD_NAME = "db9fqisro"
BASE_FOLDER = "krushna"


def get_secret(key: str) -> str:
    result = subprocess.run(["pass", key], capture_output=True, text=True, check=True)
    return result.stdout.strip()


def upload_folder(category: str) -> None:
    api_key = get_secret("CLAUDINARY_API_KEY")
    api_secret = get_secret("CLAUDINARY_API_SECRET")

    cloudinary.config(
        cloud_name=CLOUD_NAME,
        api_key=api_key,
        api_secret=api_secret,
        secure=True,
    )

    images_dir = (
        Path(__file__).parent.parent
        / "frontend"
        / "public"
        / "images"
        / category
    )

    if not images_dir.exists():
        print(f"Directory not found: {images_dir}")
        sys.exit(1)

    files = sorted(images_dir.iterdir())
    if not files:
        print(f"No files found in {images_dir}")
        sys.exit(1)

    cloudinary_folder = f"{BASE_FOLDER}/{category}"
    print(f"Uploading {len(files)} file(s) to {cloudinary_folder}/\n")

    for file_path in files:
        if file_path.is_dir():
            continue
        public_id = file_path.stem
        print(f"  Uploading: {file_path.name} → {cloudinary_folder}/{public_id}")
        response = cloudinary.uploader.upload(
            str(file_path),
            folder=cloudinary_folder,
            public_id=public_id,
            overwrite=True,
            resource_type="image",
        )
        print(f"  ✓ {response['secure_url']}\n")


if __name__ == "__main__":
    category = sys.argv[1] if len(sys.argv) > 1 else "paintings"
    upload_folder(category)
