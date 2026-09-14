import { brandLogos } from '@/data/bannerdata';
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function BrandLogo() {
    return (
        <section className="brand-logo-area mt-5 py-2">
            <Container fluid>
                <Row className="text-center align-items-center g-3">
                    {brandLogos.map((brand) => (
                        <Col key={brand.id} xs={6} md={4} lg className="brand-logo-col">
                            <Image
                                src={brand.src}
                                alt={brand.alt}
                                fluid
                                className="brand-logo-img"
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default BrandLogo;