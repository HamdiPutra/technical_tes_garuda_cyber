"use client";
import { useState } from "react";

function AddPostModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const openModal = () => {
    const modal = document.getElementById("modal_tambah") as HTMLDialogElement;
    modal?.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("modal_tambah") as HTMLDialogElement;
    modal?.close();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!res.ok) throw new Error("Gagal simpan post");

      // reset form
      setTitle("");
      setDescription("");

      closeModal();
      window.location.reload();
    
    } catch (error){
      console.error(error);
      alert("Terjadi kesalahan");
      closeModal();
    }
  };

  return (
    <>
      <button className="btn btn-primary btn-sm mb-4 ml-4" onClick={openModal}>
        Tambah Post
      </button>

      <dialog id="modal_tambah" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Tambah Post</h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Title</legend>
              <input
                type="text"
                name="title"
                className="input w-full"
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

            <div className="modal-action">
              <button className="btn" type="button" onClick={closeModal}>Close</button>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default AddPostModal;