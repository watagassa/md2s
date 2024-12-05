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
} from "@yamada-ui/react";
import { useAtom } from "jotai";
import { userSessionAtom } from "@/app/atoms/atom";
import { useEffect } from "react";
import IconPopover from "./IconPopover";
import { redirect } from "next/navigation";
const Header = ({ session }: { session: Session | null }) => {
  const [userSession, setUserSession] = useAtom(userSessionAtom);
  useEffect(() => {
    if (session?.user) {
      setUserSession(session.user);
    }
  }, [session]);

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
          <Center>
            <Button colorScheme="link" onClick={() => redirect("/posts/new")}>
              投稿する
            </Button>
          </Center>
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
