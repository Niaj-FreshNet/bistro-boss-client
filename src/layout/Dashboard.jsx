import { FaAd, FaCalendar, FaHome, FaList, FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { FaBook, FaPlus, FaProductHunt, FaUser } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAdmin from "../hooks/useAdmin";
import useMenu from "../hooks/useMenu";

const Dashboard = () => {
    const [cart] = useCart();
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    // const { data: items = [] } = useQuery({
    //     queryKey: ['menu'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get('/menu');
    //         return res.data;
    //     }
    // })
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    // TODO: get isAdmin value from database
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* sidebar */}
            <div className="w-96 min-h-screen bg-orange-400">
                <ul className="menu sticky top-5 p-4 my-5 font-bold">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/addItems">
                                    <FaPlus></FaPlus>
                                    Add Items</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/manageItems">
                                    <FaProductHunt></FaProductHunt>
                                    Manage menu
                                    <div className="badge badge-secondary">{menu.length}</div>
                                </NavLink></li>
                                <li><NavLink to="/dashboard/manageBookings">
                                    <FaBook></FaBook>
                                    Manage Bookings</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/users">
                                    <FaUser></FaUser>
                                    All Users
                                    <div className="badge badge-secondary">{users.length}</div>
                                </NavLink>
                                </li>
                            </> :
                            <>
                                <li><NavLink to="/dashboard/userHome">
                                    <FaHome></FaHome>
                                    User Home</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/reservation">
                                    <FaCalendar></FaCalendar>
                                    Reservation</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/cart">
                                    <FaShoppingCart></FaShoppingCart>
                                    My Cart
                                    <div className="badge badge-secondary">{cart.length}</div>
                                </NavLink></li>
                                <li><NavLink to="/dashboard/reviw">
                                    <FaAd></FaAd>
                                    Add a Review</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/booking">
                                    <FaList></FaList>
                                    My Bookings</NavLink>
                                </li>
                            </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to="/">
                        Home</NavLink>
                    </li>
                    <li><NavLink to="/menu">
                        Menu</NavLink>
                    </li>
                    <li><NavLink to="/order/salad">
                        Order</NavLink>
                    </li>
                    <li><NavLink to="/contact">
                        Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="w-full mx-auto py-7 px-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;