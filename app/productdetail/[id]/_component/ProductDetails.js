"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Link from "next/link";


import { ConvertToCurrency } from "@/utils/utils";
import AddToCartRedux from "@/app/cart/_component/AddTocartRedux";
import AddToWishlistRedux from "@/app/wishlist/_component/AddToWishlistRedux";
import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import { useParams } from "next/navigation";
import { getProductById } from "@/helper/Services";

const ProductDetails = () => {
    const params = useParams();
    const productId = params.id;

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [activeProduct, setActiveProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getProductById(productId);
                setActiveProduct(data);
            } catch (error) {
                if (error.response?.status === 404) {
                    setActiveProduct(null);
                } else {
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const selectedImage =
        activeProduct?.images?.[selectedImageIndex] ||
        activeProduct?.thumbnail;

    return (
        <Fragment>
            <BreadcrumbBanner product={activeProduct} />

            {loading ? (
                <Container className="py-5 mt-5 text-center">
                    <Spinner size="sm" className="me-2" />
                    Please wait, product is on the way...
                </Container>
            ) : error ? (
                <Container className="py-5 mt-5">
                    <div className="text-danger text-center">
                        {error.message || "Something went wrong"}
                    </div>
                </Container>
            ) : !activeProduct ? (
                <Container className="py-5 mt-5 text-center">
                    <h3>Product not found</h3>

                    <Link
                        href="/shop"
                        className="btn btn-primary mt-3"
                    >
                        Back to Products
                    </Link>
                </Container>
            ) : (
                <Container className="product-details-container py-5 mt-5">
                    <Row className="g-4">
                        <Col xs={2} md={2} lg={1}>
                            <div className="d-flex flex-column gap-3">
                                {activeProduct.images?.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() =>
                                            setSelectedImageIndex(index)
                                        }
                                        className={`thumbnail-wrapper ${selectedImageIndex === index
                                            ? "active"
                                            : ""
                                            }`}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img
                                            src={image}
                                            alt={activeProduct.title}
                                            className="img-fluid"
                                        />
                                    </div>
                                ))}
                            </div>
                        </Col>

                        <Col xs={10} md={5} lg={5}>
                            <div className="main-image-container">
                                <img
                                    src={selectedImage}
                                    alt={activeProduct.title}
                                    className="img-fluid main-product-img"
                                />
                            </div>
                        </Col>

                        <Col xs={12} md={5} lg={5}>
                            <div className="product-info-wrapper ps-lg-3">
                                <h2 className="product-title fw-medium text-dark mb-2">
                                    {activeProduct.title}
                                </h2>

                                <div className="d-flex align-items-center gap-1 mb-3">
                                    <span className="fs-3 fw-semibold text-primary">
                                        {ConvertToCurrency(
                                            activeProduct.price *
                                            (1 -
                                                activeProduct.discountPercentage /
                                                100)
                                        )}
                                    </span>

                                    {activeProduct.discountPercentage > 0 && (
                                        <span className="text-decoration-line-through text-danger fw-semibold fs-6 ms-1">
                                            {ConvertToCurrency(
                                                activeProduct.price
                                            )}
                                        </span>
                                    )}
                                </div>

                                <p className="product-description text-secondary mb-4">
                                    {activeProduct.description}
                                </p>

                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <AddToCartRedux
                                        product={activeProduct}
                                        isDetails
                                    />

                                    <div className="bg-primary py-1 px-2">
                                        <AddToWishlistRedux
                                            product={activeProduct}
                                        />
                                    </div>
                                </div>

                                <div className="product-meta text-secondary fs-6 border-top pt-3">
                                    <div className="d-flex mb-1 gap-3">
                                        <span className="meta-label">
                                            SKU:
                                        </span>

                                        <span className="meta-value">
                                            {activeProduct.sku}
                                        </span>
                                    </div>

                                    <div className="d-flex mb-1 gap-3">
                                        <span className="meta-label">
                                            Categories:
                                        </span>

                                        <span className="meta-value text-capitalize">
                                            {activeProduct.category}
                                        </span>
                                    </div>

                                    <div className="d-flex gap-3">
                                        <span className="meta-label">
                                            Tags:
                                        </span>

                                        <span className="meta-value text-capitalize">
                                            {activeProduct.tags?.join(", ")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </Fragment>
    );
};

export default ProductDetails;