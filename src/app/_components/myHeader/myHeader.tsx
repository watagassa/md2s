"use client";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import Link from "next/link";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
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
      p="1.5"
      boxShadow="0px 0px 5px black"
      gap="md"
    >
      {userSession ? (
        <>
          <Image src="/md2s_icon.svg" alt="" />
          <Spacer />
          <Card bgColor="neutral.50">
            <InputGroup w="full" h="full">
              <InputLeftElement>
                <Icon as={PiMagnifyingGlassBold}></Icon>
              </InputLeftElement>
              <Input type="text" placeholder="記事検索"></Input>
            </InputGroup>
          </Card>
          <Spacer />
          <Center>
            <Button colorScheme="success" onClick={() => signOut()}>
              ログアウト
            </Button>
          </Center>
          <Center>
            {/* TODO Image押したら折りたたみのログアウトとuserページ遷移のボタンが出てくる */}
            <Image
              src={userSession?.image ?? ""}
              alt={userSession?.name ?? ""}
              borderRadius="50%"
              width="10"
              // height={40}
            />
          </Center>
        </>
      ) : (
        <>
          <Image src="/md2s_icon.svg" alt="" />
          <Spacer></Spacer>
          <Link href="/login">
            <Button colorScheme="success">ログイン</Button>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default Header;
