import Slider from 'react-slick';

import '../styles/Carousel.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    // Debugging message
    console.log("Carousel component is rendering");

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            <div className="listing-card">
                <img src="path/to/coingecko-logo.png" alt="CoinGecko" />
                <p>We're listed on CoinGecko as "The Spellcaster" (SPELL)</p>
            </div>
            <div className="listing-card">
                <img src="path/to/dexscreener-logo.png" alt="Dexscreener" />
                <p>Check out SPELL/SOL on Dexscreener</p>
            </div>
            {/* Adicione mais cards conforme necessário */}
        </Slider>
    );
};

export default Carousel;
