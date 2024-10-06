import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import featureImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed pt-8 my-20 text-white">
            <SectionTitle
                subHeading={"check it out"}
                heading={"Featured Item"}
            ></SectionTitle>
            <div className="pb-20 pt-12 px-16 bg-slate-500 bg-opacity-60">
                <div className="md:flex justify-center items-center w-5/6 mx-auto">
                    <div>
                        <img className="w-[1024px]" src={featureImg} alt="" />
                    </div>
                    <div className="md:ml-10">
                        <p>Aug 20, 2029</p>
                        <p className="uppercase">WHERE CAN I GET SOME?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        <button className="btn btn-outline text-white font-bold border-0 border-b-4 border-red-50 mt-4">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;