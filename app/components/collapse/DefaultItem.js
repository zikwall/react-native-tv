import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {human} from 'react-native-typography';
import Icon from 'react-native-vector-icons/Feather';

export const _renderHeader = (section, _, isActive) => {
    return (
        <View style={styles.questionItem}>
            <Icon name={ isActive ? 'chevron-down' : 'chevron-right' } size={20} style={{ marginRight: 15 }}/>
            <Text numberOfLines={ 2 } style={styles.headerText}>{section.title}</Text>
        </View>
    );
};

export const _renderContent = (section) => {
    return (
        <View style={styles.contentContainer}>
            <Text style={styles.contentBody}>
                {section.content}
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
