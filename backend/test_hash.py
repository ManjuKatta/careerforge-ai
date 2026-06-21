from app.services.security_service import hash_password

password = "admin123"

print(hash_password(password))