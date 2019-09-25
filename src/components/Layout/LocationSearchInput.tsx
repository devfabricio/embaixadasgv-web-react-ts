import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

interface Props {
    address: string
    handleLocationChange: (address: string) => void
    handleLocationSelect: (address: string) => void
    setLocation: (resultPlace: google.maps.GeocoderResult) => void
    submitted: boolean
}

const LocationSearchInput = (props: Props) => {

    const searchOptions = {
        types: ['(cities)']
    };

        return (
            <PlacesAutocomplete
                value={props.address}
                onChange={props.handleLocationChange}
                onSelect={props.handleLocationSelect}
                searchOptions={searchOptions}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div style={{position:"relative"}}>
                        <input
                            {...getInputProps({
                                placeholder: 'Buscar cidade ...',
                                className: 'location-search-input form-control',
                                autoComplete: "new-city"
                            })}
                            required={true} />
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
            </PlacesAutocomplete>
        );
};

export default LocationSearchInput