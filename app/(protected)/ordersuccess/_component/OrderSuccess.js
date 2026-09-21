"use client";

import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { ConvertToCurrency } from "@/utils/utils";
import { clearCart } from "@/store/Slice/cartSlice";

const OrderSuccess = () => {
    const cartState = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={7} xl={6}>
                        {/* Success Section */}
                        <div className="text-center mb-4">
                            {/* Check Icon */}
                            <div
                                className="bg-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                                style={{
                                    width: "70px",
                                    height: "70px",
                                }}
                            >
                                <span className="text-white fs-1">
                                    ✓
                                </span>
                            </div>

                            <h1 className="fw-normal mb-2">
                                Thank you for your purchase
                            </h1>

                            <p className="text-secondary mb-1">
                                We've received your order will ship in 5-7 business days.
                            </p>

                            <p className="text-secondary">
                                Your order number is <span className="fw-bold">#B6CT3</span>
                            </p>
                        </div>

                        {/* Order Summary */}
                        <Card className="border-0 rounded-4 shadow-sm">
                            <Card.Body className="p-4">
                                <h4 className="fw-semibold mb-3">
                                    Order Summary
                                </h4>
                                {(cartState?.cartItems || []).map((item) => (
                                    <div
                                        key={item.id}
                                        className="d-flex align-items-center justify-content-between border-bottom py-2"
                                    >
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="rounded"
                                                style={{
                                                    width: "60px",
                                                    height: "48px",
                                                    objectFit: "cover",
                                                }}
                                            />

                                            <div className="ms-3">
                                                <small className="text-secondary">
                                                    {item.title}
                                                </small>

                                                {item.quantity > 1 && (
                                                    <small className="ms-2 text-dark">
                                                        (Qty: {item.quantity})
                                                    </small>
                                                )}
                                            </div>
                                        </div>

                                        <span className="fw-medium ms-3">
                                            {ConvertToCurrency(item.totalPrice)}
                                        </span>
                                    </div>
                                ))}

                                <div className="d-flex justify-content-end gap-5 pt-3">
                                    <span className="fw-bold text-dark fs-5">
                                        Total
                                    </span>

                                    <strong className="fw-bold text-dark">
                                        {ConvertToCurrency(cartState?.orderTotal || 0)}
                                    </strong>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Back Home */}
                        <div className="text-center mt-4">
                            <Button
                                as={Link}
                                href="/"
                                variant="primary"
                                className="px-3"
                                onClick={() => dispatch(clearCart())}
                            >
                                Back to Home
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OrderSuccess;