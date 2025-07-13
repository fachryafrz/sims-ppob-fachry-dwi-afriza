import LoginForm from "@/components/login-form";

export default function Login() {
  return (
    <div className="grid min-h-dvh grid-cols-2">
      {/* Form */}
      <LoginForm />

      {/* Image */}
      <div className="h-dvh overflow-hidden">
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
