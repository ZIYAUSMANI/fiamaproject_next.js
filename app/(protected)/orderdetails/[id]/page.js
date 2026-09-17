"use client";

import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Stack,
    Button,
    Spinner,
} from "react-bootstrap";
import {
    Person,
    CreditCard,
    GeoAlt,
    CheckCircleFill,
    BoxSeam,
} from "react-bootstrap-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getOrderById } from "@/helper/Services";
import { ConvertToCurrency } from "@/utils/utils";
export const metadata = {
    title: "Order Details",
    description:
        "View your order information, purchased products, quantities, prices, and delivery details at Fiama Flower Shop.",
};
const OrderDetails = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });
    };

    const getPaymentMethod = (method) => {
        if (method === "cash") return "Cash on delivery";

        return method || "-";
    };

    const parseOrders = (orders) => {
        if (!orders) return [];

        if (Array.isArray(orders)) {
            return orders;
        }

        if (typeof orders === "string") {
            try {
                const parsed = JSON.parse(orders);

                return Array.isArray(parsed) ? parsed : [];
            } catch (error) {
                console.error("Invalid orders JSON:", error);
                return [];
            }
        }

        return [];
    };

    const fetchOrder = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getOrderById(id);
            const orderData = response.data?.[0];

            if (!orderData) {
                setOrder(null);
                return;
            }

            setOrder({
                ...orderData,
                orders: parseOrders(orderData.orders),
            });
        } catch (error) {
            console.error("Error fetching order:", error);
            setError("Failed to load order details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchOrder();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />

                    <div className="mt-2 text-secondary">
                        Loading order details...
                    </div>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="bg-light min-vh-100">
                <Container className="py-5">
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="text-center py-5">
                            <h5 className="text-danger mb-3">
                                {error || "Order not found"}
                            </h5>

                            <Link
                                href="/"
                                className="btn btn-primary rounded-pill px-4"
                            >
                                Back to Orders
                            </Link>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div className="bg-light">
            <Container className="px-2 px-md-4 px-lg-0 py-4">
                <div className="mb-4">
                    <Row className="align-items-start g-3">
                        <Col>
                            <h2 className="fw-semibold text-dark fs-2 mb-2">
                                Order Details
                            </h2>

                            <div className="text-secondary fs-6">
                                Order ID:{" "}
                                <span className="text-dark fw-bold">
                                    #{order.id}
                                </span>
                            </div>
                        </Col>

                        <Col xs="auto" className="text-end">
                            <Button
                                as={Link}
                                href="/account"
                                variant="primary"
                                className="rounded-pill px-4 py-2 fw-medium mb-2 me-2"
                            >
                                Back
                            </Button>

                            <div className="text-secondary fs-6 me-2">
                                Order Date:{" "}
                                <span className="text-dark fw-bold">
                                    {formatDate(order.createdAt)}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>

                <Row className="g-4">
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white border-bottom py-3">
                                <h5 className="mb-0 fw-semibold text-dark fs-5">
                                    <BoxSeam className="me-2 text-primary" />
                                    Ordered Items (
                                    {order.orders?.length || 0})
                                </h5>
                            </Card.Header>

                            <Card.Body className="p-0">
                                {order.orders.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`p-3 p-md-4 ${index !== order.orders.length - 1
                                            ? "border-bottom"
                                            : ""
                                            }`}
                                    >
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        className="rounded border me-3"
                                                        style={{
                                                            width: "75px",
                                                            height: "75px",
                                                            objectFit: "cover",
                                                        }}
                                                    />

                                                    <div>
                                                        <h6 className="mb-1 fw-semibold text-dark fs-6">
                                                            {item.title}
                                                        </h6>

                                                        <div className="text-secondary fs-6">
                                                            Product ID: {item.id}
                                                        </div>

                                                        <div className="text-success fw-medium fs-6 mt-1">
                                                            {
                                                                item.availabilityStatus
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col
                                                md={2}
                                                className="mt-3 mt-md-0"
                                            >
                                                <div className="text-secondary fs-6 mb-1">
                                                    Quantity
                                                </div>

                                                <span className="text-dark ms-4 fs-6 fw-bold">
                                                    {item.quantity}
                                                </span>
                                            </Col>

                                            <Col
                                                md={2}
                                                className="mt-3 mt-md-0"
                                            >
                                                <div className="text-secondary fs-6 mb-1">
                                                    Price
                                                </div>

                                                <span className="text-dark fs-6 fw-bold">
                                                    {ConvertToCurrency(
                                                        item.price
                                                    )}
                                                </span>
                                            </Col>

                                            <Col
                                                md={2}
                                                className="text-md-end mt-3 mt-md-0"
                                            >
                                                <div className="text-secondary fs-6 mb-1">
                                                    Total
                                                </div>

                                                <span className="text-primary fs-6 fw-bold">
                                                    {ConvertToCurrency(
                                                        item.totalPrice
                                                    )}
                                                </span>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white border-bottom py-3">
                                <h5 className="mb-0 fw-semibold text-dark fs-5">
                                    Order Summary
                                </h5>
                            </Card.Header>

                            <Card.Body>
                                <Stack gap={3}>
                                    <div className="d-flex justify-content-between fs-6">
                                        <span className="text-secondary">
                                            Subtotal
                                        </span>

                                        <span className="text-dark fw-bold">
                                            {ConvertToCurrency(
                                                order.subtotal
                                            )}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between fs-6">
                                        <span className="text-secondary">
                                            Shipping
                                        </span>

                                        <span className="text-dark fw-bold">
                                            {ConvertToCurrency(
                                                order.shippingCost
                                            )}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between fs-6">
                                        <span className="text-secondary">
                                            Tax
                                        </span>

                                        <span className="text-dark fw-bold">
                                            {ConvertToCurrency(
                                                order.taxAmount
                                            )}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between fs-6">
                                        <span className="text-secondary">
                                            Discount
                                        </span>

                                        <span className="text-success fw-bold">
                                            -
                                            {ConvertToCurrency(
                                                order.discount
                                            )}
                                        </span>
                                    </div>

                                    {order.couponCode && (
                                        <div className="d-flex justify-content-between fs-6">
                                            <span className="text-secondary">
                                                Coupon
                                            </span>

                                            <span className="text-dark fw-bold">
                                                {order.couponCode}
                                            </span>
                                        </div>
                                    )}
                                </Stack>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 fw-semibold text-dark fs-5">
                                        Order Total
                                    </h5>

                                    <h4 className="mb-0 fw-bold text-primary fs-5">
                                        {ConvertToCurrency(
                                            order.totalAmount
                                        )}
                                    </h4>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Body className="text-center py-5">
                                <CheckCircleFill
                                    size={55}
                                    className="text-success mb-3"
                                />

                                <h5 className="fw-semibold text-dark mb-2 fs-5">
                                    Thank you for your order!
                                </h5>

                                <p className="text-secondary mb-0 fs-6">
                                    Your order has been placed successfully.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white border-bottom py-3">
                                <h5 className="mb-0 fw-semibold text-dark fs-5">
                                    <Person className="me-2 text-primary" />
                                    Customer Details
                                </h5>
                            </Card.Header>

                            <Card.Body>
                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="text-dark fw-semibold">
                                        Name:
                                    </span>

                                    <span className="small text-secondary">
                                        {order.firstName} {order.lastName}
                                    </span>
                                </div>

                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="text-dark fw-semibold">
                                        Email:
                                    </span>

                                    <span className="small text-secondary text-break">
                                        {order.email}
                                    </span>
                                </div>

                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="text-dark fw-semibold">
                                        Phone:
                                    </span>

                                    <span className="small text-secondary ">
                                        {order.phone}
                                    </span>
                                </div>

                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="text-dark fw-semibold">
                                        User ID:
                                    </span>

                                    <span className="small text-secondary ">
                                        {order.UserId}
                                    </span>
                                </div>

                                <div className="d-flex gap-2 align-items-center">
                                    <span className="text-dark fw-semibold">
                                        Customer Account ID:
                                    </span>

                                    <span className="small text-secondary ">
                                        {order.id}
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white border-bottom py-3">
                                <h5 className="mb-0 fw-semibold text-dark fs-5">
                                    <CreditCard className="me-2 text-primary" />
                                    Payment Details
                                </h5>
                            </Card.Header>

                            <Card.Body>
                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="text-dark fw-semibold">
                                        Payment Method:
                                    </span>

                                    <span className="small text-secondary ">
                                        {getPaymentMethod(
                                            order.paymentMethod
                                        )}
                                    </span>
                                </div>

                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="text-dark fw-semibold">
                                        Payment Status:
                                    </span>

                                    <Badge
                                        bg={
                                            order.paymentStatus === "paid"
                                                ? "success"
                                                : "warning"
                                        }
                                        text={
                                            order.paymentStatus === "paid"
                                                ? "white"
                                                : "dark"
                                        }
                                        className="text-capitalize px-2 py-1"
                                    >
                                        {order.paymentStatus || "Pending"}
                                    </Badge>
                                </div>

                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="text-dark fw-semibold">
                                        Coupon Code:
                                    </span>

                                    <span className="small text-secondary ">
                                        {order.couponCode ||
                                            "No coupon applied"}
                                    </span>
                                </div>

                                <div className="d-flex gap-2 align-items-center">
                                    <span className="text-dark fw-semibold">
                                        Total Payable:
                                    </span>

                                    <span className="small text-primary  fw-semibold">
                                        {ConvertToCurrency(
                                            order.totalAmount
                                        )}
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white border-bottom py-3">
                                <h5 className="mb-0 fw-semibold text-dark fs-5">
                                    <GeoAlt className="me-2 text-primary" />
                                    Shipping Address
                                </h5>
                            </Card.Header>

                            <Card.Body>
                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="text-dark fw-semibold">
                                        Address:
                                    </span>

                                    <span className="small text-secondary ">
                                        {order.address || "-"}
                                    </span>
                                </div>

                                {order.apartment && (
                                    <div className="d-flex gap-2 align-items-center mb-3">
                                        <span className="text-dark fw-semibold">
                                            Apartment / Suite:
                                        </span>

                                        <span className="small text-secondary ">
                                            {order.apartment}
                                        </span>
                                    </div>
                                )}

                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="text-dark fw-semibold">
                                        City:
                                    </span>

                                    <span className="small text-secondary text-capitalize ">
                                        {order.city || "-"}
                                    </span>
                                </div>

                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="text-dark fw-semibold">
                                        State:
                                    </span>

                                    <span className="small text-secondary ">
                                        {order.state || "-"}
                                    </span>
                                </div>

                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="text-dark fw-semibold">
                                        ZIP:
                                    </span>

                                    <span className="small text-secondary ">
                                        {order.zip || "-"}
                                    </span>
                                </div>

                                <div className="d-flex gap-2 align-items-center">
                                    <span className="text-dark fw-semibold">
                                        Country:
                                    </span>

                                    <span className="small text-secondary ">
                                        {order.country || "-"}
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OrderDetails;