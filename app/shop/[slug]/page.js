import BreadcrumbBanner from "@/component/BreadcrumbBanner";
import ProductGridWithPagination from "../_component/ProductGridWithPagination";
import CategoryList from "../_component/CategoryList";
import { Col, Container, Row } from "react-bootstrap";
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
                    {/* Products - first on medium/small, second on large */}
                    <Col lg={9} order="1" className="order-lg-2">
                        <ProductGridWithPagination slug={slug} />
                    </Col>

                    {/* Categories - below products on medium/small, left on large */}
                    <Col lg={3} order="2" className="order-lg-1">
                        <CategoryList />
                    </Col>
                </Row>
            </Container>
        </>
    );
}