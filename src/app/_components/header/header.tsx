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

const Header = ({ session }: { session: Session | null }) => {
  return (
    <Flex
      bgColor="whiteAlpha.950"
      p="1.5"
      boxShadow="0px 0px 5px black"
      w="full"
    >
      {session ? (
        <Flex w="full" gap="md">
          MD2Sのアイコン
          <Spacer />
          <Card bgColor="neutral.50">
            <InputGroup w={"full"} h={"full"}>
              <InputLeftElement>
                <Icon as={PiMagnifyingGlassBold}></Icon>
              </InputLeftElement>
              <Input type="text" placeholder="記事検索"></Input>
            </InputGroup>
          </Card>
          <Spacer />
          <Center>
            <Button onClick={() => signOut()}>ログアウト</Button>
          </Center>
          <Center>
            <Image
              src={session.user?.image ?? ""}
              alt={session.user?.name ?? ""}
              borderRadius="50%"
              width="10"
              // height={40}
            />
          </Center>
        </Flex>
      ) : (
        <Flex w="full">
          <Spacer></Spacer>
          <Link href="/login">
            <Button>ログイン</Button>
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
