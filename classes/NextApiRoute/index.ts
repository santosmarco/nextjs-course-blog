import NextApiRoute from "./NextApiRoute";
export * from "./types";

export const api = () => {
  return new NextApiRoute();
};

export default api;
