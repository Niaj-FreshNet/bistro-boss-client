import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
            console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
            }
        })
    }

    const handleUserDelete = user => {
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
                    axiosSecure.delete(`/users/${user._id}`)
                        .then(res => {
                            console.log(res)
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${user.name?.user.email} user removed`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                }
            })
    }

    return (
        <div>
            <div className="flex justify-evenly sticky top-0 mb-8">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
                <button className="btn btn-primary">Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-300">
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* row */}
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <p className="font-bold">{user.name}</p>
                                    <p>{user.email}</p>
                                </td>
                                <td>
                                    { user.role === 'admin' ? 'Admin' :
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-lg">
                                        <FaUser className="text-amber-600"></FaUser>
                                    </button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleUserDelete(user)} className="btn btn-ghost btn-lg">
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

export default AllUsers;