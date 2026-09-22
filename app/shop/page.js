import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import ProductGridWithPagination from "./_component/ProductGridWithPagination";
import CategoryList from "./_component/CategoryList";
import { Col, Container, Row } from "react-bootstrap";
import { Suspense } from "react";

export const metadata = {
    title: "Shop",
    description:
        "Explore beautiful flowers, bouquets, gifts, and floral arrangements at Fiama Flower Shop.",
};

export default function ShopPage() {
    return (
        <>
            <BreadcrumbBanner />

            <Container>
                <Row className="mt-5">

                    {/* Products */}
                    <Col lg={9} className="order-2 order-lg-2">
                        <Suspense fallback={null}>
                            <ProductGridWithPagination />
                        </Suspense>
                    </Col>

                    {/* Categories */}
                    <Col lg={3} className="order-1 order-lg-1">
                        <Suspense fallback={null}>
                            <CategoryList />
                        </Suspense>
                    </Col>

                </Row>
            </Container>
        </>
    );
}