import LoginForm from "@/components/login-form";

export default function Login() {
  return (
    <div className="grid h-dvh grid-cols-2">
      {/* Form */}
      <LoginForm />

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
