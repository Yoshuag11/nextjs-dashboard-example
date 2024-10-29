import CustomersTable from "@/app/ui/customers/table";
import { fetchFilteredCustomers } from "@/app/lib/data";

export const metadata = {
  title: "Customers",
};
export default async function CustomersPage(props: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const { searchParams } = props;
  const awaitedSearchParams = await searchParams;
  const customers = await fetchFilteredCustomers(
    awaitedSearchParams.query || ""
  );
  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}
