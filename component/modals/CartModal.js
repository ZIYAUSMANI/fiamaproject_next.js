import React from 'react';
import { Modal, Row, Col, Button, CloseButton } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircleFill } from 'react-bootstrap-icons';
function CartModal({ show, handleClose, product }) {
    if (!product) return null;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            contentClassName="border-0 rounded-0 p-3 shadow-lg"
            className="cart-modal"
        >
            {/* Top-Right Close Button */}
            <CloseButton
                onClick={handleClose}
                className="position-absolute top-0 end-0 m-2 btn-close-custom"
                style={{ zIndex: 10 }}
                aria-label="Close"
            />

            <Modal.Body className="pt-4 pb-2 px-3">
                <Row className="align-items-center g-3">
                    {/* Dynamic Product Image */}
                    <Col xs={5} sm={4}>
                        <div className="bg-light p-2 text-center rounded-0">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="img-fluid"
                            />
                        </div>
                    </Col>

                    {/* Dynamic Product Title & Actions */}
                    <Col xs={7} sm={8}>
                        <h5 className="fw-semibold text-dark mb-2">{product.title}</h5>

                        <p className="text-dark small d-flex align-items-center gap-2 mb-3">
                            <CheckCircleFill className="text-success flex-shrink-0" size={18} />
                            <span>Successfully added to your Cart</span>
                        </p>

                        <div className="d-flex flex-wrap gap-2">
                            <Link
                                href="/cart"
                                className="btn btn-primary rounded-0 px-3 py-2 fs-7 fw-medium"
                            >
                                View Cart
                            </Link>

                            <Link
                                href="/checkout"
                                className="btn btn-secondary rounded-0 px-3 py-2 fs-7 fw-medium"
                            >
                                Checkout
                            </Link>
                        </div>
                    </Col>
                </Row>

                <hr className="my-4 text-muted opacity-25" />

                <div className="text-center">
                    <p className="small text-muted mb-3 lh-base">
                        We want to give you <span className="text-dark fw-bold">10% discount</span> for your first order,
                        <br className="d-none d-sm-inline" /> Use <span className="text-dark fw-medium">(fiama10)</span> discount code at checkout
                    </p>
                    <Image
                        src="/image/payment.webp"
                        alt="Payment methods"
                        width={300}
                        height={50}
                        className="img-fluid"
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default CartModal;