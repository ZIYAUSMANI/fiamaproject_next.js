"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { newsData } from "@/data/bannerdata";
import Heading from "./Heading";
import { ChatSquareText } from "react-bootstrap-icons";


function LatestNews() {
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width >= 992) {
                setItemsPerSlide(3);
            } else if (width >= 768) {
                setItemsPerSlide(2);
            } else {
                setItemsPerSlide(1);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const dataArray = (arr, size) => {
        const data = [];

        for (let i = 0; i < arr.length; i += size) {
            data.push(arr.slice(i, i + size));
        }

        return data;
    };

    const slides = dataArray(newsData, itemsPerSlide);

    return (
        <section className="latest-news-section mb-5 py-4">
            <Container className="px-0 px-sm-0">
                <Heading heading="latest news" />

                <div className="news-slider-wrapper px-3 px-sm-0">
                    <Carousel indicators={false} interval={null} className="news-carousel">
                        {slides.map((slideItems, slideIdx) => (
                            <Carousel.Item key={slideIdx}>
                                <Row className="g-4">
                                    {slideItems.map((item) => (
                                        <Col key={item.id} xs={12} md={6} lg={4}>
                                            <div className="news-card">
                                                <div className="news-img-wrapper">
                                                    <NextImage
                                                        src={item.img}
                                                        alt={item.title}
                                                        width={600}
                                                        height={400}
                                                        className="img-fluid"
                                                    />
                                                </div>

                                                <div className="news-meta d-flex gap-4 mt-3 small text-muted fw-semibold align-items-center">
                                                    <span>{item.date}</span>

                                                    <a
                                                        href="#comments"
                                                        className="text-decoration-none text-muted d-flex gap-2 align-items-center comment-link"
                                                    >
                                                        <ChatSquareText size={14} />
                                                        <span>{item.comments}</span>
                                                    </a>
                                                </div>

                                                <h3 className="news-title text-dark mt-3 fs-4 fw-medium">
                                                    {item.title}
                                                </h3>

                                                <div className="pink-underline mt-3" />
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </Container>
        </section>
    );
}

export default LatestNews;