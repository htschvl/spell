import { useEffect, useState } from 'react';

import '../styles/Carousel.scss';

import coingeckoIcon from '../assets/CoinGecko.png';
import dextoolsIcon from '../assets/DEXTools.png';
import aveLogo from '../assets/Ave.png';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);

    const items = [
        // TODO: insert DexScreener on the list
        {
            icon: coingeckoIcon,
            text: "We're listed on CoinGecko as \"The Spellcaster\" (SPELL)",
            url: "https://www.coingecko.com/en/coins/the-spellcaster"
        },
        {
            icon: dextoolsIcon,
            text: "Check out The Spellcaster (SPELL/SOL) on DexTools.io",
            url: "https://www.dextools.io/app/en/token/spellcaster?t=1736662416936"
        },
        {
            icon: aveLogo,
            text: "Check out the Spellcaster (SPELL/SOL) on Ave.ai",
            url: "https://ave.ai/token/8zrgK9eADL7fc5GSn8seJ4n9E22bn5a4o5JiAptVpump-solana?from=Home"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isDragging) {
                nextSlide();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, isDragging]);

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % items.length);
    };

    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartPos(e.type === 'mousedown' ? e.pageX : e.touches[0].clientX);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const currentPosition = e.type === 'mousemove' ? e.pageX : e.touches[0].clientX;
        const diff = currentPosition - startPos;

        setCurrentTranslate(prevTranslate + diff);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        const diff = currentTranslate - prevTranslate;

        if (Math.abs(diff) > 100) {
            if (diff > 0 && currentIndex > 0) {
                setCurrentIndex(prev => prev - 1);
            } else if (diff < 0 && currentIndex < items.length - 1) {
                setCurrentIndex(prev => prev + 1);
            }
        }

        setPrevTranslate(currentTranslate);
    };

    return (
        <div className="notification-carousel">
            <div
                className="carousel-container"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                <div
                    className="carousel-track"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`
                    }}
                >
                    {items.map((item, index) => (
                        <div key={index} className="carousel-item">
                            <a target='_blank' href={item.url}>
                                <img className="item-icon" src={item.icon} alt="icon" />
                                <p className="item-text">{item.text}</p>
                            </a>
                        </div>
                    ))}
                </div>

                <div className="carousel-indicators">
                    {items.map((_, index) => (
                        <div
                            key={index}
                            className={`indicator ${currentIndex === index ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
