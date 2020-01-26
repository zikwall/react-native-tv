import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { iOSColors } from 'react-native-typography';

import { IconWrap, UserLineItem } from '../../components';
import { Fake } from '../../utils';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ContentLoader from '@sarmad1995/react-native-content-loader';

const defaultContent = <ScrollView style={{ paddingTop: 10 }}>
    <View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
        <View style={{ padding: 5 }}>
            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
        </View>
    </View>
</ScrollView>;

const RequestActions = ({ id, onAccept, onCancel }) => {
    return (
        <View style={{ flexDirection: 'row' }} >
            <TouchableOpacity onPress={() => onAccept(id)}>
                <IconWrap name={'plus-circle'} size={25} style={{ paddingRight: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCancel(id)}>
                <IconWrap name={'minus-circle'} size={25} />
            </TouchableOpacity>
        </View>
    )
};

const FriendshipRequestsScreen = () => {
    const theme = useSelector(state => getAppTheme(state));

    const [ inputRequests, setInputRequests ] = useState(defaultContent);
    const [ outputRequests, setOutputRequests ] = useState(defaultContent);

    useEffect(() => {
        let interval = setTimeout(() => {
            setInputRequests(
                <ScrollView showsVerticalScrollIndicator={false}>
                    {Fake.users.map((user, index) => {
                        return <UserLineItem
                            key={index}
                            id={index + 1}
                            name={user.user}
                            username={user.userName}
                            image={user.avatar}
                            rightContent={
                               <RequestActions
                                   id={index+1}
                                   onAccept={(id) => console.log(`accept ${id}`)}
                                   onCancel={(id) => console.log(`cancel ${id}`)}
                               />
                            }
                        />
                    })}
                </ScrollView>
            );
            setOutputRequests(
                <ScrollView showsVerticalScrollIndicator={false}>
                    {Fake.users.map((user, index) => {
                        return <UserLineItem
                            key={index}
                            id={index + 1}
                            name={user.user}
                            username={user.userName}
                            image={user.avatar}
                            rightContent={
                                <TouchableOpacity onPress={() => {console.log(`closed request ${user.user}`)}}>
                                    <IconWrap name={'x-square'} size={25} />
                                </TouchableOpacity>
                            }
                        />
                    })}
                </ScrollView>
            );
        }, 500);

        return () => {
            clearTimeout(interval);
        };
    });

    return (
        <View style={[ styles.screenContainer, { backgroundColor: theme.primaryBackgroundColor } ]}>
            <ScrollableTabView
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    height: 50,
                }}
                tabBarTextStyle={{
                    color: theme.primaryColor
                }}
                tabBarUnderlineStyle={{
                    backgroundColor: theme.primaryColor,
                    height: 2,
                }}
                renderTabBar={() => <ScrollableTabBar />}
            >
                <View tabLabel={'Входящие'}>
                    { inputRequests && inputRequests }
                </View>
                <View tabLabel={'Исходящие'}>
                    { outputRequests && outputRequests }
                </View>
            </ScrollableTabView>
        </View>
    );
};

export default FriendshipRequestsScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: iOSColors.white
    },
});
