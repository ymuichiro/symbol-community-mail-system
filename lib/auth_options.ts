import { NextAuthOptions } from "next-auth";
import CogniteProvider from "next-auth/providers/cognito";

export const authOptions: NextAuthOptions = {
  providers: [
    CogniteProvider({
      issuer: process.env.COGNITO_ISSUER_URL || "",
      clientId: process.env.COGNITO_CLIENT_ID || "",
      clientSecret: process.env.COGNITO_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.SECRET || "secret",
};
