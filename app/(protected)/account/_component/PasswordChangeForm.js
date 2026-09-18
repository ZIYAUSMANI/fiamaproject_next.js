"use client";

import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import formValidationSchema from "@/FromSchema/formValidationSchema";
import { updateUser } from "@/helper/Services";

const PasswordChangeForm = ({ user }) => {
    const router = useRouter();

    const defaultFormValues = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: defaultFormValues,
        resolver: yupResolver(
            formValidationSchema.pick([
                "currentPassword",
                "newPassword",
                "confirmPassword",
            ])
        ),
        mode: "onSubmit",
    });

    const onSubmit = async (data) => {
        try {
            if (!user) {
                toast.error("User not found");
                return;
            }

            if (data.currentPassword !== user.password) {
                toast.error("Current password is incorrect");
                return;
            }

            if (data.newPassword !== data.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            await updateUser({
                ...user,
                password: data.newPassword,
            });

            localStorage.removeItem("login");
            localStorage.removeItem("id");

            reset(defaultFormValues);

            toast.success("Password changed successfully");

            router.push("/login");

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="py-4">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Card className="p-4 border-0 shadow-sm rounded-0 mb-4 bg-white">

                    <h5 className="fw-normal mb-4 text-dark text-uppercase">
                        Password Change
                    </h5>

                    <Row className="g-4">

                        <Col md={12}>
                            <Form.Group controlId="currentPassword">
                                <Form.Label>
                                    Current password:
                                </Form.Label>

                                <Form.Control
                                    type="password"
                                    className="bg-light border-0 rounded-0 py-2"
                                    isInvalid={!!errors.currentPassword}
                                    {...register("currentPassword")}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.currentPassword?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={12}>
                            <Form.Group controlId="newPassword">
                                <Form.Label>
                                    New password:
                                </Form.Label>

                                <Form.Control
                                    type="password"
                                    className="bg-light border-0 rounded-0 py-2"
                                    isInvalid={!!errors.newPassword}
                                    {...register("newPassword")}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.newPassword?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={12}>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>
                                    Confirm new password:
                                </Form.Label>

                                <Form.Control
                                    type="password"
                                    className="bg-light border-0 rounded-0 py-2"
                                    isInvalid={!!errors.confirmPassword}
                                    {...register("confirmPassword")}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.confirmPassword?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={12}>
                            <Button
                                type="submit"
                                variant="primary"
                                className="mt-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "CHANGING PASSWORD..."
                                    : "CHANGE PASSWORD"}
                            </Button>
                        </Col>

                    </Row>
                </Card>
            </Form>
        </div>
    );
};

export default PasswordChangeForm;