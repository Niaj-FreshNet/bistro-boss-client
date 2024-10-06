import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";


const FoodCard = ({ item }) => {
    const { _id, name, image, price, recipe } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        // console.log(food.name);
        if (user && user.email) {
            // send cart item to the database
            console.log(user.email);
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to update the cart items count
                        refetch();
                    }
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                    Swal.fire({
                      title: 'Error',
                      text: 'There was a problem adding the item to the cart.',
                      icon: 'error'
                    });
                  });
        }
        else {
            Swal.fire({
                title: "You're not Logged in",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   send the user to the login page
                }
                navigate('/login', { state: { from: location } });
            });
        }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Foods" />
            </figure>
            <p className="absolute right-0 mr-4 mt-2 px-3 py-2 rounded-xl bg-slate-900 text-white">$ {price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                        onClick={handleAddToCart}
                        className="btn btn-outline text-orange-500 font-bold bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};


export default FoodCard;