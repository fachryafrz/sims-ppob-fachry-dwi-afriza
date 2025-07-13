import TopupForm from "@/components/topup-form";

export default function TopupPage() {
  return (
    <div className="space-y-4 px-24">
      <div>
        <span className="block">Silahkan masukan</span>
        <span className="block text-2xl font-medium">Nominal Top Up</span>
      </div>

      <TopupForm />
    </div>
  );
}
