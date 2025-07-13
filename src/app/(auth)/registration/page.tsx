import RegistrationForm from "@/components/registration-form";

export default function Registration() {
  return (
    <div className="grid min-h-dvh grid-cols-2">
      {/* Form */}
      <RegistrationForm />

      {/* Image */}
      <div className="h-full overflow-hidden">
        <img
          src="/assets/Illustrasi Login.png"
          alt=""
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
