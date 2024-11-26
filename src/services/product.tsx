import axios from "../utils/axiosInstance";

interface ProductParams {
    page?: number;
    limit?: number;
   }

export const apiGetProducts = (params?: ProductParams) => {
 return axios.get("/products", { params });
};

export const apiGetProductById = (id: string | number) => {
    return (
        axios.get(`/products/${id}`)
    )
}
