"use client";

import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getCategories, getProducts } from "@/helper/Services";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                const productData = await getProducts();
                setCategories(data || []);
                setProducts(productData?.products || []);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        };

        fetchCategories();
    }, []);

    const filteredCategories = categories.filter((category) => {
        const searchText = search.toLowerCase().trim();

        if (!searchText) {
            return true;
        }


        const categoryMatches =
            category.name?.toLowerCase().includes(searchText) ||
            category.slug?.toLowerCase().includes(searchText);

        const productMatches = products.some((product) => {
            return (
                product.title?.toLowerCase().includes(searchText) ||
                product.category?.toLowerCase().includes(searchText) ||
                product.brand?.toLowerCase().includes(searchText)
            ) && product.category === category.slug;
        });

        return categoryMatches || productMatches;
    });

    const isCategoryFound = filteredCategories.length > 0;
    const displayedCategories =
        !isCategoryFound
            ? categories
            : filteredCategories;
    return (
        <div className="category-list-wrapper py-2">
            <h5 className="fw-semibold text-dark pb-3 border-bottom">
                Categories
            </h5>

            {error && (
                <p className="text-danger">
                    Failed to load categories
                </p>
            )}

            <Nav className="flex-column gap-2">
                {displayedCategories.map((category) => {
                    let categoryPath;

                    if (isCategoryFound && search) {
                        categoryPath = `/shop/${category.slug}?search=${encodeURIComponent(
                            search
                        )}`;
                    } else {
                        categoryPath = `/shop/${category.slug}`;
                    }


                    const isActive =
                        pathname === `/shop/${category.slug}`;

                    return (
                        <Link
                            key={category.slug}
                            href={categoryPath}
                            className={`category-link text-decoration-none ${isActive
                                ? "text-primary fw-bold"
                                : "text-secondary"
                                }`}
                        >
                            {category.name}
                        </Link>
                    );
                })}
            </Nav>
        </div>
    );
};

export default CategoryList;