"use client";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import Link from "next/link";
import { type Session } from "next-auth";
import {
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Card,
  Center,
  Spacer,
  InputGroup,
  InputLeftElement,
  ButtonGroup,
} from "@yamada-ui/react";
import { useAtom } from "jotai";
import { userSessionAtom } from "@/app/atoms/atom";
import { useEffect } from "react";
import IconPopover from "./IconPopover";
import { redirect } from "next/navigation";
import { getQiitaCode, getQiitaToken } from "@/app/api/user/user";
const Header = ({ session }: { session: Session | null }) => {
  const [userSession, setUserSession] = useAtom(userSessionAtom);

  useEffect(() => {
    const allQueryParameters = new URLSearchParams(window.location.search);
    const code = allQueryParameters.get("code");
    if (code) {
      getQiitaToken(code, session);
    }
  }, [session]);

  useEffect(() => {
    if (session?.user) {
      setUserSession({
        idToken: session.idToken,
        name: session.user.name,
        image: session.user.image,
      });
    }
    console.log(session?.idToken, session?.user?.name, session?.user?.image);
  }, [session, setUserSession]);

  return (
    <Flex
      bgColor="whiteAlpha.950"
      py="md"
      px="xl"
      boxShadow="0px 0px 5px black"
      gap="md"
    >
      {userSession ? (
        <>
          <Image src="/md2s_icon.svg" alt="" onClick={() => redirect("/")} />
          <Spacer />
          <Card bgColor="neutral.50">
            <InputGroup w="full" h="full">
              <InputLeftElement>
                <Icon as={PiMagnifyingGlassBold}></Icon>
              </InputLeftElement>
              <Input type="text" placeholder="記事検索" w={"md"}></Input>
            </InputGroup>
          </Card>
          <Spacer />
          <ButtonGroup gap="sm">
            <Button
              colorScheme="lime"
              onClick={() => void getQiitaCode(session)}
            >
              qiita連携
            </Button>
            <Button colorScheme="link" onClick={() => redirect("/posts/new")}>
              投稿する
            </Button>
          </ButtonGroup>
          <Center>
            <IconPopover />
          </Center>
        </>
      ) : (
        <>
          <Image src="/md2s_icon.svg" alt="" onClick={() => redirect("/")} />
          <Spacer />
          <Card bgColor="neutral.50">
            <InputGroup w="full" h="full">
              <InputLeftElement>
                <Icon as={PiMagnifyingGlassBold}></Icon>
              </InputLeftElement>
              <Input type="text" placeholder="記事検索" w={"md"}></Input>
            </InputGroup>
          </Card>
          <Spacer />
          <Link href="/login">
            <Button colorScheme="success">ログイン</Button>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default Header;
