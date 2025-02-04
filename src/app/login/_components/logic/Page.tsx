"use client";

import { postUser } from "@/app/api/user/user";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import Page from "../view/Page";

const LoginPageLogic = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    // ログイン済みの場合はTOPページにリダイレクト
    if (status === "authenticated") {
      console.log("login success");
      postUser(session);
      redirect("/");
    } else {
      if (status === "loading") {
        return console.log("loading");
      }
      console.log("login failed");
    }
  }, [session, status]);

  const handleLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    const result = await signIn(provider);

    // ログインに成功したらTOPページにリダイレクト
    if (result) {
      console.log("login success");
      postUser(session);
      console.log("login success");
      redirect("/");
    }
  };
  return <Page handleLogin={handleLogin}></Page>;
};

export default LoginPageLogic;
