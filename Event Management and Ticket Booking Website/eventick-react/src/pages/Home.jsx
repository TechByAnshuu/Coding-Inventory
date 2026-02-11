import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import FeaturedEvents from '../components/home/FeaturedEvents';
import Venues from '../components/home/Venues';

const Home = () => {
    return (
        <div>
            <Hero />
            <Services />
            <FeaturedEvents />
            <Venues />
        </div>
    );
};

export default Home;
