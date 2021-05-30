import React, {useEffect, useState} from 'react';
import Slider from 'react-animated-slider';

import gallery from './../json/gallery.json'
import translate from './../json/translate_config.json';

import 'react-animated-slider/build/horizontal.css';
import '../scss/blocks/gallery.scss';

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(fas)

const slides = [...gallery.images];

const Gallery = ({loc}) => {
    const [locale, setLocale] = useState<string>('en-US');

    useEffect(() => {
        setLocale(loc);
    }, [loc, locale, setLocale])

    return (
        <Slider
            autoplay={10000}
            nextButton={<FontAwesomeIcon icon={['fas', 'chevron-right']} size="3x"/>}
            previousButton={<FontAwesomeIcon icon={['fas', 'chevron-left']} size="3x"/>}
        >
            {slides.map((slide, index) =>
                <div key={index} className="slide-content" style={{ background: `url('${slide.image}') no-repeat center center` }}>
                    <h3 className="slide-title">{translate[locale][slide.title]}</h3>
                    <p className="slide-description">{locale === 'en-US' ? slide["description_en"] : slide["description_ua"]}</p>
                </div>)}
        </Slider>
    );
};

export default Gallery;
