import React, {useState, useEffect} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const theme = createMuiTheme({
    palette: {
        primary: { main: '#a82548' },
        secondary: { main: '#524540' },
    },
});

export default function Filters({ getSelectedDate, getRadioFilter }) {
    const [value, setValue] = useState<String>('dont');
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

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

    return (
        <MuiThemeProvider theme={theme}>
            <FormControl component="fieldset" className={"event-filters"}>
                <FormLabel component="legend" className={"filter-legend"}>Filter events by date</FormLabel>
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
                                          label={<Typography className={"filter-label"}>Don't filter</Typography>} />
                    </RadioGroup>
                </div>
            </FormControl>
        </MuiThemeProvider>
    );
}