import ListOfTransactions from "@/components/list-of-transactions";

export default function TransactionPage() {
  return (
    <div className="px-24 space-y-4">
      <h2 className="text-xl font-medium">Semua Transaksi</h2>

      <ListOfTransactions />
    </div>
  );
}
