import { getPost } from "@/lib/api";
import PostList from "@/components/PostList";
import AddPostModal from "@/components/AddPostModal";

export default async function Posts() {
    const posts = await getPost();
    return (
        <>
            <div>
                <h3 className="text-center text-xl font-bold">Post  Saya</h3>
                <AddPostModal />
            </div>
            <PostList posts={posts} />
        </>
    );
}