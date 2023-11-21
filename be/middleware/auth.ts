import basicAuth, { IBasicAuthedRequest } from "express-basic-auth";
import { Request, Response } from "express";
import { comparePasswords } from "../controllers/user";
import UserModel, { User } from "../models/user";

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
  console.log(isUser, isPassword, user, username, password);
  
  if (isUser && isPassword) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}

function getUnauthorizedResponse(req: IBasicAuthedRequest) {
  const { user, password } = req.auth || {};
  return req.auth
    ? `Credentials ${user}-${password} rejected`
    : "No credentials provided";
}

const isWhiteListed = (req: Request) => {
  const { method, path } = req;
  return method === "POST" && path === "/user/";
};

export const authMiddleware = basicAuth({
  authorizer: authorize,
  authorizeAsync: true,
  unauthorizedResponse: getUnauthorizedResponse,
});
