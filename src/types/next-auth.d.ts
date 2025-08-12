import { DefaultSession } from "next-auth";
import { PlanType } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string;
    plan: PlanType;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}
