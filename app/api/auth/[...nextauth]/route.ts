import NextAuth, { NextAuthOptions } from "next-auth";
import CogniteProvider from "next-auth/providers/cognito";

export const authOptions: NextAuthOptions = {
  providers: [
    CogniteProvider({
      issuer: "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_rL6LtyfN0",
      clientId: process.env.COGNITO_CLIENT_ID || "15gi3n703lommslnkn67ufue5n",
      clientSecret: process.env.COGNITO_CLIENT_SECRET || "1th6r9vd569uds9taqr3bqcp143ovvp2e4m4f45et7smmp26h209",
    }),
  ],
  secret: process.env.SECRET || "secret",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
