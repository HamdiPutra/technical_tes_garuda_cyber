"use client";

import PostList from "@/components/PostList";
import AddPostModal from "@/components/AddPostModal";
import { useEffect, useState } from "react";
import { getPost } from "@/lib/api";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Posts() {
  useAuthRedirect();
  
  const [posts, setPosts] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
  });

  const [page, setPage] = useState(1);

  const fetchPosts = async (pageNumber = 1) => {
    try {
      const data = await getPost(pageNumber);
      setPosts(data);
      setPage(data.current_page);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleDelete = async () => {
    await fetchPosts(page);
  };

  return (
    <>
      <div>
        <h3 className="text-center text-xl font-bold">Post Saya</h3>
        <AddPostModal onSuccess={() => fetchPosts(page)} />
      </div>

      <PostList posts={posts} onDelete={handleDelete} onPageChange={setPage} />
    </>
  );
}