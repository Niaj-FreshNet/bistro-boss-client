import { FaTrashAlt } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";
import { FaUpload, FaUps, FaUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const handleItemDelete = (item) => {
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

                    axiosPublic.delete(`/menu/${item._id}`)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${item.name} deleted!`,
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
            <div className="md:w-2/3 mx-auto text-center">
                <p className="text-yellow-600 mb-2">--- Hurry Up ---</p>
                <h3 className="text-4xl uppercase border-y-4 py-2">Manage All Items</h3>
            </div>
            {/* <div className="flex justify-evenly sticky top-0 mb-8">
                <h2 className="text-3xl">Total Items: {users.length}</h2>
                <button className="btn btn-primary">Pay</button>
            </div> */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-300">
                        <tr>
                            <th>Serial</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {/* row */}
                    <tbody>
                        {
                            menu.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
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
                                    <p>{item.name}</p>
                                </td>
                                <td>
                                    <p>$ {item.price}</p>
                                </td>
                                <td>
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                        <button className="btn btn-ghost btn-lg  bg-orange-500 text-white">
                                            <MdOutlineTipsAndUpdates />
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleItemDelete(item)} className="btn btn-ghost btn-lg text-red-500">
                                        <FaTrashAlt></FaTrashAlt>
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

export default ManageItems;