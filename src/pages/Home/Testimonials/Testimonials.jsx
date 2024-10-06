import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { useState, useEffect } from "react";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://bistro-boss-server-taupe-eight.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    
    return (
        <section>
            <SectionTitle
                subHeading={"What Our Clients Say"}
                heading={"testimonials"}
            ></SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="flex flex-col items-center mx-24 my-16">
                            <Rating
                                style={{ maxWidth: 220 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="my-8">{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;