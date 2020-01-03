import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { iOSColors, human } from 'react-native-typography';

import { UserLineItem } from '../../components/user-item';
import { Fake } from '../../utils';

const FollowingScreen = () => {
    return (
        <View style={ styles.screenContainer }>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[human.subhead, {marginLeft: 20, marginTop: 5, marginBottom: 10}]}>
                    Apparently, he respects them, as he subscribed to them.
                </Text>
                {Fake.users.map((user, index) => {
                    return <UserLineItem
                        key={index}
                        id={index + 1}
                        name={user.user}
                        username={user.userName}
                        image={user.avatar}
                        moreOnPress={(id, name, username) => {
                            alert(`Hi, my name is ${name}`)
                        }}
                    />
                })}
            </ScrollView>
        </View>
    );
};

export default FollowingScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: iOSColors.white
    },
});
