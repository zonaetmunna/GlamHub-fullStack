import { NextApiRequest, NextApiResponse } from "next";
import { login, signUp } from "../../../../prisma/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    try {
      const user = await signUp(name, email, password);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  } else if (req.method === "PUT") {
    const { email, password } = req.body;
    try {
      const user = await login(email, password);
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
