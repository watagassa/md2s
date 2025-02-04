"use client";
import { use } from "react";
import EditPageLogic from "./_components/logic/Page";

const EditPage = ({ params }: { params: Promise<{ post_id: number }> }) => {
  const a = use(params);
  return <EditPageLogic post_id={a.post_id} />;
};

export default EditPage;
