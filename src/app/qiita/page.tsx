import { getServerSession } from "next-auth";
import { getQiitaArticles } from "../api/qiita/qitta";
import { nextAuthOptions } from "../_utils/nextAuth/next-auth-options";
import QiitaList from "../_components/qiita/qiitaList";

const Page = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return <div>ログインしてください。</div>;
  }

  const qiitaPosts = await getQiitaArticles(session); // 非同期処理
  if (!qiitaPosts) {
    return <div>記事が見つかりませんでした。</div>;
  }
  return <QiitaList qiitaPosts={qiitaPosts} />;
};

export default Page;
