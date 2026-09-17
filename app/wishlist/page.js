import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import WishlistTable from "./_component/WishlistTable";
export const metadata = {
    title: "My Wishlist",
    description:
        "Save and manage your favorite flowers, bouquets, gifts, and products in your Fiama wishlist.",
};
export default function Wishlist() {
    return (
        <>
            <BreadcrumbBanner />
            <WishlistTable />
        </>
    );
}   