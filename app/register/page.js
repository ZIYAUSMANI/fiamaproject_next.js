import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import RegisterForm from "./_component/RegisterForm";
import FromHeader from "@/component/FromHeader";

export default function Register() {
    return (
        <>
            <BreadcrumbBanner />
            <FromHeader title={"Register"} subtitle={"Your Account"} description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit.Sit aliquid, Non distinctio vel iste."} />
            <RegisterForm />
        </>
    );
}