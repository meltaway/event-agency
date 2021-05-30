import React, {useState} from "react";

import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(far)

const InfoTooltip = ({label}) => {
    const [show, setShow] = useState<Boolean>(false);

    const showTooltip = () => {
        setShow(!show);
    };

    return (
        <span className={"info-tooltip"}>
            <FontAwesomeIcon icon={['far', 'question-circle']} className={"info-icon"}
                             onMouseEnter={showTooltip}
                             onMouseLeave={showTooltip}
            />
            <span style={{display: show ? 'flex' : 'none'}} className={"info-text"}>{label}</span>
        </span>
    )
}

export default InfoTooltip;