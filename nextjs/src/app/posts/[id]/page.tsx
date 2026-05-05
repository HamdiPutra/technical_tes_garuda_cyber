import { getDetailPost } from "@/lib/api";
import Link from "next/link"
interface PageProps {
    params: {
        id: number
    }
}

async function page({ params }: PageProps) {
    const { id } = await params;
    const post = await getDetailPost(id);
    console.log(post);
    return (
        <div className="card-body">
            <h3 className="text-center text-xl font-bold">Detail Post</h3>
            <h2 className="card-title">{post.title}</h2>
            <p>
                {post.description}
            </p>
        </div>
    )
}

export default page
