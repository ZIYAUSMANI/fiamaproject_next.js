import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import CartTable from "./_component/CartTable";
import CartTotals from "./_component/CartTotals";
export const metadata = {
    title: "Shopping Cart",
    description:
        "Review your selected flowers, bouquets, gifts, and products before checkout at Fiama Flower Shop.",
};
export default function Cart() {
    return (
        <>
            <BreadcrumbBanner />
            <CartTable />
            <CartTotals />
        </>
    );
}