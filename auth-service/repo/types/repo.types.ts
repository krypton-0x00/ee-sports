import type { Prisma } from "@prisma/client";

export namespace RepoTypes {
  export interface AddUser {
    email: string;
    username: string;
    passwordHash: string;
  }
  export interface UpdateUser {
    email?: string;
    username?: string;
    passwordHash?: string;
    role?: Prisma.UserUpdateInput["role"];
    accountStatus?: Prisma.UserUpdateInput["accountStatus"];
    emailVerified?: boolean;
    verificationToken?: string | null;
    resetPasswordToken?: string | null;
    resetPasswordExpiry?: Date | null;
    lastLogin?: Date | null;
    loginAttempts?: number;
    lockoutUntil?: Date | null;
    profileId?: string | null;
    tournamentCount?: number;
  }

  enum UserRole {
    "PLAYER",
    "ORGANIZATION",
  }
  enum AccountStatus {
    "ACTIVE",
    "SUSPENDED",
    "PENDING_VERIFICATION",
    "BANNED",
  }
}
