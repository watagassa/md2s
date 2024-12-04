import { useState } from "react";
import { Box, HStack, Center } from "@yamada-ui/react";
import { HeartIcon } from "@yamada-ui/lucide";

type countFavoriteProps = {
  countFavorite: number;
};

const FavoriteButton = ({countFavorite}: countFavoriteProps) => {
  const [isCount, setIsCount] = useState(false);
  const [count, setCount] = useState(countFavorite);

  const handleClick = () => {
    console.log(isCount);
    if(isCount === false){
      setCount(count + 1);
      setIsCount(true);
      console.log(isCount);
    }else{
      setCount(count - 1);
      setIsCount(false);
    }
  };

  return (
    <Box>
      <HStack onClick={handleClick} gap={"xs"}>
        <Box>
          <HeartIcon
          bgColor={isCount ? "pink.500" : "whiteAlpha.950"}
          border={"solid"}
          borderRadius={"60%"}
          w={"7xs"}
          h={"7xs"}
          p={"xs"}
        />
        </Box>
        <Center fontSize={"lg"} pb={"sm"} pr={"lg"}>{count}</Center>
      </HStack>
    </Box>
  );
};

export default FavoriteButton;
