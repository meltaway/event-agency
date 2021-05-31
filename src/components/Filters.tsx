import React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import TypeSelect from "./TypeSelect";

import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography, Checkbox } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import translate from './../json/translate_config.json';
import "react-datepicker/dist/react-datepicker.css";
import './../scss/blocks/filters.scss';

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(fas, far)

const theme = createMuiTheme({
    palette: {
        primary: { main: '#a82548' },
        secondary: { main: '#524540' },
    },
});

export default function Filters({ getSelectedDate, getRadioFilter, getChecked, getSelected, getSearch, loc }) {
    const [value, setValue] = useState<String>('dont');
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [typeFilter, setTypeFilter] = useState<Boolean>(false);
    const [typeSelection, setTypeSelection] = useState<String>(null);
    const [search, setSearch] = useState<string>(null);
    const [locale, setLocale] = useState<string>('en-US');

    useEffect(() => {
        getSelectedDate(selectedDate);
        getRadioFilter(value);
        getSearch(search);
        setLocale(loc);
    }, [search, value, selectedDate, getRadioFilter, getSelectedDate, getSearch, loc])

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleCheckboxChange = () => {
        setTypeFilter(!typeFilter);
        getChecked(!typeFilter);
    };

    const handleSelectionChange = (selectedOption) => {
        setTypeSelection(selectedOption)
        getSelected(selectedOption)
    }

    return (
        <MuiThemeProvider theme={theme}>
            <div className={"filter-container"}>
                <FormControl component="fieldset" className={"event-filters"}>
                    <FormLabel component="legend" className={"filter-legend"}>{translate[locale]["filter_sort_label"]}</FormLabel>
                    <div className={"filter-input-container"}>
                        <DatePicker selected={selectedDate}
                                    id={"filter-date"}
                                    className={"filter-date"}
                                    onChange={(date) => handleDateChange(date)} />
                        <RadioGroup aria-label="filter" name="filter"
                                    value={value} onChange={handleRadioChange} row>
                            <FormControlLabel value="before"
                                              control={<Radio color={"primary"}/>}
                                              id={"filter-date-before"}
                                              label={<Typography className={"filter-label"}>{translate[locale]["before_filter"]}</Typography>} />
                            <FormControlLabel value="after"
                                              control={<Radio color={"primary"}/>}
                                              id={"filter-date-after"}
                                              label={<Typography className={"filter-label"}>{translate[locale]["after_filter"]}</Typography>} />
                            <FormControlLabel value="dont"
                                              control={<Radio color={"primary"}/>}
                                              id={"filter-date-dont"}
                                              label={<Typography className={"filter-label"}>{translate[locale]["dont_filter"]}</Typography>} />
                        </RadioGroup>
                    </div>
                </FormControl>
                <FormControl component="fieldset" className={"event-filters"}>
                    <FormLabel component="legend" className={"filter-legend"}>{translate[locale]["filter_type_label"]}</FormLabel>
                    <div className={"filter-input-container"}>
                        <Checkbox checked={!!typeFilter} onChange={handleCheckboxChange} name="type-filter" color={"primary"}/>
                        <TypeSelect filterCheck={!typeFilter} getType={handleSelectionChange} loc={locale}/>
                    </div>
                </FormControl>
                <FormControl component="fieldset" className={"event-filters"}>
                    <FormLabel component="legend" className={"filter-legend"}>{translate[locale]["search_label"]}</FormLabel>
                    <div className={"filter-input-container"}>
                        <input type={"text"} placeholder={translate[locale]["search_placeholder"]}
                               onChange={(e) => setSearch(e.target.value)}/>
                        <button onClick={() => getSearch(search)}><FontAwesomeIcon icon={["fas", "search"]}/></button>
                    </div>
                </FormControl>

            </div>
        </MuiThemeProvider>
    );
}