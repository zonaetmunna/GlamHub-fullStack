import bcrypt from "bcrypt";
import prisma from "./prisma";

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    return user;
  } catch (error) {
    throw new Error("Error logging in");
  }
};
