"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getDetailPost, updatePost } from "@/lib/api";
import Link from "next/dist/client/link";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

function page({ params }: { params: Promise<{ id: string }> }) {
    useAuthRedirect();
    
    const { id } = use(params);
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDetailPost(id);
                setTitle(data.title);
                setDescription(data.description);
            } catch (error) {
                console.error(error);
                alert("Gagal ambil data");
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updatePost(id, { title, description });

            alert("Post berhasil diupdate");
            router.push("/posts");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="card w-96 bg-base-100 card-lg shadow-lg">
                <div className="card-body">
                    <h2 className="card-name text-center fw-bold">Edit Post</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Title</legend>
                            <input
                                type="text"
                                className="input w-full"
                                name="title"
                                placeholder="Input Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Description</legend>
                            <textarea
                                className="textarea w-full"
                                name="description"
                                placeholder="Input Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </fieldset>

                        <div className="flex justify-end space-x-2">
                            <Link href="/posts" className="btn btn-soft">
                                Batal
                            </Link>
                            <button className="btn btn-primary" type="submit">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page
