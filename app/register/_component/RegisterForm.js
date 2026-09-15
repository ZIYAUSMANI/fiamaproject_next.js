"use client";

import React, { useRef, useState } from "react";
import { Form, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import formValidationSchema from "@/FromSchema/formValidationSchema";
import { createUser } from "@/helper/Services";



const RegisterForm = () => {
    const [error, setError] = useState("");

    const router = useRouter();

    const defaultFormValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        marketingConsent: false,
        termsConsent: false,
    };

    const currentDefaults = useRef(defaultFormValues);

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        defaultValues: defaultFormValues,
        resolver: yupResolver(
            formValidationSchema.pick([
                "firstName",
                "lastName",
                "email",
                "password",
                "confirmPassword",
                "marketingConsent",
                "termsConsent",
            ])
        ),
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const addNewUser = async (data) => {
        try {
            const {
                marketingConsent,
                termsConsent,
                confirmPassword,
                ...userData
            } = data;

            await createUser(userData);

            currentDefaults.current = defaultFormValues;
            reset(defaultFormValues);

            router.push("/login?accountCreated=true");
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong. Please try again."
            );
        }
    };

    const handleFormSubmit = async (data) => {
        await addNewUser(data);
    };

    return (
        <Container className="register-container">
            <Form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        className="custom-input"
                        isInvalid={!!errors.firstName}
                        {...register("firstName")}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        className="custom-input"
                        isInvalid={!!errors.lastName}
                        {...register("lastName")}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                        type="email"
                        placeholder="Email*"
                        className="custom-input"
                        isInvalid={!!errors.email}
                        {...register("email")}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                        type="password"
                        placeholder="Password*"
                        className="custom-input"
                        isInvalid={!!errors.password}
                        {...register("password")}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password*"
                        className="custom-input"
                        isInvalid={!!errors.confirmPassword}
                        {...register("confirmPassword")}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2" controlId="marketingConsent">
                    <Form.Check
                        type="checkbox"
                        label={
                            <span className="consent-text">
                                I consent to Fiama processing my personal data
                                in order to send personalized marketing
                                material in accordance with the consent form
                                and the privacy policy.
                            </span>
                        }
                        {...register("marketingConsent")}
                    />

                    {errors.marketingConsent && (
                        <div className="invalid-feedback d-block">
                            {errors.marketingConsent.message}
                        </div>
                    )}
                </Form.Group>

                <Form.Group className="mb-4" controlId="termsConsent">
                    <Form.Check
                        type="checkbox"
                        label={
                            <span className="consent-text">
                                By clicking "create account", I consent to the
                                privacy policy.
                            </span>
                        }
                        {...register("termsConsent")}
                    />

                    {errors.termsConsent && (
                        <div className="invalid-feedback d-block">
                            {errors.termsConsent.message}
                        </div>
                    )}
                </Form.Group>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                    </button>
                </div>

                <div className="register-policy text-center mb-4">
                    <p className="mb-3">
                        By creating an account, you agree to our:
                    </p>

                    <div>
                        <Link href="/terms" className="custom-link">
                            TERMS OF CONDITIONS
                        </Link>

                        <span className="policy-separator"> | </span>

                        <Link href="/privacy-policy" className="custom-link">
                            PRIVACY POLICY
                        </Link>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/login"
                        className="already-account-link"
                    >
                        ALREADY HAVE AN ACCOUNT?
                    </Link>
                </div>

                {error && (
                    <div className="text-danger text-center mt-3">
                        {error}
                    </div>
                )}
            </Form>
        </Container>
    );
};

export default RegisterForm;