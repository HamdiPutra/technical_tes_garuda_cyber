"use client";

import { use, useEffect, useState } from "react";
import { formatDate } from "@/lib/helper";
import { getDetailPost } from "@/lib/api";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  useAuthRedirect();
  
  const { id } = use(params);

  const [post, setPost] = useState({
    title: "",
    description: "",
    updated_at: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetailPost(id);
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="card-body shadow-lg">
      <h3 className="text-center text-xl font-bold">Detail Post</h3>
      <h2 className="card-title">{post.title}</h2>
      <p>{post.description}</p>
      <p>
        Last Update :{" "}
        {post.updated_at ? formatDate(post.updated_at) : "-"}
      </p>
    </div>
  );
}