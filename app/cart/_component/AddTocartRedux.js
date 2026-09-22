"use client";
import React, { useEffect, useState } from "react";
import { Handbag } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "react-bootstrap";
import { addToCart, removeFromCart, updateCart } from "@/store/Slice/cartSlice";
import CartModal from "@/component/modals/CartModal";

const AddToCartRedux = ({ product, isCart, isDetails }) => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    const found = cartItems.some((item) => item.id === product.id);

    const defaultQty = cartItems.find(
        (item) => item.id === product.id
    );

    const [quantity, setQuantity] = useState(
        defaultQty?.quantity || 1
    );

    const handleAddToCart = () => {
        dispatch(addToCart(product));

        if (!isDetails) {
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleQtyPlus = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleQtyMinus = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        } else {
            dispatch(removeFromCart(product.id));
            setQuantity(1);
        }
    };

    useEffect(() => {
        if (found) {
            dispatch(
                updateCart({
                    quantity: quantity,
                    id: product.id,
                })
            );
        }
    }, [quantity]);

    return (
        <>
            {found ? (
                <div className={isDetails ? "d-flex align-items-center justify-content-between bg-lightgray px-3 py-1" : "flex-grow-1 border-start border-end text-center add-to-cart-bt"}>
                    <Button
                        type="button"
                        className={
                            isDetails
                                ? "border-0 bg-transparent text-muted p-0 fs-5"
                                : `border-0 bg-transparent ${isCart ? "text-muted" : ""
                                } px-2 fs-6`
                        }
                        onClick={handleQtyMinus}
                    >
                        -
                    </Button>

                    <span
                        className={
                            isDetails
                                ? "fw-normal fs-6 px-3"
                                : "text-center fw-semibold px-2"
                        }
                    >
                        {isDetails
                            ? String(quantity).padStart(2, "0")
                            : quantity}
                    </span>

                    <Button
                        type="button"
                        className={
                            isDetails
                                ? "border-0 bg-transparent text-muted p-0 fs-5"
                                : `border-0 bg-transparent ${isCart ? "text-muted" : ""
                                } px-2 fs-6`
                        }
                        onClick={handleQtyPlus}
                    >
                        +
                    </Button>
                </div>
            ) : (
                <div
                    className={
                        isDetails
                            ? "d-flex align-items-center justify-content-center px-3 py-2 bg-primary text-white fw-semibold text-uppercase"
                            : "px-3 py-2 flex-grow-1 border-start border-end text-center add-to-cart-bt"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={handleAddToCart}
                >
                    <>
                        <span className="add-cart-text">
                            ADD TO CART
                        </span>

                        <Handbag className="cart-icon" />
                    </>
                </div>
            )}

            {!isDetails && (
                <CartModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    product={product}
                />
            )}
        </>
    );
};

export default AddToCartRedux;