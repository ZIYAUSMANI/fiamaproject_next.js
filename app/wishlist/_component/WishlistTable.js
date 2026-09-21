"use client";

import { addToCart, updateCart } from "@/store/Slice/cartSlice";
import { removeFromWishlist } from "@/store/Slice/wishlistSlice";
import { ConvertToCurrency } from "@/utils/utils";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";


export default function WishlistTable() {
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromWishlist(id));
    };

    const handleMoveToCart = (item) => {
        const existingItem = cartItems.find(
            (cartItem) => cartItem.id === item.id
        );

        if (existingItem) {
            dispatch(
                updateCart({
                    id: item.id,
                    quantity: (existingItem.quantity || 1) + 1,
                })
            );
            toast.success("Product quantity increased in cart.");
        } else {
            dispatch(addToCart(item));
            toast.success("Product added to cart successfully.");
        }

        dispatch(removeFromWishlist(item.id));
    };

    return (
        <Container className="py-3">
            {wishlistItems.length === 0 ? (
                <Row>
                    <Col className="text-center py-5">
                        <h4>Your wishlist is empty</h4>

                        <p className="text-muted">
                            There are no products in your wishlist.
                        </p>
                    </Col>
                </Row>
            ) : (
                wishlistItems.map((item) => (
                    <Row
                        key={item.id}
                        className="border-bottom py-3 align-items-center"
                    >
                        <Col
                            xs={12}
                            className="d-md-none text-center"
                        >
                            <div className="mb-3">
                                <Link
                                    href={`/productdetail/${item.id}`}
                                    className="text-decoration-none"
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="img-fluid"
                                        style={{
                                            width: "110px",
                                            height: "110px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Link>
                            </div>

                            <div className="py-3 border-top border-bottom">
                                <h5 className="mb-0 fw-normal">
                                    {item.title}
                                </h5>
                            </div>

                            <div className="py-3 border-bottom">
                                {ConvertToCurrency(item.price)}
                            </div>

                            <div className="py-3 border-bottom">
                                {item.availabilityStatus || "In Stock"}
                            </div>

                            <div className="py-3 border-bottom">
                                <Button
                                    variant="secondary"
                                    onClick={() =>
                                        handleMoveToCart(item)
                                    }
                                >
                                    Move to Cart
                                </Button>
                            </div>

                            <div className="py-3">
                                <Button
                                    variant="link"
                                    className="text-dark p-0"
                                    onClick={() =>
                                        handleRemove(item.id)
                                    }
                                    aria-label="Remove item"
                                >
                                    <X size={20} />
                                </Button>
                            </div>
                        </Col>

                        <Col
                            md={1}
                            className="d-none d-md-flex justify-content-center"
                        >
                            <Button
                                variant="link"
                                className="text-dark p-0"
                                onClick={() =>
                                    handleRemove(item.id)
                                }
                                aria-label="Remove item"
                            >
                                <X size={20} />
                            </Button>
                        </Col>

                        <Col
                            md={2}
                            className="d-none d-md-block text-center"
                        >
                            <Link
                                href={`/productdetail/${item.id}`}
                                className="text-decoration-none"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="img-fluid"
                                    style={{
                                        width: "110px",
                                        height: "110px",
                                        objectFit: "contain",
                                    }}
                                />
                            </Link>
                        </Col>

                        <Col
                            md={3}
                            className="d-none d-md-block fw-medium text-dark"
                        >
                            {item.title}
                        </Col>

                        <Col
                            md={2}
                            className="d-none d-md-block"
                        >
                            {ConvertToCurrency(item.price)}
                        </Col>

                        <Col
                            md={2}
                            className="d-none d-md-block"
                        >
                            {item.availabilityStatus || "In Stock"}
                        </Col>

                        <Col
                            md={2}
                            className="d-none d-md-flex justify-content-end"
                        >
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                    handleMoveToCart(item)
                                }
                            >
                                Move to Cart
                            </Button>
                        </Col>
                    </Row>
                ))
            )}

            <ToastContainer />
        </Container>
    );
}
