import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Spacer,
  Box,
  Text,
} from "@yamada-ui/react";
import { HeartIcon } from "@yamada-ui/lucide";
import { type Post } from "@/types/post";

interface CardProps {
  post: Post;
}

export function PostCard({ post }: CardProps) {
  const created_date: Date = new Date(post.created_at);
  const date: string =
    created_date.getUTCFullYear() +
    "年" +
    (created_date.getUTCMonth() + 1) +
    "月" +
    created_date.getUTCDate() +
    "日";

  return (
    <Flex justify="center">
      <Card
        bgColor={"whiteAlpha.950"}
        w="max(80%, sm)"
        rounded="4"
        paddingInline={"md"}
      >
        <CardHeader>
          <Avatar size="sm" name={post.user.name} src={post.user.icon} />
          <Box>
            <Text>{post.user.name}</Text>
            <Text>{date}</Text>
          </Box>
        </CardHeader>
        <CardBody fontSize="xl" p={"sm"} pl={"normal"}>
          {post.title}
        </CardBody>
        <CardFooter>
          <Flex gap="md">
            {post.tags.map((tag) => (
              <Card key={tag.id} paddingInline="sm" bgColor={"neutral.50"}>
                {tag.name}
              </Card>
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
