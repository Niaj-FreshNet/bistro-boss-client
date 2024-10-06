//  api, axios (axios secure), tanc stack

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch, data: cart = [], isLoading, isError, error } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        }
    })

    return [cart, refetch, isLoading, isError, error]
};

export default useCart;