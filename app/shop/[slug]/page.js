import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import ProductGridWithPagination from "../_component/ProductGridWithPagination";
import CategoryList from "../_component/CategoryList";
import { Col, Container, Row } from "react-bootstrap";
import { Suspense } from "react";
export const metadata = {
    title: "Shop",
    description:
        "Explore beautiful flowers, bouquets, gifts, and floral arrangements at Fiama Flower Shop.",
};

export default async function CategoryShopPage({ params }) {
    const { slug } = await params;


    return (
        <>
            <BreadcrumbBanner />

            <Container>
                <Row className="mt-5">

                    <Col lg={9} order="1" className="order-lg-2">
                        <Suspense fallback={null}>
                            <ProductGridWithPagination slug={slug} />
                        </Suspense>

                    </Col>


                    <Col lg={3} order="2" className="order-lg-1">
                        <Suspense fallback={null}>
                            <CategoryList />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
        </>
    );
}