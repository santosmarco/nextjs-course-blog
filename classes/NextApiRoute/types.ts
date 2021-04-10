import { NextApiHandler } from "next";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RouteHandlers = Record<HttpMethod, NextApiHandler[]>;
