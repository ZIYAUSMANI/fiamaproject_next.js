
import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import FromHeader from "@/component/FromHeader";
import LoginForm from "./_component/LoginForm";
import { Suspense } from "react";
export const metadata = {
    title: "Login",
    description:
        "Log in to your Fiama Flower Shop account to manage orders, wishlist, and shopping preferences.",
};
function Login() {
    return (<>
        <BreadcrumbBanner />
        <FromHeader title={"Sign In"} subtitle={"To Your Account"} description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit.Sit aliquid, Non distinctio vel iste."} />
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>

    </>);
}

export default Login;