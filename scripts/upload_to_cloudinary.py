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

import hashlib
import subprocess
import sys
from pathlib import Path

import cloudinary
import cloudinary.api
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

    # Fetch existing resources with their stored md5 context field
    existing: dict[str, str] = {}
    next_cursor = None
    while True:
        kwargs: dict = {"type": "upload", "max_results": 500, "context": True}
        if next_cursor:
            kwargs["next_cursor"] = next_cursor
        result = cloudinary.api.resources_by_asset_folder(cloudinary_folder, **kwargs)
        for resource in result.get("resources", []):
            name = resource["public_id"].split("/")[-1]
            context = resource.get("context", {}).get("custom", {})
            existing[name] = context.get("md5", "")
        next_cursor = result.get("next_cursor")
        if not next_cursor:
            break

    local_files = [f for f in files if not f.is_dir()]
    print(f"Found {len(local_files)} local file(s), {len(existing)} on Cloudinary\n")

    for file_path in local_files:
        public_id = file_path.stem
        local_md5 = hashlib.md5(file_path.read_bytes()).hexdigest()

        if existing.get(public_id) == local_md5:
            print(f"  Skipping (unchanged): {file_path.name}")
            continue

        print(f"  Uploading: {file_path.name} → {cloudinary_folder}/{public_id}")
        response = cloudinary.uploader.upload(
            str(file_path),
            folder=cloudinary_folder,
            public_id=public_id,
            overwrite=True,
            resource_type="image",
            context={"md5": local_md5},
        )
        print(f"  ✓ {response['secure_url']}\n")


if __name__ == "__main__":
    category = sys.argv[1] if len(sys.argv) > 1 else "paintings"
    upload_folder(category)
