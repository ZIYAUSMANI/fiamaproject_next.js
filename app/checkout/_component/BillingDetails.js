"use client";

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaGlobe,
    FaChevronDown,
    FaPencilAlt,
} from "react-icons/fa";

const BillingDetails = ({ register, errors }) => {
    return (
        <div className="billing-details-wrapper py-5">
            <h2 className="section-title">Billing Details</h2>

            <div className="billing-card">
                <h5 className="sub-heading mb-3">
                    Personal Information
                </h5>

                <Row className="g-3 mb-4">
                    <Col md={6}>
                        <div className="custom-input-group">
                            <Form.Control
                                type="text"
                                placeholder="First name"
                                isInvalid={!!errors.firstName}
                                {...register("firstName")}
                            />
                            <FaUser className="input-icon" />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.firstName?.message}
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="custom-input-group">
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                isInvalid={!!errors.lastName}
                                {...register("lastName")}
                            />
                            <FaUser className="input-icon" />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.lastName?.message}
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="custom-input-group">
                            <Form.Control
                                type="email"
                                placeholder="Email address"
                                isInvalid={!!errors.email}
                                {...register("email")}
                            />
                            <FaEnvelope className="input-icon" />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.email?.message}
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="custom-input-group">
                            <Form.Control
                                type="text"
                                placeholder="Phone number"
                                isInvalid={!!errors.phone}
                                {...register("phone")}
                            />
                            <FaPhoneAlt className="input-icon" />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.phone?.message}
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="custom-input-group">
                            <Form.Control
                                type="text"
                                placeholder="Company name (optional)"
                                isInvalid={!!errors.companyName}
                                {...register("companyName")}
                            />
                            <FaGlobe className="input-icon" />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.companyName?.message}
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="custom-input-group">
                            <Form.Control
                                type="text"
                                placeholder="Company address (optional)"
                                isInvalid={!!errors.companyAddress}
                                {...register("companyAddress")}
                            />
                            <FaGlobe className="input-icon" />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.companyAddress?.message}
                        </div>
                    </Col>
                </Row>

                <h5 className="sub-heading mb-2">Country</h5>

                <Row className="mb-4">
                    <Col md={4}>
                        <div className="custom-input-group country-select-group">
                            <Form.Select
                                isInvalid={!!errors.country}
                                {...register("country")}
                            >
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                                <option value="United States">
                                    United States
                                </option>
                                <option value="United Kingdom">
                                    United Kingdom
                                </option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Italy">Italy</option>
                                <option value="Spain">Spain</option>
                                <option value="Netherlands">
                                    Netherlands
                                </option>
                            </Form.Select>

                            <FaChevronDown className="input-icon" />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.country?.message}
                        </div>
                    </Col>
                </Row>

                <h5 className="sub-heading mb-2">Address</h5>

                <Row className="g-3 mb-4">
                    <Col md={6}>
                        <div className="custom-input-group">
                            <Form.Control
                                type="text"
                                placeholder="House number and street name"
                                isInvalid={!!errors.address}
                                {...register("address")}
                            />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.address?.message}
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="custom-input-group">
                            <Form.Control
                                type="text"
                                placeholder="Apartment, suite, unit etc. (optional)"
                                isInvalid={!!errors.apartment}
                                {...register("apartment")}
                            />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.apartment?.message}
                        </div>
                    </Col>
                </Row>

                <Row className="g-3 mb-4">
                    <Col md={4}>
                        <Form.Label className="sub-heading mb-1">
                            Town / City
                        </Form.Label>

                        <div className="custom-input-group">
                            <Form.Control
                                type="text"
                                placeholder="City"
                                isInvalid={!!errors.city}
                                {...register("city")}
                            />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.city?.message}
                        </div>
                    </Col>

                    <Col md={4}>
                        <Form.Label className="sub-heading mb-1">
                            State
                        </Form.Label>

                        <div className="custom-input-group">
                            <Form.Control
                                type="text"
                                placeholder="State"
                                isInvalid={!!errors.state}
                                {...register("state")}
                            />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.state?.message}
                        </div>
                    </Col>

                    <Col md={4}>
                        <Form.Label className="sub-heading mb-1">
                            Zip
                        </Form.Label>

                        <div className="custom-input-group">
                            <Form.Control
                                type="text"
                                placeholder="Zip"
                                isInvalid={!!errors.zip}
                                {...register("zip")}
                            />
                        </div>

                        <div className="text-danger small mt-1">
                            {errors.zip?.message}
                        </div>
                    </Col>
                </Row>

                <div className="mb-4">
                    <Form.Check
                        type="checkbox"
                        id="createAccount"
                        label="Create an account?"
                        className="create-account-checkbox"
                        {...register("createAccount")}
                    />

                    <div className="text-danger small mt-1">
                        {errors.createAccount?.message}
                    </div>
                </div>

                <h5 className="sub-heading mb-2">
                    Order Notes (optional)
                </h5>

                <div>
                    <div className="custom-input-group">
                        <Form.Control
                            as="textarea"
                            rows={4}
                            className="form-control-textarea"
                            placeholder="Notes about your order, e.g. special notes for delivery."
                            isInvalid={!!errors.orderNotes}
                            {...register("orderNotes")}
                        />

                        <FaPencilAlt className="textarea-icon" />
                    </div>

                    <div className="text-danger small mt-1">
                        {errors.orderNotes?.message}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingDetails;