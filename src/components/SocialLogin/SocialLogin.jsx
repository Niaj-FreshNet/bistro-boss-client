import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                // console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.name
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                })
        })
    }

    return (
        <div className="p-8">
            <div className="divider">
            <p>Sign in with socials</p>
            </div>
            <div>
            <button onClick={handleGoogleSignIn} className="btn mt-4">
                <FaGoogle></FaGoogle>
                Google
            </button>
            </div>
        </div>
    );
};

export default SocialLogin;