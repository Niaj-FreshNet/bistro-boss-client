import SectionTitle from "../../../components/sectionTitle/SectionTitle";

const Payment = () => {
    return (
        <div>
            <div>
                <SectionTitle subHeading="confirm your order!" heading="Payment"></SectionTitle>
            </div>
            <div className="flex gap-6 items-center">
                <label className="form-control w-full">
                    <input type="text"
                        placeholder="Card Number"
                        className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full">
                    <input type="text"
                        placeholder="MM/YY/CVC"
                        className="input input-bordered w-full max-w-xs" />
                </label>
            </div>
        </div>
    );
};

export default Payment;