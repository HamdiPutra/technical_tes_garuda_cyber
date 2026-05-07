"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";

function page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({
        name,
        email,
        password,
        password_confirmation,
      });

      alert("Registrasi berhasil, silahkan login")

      // reset form
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");

      router.push("/authentication/login");

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
  };
  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100 card-lg shadow-lg">
        <div className="card-body">
          <h2 className="card-name text-center fw-bold">Registrasi Akun</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input
                type="text"
                name="name"
                className="input w-full"
                placeholder="Input Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>

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

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password Konfirmasi</legend>
              <input
                type="password"
                className="input w-full"
                name="password_confirmation"
                placeholder="Input Password Konfirmasi"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirm(e.target.value)}
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
