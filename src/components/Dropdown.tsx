import React, {useState} from 'react';
import translate from './../json/translate_config.json';
import './../scss/blocks/dropdown.scss';

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(fas)

const options = {
    'uk-UA': 'UA',
    'en-US': 'EN'
}

const Dropdown = ({getLocale}) => {
    const [locale, setLocale] = useState<string>('en-US');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    }

    const changeLocale = (loc) => {
        setLocale(loc)
        getLocale(loc)
    }

    return (
        <div className={"dropdown-container"} onClick={toggleDropDown}>
            <div
                className={"dropdown-toggler"}
                onClick={toggleDropDown}
            >
                <span className={"dropdown-label"}>{translate[locale]["Language"]}</span>
                <span className={"dropdown-indicator"}>
                    {
                        isOpen ?
                            <FontAwesomeIcon icon={['fas', 'chevron-up']}/> :
                            <FontAwesomeIcon icon={['fas', 'chevron-down']}/>
                    }
                </span>
            </div>
            <div className={"dropdown-display"}>
                {
                    isOpen && (
                        <div className={"dropdown-children"} >
                            <div onClick={() => changeLocale("uk-UA")}>{options["uk-UA"]}</div>
                            <div onClick={() => changeLocale("en-US")}>{options["en-US"]}</div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Dropdown;
