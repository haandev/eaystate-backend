import { RequestHandler, StatusCodes } from "@ooic/core";
import jwt, { Jwt } from "jsonwebtoken";

import { Login } from "@/model/Login";

export const verifyToken: RequestHandler = async (request, response, next) => {
  try {
    const { "x-access-token": xAccessToken, "x-refresh-token": xRefreshToken } = request.headers;
    let { refreshToken, accessToken } = request.cookies;

    refreshToken = refreshToken || xRefreshToken;
    const bearer = request.headers["authorization"]?.split("Bearer ")[0];
    const tokenFromBody = request?.body?.access_token;
    const token = accessToken || bearer || xAccessToken || tokenFromBody;

    if (!token) {
      throw { statusCode: StatusCodes.UNAUTHORIZED, message: "Invalid Authorization Strategy" };
    }

    if (!token) throw { statusCode: StatusCodes.UNAUTHORIZED, message: "A token is required for authentication" };

    try {
      request.authUser = {
        ...(jwt.verify(token, process.env.TOKEN_KEY) as jwt.JwtPayload),
        access_token: token,
        data: {
          settings: {
            role: "admin",
            admin: true,
          },
        },
        user: { role: "admin" },
        role: "admin",
      };
      next();
    } catch (err) {
      throw { statusCode: StatusCodes.FORBIDDEN, message: "Invalid access token" };
    }
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
