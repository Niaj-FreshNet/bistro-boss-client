import { FaCloudUploadAlt } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {name, price, category, recipe, _id} = useLoaderData();
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // console.log(item)

    const onSubmit = async (data) => {
        console.log(data)
        // image will upload to imgbb and then get an URL
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data);
        if (res.data.success) {
            // now send the menu item to the server with the image URL
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }

            const menuRes = await axiosPublic.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data)
            if (menuRes.data.modifiedCount > 0) {
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} updated successfully!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/manageItems');
            }
        }
    }

    return (
        <div>
            <div className="md:w-2/3 mx-auto text-center">
                <p className="text-yellow-600 mb-2">--- What's New ---</p>
                <h3 className="text-4xl uppercase border-y-4 py-2">Update an Item</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="form-control w-5/6 gap-y-2 -mt-2 mx-auto max-h-screen">
                <div className="label">
                    <span className="label-text font-bold">Recipe name</span>
                </div>
                <input {...register("name")} type="text" defaultValue={name} className="input input-bordered w-full" />
                <div className="flex gap-6">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-bold">Category</span>
                        </div>
                        <select {...register("category")} defaultValue={category} className="select select-bordered">
                            <option disabled >Select a category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </label>
                    <div>
                        <div className="label">
                            <span className="label-text font-bold">Price</span>
                        </div>
                        <input {...register("price")} type="text" defaultValue={price} className="input input-bordered w-full" />
                    </div>
                </div>
                <div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text font-bold">Recipe Details</span>
                        </div>
                        <textarea {...register("recipe")} defaultValue={recipe} className="textarea textarea-bordered h-36" placeholder="Recipe Details"></textarea>
                    </label>
                </div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text font-bold">Pick an image</span>
                    </div>
                    <input {...register("image")} type="file" className="file-input file-input-bordered w-3/6" />
                    <div className="label">
                    </div>
                </label>
                <button type="submit" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"> Update Item
                    <FaCloudUploadAlt></FaCloudUploadAlt>
                </button>
            </form>
        </div>
    );
};

export default UpdateItem;