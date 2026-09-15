"use client";

import { Container, Breadcrumb } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadcrumbBanner = () => {
    const pathname = usePathname();
    const pathnames = pathname.split("/").filter((x) => x);

    if (pathnames.length === 0) {
        return null;
    }

    const pageTitle = pathnames[pathnames.length - 1].replace(/-/g, " ");

    return (
        <div className="breadcrumb-banner bg-lightgray py-5 text-center">
            <Container fluid="lg">
                <h1 className="breadcrumb-title fw-bold text-capitalize text-dark mb-2">
                    {pageTitle}
                </h1>

                <Breadcrumb className="d-flex justify-content-center custom-breadcrumb m-0">
                    <Breadcrumb.Item
                        href="/"
                        linkAs={Link}
                        linkProps={{ href: "/" }}
                        className="text-dark text-decoration-none"
                    >
                        Home
                    </Breadcrumb.Item>

                    {pathnames.map((value, index) => {
                        const href = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        const label = value.replace(/-/g, " ");

                        return isLast ? (
                            <Breadcrumb.Item
                                key={href}
                                active
                                className="fw-semibold text-capitalize text-dark "
                            >
                                {label}
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item
                                key={href}
                                href={href}
                                linkAs={Link}
                                linkProps={{ href }}
                                className="text-capitalize text-dark text-decoration-underline"
                            >
                                {label}
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            </Container>
        </div>
    );
};

export default BreadcrumbBanner;