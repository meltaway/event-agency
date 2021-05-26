import React, {useState, useEffect} from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography, Checkbox } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TypeSelect from "./TypeSelect";

const theme = createMuiTheme({
    palette: {
        primary: { main: '#a82548' },
        secondary: { main: '#524540' },
    },
});

export default function Filters({ getSelectedDate, getRadioFilter, getChecked, getSelected }) {
    const [value, setValue] = useState<String>('dont');
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [typeFilter, setTypeFilter] = useState<Boolean>(false);
    const [typeSelection, setTypeSelection] = useState<String>(null);

    useEffect(() => {
        getSelectedDate(selectedDate);
        getRadioFilter(value);
    }, [value, selectedDate, getRadioFilter, getSelectedDate])

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleCheckboxChange = () => {
        setTypeFilter(!typeFilter);
        getChecked(typeFilter);
    };

    const handleSelectionChange = (selectedOption) => {
        setTypeSelection(selectedOption)
        getSelected(selectedOption)
    }

    return (
        <MuiThemeProvider theme={theme}>
            <div className={"filter-container"}>
                <FormControl component="fieldset" className={"event-filters"}>
                    <FormLabel component="legend" className={"filter-legend"}>Sort events by date</FormLabel>
                    <div className={"filter-input-container"}>
                        <DatePicker selected={selectedDate}
                                    id={"filter-date"}
                                    className={"filter-date"}
                                    onChange={(date) => handleDateChange(date)} />
                        <RadioGroup aria-label="filter" name="filter" value={value} onChange={handleRadioChange} row>
                            <FormControlLabel value="before"
                                              control={<Radio color={"primary"}/>}
                                              id={"filter-date-before"}
                                              label={<Typography className={"filter-label"}>Before</Typography>} />
                            <FormControlLabel value="after"
                                              control={<Radio color={"primary"}/>}
                                              id={"filter-date-after"}
                                              label={<Typography className={"filter-label"}>After</Typography>} />
                            <FormControlLabel value="dont"
                                              control={<Radio color={"primary"}/>}
                                              id={"filter-date-dont"}
                                              label={<Typography className={"filter-label"}>Don't sort</Typography>} />
                        </RadioGroup>
                    </div>
                </FormControl>
                <FormControl component="fieldset" className={"event-filters"}>
                    <FormLabel component="legend" className={"filter-legend"}>Filter events by type</FormLabel>
                    <div className={"filter-input-container"}>
                        <Checkbox checked={!!typeFilter} onChange={handleCheckboxChange} name="type-filter" color={"primary"}/>
                        <TypeSelect filterCheck={!typeFilter} getType={handleSelectionChange}/>
                    </div>
                </FormControl>
            </div>
        </MuiThemeProvider>
    );
}