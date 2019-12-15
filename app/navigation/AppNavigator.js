import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MainTabNavigator from './MainTabNavigator';

const MainStack = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
}, {
    defaultNavigationOptions: {
        // Need Redux
        // header: null,
        headerStyle: {
            backgroundColor: "#fff",
            borderBottomWidth: 0
        },
        headerLeft: <Image
            source = {require('../assets/images/enjoy_2.png')}
            style = {{ height: 22, width: 98, marginLeft: 10, }}
        />,
        headerRight: (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <TouchableOpacity style={{paddingHorizontal: 15}}>
                    <Icon name='search' size={25} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity style={{paddingHorizontal: 15}}>
                    <Icon name='account-circle' size={25} color={'#000'}/>
                </TouchableOpacity>
            </View>
        )
    }
});

MainStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;

    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default createAppContainer(MainStack);
