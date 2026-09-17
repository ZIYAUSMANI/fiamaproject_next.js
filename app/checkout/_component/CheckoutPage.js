"use client";

import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import formValidationSchema from "@/FromSchema/formValidationSchema";
import { createOrder, getUserById } from "@/helper/Services";
import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import CheckoutLoginSection from "./CheckoutLoginSection";
import CheckoutCouponSection from "./CheckoutCouponSection";
import BillingDetails from "./BillingDetails";
import PaymentSection from "./PaymentSection";
function CheckOut() {
    const router = useRouter();
    const cartState = useSelector((state) => state.cart);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            formValidationSchema.pick([
                "firstName",
                "lastName",
                "email",
                "phone",
                "companyName",
                "companyAddress",
                "country",
                "address",
                "apartment",
                "city",
                "state",
                "zip",
                "createAccount",
                "orderNotes",
                "paymentMethod",
            ])
        ),

        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            companyName: "",
            companyAddress: "",
            country: "",
            address: "",
            apartment: "",
            city: "",
            state: "",
            zip: "",
            createAccount: false,
            orderNotes: "",
            paymentMethod: "cash",
        },
    });

    const onSubmit = async (data) => {
        const orderData = {
            UserId: String(localStorage.getItem("id") || ""),

            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phone: data.phone || "",
            companyName: data.companyName || "",
            companyAddress: data.companyAddress || "",
            country: data.country || "",
            address: data.address || "",
            apartment: data.apartment || "",
            city: data.city || "",
            state: data.state || "",
            zip: data.zip || "",

            paymentMethod: data.paymentMethod || "cash",
            paymentStatus: "pending",
            orderStatus: "pending",

            subtotal: String(cartState.subTotal || 0),
            shippingCost: String(cartState.shippingCost || 0),
            taxAmount: String(cartState.taxAmount || 0),
            discount: String(cartState.discount || 0),
            couponCode: cartState.appliedCoupon || "",
            totalAmount: String(cartState.orderTotal || 0),
            orders: JSON.stringify(cartState.cartItems || []),
        };

        console.log("ORDER DATA:", orderData);

        try {
            const response = await createOrder(orderData);

            console.log("Order Created:", response.data);

            reset();

            toast.success("Order placed successfully!");

            router.push("/ordersuccess");
        } catch (error) {
            console.error("Error creating order:", error);
            console.error("Response:", error.response?.data);

            toast.error("Something went wrong while placing the order.");
        }
    };

    const handleCheckoutSubmit = () => {
        const userId = localStorage.getItem("id");

        if (!userId) {
            const toastId = "login-required";

            if (!toast.isActive(toastId)) {
                toast.error("Please login first to continue.", {
                    toastId,
                });
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        if (
            !Array.isArray(cartState.cartItems) ||
            cartState.cartItems.length === 0
        ) {
            const toastId = "empty-cart";

            if (!toast.isActive(toastId)) {
                toast.error(
                    "Your cart is empty. Please add a product to your cart to continue.",
                    {
                        toastId,
                    }
                );
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        handleSubmit(onSubmit)();
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem("id");

                if (!userId) {
                    const toastId = "login-required";

                    if (!toast.isActive(toastId)) {
                        toast.error("Please login first to continue.", {
                            toastId,
                        });
                    }

                    return;
                }

                const response = await getUserById(userId);

                const user = response.data?.[0];

                if (!user) {
                    toast.error("User details not found.");
                    return;
                }

                setValue("firstName", user.firstName || "");
                setValue("lastName", user.lastName || "");
                setValue("email", user.email || "");
            } catch (error) {
                console.error("Error fetching user:", error);

                const toastId = "user-fetch-error";

                if (!toast.isActive(toastId)) {
                    toast.error(
                        "Something went wrong. Please try again.",
                        {
                            toastId,
                        }
                    );
                }
            }
        };

        fetchUser();
    }, [setValue]);

    return (
        <>
            <BreadcrumbBanner />

            <Container>
                <CheckoutLoginSection />

                <CheckoutCouponSection />

                <Form onSubmit={(e) => e.preventDefault()}>
                    <BillingDetails
                        register={register}
                        errors={errors}
                    />

                    <PaymentSection
                        onPlaceOrder={handleCheckoutSubmit}
                    />
                </Form>
            </Container>

            <ToastContainer />
        </>
    );
}

export default CheckOut;