import jwt
import datetime
from config.config import jwt_key
from typing import Union

ALGORITHM = "HS256"

def create_jwt(data: dict, expires_in:Union[int, None] = 3600):
    payload = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)
    payload.update({"exp": expire})

    token = jwt.encode(payload, jwt_key, algorithm=ALGORITHM)
    return token