import React from 'react';
import { View } from "react-native";
import styles from './styles';

const CellView = ({ leftContent, rightContent, cellStyles, leftStyle, rightStyle }) => (
    <View style={[styles.container, cellStyles]}>
        <View style={[styles.item, leftStyle]}>
            { leftContent }
        </View>
        <View style={rightStyle}>
            { rightContent }
        </View>
    </View>
);

CellView.defaultProps = {
    cellStyles: {},
    leftStyle: {},
    rightStyle: {}
};

export default CellView;
