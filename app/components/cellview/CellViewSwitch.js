import React from 'react';
import { Switch, View } from "react-native";

const CellViewSwitch = ({ value, disabled }) => {
    return (
        <View>
            <Switch
                value={!value}
                disabled={disabled}
                ios_backgroundColor="black"
                trackColor={{true: "#ccc", false: "#ccc"}}
                thumbColor={'#000'}
            />
        </View>
    );
};

CellViewSwitch.defaultProps = {
    disabled: true
};

export default CellViewSwitch;
