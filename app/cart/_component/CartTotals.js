"use client";
import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Link, Trash } from 'react-bootstrap-icons';
import { applyCoupon, removeCoupon } from '@/store/Slice/cartSlice';
import { ConvertToCurrency } from '@/utils/utils';

const CartTotals = () => {

    const cartState = useSelector((state) => state.cart)
    const [couponCode, setCouponCode] = useState('');
    const dispatch = useDispatch();


    const handleApplyCoupon = (e) => {
        e.preventDefault();

        const coupon = couponCode.trim().toUpperCase();

        const couponInfo = cartState.couponCodes.find(
            (item) => item.code === coupon
        )

        if (couponInfo) {
            dispatch(applyCoupon(coupon))
            toast.success("Coupon code is applied successfully!!!")
            setCouponCode('');
        } else {
            toast.error("Invalid coupon code")
        }
    }
    const handleRemoveCoupon = () => {
        dispatch(removeCoupon());
    }
    return (
        <Container className="cart-actions-wrapper ">
            {/* Top Action Bar */}
            <Row className="align-items-center mb-5 gy-3 border-bottom pb-3">
                <Col xs={5} sm={8} md={6} >
                    <Form onSubmit={handleApplyCoupon}>
                        <InputGroup style={{ maxWidth: '380px' }}>
                            <Form.Control
                                type="text"
                                placeholder="Coupon code"
                                className="coupon-input"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                            />
                            <button type="submit" className="btn btn-gray">
                                Apply Coupon
                            </button>
                        </InputGroup>
                    </Form>
                </Col>


            </Row>

            {/* Cart Totals Section */}
            <Row className="justify-content-end">
                <Col md={5} lg={4}>
                    <div className="cart-totals-card">
                        <h4>Cart Totals</h4>
                        <table className="totals-table">
                            <tbody>
                                <tr>
                                    <td>Total items</td>
                                    <td>{cartState.totalQuantities}</td>
                                </tr>
                                <tr>
                                    <td>Cart Subtotal</td>
                                    <td>{ConvertToCurrency(cartState.subTotal)}</td>
                                </tr>
                                <tr>
                                    <td>Shipping and Handing</td>
                                    <td>{ConvertToCurrency(cartState.shippingCost)}</td>
                                </tr>
                                <tr>
                                    <td>Vat({cartState.tax}%)</td>
                                    <td>{ConvertToCurrency(cartState.taxAmount)}</td>
                                </tr>
                                {cartState.appliedCoupon != '' &&
                                    <tr>
                                        <td>discount({cartState.appliedCoupon}   <Trash className="text-dark" onClick={handleRemoveCoupon} role="button" />)</td>
                                        <td>{ConvertToCurrency(cartState.discount)}</td>
                                    </tr>}
                                <tr className="total-row">
                                    <td>Order Total</td>
                                    <td>{ConvertToCurrency(cartState.orderTotal)}</td>
                                </tr>
                            </tbody>
                        </table>

                        <Button
                            type="button"
                            variant="primary"
                            className="w-100 mt-3"
                            as={Link}
                            href="/checkout"
                        >
                            Proceed to checkout
                        </Button>
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default CartTotals;