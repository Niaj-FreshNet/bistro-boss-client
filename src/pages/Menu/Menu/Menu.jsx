import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();
    
    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');

    return (
        <div>
            <Helmet>
                <title>Menu - Bistro Boss Restaurant</title>
            </Helmet>
            {/* main cover */}
            <Cover img={menuImg} title={"Our Menu"}></Cover>
            <SectionTitle
                subHeading={"Dont miss"}
                heading={"Today's offer"}
            ></SectionTitle>
            {/* offered menu section */}
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert menu section */}
            <MenuCategory items={dessert} title={"dessert"} img={dessertImg}></MenuCategory>
            {/* pizza menu section */}
            <MenuCategory items={pizza} title={"pizza"} img={pizzaImg}></MenuCategory>
            {/* salad menu section */}
            <MenuCategory items={salad} title={"salad"} img={saladImg}></MenuCategory>
            {/* soup menu section */}
            <MenuCategory items={soup} title={"soup"} img={soupImg}></MenuCategory>
        </div>
    );
};

export default Menu;