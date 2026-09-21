"use client"
import React, { useState, Fragment, useEffect } from 'react';
import Image from "next/image";

import {
    Container,
    Row,
    Col,
    Form,
    InputGroup,
    Offcanvas,
    Button,
    CloseButton,
    Accordion,
    Badge
} from 'react-bootstrap';
import Link from 'next/link';
import { FiSearch, FiMenu } from 'react-icons/fi';
import { BsHandbag, BsHeart, BsTelephone, BsTrash, BsPerson } from 'react-icons/bs';
import { FaFacebookF, FaTwitter, FaPinterestP, FaInstagram } from 'react-icons/fa';
import { NAV_ITEMS } from '@/data/Navigationdata';
import { removeFromCart } from '@/store/Slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ConvertToCurrency } from '@/utils/utils';
import { Moon, Sun } from 'react-bootstrap-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';



export default function Header() {

    const { wishlistItems } = useSelector((state) => state.wishlist);
    const cartState = useSelector((state) => state.cart);
    const [search, setSearch] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };




    const [showMenu, setShowMenu] = useState(false);
    const handleCloseMenu = () => setShowMenu(false);
    const handleOpenMenu = () => setShowMenu(true);
    const [showCart, setShowCart] = useState(false);

    const [darkMode, setDarkMode] = useState(false);
    const [themeLoaded, setThemeLoaded] = useState(false);


    const handleCloseCart = () => setShowCart(false);
    const handleOpenCart = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleThemeMode = () => {
        setDarkMode((prev) => !prev);
    };

    const handleSearch = (e) => {
        const value = e.target.value;

        setSearch(value);

        if (value.trim()) {
            router.push(`/shop?search=${encodeURIComponent(value)}`);
        } else {
            router.push("/shop");
        }

        setShowMenu(false);
    };

    const handleSearchFocus = () => {
        if (!search.trim() && !pathname.startsWith("/shop")) {
            router.push("/shop");
        }
    };

    useEffect(() => {
        setSearch(searchParams.get("search") || "");
    }, [searchParams]);
    useEffect(() => {
        const savedDarkMode = localStorage.getItem("dark");

        if (savedDarkMode === "true") {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }

        setThemeLoaded(true);
    }, []);

    useEffect(() => {
        if (!themeLoaded) return;

        localStorage.setItem("dark", darkMode ? "true" : "false");

        const htmlElement = document.querySelector("html");

        if (htmlElement) {
            htmlElement.setAttribute(
                "data-bs-theme",
                darkMode ? "dark" : "light"
            );
        }
    }, [darkMode, themeLoaded]);



    return (
        <Fragment>
            {/* Top Bar Header */}
            <header className="fiama-header border-bottom py-3 py-md-4">
                <Container fluid className="px-4 py-2 py-md-3 px-md-5">
                    <Row className="align-items-center justify-content-between g-3 g-lg-0">

                        {/* 1. Logo Section */}
                        <Col xs={12} sm="auto" lg={2} className="d-flex align-items-center  justify-content-center justify-content-sm-start">
                            <Link href="/" className="d-inline-block text-decoration-none">
                                <Image
                                    src="/image/logo.webp"
                                    alt="Fiama Logo"
                                    width={150}
                                    height={35}
                                />
                            </Link>
                        </Col>

                        {/* 2. Phone Contact (Desktop Only) */}
                        <Col lg={2} className="d-none d-lg-flex align-items-center justify-content-center">
                            <div className="phone-icon-wrapper me-3 text-dark">
                                <BsTelephone size={18} />
                            </div>
                            <div className="phone-info">
                                <span className="phone-title d-block text-uppercase text-muted fw-medium small">PHONE</span>
                                <a href="tel:+0123456789" className="phone-number text-decoration-none text-muted fw-medium">
                                    +0123-456-789
                                </a>
                            </div>
                        </Col>

                        {/* 3. Search Bar (Desktop Only) */}
                        <Col lg={5} className="d-none d-lg-block">
                            <Form className="header-search-form w-100" >
                                <InputGroup className="search-input-group">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search here..."
                                        aria-label="Search"
                                        value={search}
                                        onChange={handleSearch}
                                        onFocus={handleSearchFocus}
                                        className="search-input border-end-0 shadow-none"
                                    />
                                    <Button
                                        type="submit"
                                        variant="link"
                                        className="search-icon-btn text-decoration-none p-0 pe-3 border-0 bg-transparent"
                                    >
                                        <FiSearch size={17} className="text-dark fw-light" />
                                    </Button>
                                </InputGroup>
                            </Form>
                        </Col>

                        {/* 4. Action Icons & Offcanvas Trigger */}
                        <Col xs={12} sm="auto" lg={3} className="d-flex align-items-center justify-content-center justify-content-sm-end">

                            {/* Wishlist Link */}
                            <Link
                                href="/wishlist"
                                className="cart-icon-wrapper text-decoration-none position-relative me-3 me-sm-3 d-inline-flex align-items-center"
                            >
                                <BsHeart size={20} className="text-dark mt-1" />
                                <span className="cart-badge badge rounded-circle bg-pink position-absolute">
                                    {wishlistItems.length}
                                </span>
                            </Link>

                            {/* Cart Trigger */}
                            <Link
                                href="/cart"
                                className="cart-widget text-decoration-none d-flex align-items-center me-3 me-sm-4"
                                onClick={handleOpenCart}
                            >
                                <div className="cart-icon-wrapper position-relative me-2 me-sm-3 d-inline-flex align-items-center">
                                    <BsHandbag size={22} className="text-dark mt-1" />
                                    <span className="cart-badge badge rounded-circle bg-pink position-absolute">
                                        {cartState.totalQuantities}
                                    </span>
                                </div>

                                <div className="cart-info d-none d-sm-block">
                                    <span className="cart-title d-block text-uppercase small text-muted fw-medium">
                                        YOUR CART
                                    </span>

                                    <span className="cart-price small fw-medium text-pink">
                                        {ConvertToCurrency(cartState.subTotal || 0)}
                                    </span>
                                </div>
                            </Link>
                            <Badge
                                onClick={handleThemeMode}
                                className="theme-change-btn me-2 rounded-circle p-1"
                                role="button"
                            >
                                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </Badge>
                            {/* Menu Offcanvas Trigger (Visible on all breakpoints now) */}
                            <div
                                className="mobile-menu-trigger d-block d-lg-none cursor-pointer ms-2"
                                onClick={handleOpenMenu}
                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenMenu()}
                                role="button"
                                tabIndex={0}
                                aria-label="Open Navigation Menu"
                            >
                                <FiMenu size={26} className="text-dark" />
                            </div>

                        </Col>

                    </Row>
                </Container>
            </header>
            {/* Navigation Offcanvas Drawer */}
            <Offcanvas show={showMenu} onHide={handleCloseMenu} placement="start" className="mobile-menu-offcanvas">
                <Offcanvas.Header className="justify-content-between border-bottom px-4 py-3">
                    <Image
                        src="/image/logo.webp"
                        alt="Fiama Logo"
                        width={128}
                        height={30}
                    />
                    <CloseButton onClick={handleCloseMenu} />
                </Offcanvas.Header>

                <Offcanvas.Body className="d-flex flex-column px-4 py-3">

                    <div className="mb-4">
                        <InputGroup className="bg-light border-0 rounded-1">
                            <Form.Control
                                placeholder="Search..."
                                className="bg-transparent border-0 py-2 shadow-none small text-secondary"
                            />
                            <InputGroup.Text className="bg-transparent border-0 pe-3">
                                <FiSearch size={16} className="text-muted" />
                            </InputGroup.Text>
                        </InputGroup>
                    </div>

                    <div className="mobile-nav-menu mb-4">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.id}
                                href={item.to}
                                onClick={handleCloseMenu}
                                className="mobile-nav-item py-3 fw-medium border-bottom text-decoration-none text-dark d-block"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    <div className="user-links-section border-top pt-3 mb-4">
                        <div className="d-flex align-items-center mb-3">
                            <div className="border p-2 d-flex align-items-center justify-content-center me-3" style={{ width: '38px', height: '38px' }}>
                                <BsPerson size={18} className="text-dark" />
                            </div>

                            <Link
                                href="/account"
                                onClick={handleCloseMenu}
                                className="text-decoration-none text-secondary fw-medium"
                            >
                                My Account
                            </Link>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <div className="border p-2 d-flex align-items-center justify-content-center me-3 position-relative" style={{ width: '38px', height: '38px' }}>
                                <BsHeart size={16} className="text-dark" />
                            </div>

                            <Link
                                href="/wishlist"
                                onClick={handleCloseMenu}
                                className="text-decoration-none text-secondary fw-medium"
                            >
                                Wishlist
                            </Link>
                        </div>
                    </div>

                    <div className="mt-auto pt-3 d-flex gap-2">
                        <a href="#facebook" className="btn btn-light rounded-0 d-flex align-items-center justify-content-center p-2" style={{ width: '36px', height: '36px' }}>
                            <FaFacebookF size={14} className="text-dark" />
                        </a>

                        <a href="#twitter" className="btn btn-light rounded-0 d-flex align-items-center justify-content-center p-2" style={{ width: '36px', height: '36px' }}>
                            <FaTwitter size={14} className="text-dark" />
                        </a>

                        <a href="#pinterest" className="btn btn-light rounded-0 d-flex align-items-center justify-content-center p-2" style={{ width: '36px', height: '36px' }}>
                            <FaPinterestP size={14} className="text-dark" />
                        </a>

                        <a href="#instagram" className="btn btn-light rounded-0 d-flex align-items-center justify-content-center p-2" style={{ width: '36px', height: '36px' }}>
                            <FaInstagram size={14} className="text-dark" />
                        </a>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas show={showCart} onHide={handleCloseCart} placement="end" className="cart-offcanvas">

                <Offcanvas.Body className="d-flex flex-column px-4 py-3">
                    <div className='d-flex justify-content-between border-bottom align-items-center mb-3 py-3'>
                        <h5 className="fw-medium text-muted mb-0">CART</h5>
                        <CloseButton onClick={handleCloseCart} className='text-dark' style={{ width: '0.4rem', height: '0.4rem' }} />
                    </div>

                    {cartState.cartItems.length === 0 ? (
                        <Row>
                            <Col className="text-center py-5">
                                <h4>Your cart is empty</h4>

                                <p className="text-muted">
                                    There are no products in your cart.
                                </p>
                            </Col>
                        </Row>
                    ) : (
                        <div className="overflow-auto custom-cart-scroll">
                            {cartState.cartItems.map((item) => (
                                <div key={item.id} className="d-flex pt-3 pb-4 border-bottom align-items-center">
                                    <div className="me-3 bg-light rounded d-flex align-items-center justify-content-center position-relative" style={{ width: '70px', height: '70px' }}>
                                        <button
                                            className="position-absolute top-0 start-0 border rounded-circle bg-white shadow-sm d-flex align-items-center justify-content-center p-1"
                                            style={{ width: '20px', height: '20px', transform: 'translate(-30%, -30%)' }}
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            <BsTrash size={10} className="text-gray" />
                                        </button>

                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="img-fluid"
                                            style={{ maxHeight: '60px' }}
                                        />
                                    </div>

                                    <div>
                                        <small className="fw-semibold text-gray d-block">
                                            {item.title}
                                        </small>

                                        <p className="mb-0 text-muted small">
                                            {item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="pt-3 mt-auto">
                        <div className="d-flex justify-content-between align-items-center py-3 border-top border-bottom mb-4">
                            <span className="fw-medium text-dark fs-6">Subtotal:</span>

                            <span className="text-primary fw-medium fs-6">
                                {ConvertToCurrency(cartState.subTotal)}
                            </span>
                        </div>

                        <div className="d-flex gap-3 justify-content-between mb-4">
                            <Button
                                as={Link}
                                href="/cart"
                                variant="primary"
                                className="px-3"
                            >
                                View Cart
                            </Button>

                            <Button
                                as={Link}
                                href="/checkout"
                                variant="secondary  "
                                className="px-3"
                            >
                                Checkout
                            </Button>
                        </div>

                        <p className="small text-dark mb-2">
                            Free Shipping on All Orders Over $100!
                        </p>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </Fragment>
    );
}