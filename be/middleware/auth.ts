import basicAuth, { IBasicAuthedRequest } from "express-basic-auth";
import { comparePasswords } from "../controllers/user";
import UserModel, { User } from "../models/user";
import validationMessages from "../validation/messages.schema";

async function authorize(
  username: string,
  password: string,
  cb: Function
): Promise<Boolean> {
  // TODO: get username and password from database
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
  const { user, password } = req.auth || {};
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

export const authMiddleware = basicAuth({
  authorizer: authorize,
  authorizeAsync: true,
  unauthorizedResponse: getUnauthorizedResponse,
});
