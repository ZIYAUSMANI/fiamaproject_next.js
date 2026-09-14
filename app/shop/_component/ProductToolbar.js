import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ProductToolbar = ({ showing, total }) => {
    return (
        <Row className="product-toolbar align-items-center g-3 pb-2">
            <Col xs={12} md={4}>
                <span className="text-secondary fs-6 d-block text-center text-sm-start p-0">
                    Showing {showing} of {total} results
                </span>
            </Col>
        </Row>
    );
};

export default ProductToolbar;