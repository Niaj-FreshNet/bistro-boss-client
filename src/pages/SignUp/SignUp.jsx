import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);

        Swal.fire({
          title: "Sign up successfull",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });

        updateUserProfile(data.name, data.age)
          .then(() => {
            // create user entry in the database
            userInfo = {
              name: data.name,
              email: data.email
            }
            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  console.log('user added to the database')           
                  reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile created successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/');
              }
            })
          })
          .catch(error => console.error(error));
      })
  }

  return (
    <>
      <Helmet>
        <title>Sign up - Bistro Boss Restaurant</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                {errors.name && <span className="text-red-500">Name field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                {errors.email && <span className="text-red-500">Email field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password",
                  {
                    required: true,
                    minLength: 4,
                    maxLength: 8,
                    pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*]).{4,8}$/
                  }
                )}
                  placeholder="password" className="input input-bordered" />
                {errors.password?.type === 'required' && <span
                  className="text-red-500">Password is required</span>}
                {errors.password?.type === 'minLength' && <span
                  className="text-red-500">Atleast 4 digits required</span>}
                {errors.password?.type === 'maxLength' && <span
                  className="text-red-500">Maximum 8 digits allowed</span>}
                {errors.password?.type === 'pattern' && <span
                  className="text-red-500">Minimum 1 uppercase, 1 lowercase, 1 digit, and 1 special character required</span>}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
            <p className="ml-8"><small>Already have an account <Link to="/login" className="text-blue-600 underline">Login</Link></small></p>
          <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;