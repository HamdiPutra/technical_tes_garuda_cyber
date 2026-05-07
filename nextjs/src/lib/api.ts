import { Post } from "@/types";

export async function registerUser(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}) {
    const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Registrasi gagal");
    }

    return result;
}

export async function Login(data: {
    email: string;
    password: string;
}) {
    const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Login gagal");
    }

    return result;
}

export async function Logout() {
    const token = localStorage.getItem("token");

    try {
        await fetch("http://127.0.0.1:8000/api/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
    } catch (error) {
        console.error("Logout request error:", error);
    }

    localStorage.removeItem("token");

    return true;
}

export async function getPost(page = 1) {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://127.0.0.1:8000/api/posts?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Gagal ambil data post");
    }

    return res.json();
}

export async function getDetailPost(id: string): Promise<Post> {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Gagal fetch detail");

    return res.json();
}

export async function createPost(data: {
    title: string;
    description: string;
}) {
    const token = localStorage.getItem("token");

    const res = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Gagal menyimpan post");
    }

    return result;
}

export async function updatePost(id: string, data: { title: string; description: string }) {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Gagal update post");
    }

    return result;
}

export async function deletePost(id: number) {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Gagal hapus post");
    }

    return data;
}

