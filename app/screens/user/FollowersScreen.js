import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { iOSColors, human } from 'react-native-typography';

import { UserLineItem, IconWrap } from '../../components';
import { Fake } from '../../utils';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { User } from '../../services';

const FollowersScreen = ({ screenProps, navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ friends, setFriends ] = useState([]);
    const { id } = screenProps;

    useEffect(() => {
        User.fetchUserFriends(id).then(({ code, response }) => {
            console.log(response);
            setFriends(response);
        });

        return () => {
            console.log('UNMOUNT PROFILE FOLLOWERS SCREEN');
        }
    }, []);

    return (
        <View style={ [styles.screenContainer, { backgroundColor: theme.primaryBackgroundColor }] }>
            <FlatList
                ListHeaderComponent={
                    <Text style={[human.subhead, { marginLeft: 20, marginTop: 5, marginBottom: 10, color: theme.primaryColor }]}>
                        Look, maybe you know someone
                    </Text>
                }
                data={friends}
                renderItem={({ item, index }) => {
                    return (
                        <UserLineItem
                            id={item.id}
                            name={item.name}
                            username={item.username}
                            image={{ uri: item.avatar }}
                            isOfficialUser={item.is_official == 1}
                            onPress={() => {
                                navigation.navigate('Profile', {
                                    id: item.id
                                })
                            }}
                            rightContent={
                                <TouchableOpacity onPress={() => {
                                    alert(`Hi, my name is ${item.username}`)
                                }} >
                                    <IconWrap name={'more-horizontal'} size={20} />
                                </TouchableOpacity>
                            }
                        />
                    )
                }}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default FollowersScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: iOSColors.white
    },
});
