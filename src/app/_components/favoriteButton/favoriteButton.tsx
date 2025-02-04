import { useState, useEffect } from "react";
import { Box, HStack, Center } from "@yamada-ui/react";
import { HeartIcon } from "@yamada-ui/lucide";
import { registLike, deleteLike, getUserLike } from "@/app/api/like/like";
import { useSession } from "next-auth/react";

type countFavoriteProps = {
  countFavorite: number;
  article_id: number;
};

const FavoriteButton = ({ countFavorite, article_id }: countFavoriteProps) => {
  const [isCount, setIsCount] = useState(false);
  const [count, setCount] = useState(countFavorite);
  const { data: session } = useSession();

  //そのuserがその記事をすでにいいねしてるかどうか取得
  useEffect(() => {
    const fetchLike = async () => {
      if (article_id !== -1) {
        const fetchIsLike = await getUserLike(session, article_id);
        console.log(fetchIsLike);
        if (fetchIsLike != null) {
          setIsCount(fetchIsLike);
        } else {
          setIsCount(false);
        }
      }
    };
    fetchLike();
  }, [article_id]);

  useEffect(() => {
    setCount(countFavorite);
  }, [countFavorite]);

  const handleClick = async () => {
    console.log(session);

    if (isCount === null) {
      console.log("isCountにnullが入ってる");
      return;
    }

    if (isCount === false) {
      setCount(count + 1);
      setIsCount(true);
      await registLike(session, article_id);
      console.log("いいね押したよ", isCount, count);
    } else {
      setCount(count - 1);
      setIsCount(false);
      await deleteLike(session, article_id);
      console.log("いいね削除したよ", isCount, count);
    }
  };

  return (
    <Box>
      <HStack onClick={handleClick} gap={"xs"}>
        <Box>
          <HeartIcon
            color={isCount ? "flashy.300" : "currentColor"}
            border={"solid"}
            borderColor={"gray.100"}
            borderRadius={"60%"}
            w={"7xs"}
            h={"7xs"}
            p={"xs"}
            sx={{
              path: {
                fill: isCount ? "flashy.400" : "transparent", 
              },
            }}
          />
        </Box>
        <Center fontSize={"lg"} pb={"sm"} pr={"lg"}>
          {count}
        </Center>
      </HStack>
    </Box>
  );
};

export default FavoriteButton;
