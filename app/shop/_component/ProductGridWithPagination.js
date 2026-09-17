"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Pagination } from "react-bootstrap";

import { getProducts, getProductsByCategory } from "@/helper/Services";
import { useParams } from "next/navigation";
import ProductCard from "@/component/ProductCard";
import ProductToolbar from "./ProductToolbar";

function ProductGridWithPagination() {

    const [listProducts, setListProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const params = useParams();
    const slug = params?.slug;
    const itemsPerPage = 9;


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                let data;
                if (slug) {
                    data = await getProductsByCategory(slug);
                } else {
                    data = await getProducts();
                }
                setListProducts(data?.products);
                setCurrentPage(1);

            } catch (error) {
                console.log(error);
                setError(error);
                setListProducts([]);

            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [slug]);

    const totalPages = Math.ceil(listProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listProducts.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        setCurrentPage(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const getPaginationPages = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }
        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, "...", totalPages,];
        }
        if (currentPage >= totalPages - 3) {
            return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages,];

        }
        return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages,];
    };

    if (loading) {
        return (<div className="text-center py-5"> <p>Loading products... </p></div>);
    }
    if (error) {
        return (<div className="text-center py-5">
            <p className="text-danger">Failed to load products.</p></div>);
    }

    return (
        <div className="product-grid-wrapper">

            <ProductToolbar
                showing={currentItems.length}
                total={listProducts.length}
            />
            <Row className="g-4 mt-2">
                {currentItems.map((item) => (
                    <Col xs={12} sm={6} md={4} key={item.id}>
                        <ProductCard product={item} />
                    </Col>
                ))}
            </Row>

            {currentItems.length === 0 && (
                <div className="text-center py-5">
                    <p>
                        No products found.
                    </p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-5">
                    <Pagination className="custom-pagination">

                        <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
                        {getPaginationPages().map(
                            (page, index) => {
                                if (page === "...") {
                                    return (<Pagination.Ellipsis key={`ellipsis-${index}`} disabled />);
                                }
                                return (
                                    <Pagination.Item key={page} active={page === currentPage}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </Pagination.Item>
                                );
                            }
                        )}

                        <Pagination.Next disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)} />
                    </Pagination>
                </div>
            )}
        </div>
    );
}
export default ProductGridWithPagination;