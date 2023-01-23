import { Login } from "@/model/Login";
import { RequestHandler, StatusCodes } from "@ooic/core";
import jwt, { Jwt } from "jsonwebtoken";

export const refreshToken: RequestHandler = async (request, response, next) => {
  try {
    const { "x-access-token": xAccessToken, "x-refresh-token": xRefreshToken } = request.headers;
    let { refreshToken, accessToken } = request.cookies;
    
    refreshToken = refreshToken || xRefreshToken;
    const bearer = request.headers["authorization"]?.split("Bearer ")[0];
    const tokenFromBody = request?.body?.access_token;
    const token = accessToken || bearer || xAccessToken || tokenFromBody;

    const login = await Login.findOne({
      where: { refreshToken },
    });

    const user = jwt.decode(token) as jwt.JwtPayload;
    if (login && user && login.userId === user.id) {
      const { iat, exp, ...payload } = user;

      const token = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: "1m",
      });

      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 1);

      response.cookie("accessToken ", token, {
        //  secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires,
      });

      return response.status(200).send({ ...payload, accessToken:token });
    } else {
      throw { statusCode: StatusCodes.UNAUTHORIZED, message: "Invalid refresh token" };
    }
  } catch (error) {
    next(error);
  }
};
