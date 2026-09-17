"use client";

import { slideData } from "@/data/bannerdata";
import Image from "next/image";
import Link from "next/link";
import { Carousel, Container, Row, Col } from "react-bootstrap";


const HeroSlider = () => {
    return (
        <section className="home">
            <Carousel
                fade={false}
                controls={true}
                indicators={true}
                interval={5000}
                prevIcon={<span className="carousel-control-custom-icon">&#10094;</span>}
                nextIcon={<span className="carousel-control-custom-icon">&#10095;</span>}
                className="hero-carousel"
            >
                {slideData.map((slide) => (
                    <Carousel.Item key={slide.id} className="position-relative  hero-slide">
                        <Image
                            src={slide.image}
                            alt={slide.imageAlt}
                            fill
                            priority={slide.id === 1}
                            sizes="100vw"
                            className="d-block w-100 object-fit-cover   "
                        />

                        <div className="slider-inner position-relative z-1">
                            <Container fluid="lg">
                                <Row>
                                    <Col lg={12}>
                                        <div className="slider-info">
                                            <h1 className="slide-title animate__fadeInUp animate__animated">
                                                {slide.title}
                                            </h1>

                                            <h6 className="slide-sub-title animate__fadeInUp animate__animated">
                                                {slide.subTitle}
                                            </h6>

                                            <div className="slide-brief animate__fadeInUp animate__animated">
                                                <p>{slide.description}</p>
                                            </div>

                                            <div className="btn-wrapper">
                                                <Link
                                                    href={slide.buttonLink}
                                                    className="btn btn-round theme-btn-1"
                                                >
                                                    {slide.buttonText}
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    );
};

export default HeroSlider;