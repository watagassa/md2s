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
} from "@yamada-ui/react";
import { HeartIcon } from "@yamada-ui/lucide";
import { type Article } from "@/types/post";
import PostTitle from "./postTitle";

interface CardProps {
  post: Article;
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
        </CardHeader>

        <PostTitle id={post.id} title={post.title} />
        <CardFooter>
          <Flex gap="md">
            {post.tags.map((tag) => (
              <Tag
                key={tag.id}
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
