import React from 'react';
import { Switch, View } from "react-native";

const CellViewSwitch = ({ value, disabled, onValueChange }) => {
    return (
        <View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                disabled={disabled}
                ios_backgroundColor="black"
                trackColor={{true: "#ccc", false: "#ccc"}}
                thumbColor={'#000'}
            />
        </View>
    );
};

CellViewSwitch.defaultProps = {
    disabled: true,
    onValueChange: () => {}
};

export default CellViewSwitch;
