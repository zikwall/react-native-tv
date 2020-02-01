import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MathHelper } from '../../utils';

const Progress = ({ label, current, top }) => {
    const width = MathHelper.percentage(current, top);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            { label && <Text style={{ paddingRight: 5 }}>{label}</Text>}
            <View style={styles.progressBar}>
                <View style={[styles.overprogress, { width: `${width}%`, height: 15 } ]}/>
            </View>
        </View>
    )
};

Progress.defaultProps = {
    current: 0,
    top: 0,
};

export default Progress;

const styles = StyleSheet.create({
    progressBar: {
        flexDirection: 'row',
        height: 15,
        width: '100%',
        backgroundColor: '#f1f2f4',
        borderRadius: 10,
    },
    overprogress: {
        position: 'absolute',
        backgroundColor: "#7cbb4f",
        borderRadius: 10
    }
});
