import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputMask from "react-input-mask";
import PlacesAutocomplete from "react-places-autocomplete";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%",
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const FormField = (props: any) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    });

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    switch (props.type) {
        case 'text' :
            return (
                <div className={classes.container}>
                    <TextField
                        id="standard-name"
                        label={props.placeholder}
                        className={classes.textField}
                        value={props.value}
                        onChange={props.onChange}
                        margin="normal"
                    />
                </div>
            )
        case 'email' :
            return (
                <div className={classes.container}>
                    <TextField
                        id="standard-name"
                        label={props.placeholder}
                        className={classes.textField}
                        value={props.value}
                        onChange={props.onChange}
                        type={"email"}
                        margin="normal"
                    />
                </div>
            )
        case 'password' :
            return (
                <div className={classes.container}>
                    <TextField
                        id="standard-name"
                        label={props.placeholder}
                        className={classes.textField}
                        value={props.value}
                        onChange={props.onChange}
                        type={"password"}
                        margin="normal"
                    />
                </div>
            )
        case 'location' :
            return (
                    <PlacesAutocomplete
                        value={props.address}
                        onChange={props.handleLocationChange}
                        onSelect={props.handleLocationSelect}
                        searchOptions={props.searchOptions}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className={classes.container}>
                                    <TextField
                                        id="standard-name"
                                        label={props.placeholder}
                                        className={classes.textField}
                                        autoComplete={"new-city"}
                                        margin="normal"
                                        {...getInputProps({
                                            placeholder: 'Buscar cidade ...'
                                        })}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                        {loading && <div className={"autocomplete-loading"}>Carregando...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                        className,
                                                        style,
                                                    })}
                                                >
                                                    <span>{suggestion.description}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                        )}
                    </PlacesAutocomplete>)
        case 'date' :
            return (
                <div className={classes.container}>
                <InputMask
                    mask={props.mask}
                    value={props.value}
                    onChange={props.onChange} >
                    {(inputProps: any) => <TextField
                        {...inputProps}
                        id="standard-name"
                        label={props.placeholder}
                        className={classes.textField}
                        margin="normal"
                    />}
                </InputMask>
            </div>);
        case 'radio' :
            return (<FormControl component="fieldset">
                    <div className={"radio-group"}>
                        <FormLabel component="legend">{props.placeholder}</FormLabel>
                        <RadioGroup aria-label="position" name="position" value={props.value} onChange={props.handleRadioChange} row>
                            {props.options.map((option: {value: string, label: string}, i: number) => {
                                return (<FormControlLabel
                                    value={option.value}
                                    control={<Radio color="primary" />}
                                    label={option.label}
                                    labelPlacement="end"
                                />)
                            })}
                        </RadioGroup>
                    </div>
                </FormControl>
                );
        default:
            return (
                <div className={classes.container}>
                    <TextField
                        id="standard-name"
                        label={props.placeholder}
                        className={classes.textField}
                        value={props.value}
                        onChange={props.onChange}
                        margin="normal"
                    />
                </div>
            )
    }
};

export default FormField