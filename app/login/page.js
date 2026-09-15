
import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import FromHeader from "@/component/FromHeader";
import LoginForm from "./_component/LoginForm";

function Login() {
    return (<>
        <BreadcrumbBanner />
        <FromHeader title={"Sign In"} subtitle={"To Your Account"} description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit.Sit aliquid, Non distinctio vel iste."} />
        <LoginForm />
    </>);
}

export default Login;