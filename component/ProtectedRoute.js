"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const login = localStorage.getItem("login");

        if (login === "true") {
            setIsLoggedIn(true);
        } else {
            router.replace("/login");
        }

        setChecking(false);
    }, [router]);

    if (checking) {
        return null;
    }

    return isLoggedIn ? children : null;
};

export default ProtectedRoute;