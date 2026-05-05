import Link from "next/link"
import { PostListProps } from "@/types"

function PostList({ posts }: PostListProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-6"></div>
                {posts.data.map((post) => (
                    <div key={post.id}>
                        <div className="card bg-base-100 w-full shadow-lg mb-5">
                            <div className="card-body">
                                <h2 className="card-title">{post.title}</h2>
                                <p>
                                    {post.description.length > 300
                                        ? post.description.slice(0, 300) + "..."
                                        : post.description}
                                </p>
                                <div className="flex justify-between">
                                    <Link href={`posts/${post.id}`} className="btn btn-soft btn-xs">Detail</Link>
                                    <div className="flex gap-2">
                                        <button className="btn btn-warning btn-xs">Edit</button>
                                        <button className="btn btn-error btn-xs">Hapus</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostList
