import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const Heading = ({ heading }) => {
    return (
        <Container className="py-4 text-center">
            <Row className="justify-content-center">
                <Col >
                    <h1 className="fw-bold text-dark d-inline-block heading-underline mb-4">
                        {heading}
                    </h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Heading;