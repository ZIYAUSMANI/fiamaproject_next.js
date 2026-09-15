"use client";

import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Form,
    Button,
    Collapse,
    ToastContainer,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { authUser } from "@/helper/Services";
import formValidationSchema from "@/FromSchema/formValidationSchema";



const CheckoutLoginSection = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },

        resolver: yupResolver(
            formValidationSchema.pick(["email", "password"])
        ),

        mode: "onSubmit",
    });

    useEffect(() => {
        const login = localStorage.getItem("login");
        setIsOpen(login !== "true");
    }, []);

    const checkdata = async (data) => {
        try {
            setError("");

            const response = await authUser(data);
            const users = response?.data || [];
            const user = users[0];

            if (!user || user.email !== data.email) {
                setError("Invalid email or password.");
                return;
            }

            if (user.password !== data.password) {
                setError("Invalid email or password.");
                return;
            }

            localStorage.setItem("login", "true");
            localStorage.setItem("id", user.id);

            setError("");
            setIsOpen(false);
            reset();

            toast.success("Login successful.");
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password.");
        }
    };

    const onSubmit = async (data) => {
        await checkdata(data);
    };

    return (
        <div className="checkout-login-wrapper py-5">
            <div className="login-toggle-banner">
                <span>Returning customer?</span>

                <span
                    className="toggle-link"
                    onClick={() => {
                        setError("");
                        setIsOpen(!isOpen);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setError("");
                            setIsOpen(!isOpen);
                        }
                    }}
                >
                    Click here to login
                </span>
            </div>

            <Collapse in={isOpen}>
                <div>
                    <div className="login-form-card">
                        <p className="form-instruction">
                            Please login to your account.
                        </p>

                        <Form
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Row className="g-3 mb-4">
                                <Col md={6}>
                                    <div className="custom-input-group">
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email address"
                                            className="bg-light border-0 py-3 px-3 rounded-0"
                                            isInvalid={!!errors.email}
                                            {...register("email")}
                                        />

                                        <FaEnvelope className="input-icon" />
                                    </div>

                                    {errors.email && (
                                        <div className="text-danger small mt-1">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </Col>

                                <Col md={6}>
                                    <div className="custom-input-group">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            className="bg-light border-0 py-3 px-3 rounded-0"
                                            isInvalid={!!errors.password}
                                            {...register("password")}
                                        />

                                        <FaLock className="input-icon" />
                                    </div>

                                    {errors.password && (
                                        <div className="text-danger small mt-1">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </Col>
                            </Row>

                            {error && (
                                <div className="text-danger small mb-3">
                                    {error}
                                </div>
                            )}

                            <div className="d-flex align-items-center gap-3 mb-4">
                                <Button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "LOGGING IN..."
                                        : "LOGIN"}
                                </Button>

                                <Form.Check
                                    type="checkbox"
                                    label="Remember me"
                                    {...register("rememberMe")}
                                    className="remember-me-checkbox ms-2"
                                />
                            </div>
                        </Form>
                    </div>
                </div>
            </Collapse>

            <ToastContainer />
        </div>
    );
};

export default CheckoutLoginSection;