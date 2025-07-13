import ListOfTransactions from "@/components/list-of-transactions";

export default function TransactionPage() {
  return (
    <div className="space-y-4 px-4 xl:px-24">
      <h2 className="text-xl font-medium">Semua Transaksi</h2>

      <ListOfTransactions />
    </div>
  );
}
