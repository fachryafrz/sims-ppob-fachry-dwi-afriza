"use client";

import AkunForm from "./akun-form";
import ImageUpload from "./image-upload";

export default function Akun() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      {/* Image & Name */}
      <ImageUpload />

      {/* Form */}
      <AkunForm />
    </div>
  );
}
