"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/lib/api";

function page() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await Login({ email, password });

            // simpan token
            localStorage.setItem("token", data.access_token);

            alert("Login berhasil");
            window.dispatchEvent(new Event("auth-change"));

            router.push("/posts");

        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan");
        }
    };
    return (
        <div className="flex justify-center">
            <div className="card w-96 bg-base-100 card-lg shadow-lg">
                <div className="card-body">
                    <h2 className="card-name text-center fw-bold">Login</h2>
                    <form className="space-y-4" onSubmit={handleLogin}>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input
                                type="email"
                                className="input w-full"
                                name="email"
                                placeholder="Input Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input
                                type="password"
                                className="input w-full"
                                name="password"
                                placeholder="Input Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                        <button className="btn btn-primary" type="submit">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page
