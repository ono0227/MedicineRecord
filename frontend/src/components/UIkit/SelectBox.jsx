import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select"
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    formControl: {
        marginbottom: 16,
        minWidth: 128,
        width: "100%",
    }
})

const SelectBox = (props) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel >{props.label}</InputLabel>
            <Select
                value={props.value} required={props.required}
                onChange={(e) => props.select(e.target.value)}
            >
                {props.options.map((option) => (
                    <MenuItem key={option.key} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectBox
