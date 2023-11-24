import basicAuth, { IBasicAuthedRequest } from "express-basic-auth";
import { comparePasswords } from "../controllers/user";
import UserModel, { User } from "../models/user";
import validationMessages from "../validation/messages.schema";
import { expressjwt } from "express-jwt";
import config from "../utils/config";

async function authorize(
  username: string,
  password: string,
  cb: Function
): Promise<Boolean> {
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
  authorizer: authorize,
  authorizeAsync: true,
  unauthorizedResponse: getUnauthorizedResponse,
});

// TODO: Authentication with JWT works but I want to check that the session is valid
export const jwtAuthMiddleware = expressjwt({
  secret: config.jwt.secret,
  algorithms: ["HS256"],
});
