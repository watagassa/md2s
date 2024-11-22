"use client";

import React from "react";
import { useEffect } from "react";

import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Box, Button, FormControl } from "@yamada-ui/react";

const LoginPage = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    // ログイン済みの場合はTOPページにリダイレクト
    if (status === "authenticated") {
      redirect("/");
    }
  }, [session, status]);

  const handleLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    const result = await signIn(provider);

    // ログインに成功したらTOPページにリダイレクト
    if (result) {
      redirect("/");
    }
  };

  return (
    <Box>
      <FormControl>
        <Button
          colorScheme="primary"
          onClick={handleLogin("google")}
          type="button"
        >
          Googleでログイン
        </Button>
      </FormControl>
    </Box>
  );
};

export default LoginPage;
