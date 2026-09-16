"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge } from "react-bootstrap";
import QuickViewModal from "./modals/QuickViewModal";
import AddToWishlistRedux from "@/app/wishlist/_component/AddToWishlistRedux";
import AddToCartRedux from "@/app/cart/_component/AddTocartRedux";
import { Eye } from "react-bootstrap-icons";

const ProductCard = ({ product }) => {
    const [showQuickView, setShowQuickView] = useState(false);

    return (
        <>
            <Card className="flower-card text-center position-relative border-0 rounded-0">
                {product.rating && (
                    <Badge className="py-2 px-3 mt-4 fw-bold rounded-0 bg-accent rounded-end position-absolute top-0 start-0">
                        {product.rating}
                    </Badge>
                )}

                <Link
                    href={`/${product.id}`}
                    className="text-decoration-none"
                >
                    <Card.Img
                        variant="top"
                        src={product.thumbnail}
                        alt={product.title}
                        className="flower-card-img rounded-0"
                    />
                </Link>


                <div className="hover-cart d-flex align-items-center p-0">
                    <div className="px-3 py-2 wishlist-btn">
                        <AddToWishlistRedux product={product} />
                    </div>

                    <AddToCartRedux product={product} />

                    <div className="px-3 py-2 Search-btn">
                        <Eye
                            className="text-white"
                            onClick={() => setShowQuickView(true)}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                </div>
            </Card>

            <div className="text-center mt-3">
                <h6 className="mb-1 text-uppercase text-secondary fw-normal">
                    {product.title}
                </h6>

                <p className="fw-semibold text-color mb-0">
                    {product.price}{" "}

                    {product.discountPercentage && (
                        <span className="text-lighter small-size text-decoration-line-through fw-semibold">
                            {product.discountPercentage}
                        </span>
                    )}
                </p>
            </div>

            <QuickViewModal
                show={showQuickView}
                handleClose={() => setShowQuickView(false)}
                product={product}
            />
        </>
    );
};

export default ProductCard;