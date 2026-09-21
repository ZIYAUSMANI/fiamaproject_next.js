"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import formValidationSchema from "@/FromSchema/formValidationSchema";
import { authUser } from "@/helper/Services";


const LoginForm = () => {
    const [error, setError] = useState("");

    const router = useRouter();



    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accountCreated = params.get("accountCreated");

        if (accountCreated === "true") {
            toast.success("Account created successfully.");
            router.replace("/login");
        }
    }, [router]);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(
            formValidationSchema.pick(["email", "password"])
        ),
        mode: "onSubmit",
    });

    const checkdata = async (data) => {
        try {
            setError("");

            const response = await authUser(data);

            if (
                response?.data?.length > 0 &&
                response.data[0].email === data.email &&
                response.data[0].password === data.password
            ) {
                localStorage.setItem("login", "true");
                localStorage.setItem("id", response.data[0].id);

                toast.success("Login successful.");

                router.push("/account");
            } else {
                setError("Invalid email or password.");
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setError("Invalid email or password.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    const handleOnSubmit = async (data) => {
        await checkdata(data);
    };

    return (
        <Container className="py-5">
            <Form
                noValidate
                onSubmit={handleSubmit(handleOnSubmit)}
            >
                <Row className="g-5 align-items-start">
                    <Col xs={12} lg={6}>
                        <Form.Group
                            className="mb-4"
                            controlId="formBasicEmail"
                        >
                            <Form.Control
                                type="email"
                                placeholder="Email*"
                                className="bg-light border-0 py-3 px-3 rounded-0"
                                isInvalid={!!errors.email}
                                {...register("email")}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                            className="mb-4"
                            controlId="formBasicPassword"
                        >
                            <Form.Control
                                type="password"
                                placeholder="Password*"
                                className="bg-light border-0 py-3 px-3 rounded-0"
                                isInvalid={!!errors.password}
                                {...register("password")}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {error && (
                            <div className="text-danger mb-3">
                                {error}
                            </div>
                        )}

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-0 text-uppercase fw-medium px-5 py-3 mb-4 border-0"
                            style={{
                                letterSpacing: "1px",
                            }}
                        >
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </Button>

                        <div>
                            <Link
                                href="/forgot-password"
                                className="text-uppercase text-secondary text-decoration-none small"
                                style={{
                                    letterSpacing: "0.5px",
                                }}
                            >
                                FORGOTTEN YOUR PASSWORD?
                            </Link>
                        </div>
                    </Col>

                    <Col
                        xs={12}
                        lg={6}
                        className="text-center pt-3 pt-lg-0"
                    >
                        <h4 className="fw-medium text-dark text-uppercase mb-3">
                            DON'T HAVE AN ACCOUNT?
                        </h4>

                        <p className="text-dark small px-lg-4 mb-4 lh-base">
                            Add items to your wishlist get personalised
                            recommendations check out more quickly track
                            your orders register
                        </p>

                        <Link
                            href="/register"
                            className="btn btn-primary rounded-0 text-uppercase fw-medium px-3 py-3 border-0 fs-6"
                        >
                            CREATE ACCOUNT
                        </Link>
                    </Col>
                </Row>
            </Form>

            <ToastContainer />
        </Container>
    );
};

export default LoginForm;