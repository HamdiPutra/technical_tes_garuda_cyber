"use client";

import { useEffect,useRef  } from "react";
import { Logout } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    
    const doLogout = async () => {
      await Logout();

      alert("Logout berhasil");
      window.dispatchEvent(new Event("auth-change"));
      router.replace("/authentication/login");
    };

    doLogout();
  }, [router]);

  return null;
}