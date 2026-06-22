from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)

import os

from app.services.resume_service import (
    analyze_resume
)

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


@router.post("/analyze")
async def analyze_uploaded_resume(
    role: str = Form(...),
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

    return analyze_resume(
        file_path,
        role
    )