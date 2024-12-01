import "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    idToken?: string;
    sub?: string;
  }

  interface User extends DefaultUser {
    accessToken?: string;
    idToken?: string;
    sub?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    sub?: string;
  }
}
