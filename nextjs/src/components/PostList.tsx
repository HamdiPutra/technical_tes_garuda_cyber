import Link from "next/link"
import { PostListProps } from "@/types"
import { deletePost } from "@/lib/api";

function PostList({ posts, onDelete, onPageChange }: PostListProps & {
    onDelete: (id: number) => void;
    onPageChange: (page: number) => void;
}) {

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin mau hapus post ini?")) return;

        try {
            await deletePost(id);
            alert("Post berhasil dihapus");

            onDelete(id);

        } catch (error: any) {
            alert(error.message);
        }
    };

    const getPages = () => {
        const total = posts.last_page;
        const current = posts.current_page;

        const pages: (number | string)[] = [];

        if (total <= 5) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (current <= 3) {
                pages.push(1, 2, 3, 4, "...", total);
            } else if (current >= total - 2) {
                pages.push(1, "...", total - 3, total - 2, total - 1, total);
            } else {
                pages.push(1, "...", current - 1, current, current + 1, "...", total);
            }
        }

        return pages;
    };

    return (
        <>
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
                                    <div className="card-actions justify-end">
                                        <div className="flex gap-2">
                                            <Link href={`posts/${post.id}`} className="btn btn-soft btn-xs">Detail</Link>
                                            <Link href={`posts/${post.id}/edit`} className="btn btn-warning btn-xs">Edit</Link>
                                            <button className="btn btn-error btn-xs" onClick={() => handleDelete(post.id)}>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end mt-6">
                <div className="join">

                    {/* Prev */}
                    <button
                        className="join-item btn btn-square"
                        disabled={posts.current_page === 1}
                        onClick={() => onPageChange(posts.current_page - 1)}
                    >
                        «
                    </button>

                    {/* Number */}
                    {getPages().map((item, index) =>
                        item === "..." ? (
                            <button key={index} className="join-item btn btn-square btn-disabled">
                                ...
                            </button>
                        ) : (
                            <input
                                key={`${item}-${index}`}
                                className="join-item btn btn-square"
                                type="radio"
                                name="pagination"
                                aria-label={String(item)}
                                checked={posts.current_page === item}
                                onChange={() => {
                                    onPageChange(item as number);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                            />
                        )
                    )}

                    {/* Next */}
                    <button
                        className="join-item btn btn-square"
                        disabled={posts.current_page === posts.last_page}
                        onClick={() => onPageChange(posts.current_page + 1)}
                    >
                        »
                    </button>

                </div>
            </div>
        </>
    )
}

export default PostList
