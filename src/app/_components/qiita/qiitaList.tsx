"use client";

import { Article } from "@/types/post";

const QiitaList = ({ qiitaPosts }: { qiitaPosts: Article[] }) => {
  return (
    <div>
      {qiitaPosts.map((qiitaPost) => (
        <div key={qiitaPost.id}>
          <h1>{qiitaPost.title}</h1>
          <p>{qiitaPost.create_user_id}</p>
          <p>{qiitaPost.created_at}</p>
          <p>{qiitaPost.updated_at}</p>
          <p>{qiitaPost.like_count}</p>
          <p>{qiitaPost.public}</p>
          <p>{qiitaPost.qiita_article}</p>

        </div>
      ))}
    </div>
  );
};

export default QiitaList;
