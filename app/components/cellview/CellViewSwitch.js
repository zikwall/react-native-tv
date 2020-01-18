import React from 'react';
import { Switch, View } from "react-native";
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const CellViewSwitch = ({ value, disabled, onValueChange }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                disabled={disabled}
                ios_backgroundColor="black"
                trackColor={{true: "#ccc", false: "#ccc"}}
                thumbColor={theme.primaryColor}
            />
        </View>
    );
};

CellViewSwitch.defaultProps = {
    disabled: true,
    onValueChange: () => {}
};

export default CellViewSwitch;
