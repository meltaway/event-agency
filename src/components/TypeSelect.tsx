import React, {useState} from 'react';
import Select, { components } from 'react-select';

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(fas, far)

const options = [
    { value: 'wedding', label: 'Wedding Ceremony' },
    { value: 'prom', label: 'High School Prom' },
    { value: 'corporate_party', label: 'Corporate Party' },
    { value: 'presentation', label: 'Product Presentation' },
    { value: 'convention', label: 'Convention' },
];

const customSelectStyles = {
    option: (provided, state) => ({
        ...provided,
        height: 42,
        color: state.isFocused ? '#a82548' : '#524540',
        textAlign: 'left',
        fontWeight: state.isFocused ? 'medium' : 'normal',
        backgroundColor: state.isFocused ? '#f2edea' : '#ffffff',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    }),
    control: (provided, state) => ({
        width: '100%',
        height: 42,
        border: '2px solid',
        borderColor: (state.isSelected || state.isFocused) ? '#a82548' : '#cfc6c2',
        borderRadius: 5,
        padding: '8px 10px',
        fontWeight: 'normal',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer'
    }),
    menu: (provided, state) => ({
        ...provided,
        padding: '8px 10px',
        width: '40%',
        borderRadius: 0
    }),
    container: () => ({
        width: '50%',
        marginLeft: 10
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
}

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                {props.selectProps.menuIsOpen ?
                    <FontAwesomeIcon icon={['fas', 'chevron-up']}/>
                    :
                    <FontAwesomeIcon icon={['fas', 'chevron-down']}/>
                }
            </components.DropdownIndicator>
        )
    );
};

export default function TypeSelect({ filterCheck, getType }) {
    const [selected, setSelected] = useState<String>(null)

    const handleSelectionChange = (selectedOption) => {
        setSelected(selectedOption)
        getType(selectedOption)
    }

    return (
        <Select options={options} styles={customSelectStyles}
                placeholder={"Type..."}
                components={{ DropdownIndicator }}
                onChange={handleSelectionChange}
                value={selected}
                isDisabled={filterCheck}
                className="type-select"
                classNamePrefix="type-select"
        />
    );
};
