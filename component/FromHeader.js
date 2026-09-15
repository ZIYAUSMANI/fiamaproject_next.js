import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FromHeader = ({ title, subtitle, description }) => {
    return (
        <Container className="text-center py-5 mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h1 className="fw-semibold  mb-0 text-dark">
                        {title}
                    </h1>
                    <h1 className="fw-semibold  mb-2 text-dark">
                        {subtitle}
                    </h1>
                    {description && (
                        <p className="text-muted fs-6 mb-0 lh-bases ">
                            {description}
                        </p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default FromHeader;