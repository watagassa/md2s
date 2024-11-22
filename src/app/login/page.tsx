"use client";

import React from "react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Center,
  Container,
  Flex,
  Icon,
  InputLeftElement,
  Spacer,
  Stack,
  VStack,
} from "@yamada-ui/react";
import { FcGoogle } from "react-icons/fc";
import { SiQiita } from "react-icons/si";

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

        <Flex>
          <ButtonGroup variant="outline" w={"full"}>
            <Button onClick={handleLogin("google")} type="button" w={"full"}>
              <Icon as={SiQiita} h="80%" w="10" fontSize="full"></Icon>
              <Spacer />
              <Center>Qiitaでログイン(実装中)</Center>
              <Spacer />
            </Button>
          </ButtonGroup>
        </Flex>
      </Card>
    </Center>
  );
};

export default LoginPage;
