"use client";
import Link from "next/link"
import { useEffect, useState } from "react";


function Header() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const checkLogin = () => {
            const token = localStorage.getItem("token");
            setIsLogin(!!token);
        };

        // pertama load
        checkLogin();

        // dengarkan event login/logout
        window.addEventListener("auth-change", checkLogin);

        return () => {
            window.removeEventListener("auth-change", checkLogin);
        };
    }, []);
    
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <a href="/" className="btn btn-ghost text-xl">My App</a>
            </div>
            <div className="navbar-center gap-4">
                {isLogin && (
                    <>
                        <Link href="/">Home</Link>
                        <Link href="/posts">Posts</Link>
                    </>
                )}
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {!isLogin ? (
                            <>
                                <li>
                                    <Link href="/authentication/login">Login</Link>
                                </li>
                                <li>
                                    <Link href="/authentication/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link href="/authentication/logout">Logout</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header