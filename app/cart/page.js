import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import CartTable from "./_component/CartTable";
import CartTotals from "./_component/CartTotals";

export default function Cart() {
    return (
        <>
            <BreadcrumbBanner />
            <CartTable />
            <CartTotals />
        </>
    );
}