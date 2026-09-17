"use client";

import React, { useEffect } from "react";
import {
    Form,
    Row,
    Col,
    Container,
    Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, } from "react-toastify";
import formValidationSchema from "@/FromSchema/formValidationSchema";
import { getUserById, updateUser } from "@/helper/Services";

const AccountDetailsForm = ({ onUserUpdated }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            id: "",
        },

        resolver: yupResolver(
            formValidationSchema.pick([
                "firstName",
                "lastName",
                "email",
            ])
        ),

        mode: "onSubmit",
    });

    const fetchUser = async () => {
        try {
            const userId = localStorage.getItem("id");

            if (!userId) {
                return;
            }

            const response = await getUserById(userId);
            const currentUser = response?.data?.[0];

            if (!currentUser) {
                toast.error("User not found.");
                return;
            }

            setValue("firstName", currentUser.firstName || "");
            setValue("lastName", currentUser.lastName || "");
            setValue("email", currentUser.email || "");
            setValue("id", currentUser.id || "");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const modifyUser = async (data) => {
        try {
            await updateUser(data);
            toast.success("User updated successfully!");
            if (onUserUpdated) {
                await onUserUpdated();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const onSubmit = async (data) => {
        await modifyUser(data);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container className="py-4">
                <div className="bg-lightgray p-4 mb-4 rounded-0">
                    <p className="mb-0 text-dark fs-6">
                        The following addresses will be used on the checkout
                        page by default.
                    </p>
                </div>

                <Row className="g-4">
                    <Col md={6}>
                        <Form.Group controlId="firstName">
                            <Form.Label>First name:</Form.Label>

                            <Form.Control
                                type="text"
                                className="bg-lightgray border-0 rounded-0 py-2"
                                isInvalid={!!errors.firstName}
                                {...register("firstName")}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.firstName?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last name:</Form.Label>

                            <Form.Control
                                type="text"
                                className="bg-lightgray border-0 rounded-0 py-2"
                                isInvalid={!!errors.lastName}
                                {...register("lastName")}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.lastName?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={12}>
                        <Form.Group controlId="email">
                            <Form.Label>Display Email:</Form.Label>

                            <Form.Control
                                type="email"
                                className="bg-lightgray border-0 rounded-0 py-2"
                                isInvalid={!!errors.email}
                                {...register("email")}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Form.Control
                        type="hidden"
                        {...register("id")}
                    />
                </Row>

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="mt-4"
                >
                    {isSubmitting
                        ? "UPDATING..."
                        : "UPDATE ACCOUNT DETAILS"}
                </Button>
            </Container>

        </Form>
    );
};

export default AccountDetailsForm;