"use client";

import { Modal, Row, Col, Image } from "react-bootstrap";
import {
    X,
    Facebook,
    Twitter,
    Pinterest,
    Instagram,
} from "react-bootstrap-icons";
import { ConvertToCurrency } from "@/utils/utils";
import AddToWishlistRedux from "@/app/wishlist/_component/AddToWishlistRedux";
import AddToCartRedux from "@/app/cart/_component/AddTocartRedux";


function QuickViewModal({ show, handleClose, product }) {
    if (!product) return null;

    const reviews = product.reviews || [];

    const stars = Array.from({ length: reviews.length }, (_, index) => {
        return index < Math.round(product.rating) ? "★" : "☆";
    });

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
            className="quickview-modal"
            contentClassName="border-0 rounded-0"
        >
            <button
                type="button"
                onClick={handleClose}
                className="quickview-close"
                aria-label="Close"
            >
                <X size={20} />
            </button>

            <Modal.Body className="p-0">
                <Row className="g-0 align-items-center">
                    <Col md={6} className="quickview-image-col">
                        <div className="quickview-image-wrapper">
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                className="quickview-image"
                            />
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="quickview-content">
                            <h2 className="quickview-title">{product.title}</h2>

                            <div className="quickview-price-wrapper">
                                <span className="quickview-price">
                                    {ConvertToCurrency(
                                        product.price * (1 - product.discountPercentage / 100)
                                    )}
                                </span>

                                <span className="quickview-old-price">
                                    {ConvertToCurrency(product.price)}
                                </span>
                            </div>

                            <div className="quickview-rating">
                                <span className="stars">
                                    {stars.map((star, index) => (
                                        <span key={index}>{star}</span>
                                    ))}
                                </span>

                                <span className="review-count">
                                    ({reviews.length} Reviews)
                                </span>
                            </div>

                            <p className="quickview-description">{product.description}</p>

                            <div className="quickview-actions">
                                <AddToCartRedux product={product} isDetails />

                                <div className="bg-primary py-1 px-2">
                                    <AddToWishlistRedux product={product} />
                                </div>
                            </div>

                            <div className="quickview-share">
                                <span>Share:</span>
                                <Facebook size={15} />
                                <Twitter size={15} />
                                <Pinterest size={15} />
                                <Instagram size={15} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default QuickViewModal;