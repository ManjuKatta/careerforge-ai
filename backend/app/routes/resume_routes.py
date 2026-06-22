from fastapi import APIRouter, UploadFile, File
import os

from app.services.resume_service import (
    extract_resume_text
)

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):

    upload_dir = "uploads"

    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    text = extract_resume_text(
        file_path
    )

    return {
        "filename": file.filename,
        "text": text[:2000]
    }