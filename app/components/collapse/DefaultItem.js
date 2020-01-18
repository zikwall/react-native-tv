import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {human} from 'react-native-typography';
import Icon from 'react-native-vector-icons/Feather';
import IconWrap from '../icon/IconWrap';

export const _renderHeader = (section, _, isActive, __, color) => {
    return (
        <View style={styles.questionItem}>
            <IconWrap name={ isActive ? 'chevron-down' : 'chevron-right' } size={20} style={{ marginRight: 15 }}/>
            <Text numberOfLines={ 2 } style={[ styles.headerText, { color: color } ]}>{section.question}</Text>
        </View>
    );
};

export const _renderContent = (section, _, __, ___, color) => {
    return (
        <View style={styles.contentContainer}>
            <Text style={[ styles.contentBody, { color: color }]}>
                {section.answer}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    questionItem: {
        flexDirection: 'row',
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomColor: '#f0f1f4',
        borderBottomWidth: 1
    },
    headerText: {
        ...human.headline,
        flex: 1, flexWrap: 'wrap'
    },
    contentContainer: {
        padding: 10
    },
    contentBody: {
        ...human.footnote,
    }
});
