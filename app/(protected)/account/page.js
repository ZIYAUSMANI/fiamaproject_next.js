import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import AccountDashboard from "./_component/AccountDashboard";

export const metadata = {
    title: "My Account",
    description:
        "Manage your Fiama Flower Shop account, profile details, orders, and shopping preferences.",
};
function Account() {
    return (
        <>
            <BreadcrumbBanner />
            <AccountDashboard />
        </>
    );
}

export default Account;