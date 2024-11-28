import { PrismaClient, type User } from "@prisma/client";
import type { RepoTypes } from "./types/repo.types";

export default class AuthRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  addUser({
    email,
    username,
    passwordHash,
  }: RepoTypes.AddUser): Promise<User | null> {
    return this.prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
      },
    });
  }
  getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
  getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  getUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
  deleteUserById(id: string): Promise<User | null> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
  updateUserById(
    id: string,
    updatedData: RepoTypes.UpdateUser
  ): Promise<User | null> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }
}
