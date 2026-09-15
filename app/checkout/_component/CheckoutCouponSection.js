"use client";

import React, { useState } from "react";
import { Form, Button, Collapse } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import formValidationSchema from "@/FromSchema/formValidationSchema";
import { applyCoupon } from "@/store/Slice/cartSlice";


const CheckoutCouponSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            couponCode: "",
        },
        resolver: yupResolver(
            formValidationSchema.pick(["couponCode"])
        ),
    });

    const handleApplyCoupon = (data) => {
        const coupon = data.couponCode.trim().toUpperCase();

        const couponInfo = cartState.couponCodes?.find(
            (item) => item.code === coupon
        );

        if (!couponInfo) {
            toast.error("Invalid coupon code");
            return;
        }

        dispatch(applyCoupon(coupon));
        toast.success("Coupon code is applied successfully!");

        reset();
        setIsOpen(false);
    };

    const toggleCouponForm = () => {
        setIsOpen((previousState) => !previousState);
    };

    const handleToggleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleCouponForm();
        }
    };

    return (
        <div className="checkout-coupon-wrapper py-5">
            <div className="coupon-toggle-banner">
                <span>Have a coupon?</span>

                <span
                    className="toggle-link"
                    onClick={toggleCouponForm}
                    role="button"
                    tabIndex={0}
                    onKeyDown={handleToggleKeyDown}
                >
                    Click here to enter your code
                </span>
            </div>

            <Collapse in={isOpen}>
                <div>
                    <div className="coupon-form-card">
                        <p className="form-instruction">
                            If you have a coupon code, please apply it below.
                        </p>

                        <Form
                            noValidate
                            onSubmit={handleSubmit(handleApplyCoupon)}
                        >
                            <div className="mb-4">
                                <div className="custom-input-group">
                                    <Form.Control
                                        type="text"
                                        placeholder="Coupon code"
                                        isInvalid={!!errors.couponCode}
                                        {...register("couponCode")}
                                    />
                                </div>

                                {errors.couponCode && (
                                    <div className="text-danger small mt-1">
                                        {errors.couponCode.message}
                                    </div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                variant="gray"
                                className="btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "APPLYING..."
                                    : "APPLY COUPON"}
                            </Button>
                        </Form>
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default CheckoutCouponSection;