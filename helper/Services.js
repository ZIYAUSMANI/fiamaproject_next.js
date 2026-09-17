import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
});

const mockApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MOCKAPI_BASEURL,
});


export const getProductsByCategory = async (category) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
};

export const getProducts = async () => {
    const response = await api.get("/products?limit=0");
    return response.data;
};

export const getCategories = async () => {
    const response = await api.get("/products/categories");
    return response.data;
};

export const createUser = async (data) => {
    return await mockApi.post("/users", data);
};

export const authUser = async (data) => {
    return await mockApi.get(`/users?email=${data.email}`);
};

export const getUserById = async (id) => {
    return await mockApi.get(`/users?id=${id}`);
};

export const updateUser = async (data) => {
    return await mockApi.put(`/users/${data.id}`, data);
};

export const createOrder = async (data) => {
    return await mockApi.post("/ordersDetail", data);
};

export const getOrdersByUserId = async (userId) => {
    try {
        const response = await mockApi.get(`/ordersDetail?UserId=${userId}`
        );

        return response.data || [];
    } catch (error) {
        if (error.response?.status === 404) {
            return [];
        }

        throw error;
    }
};

export const getOrderById = async (id) => {
    return await mockApi.get(`/ordersDetail?id=${id}`);
};