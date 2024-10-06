
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-1/3 my-9 mx-auto text-center">
            <p className="text-yellow-600 mb-2">--- {subHeading} ---</p>
            <h3 className="text-4xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;