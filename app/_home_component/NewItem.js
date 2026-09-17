"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProductCard from "@/component/ProductCard";
import { getProducts } from "@/helper/Services";
import Heading from "./Heading";

function NewItem() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data?.products);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="py-4">
            <Container className="px-5 px-lg-0">
                <Heading heading="new arrival items" />

                {loading && (
                    <div className="text-center py-5">
                        <Spinner size="sm" className="me-2" />
                        Please wait, products are on the way...
                    </div>
                )}

                {error && (
                    <div className="text-danger text-center py-5">
                        {error.message || "Something went wrong"}
                    </div>
                )}

                {!loading && !error && (
                    <Row className="gx-5 gy-3">
                        {products?.slice(0, 8).map((item) => (
                            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={item} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </section>
    );
}

export default NewItem;