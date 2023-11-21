import basicAuth, { IBasicAuthedRequest } from "express-basic-auth";
import { Request, Response } from "express";

function authorizer(username: string, password: string): any {
  // TODO: get username and password from database
  const userMatches = basicAuth.safeCompare(username, "123");
  const passwordMatches = basicAuth.safeCompare(password, "123");

  return userMatches && passwordMatches;
}

function getUnauthorizedResponse(req: IBasicAuthedRequest) {
  const { user, password } = req.auth || {};
  return req.auth
    ? `Credentials ${user}-${password} rejected`
    : "No credentials provided";
}

const authenticate = basicAuth({
  authorizer: authorizer,
  unauthorizedResponse: getUnauthorizedResponse,
});

const isWhiteListed = (req: Request) => {
  const { method, path } = req;
  return method === "POST" && path === "/user/";
};

export const authMiddleware = (req: any, res: any, next: any) => {
  return isWhiteListed(req) ? next() : authenticate(req, res, next);
};
