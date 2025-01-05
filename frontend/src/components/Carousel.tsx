import Slider from 'react-slick';

import '../styles/Carousel.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const settings = {
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Slider {...settings}>
            <div className="listing-card">
                <img src="path/to/coingecko-logo.png" alt="CoinGecko Logo" />
                <p>We're listed on CoinGecko as "The Spellcaster" (SPELL)</p>
            </div>
            <div className="listing-card">
                <img src="path/to/dexscreener-logo.png" alt="Dexscreener Logo" />
                <p>Check out SPELL/SOL on Dexscreener</p>
            </div>
            <div className="listing-card">
                <img src="path/to/dexscreener-logo.png" alt="DEXTools Logo" />
                <p>Check out SPELL/SOL on DexTools.io</p>
            </div>
            <div className="listing-card">
                <img src="path/to/dexscreener-logo.png" alt="AVE Logo" />
                <p>Check out SPELL/SOL on Ave.ai</p>
            </div>
            {/* Adicione mais cards conforme necessário */}
        </Slider>
    );
};

export default Carousel;
