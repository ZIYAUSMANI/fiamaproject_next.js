import ProtectedRoute from "@/component/ProtectedRoute";


export default function ProtectedLayout({ children }) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}