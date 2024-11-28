import { prisma } from "../prisma/prismaClient";
import AuthRepository from "../repo/auth.repo";

const authRepo = new AuthRepository(prisma);
