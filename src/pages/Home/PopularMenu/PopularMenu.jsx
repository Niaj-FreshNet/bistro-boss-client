import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')

    return (
        <section className='mb-12'>
            <SectionTitle
                heading={"From our menu"}
                subHeading={"Check it out"}
            ></SectionTitle>
            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <button className="btn btn-outline text-white font-bold border-0 border-b-4 border-red-50 mt-4">View Full</button>
        </section>
    );
};

export default PopularMenu;