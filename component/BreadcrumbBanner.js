"use client";

import { Container, Breadcrumb } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadcrumbBanner = ({ product = null }) => {
    const pathname = usePathname();
    const pathnames = pathname.split("/").filter(Boolean);

    const pageTitle = product
        ? product.title
        : pathnames[pathnames.length - 1]?.replace(/-/g, " ");

    if (!product && pathnames.length === 0) {
        return null;
    }

    return (
        <div className="breadcrumb-banner bg-lightgray py-5 text-center">
            <Container fluid="lg">
                <h1 className="breadcrumb-title fw-bold text-capitalize text-dark mb-2">
                    {pageTitle}
                </h1>

                <Breadcrumb className="d-flex justify-content-center custom-breadcrumb m-0">
                    {/* Home */}
                    <li className="breadcrumb-item">
                        <Link
                            href="/"
                            className="text-dark text-decoration-none"
                        >
                            Home
                        </Link>
                    </li>

                    {product ? (
                        <>
                            {/* Category */}
                            <li className="breadcrumb-item">
                                <Link
                                    href={`/${product.category}`}
                                    className="text-dark text-capitalize text-decoration-underline"
                                >
                                    {product.category.replace(/-/g, " ")}
                                </Link>
                            </li>

                            {/* Product */}
                            <li
                                className="breadcrumb-item active fw-semibold text-capitalize text-dark"
                                aria-current="page"
                            >
                                {product.title}
                            </li>
                        </>
                    ) : (
                        pathnames.map((value, index) => {
                            const href = `/${pathnames
                                .slice(0, index + 1)
                                .join("/")}`;

                            const isLast =
                                index === pathnames.length - 1;

                            return (
                                <li
                                    key={href}
                                    className={`breadcrumb-item ${isLast
                                            ? "active fw-semibold text-capitalize text-dark"
                                            : ""
                                        }`}
                                    aria-current={
                                        isLast ? "page" : undefined
                                    }
                                >
                                    {isLast ? (
                                        value.replace(/-/g, " ")
                                    ) : (
                                        <Link
                                            href={href}
                                            className="text-dark text-capitalize text-decoration-underline"
                                        >
                                            {value.replace(/-/g, " ")}
                                        </Link>
                                    )}
                                </li>
                            );
                        })
                    )}
                </Breadcrumb>
            </Container>
        </div>
    );
};

export default BreadcrumbBanner;