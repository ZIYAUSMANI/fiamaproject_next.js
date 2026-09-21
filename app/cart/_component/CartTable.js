"use client"
import { removeFromCart } from "@/store/Slice/cartSlice";
import { ConvertToCurrency } from "@/utils/utils";
import { Container, Row, Col, Button } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import AddToCartRedux from "./AddTocartRedux";
import Link from "next/link";


export default function CartTable() {

    const { cartItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();


    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    }
    return (

        <Container className="pt-5">
            {cartItems.length === 0 ? (
                <Row>
                    <Col className="text-center py-5">
                        <h4>Your cart is empty</h4>

                        <p className="text-muted">
                            There are no products in your cart.
                        </p>
                    </Col>
                </Row>
            ) : (


                cartItems.map((item) => {



                    return (
                        <Row
                            key={item.id}
                            className="border-bottom py-4 align-items-center"
                        >

                            {/* ================= MOBILE ================= */}
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

                                <div className="border-top border-bottom py-4">
                                    <h5 className="mb-0 fw-normal">
                                        {item.title}
                                    </h5>
                                </div>

                                <div className="border-bottom py-4">
                                    {ConvertToCurrency(item.price)}
                                </div>

                                <div className="border-bottom py-4">
                                    <AddToCartRedux product={item} isCart={true} />
                                </div>

                                <div className="border-bottom py-4 fw-semibold">
                                    {ConvertToCurrency(item.totalPrice)}
                                </div>

                                <div className="py-3">
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="text-dark p-0"
                                        onClick={() =>
                                            handleRemove(item.id)
                                        }
                                        aria-label="Remove item"
                                    >
                                        <X size={18} />
                                    </Button>
                                </div>

                            </Col>

                            {/* ================= DESKTOP ================= */}

                            <Col
                                md={1}
                                className="d-none d-md-flex justify-content-center"
                            >
                                <Button
                                    type="button"
                                    variant="link"
                                    className="text-dark p-0"
                                    onClick={() =>
                                        handleRemove(item.id)
                                    }
                                    aria-label="Remove item"
                                >
                                    <X size={18} />
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
                                <div
                                    className="d-flex align-items-center bg-light justify-content-center "
                                >
                                    <AddToCartRedux product={item} isCart={true} />
                                </div>
                            </Col>

                            <Col
                                md={2}
                                className="d-none d-md-block text-dark fw-semibold">
                                {ConvertToCurrency(item.totalPrice)}
                            </Col>

                        </Row>
                    );
                })

            )}

        </Container>

    );
}