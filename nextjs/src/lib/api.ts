import { PaginatedPosts, Post } from "@/types";

export async function getPost():Promise<PaginatedPosts>{
    const res = await fetch("http://127.0.0.1:8000/api/posts");
    const posts = await res.json();
    return posts;
}

export async function getDetailPost(id:number):Promise<Post>{
    const res = await fetch(`http://127.0.0.1:8000/api/posts/${id}`);
    const posts = await res.json();
    return posts;
}