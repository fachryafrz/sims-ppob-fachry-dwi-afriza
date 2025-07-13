import RegistrationForm from "@/components/registration-form";

export default function Registration() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Form */}
      <RegistrationForm />

      {/* Image */}
      <div className="hidden h-full overflow-hidden lg:block">
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
