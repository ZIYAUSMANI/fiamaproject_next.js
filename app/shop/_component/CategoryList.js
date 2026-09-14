"use client";

import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategories } from "@/helper/Services";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    const pathname = usePathname();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data || []);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="category-list-wrapper py-2">
            <h5 className="fw-bold text-dark pb-3 border-bottom">
                Categories
            </h5>

            {error && (
                <p className="text-danger">
                    Failed to load categories
                </p>
            )}

            <Nav className="flex-column gap-2">
                {categories.map((category) => {
                    const categoryPath = `/shop/${category.slug}`;
                    const isActive = pathname === categoryPath;

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