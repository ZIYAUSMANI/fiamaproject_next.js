"use client";

import ProductCard from "@/component/ProductCard";
import { getProducts } from "@/helper/Services";
import { useEffect, useState } from "react";
import { Carousel, Row, Col, Container, Spinner } from "react-bootstrap";
import Heading from "./Heading";


function TopProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemsPerSlide, setItemsPerSlide] = useState(4);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.products);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width >= 768 && width < 992) {
                setItemsPerSlide(2);
            } else if (width < 768) {
                setItemsPerSlide(2);
            } else {
                setItemsPerSlide(4);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const dataArray = (arr, size) => {
        const data = [];

        for (let i = 0; i < arr.length; i += size) {
            data.push(arr.slice(i, i + size));
        }

        return data;
    };

    const topProducts = products.slice(0, 8);
    const productSlides = dataArray(topProducts, itemsPerSlide);

    return (
        <section className="py-3">
            <Container className="product-slider-wrapper px-0">
                <Heading heading="top products" />

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
                    <Carousel
                        indicators={false}
                        interval={null}
                        className="product-carousel px-3 px-sm-0"
                    >
                        {productSlides.map((slideProducts, slideIndex) => (
                            <Carousel.Item key={slideIndex}>
                                <Row className="gx-4">
                                    {slideProducts.map((item) => (
                                        <Col key={item.id} xs={6} sm={6} md={6} lg={3}>
                                            <ProductCard product={item} />
                                        </Col>
                                    ))}
                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}
            </Container>
        </section>
    );
}

export default TopProduct;