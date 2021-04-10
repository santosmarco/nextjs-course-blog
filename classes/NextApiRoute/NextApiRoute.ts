import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { HttpMethod, RouteHandlers } from "./types";

export default class NextApiRoute {
  private readonly handlers: RouteHandlers = {
    GET: [],
    POST: [],
    PUT: [],
    PATCH: [],
    DELETE: [],
  };

  get handler(): NextApiHandler {
    const isHandled = (method: string): method is HttpMethod =>
      this.handlers[method]?.length > 0;

    const execAllHandlers = async (
      method: HttpMethod,
      req: NextApiRequest,
      res: NextApiResponse
    ) => {
      const handlers = this.handlers[method];
      for (let i = 0; i < handlers.length; i++) {
        await handlers[i](req, res);
      }
    };

    return async (req, res) => {
      let { method } = req;
      method = method.toUpperCase();
      if (isHandled(method)) {
        await execAllHandlers(method, req, res);
      } else {
        return res.status(405).json({
          error: true,
          message: "Method not allowed.",
        });
      }
    };
  }

  get = <T = any>(handler: NextApiHandler<T>) => {
    this.handlers.GET.push(handler);
  };

  post = <T = any>(handler: NextApiHandler<T>) => {
    this.handlers.POST.push(handler);
  };

  put = <T = any>(handler: NextApiHandler<T>) => {
    this.handlers.PUT.push(handler);
  };

  patch = <T = any>(handler: NextApiHandler<T>) => {
    this.handlers.PATCH.push(handler);
  };

  delete = <T = any>(handler: NextApiHandler<T>) => {
    this.handlers.DELETE.push(handler);
  };
}
