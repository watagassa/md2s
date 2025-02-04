import { type Article } from "@/types/post";
import { UserPostCardView } from "./userPostCardView";
import { redirect } from "next/navigation";
import { useDisclosure } from "@yamada-ui/react";
import { deleteArticle } from "@/app/api/article/article";
import { userSessionAtom } from "@/app/atoms/atom";
import { useAtom } from "jotai";
interface UserCardProps {
  post: Article;
}

export function UserPostCard({ post }: UserCardProps) {
  const created_date: Date = new Date(post.created_at);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userSession] = useAtom(userSessionAtom);
  const date: string =
    created_date.getUTCFullYear() +
    "年" +
    (created_date.getUTCMonth() + 1) +
    "月" +
    created_date.getUTCDate() +
    "日";
  const handleEdit = () => {
    redirect(`posts/edit/${post.id}`);
  };
  const handleDelete = async () => {
    if (userSession?.idToken) {
      await deleteArticle(userSession.idToken, post.id);
    }
  };

  return (
    <UserPostCardView
      post={post}
      date={date}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    ></UserPostCardView>
  );
}
