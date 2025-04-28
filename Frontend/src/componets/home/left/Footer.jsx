import React, { useState } from 'react';
import { CiLogout } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../ContextApi';
import { RiImageEditFill } from "react-icons/ri";


export default function HeaderProfile() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  let { user1, send, checkLogin } = useAuth();


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      const res = await fetch(`${import.meta.env.VITE_URL}user/upload/${user1._id}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      alert("Upload successful!");
      // Optionally refresh or update context to reflect new image
      window.location.reload(); // or use a context update method
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='h-[11vh]'>

      {/* Modal trigger button */}
      <button onClick={() => document.getElementById('my_modal_2').showModal()}>
        <div className={`avatar ${checkLogin ? "avatar-online" : "avatar-offline"} avatar-placeholder hover:cursor-pointer ps-2`} title={user1.username}>
          <div className="bg-neutral text-neutral-content w-8 rounded-full">
            <img src={user1.image} />
          </div>
        </div>
      </button>

      {/* Modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-8/12 md:w-4/12">

          {/* Upload Form */}
          <form onSubmit={handleUpload}>
            <label htmlFor="file-upload" className="text-2xl hover:cursor-pointer inline-block me-2  ">
              <RiImageEditFill />
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
           {
           file?( <button type="submit" className="btn btn-xs btn-info" disabled={isUploading}>
            {isUploading ? "Uploading..." : "OK"}
          </button>):("")
           }
          </form>

          {/* Image Preview */}
          <div className='text-center mt-4'>
            <div className="avatar">
              <div className="w-32 rounded">
                <img src={previewURL || user1.image} alt="User" />
              </div>
            </div>
            <p className='mt-2'>{user1.username}</p>
          </div>
        </div>

        {/* Modal close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Logout */}
      <div className='text-2xl ps-2 pt-2 hover:cursor-pointer' title='logout'>
        <NavLink to="/logout"><CiLogout /></NavLink>
      </div>
    </div>
  );
}
