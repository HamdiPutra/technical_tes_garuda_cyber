"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    // ambil token dari localStorage
    const token = localStorage.getItem("token");

    // kalau tidak ada token, redirect ke halaman login
    if (!token) {
      router.push("/authentication/login");
    }
  }, []);
}