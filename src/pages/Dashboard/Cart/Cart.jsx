import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {

    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const formattedTotalPrice = totalPrice.toFixed(2);
    const axiosSecure = useAxiosSecure();

    const handleCartItemDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                console.log(result)
                if (result.isConfirmed === true) {

                    axiosSecure.delete(`/carts/${id}`)
                        .then(res => {
                            console.log(res)
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: 'Removed from Cart',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        });

                }
            });
    }


    return (
        <div>
            <div className="flex justify-evenly sticky top-0 mb-8">
                <h2 className="text-3xl">Items: {cart.length}</h2>
                <h2 className="text-3xl">Total Price: ${formattedTotalPrice}</h2>
                {
                    cart.length ? <Link to="/dashboard/payment"><button className="btn btn-primary">Pay</button></Link> : <button disabled className="btn btn-primary">Pay</button>
                }
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-slate-100">
                        <tr>
                            <th>Serial</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {/* row */}
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    ${item.price}
                                </td>
                                <td>
                                    <button onClick={() => handleCartItemDelete(item._id)} className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-500"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>***</th>
                            <th>***</th>
                            <th>***</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Cart;