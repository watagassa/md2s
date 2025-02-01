import React from "react";
import PostPageLogic from "./_components/logic/Page";

const PostId = ({ params }: { params: Promise<{ post_id: number }> }) => {
  return <PostPageLogic params={params} />;
};

export default PostId;
