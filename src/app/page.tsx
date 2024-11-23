import { testPostData2 } from "@/app/_testData";
import { PostCard } from "@/app/_components/postCard/postCard";

export default function Home() {
  const posts = testPostData2;

  return (
    <main>
      <p>おすすめ</p>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
