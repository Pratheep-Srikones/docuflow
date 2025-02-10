from fastapi import FastAPI, Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
import jwt
from config.config import jwt_key
SECRET_KEY = jwt_key

class RoleBasedMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        
        if request.method == "OPTIONS":
            return await call_next(request)

        #
        if request.url.path.startswith("/auth"):
            return await call_next(request)
        if request.url.path.startswith("/organization"):
            return await call_next(request)
       

        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return Response(content="Unauthorized: Missing token", status_code=401)

        token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.state.user = payload  # Store user info in request.state

            # ** Role-Based Access Control (RBAC) **
            if request.url.path.startswith("/staff"):
                if "account" not in payload or payload["account"] != "staff":
                    return Response(content="Forbidden: Staff access required", status_code=403)

            elif request.url.path.startswith("/user"):
                if "account" not in payload or (payload["account"] != "user" and payload["account"] != "staff"):
                    return Response(content="Forbidden: User access required", status_code=403)

        except jwt.ExpiredSignatureError:
            return Response(content="Unauthorized: Token expired", status_code=401)
        except jwt.InvalidTokenError:
            return Response(content="Unauthorized: Invalid token", status_code=401)

        return await call_next(request)
