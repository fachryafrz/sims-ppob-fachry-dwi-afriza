import LoginForm from "@/components/login-form";

export default function Login() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Form */}
      <LoginForm />

      {/* Image */}
      <div className="hidden h-dvh overflow-hidden lg:block">
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
