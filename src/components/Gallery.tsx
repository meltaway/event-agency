import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './../scss/gallery.scss';
import gallery from './../json/gallery.json'
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(fas)

const slides = [...gallery.images];

const Gallery = () => {
    return (
        <Slider
            autoplay={10000}
            nextButton={<FontAwesomeIcon icon={['fas', 'chevron-right']} size="3x"/>}
            previousButton={<FontAwesomeIcon icon={['fas', 'chevron-left']} size="3x"/>}
        >
            {slides.map((slide, index) =>
                <div key={index} className="slide-content" style={{ background: `url('${slide.image}') no-repeat center center` }}>
                    <h3 className="slide-title">{slide.title}</h3>
                    <p className="slide-description">{slide.description}</p>
                </div>)}
        </Slider>
    );
};

export default Gallery;
