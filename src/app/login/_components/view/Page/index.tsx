import {
  Button,
  ButtonGroup,
  Card,
  Center,
  Flex,
  Icon,
  Spacer,
} from "@yamada-ui/react";
import { FcGoogle } from "react-icons/fc";

interface PageProps {
  handleLogin: (provider: string) => (event: React.MouseEvent) => Promise<void>;
}

const Page = ({ handleLogin }: PageProps) => {
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

export default Page;
