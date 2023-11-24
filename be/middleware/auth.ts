import basicAuth, { IBasicAuthedRequest } from "express-basic-auth";
import { comparePasswords } from "../controllers/user";
import UserModel, { User } from "../models/user";
import SessionModel, { Session } from "../models/session";
import validationMessages from "../validation/messages.schema";
import { expressjwt } from "express-jwt";
import config from "../utils/config";
import { Request } from "express";
import { Jwt } from "jsonwebtoken";
import moment from "moment";

async function basicAuthorize(
  username: string,
  password: string,
  cb: Function
): Promise<boolean> {
  const userDocument = await UserModel.findOne({ username: username });

  if (!userDocument) {
    return cb(null, false);
  }

  const user: User = userDocument.toObject();

  const isPassword = await comparePasswords(user.password, password);
  const isUser = basicAuth.safeCompare(username, user.username);

  if (isUser && isPassword) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}

async function jwtAuthorize(
  req: Request,
  token: Jwt | undefined
): Promise<boolean> {
  const { userId, sessionId } = token?.payload as {
    userId: string;
    sessionId: string;
  };

  const userAgent = req.headers["user-agent"];

  const sessionDocument = await SessionModel.findOne({
    _id: sessionId,
    deviceInfo: userAgent,
    userId,
  });
  // if no session is found, revoke it
  if (!sessionDocument) {
    return true;
  }

  const session = sessionDocument?.toObject();

  // if the session is expired, revoke it
  if (moment(session.expirationDate).isBefore(moment())) {
    console.log(moment(session.expirationDate).isBefore(moment()));

    return true;
  }
  // if no errors, don't revoke it
  return false;
}

function getUnauthorizedResponse(req: IBasicAuthedRequest) {
  return req.auth
    ? {
        status: "fail",
        message: validationMessages.authentication.invalidCredentials.message,
      }
    : {
        status: "fail",
        message: validationMessages.authentication.missingCredentials.message,
      };
}

export const basicAuthMiddleware = basicAuth({
  authorizer: basicAuthorize,
  authorizeAsync: true,
  unauthorizedResponse: getUnauthorizedResponse,
});

// TODO: Authentication with JWT works but I want to check that the session is valid
export const jwtAuthMiddleware = expressjwt({
  secret: config.jwt.secret,
  algorithms: ["HS256"],
  isRevoked: jwtAuthorize,
});
