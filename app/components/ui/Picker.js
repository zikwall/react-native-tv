import React from 'react';
import { View, Picker  } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Heading from '../heading';

/**
 * TODO make custom picker wihout react native picker component
 */
const ExtendedPicker = ({ inputname, label, labelIcon, selectedValue, onSelect, items, customErrors }) => {
    const theme = useSelector(state => getAppTheme(state));

    const _markAsError = () => {
        return !!customErrors && Array.isArray(customErrors) && customErrors.includes(inputname) ? {
            borderColor: 'red',
        } : {};
    };

    return (
        <View>
            {
                label && <Heading text={label} styles={{ paddingLeft: 0 }} color={theme.primaryColor} icon={labelIcon} />
            }
            <View style={[ { borderColor: theme.primaryColor, borderWidth: 1, borderRadius: 10 }, _markAsError() ]}>
                <Picker selectedValue={selectedValue} onValueChange={onSelect} itemStyle={{ backgroundColor: theme.primaryBackgroundColor }}>
                    {
                        items.map((item, i) => {
                            return <Picker.Item key={i} label={item.label} value={item.value} />
                        })
                    }
                </Picker>
            </View>
        </View>
    )
};

ExtendedPicker.defaultProps = {
    label: undefined,
    labelIcon: undefined,
    items: [],
    onScroll: () => {},
    selectedValue: null,
    customErrors: []
};

export default ExtendedPicker;
