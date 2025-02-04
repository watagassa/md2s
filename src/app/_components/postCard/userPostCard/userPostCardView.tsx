import {
  Avatar,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Spacer,
  Box,
  Text,
  Tag,
  Button,
  Stack,
  Modal,
  ModalHeader,
  Center,
  ModalBody,
  ModalFooter,
} from "@yamada-ui/react";
import { HeartIcon } from "@yamada-ui/lucide";
import { type Article } from "@/types/post";
import PostTitle from "../postTitle";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
interface UserCardProps {
  post: Article;
  date: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleEdit: () => never;
  handleDelete: () => void;
}

export function UserPostCardView({
  post,
  date,
  isOpen,
  onOpen,
  onClose,
  handleEdit,
  handleDelete,
}: UserCardProps) {
  return (
    <Flex justify="center">
      <Card
        bgColor={"whiteAlpha.950"}
        w="max(70%, sm)"
        rounded="4"
        paddingInline={"md"}
      >
        <CardHeader>
          <Avatar size="sm" name={post.name} src={post.icon_url} />
          <Box>
            <Text>{post.name}</Text>
            <Text>{date}</Text>
          </Box>
          <Spacer></Spacer>
          <Stack>
            <Box>
              <Button
                onClick={() => {
                  handleEdit();
                }}
              >
                編集
              </Button>
            </Box>
            <Box>
              <Button
                onClick={() => {
                  onOpen();
                }}
              >
                削除
              </Button>
              <Modal open={isOpen} onClose={onClose}>
                <Center>
                  <ModalHeader>注意</ModalHeader>
                </Center>

                <ModalBody>
                  <Text>{post.title}</Text>
                  <Text>本当にこの記事を削除しますか？</Text>
                </ModalBody>

                <ModalFooter>
                  <Button
                    onClick={() => {
                      onClose();
                    }}
                  >
                    cancel
                  </Button>
                  <Button
                    colorScheme="primary"
                    onClick={() => {
                      handleDelete();
                      redirect("/user");
                    }}
                  >
                    削除する
                  </Button>
                </ModalFooter>
              </Modal>
            </Box>
          </Stack>
        </CardHeader>

        <PostTitle id={post.id} title={post.title} />
        <CardFooter>
          <Flex gap="md">
            {post.tags?.map((tag) => (
              <Tag
                key={uuidv4()}
                paddingInline="sm"
                bgColor={"neutral.50"}
                color={"black"}
              >
                {tag.word}
              </Tag>
            ))}
          </Flex>
          <Spacer />
          <Flex align="center">
            <HeartIcon alignItems="none" />
            <Text p="xs">{post.like_count}</Text>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
}
