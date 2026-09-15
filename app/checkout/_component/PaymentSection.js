"use client";

import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "react-bootstrap-icons";
import { removeCoupon } from "@/store/Slice/cartSlice";
import { ConvertToCurrency } from "@/utils/utils";


const PaymentSection = ({ onPlaceOrder }) => {
    const cartState = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveCoupon = () => {
        dispatch(removeCoupon());
    };

    return (
        <div className="payment-section-wrapper py-5">
            <Row className="gap-5 justify-content-between">
                <Col lg={6}>
                    <h2 className="section-title">
                        Payment Method
                    </h2>

                    <div className="payment-options-card">
                        <div className="payment-option-item">
                            <Form.Check
                                type="radio"
                                id="cash-on-delivery"
                                label="Cash on delivery"
                                value="cash"
                                defaultChecked
                            />

                            <div className="payment-desc-box">
                                Pay with cash upon delivery.
                            </div>
                        </div>
                    </div>

                    <p className="privacy-text">
                        Your personal data will be used to process your order,
                        support your experience throughout this website, and
                        for other purposes described in our privacy policy.
                    </p>

                    <Button
                        type="submit"
                        className="btn-primary"
                        onClick={onPlaceOrder}
                    >
                        PLACE ORDER
                    </Button>
                </Col>

                <Col lg={5}>
                    <h2 className="section-title">
                        Cart Totals
                    </h2>

                    <table className="cart-totals-table">
                        <tbody>
                            <tr>
                                <td>Total items</td>
                                <td>{cartState.totalQuantities}</td>
                            </tr>

                            <tr>
                                <td>Cart Subtotal</td>
                                <td>
                                    {ConvertToCurrency(cartState.subTotal)}
                                </td>
                            </tr>

                            <tr>
                                <td>Shipping and Handing</td>
                                <td>
                                    {ConvertToCurrency(cartState.shippingCost)}
                                </td>
                            </tr>

                            <tr>
                                <td>Vat({cartState.tax}%)</td>
                                <td>
                                    {ConvertToCurrency(cartState.taxAmount)}
                                </td>
                            </tr>

                            {cartState.appliedCoupon !== "" && (
                                <tr>
                                    <td>
                                        discount({cartState.appliedCoupon}{" "}
                                        <Trash
                                            className="text-dark"
                                            onClick={handleRemoveCoupon}
                                            role="button"
                                        />
                                        )
                                    </td>
                                    <td>
                                        {ConvertToCurrency(cartState.discount)}
                                    </td>
                                </tr>
                            )}

                            <tr className="fw-bold">
                                <td>Order Total</td>
                                <td>
                                    {ConvertToCurrency(cartState.orderTotal)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    );
};

export default PaymentSection;