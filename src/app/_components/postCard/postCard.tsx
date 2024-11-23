import { Avatar, Heading } from "@yamada-ui/react";
import { HeartIcon } from "@yamada-ui/lucide";
import { type Post } from "@/types/post";

interface CardProps {
  post: Post;
}

export function PostCard({ post }: CardProps) {
  return (
    <div>
      <div>
        <Avatar size="sm" name={post.user.name} src={post.user.icon} />
        <div>
          <p>{post.user.name}</p>
          <p>{post.created_at}</p>
        </div>
      </div>
      <Heading as="h1">{post.title}</Heading>
      <div>
        <div>
          {post.tags.map((tag) => (
            <p key={tag.id}>{tag.name}</p>
          ))}
        </div>
        <div>
          <HeartIcon />
          <p>{post.like_count}</p>
        </div>
      </div>
    </div>
  );
}
