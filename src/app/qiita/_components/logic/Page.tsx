import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/_utils/nextAuth/next-auth-options";
import { getUser } from "@/app/api/user/user";
import { getQiitaArticles } from "@/app/api/qiita/qitta";
import Page from "../view/Page";

const QiitaAllPostPageLogic = async () => {
  const session = await getServerSession(nextAuthOptions);
  const myData = await getUser(session);

  if (!session) {
    return <div>ログインしてください。</div>;
  }
  const qiitaPosts = await getQiitaArticles(session); // 非同期処理
  qiitaPosts?.map((e) => {
    if (myData) {
      e.create_user_id = String(myData.id);
      e.name = myData.name;
      e.icon_url = myData.icon_url;
    }
  });
  if (!qiitaPosts) {
    return <div>記事が見つかりませんでした。</div>;
  }
  return <Page qiitaPosts={qiitaPosts} />;
};

export default QiitaAllPostPageLogic;
