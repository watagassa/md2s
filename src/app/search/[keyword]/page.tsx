import SearchPostKeywordLogic from "./_components/logic/Logic";

export default function Page({ params }: { params: Promise<{ keyword: string }> }) {
  return <SearchPostKeywordLogic params = {params}/>;
}