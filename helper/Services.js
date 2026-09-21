import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
});

const mockApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MOCKAPI_BASEURL,
});

const handleApiCall = async (apiCall, message) => {
    try {
        const response = await apiCall();
        return response;
    } catch (error) {
        if (error.response?.status === 404) {
            return {
                data: [],
                status: 404,
                isNotFound: true,
            };
        }

        const apiError = new Error(message);

        apiError.status = error.response?.status;
        apiError.response = error.response;

        throw apiError;
    }
};


export const getProductsByCategory = async (category) => {
    const response = await handleApiCall(
        () => api.get(`/products/category/${category}`),
        "Unable to load products for this category. Please try again."
    );

    return response.data;
};

export const getProducts = async () => {
    const response = await handleApiCall(
        () => api.get("/products?limit=0"),
        "Unable to load products. Please try again."
    );

    return response.data;
};

export const getProductById = async (id) => {
    const response = await handleApiCall(
        () => api.get(`/products/${id}`),
        "Unable to load product details. Please try again."
    );

    return response.data;
};

export const getCategories = async () => {
    const response = await handleApiCall(
        () => api.get("/products/categories"),
        "Unable to load categories. Please try again."
    );

    return response.data;
};

export const createUser = async (data) => {
    const response = await handleApiCall(
        () => mockApi.post("/users", data),
        "Unable to create your account. Please try again."
    );

    return response;
};

export const authUser = async (data) => {
    const response = await handleApiCall(
        () => mockApi.get(`/users?email=${data.email}`),
        "Unable to login. Please try again."
    );

    return response;
};

export const getUserById = async (id) => {
    const response = await handleApiCall(
        () => mockApi.get(`/users?id=${id}`),
        "Unable to load user details. Please try again."
    );

    return response;
};

export const updateUser = async (data) => {
    const response = await handleApiCall(
        () => mockApi.put(`/users/${data.id}`, data),
        "Unable to update your profile. Please try again."
    );

    return response;
};

export const createOrder = async (data) => {
    const response = await handleApiCall(
        () => mockApi.post("/ordersDetail", data),
        "Unable to place your order. Please try again."
    );

    return response;
};

export const getOrdersByUserId = async (userId) => {
    const response = await handleApiCall(
        () => mockApi.get(`/ordersDetail?UserId=${userId}`),
        "Unable to load your orders. Please try again."
    );

    return response.data || [];
};

export const getOrderById = async (id) => {
    const response = await handleApiCall(
        () => mockApi.get(`/ordersDetail?id=${id}`),
        "Unable to load order details. Please try again."
    );

    return response;
};