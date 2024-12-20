"use client";

import {
  Button,
  ButtonGroup,
  Card,
  Center,
  Flex,
  Icon,
  Spacer,
} from "@yamada-ui/react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { postUser } from "../api/user/user";

const LoginPage = () => {
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
  return (
    <Center p="4xl">
      <Card p="md" gap="md">
        <Center>ログイン</Center>
        <Flex>
          <ButtonGroup variant="outline" w={"full"}>
            <Button onClick={handleLogin("google")} type="button" w={"full"}>
              <Icon as={FcGoogle} h="80%" w="10" fontSize="full"></Icon>
              <Spacer />
              <Center>Googleでログイン</Center>
              <Spacer />
            </Button>
          </ButtonGroup>
        </Flex>
      </Card>
    </Center>
  );
};

export default LoginPage;
