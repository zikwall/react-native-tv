import React, { Component } from 'react';
import { View } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Feather';

const Options = () => {
    let _menu = null;

    const setMenuRef = ref => {
        _menu = ref;
    };

    const showMenu = () => {
        _menu.show();
    };

    const hideMenu = () => {
        _menu.hide();
    };

    /*const showSnack = () => {
        /!*Snackbar.show({
            title: 'Hello world',
            duration: Snackbar.LENGTH_SHORT,
        });*!/
    };*/

    return (
        <View>
            <Menu
                ref={(ref) => _menu = ref }
                button={
                    <Icon name='sliders' size={ 25 } color={ '#000' } onPress={ showMenu } />
                }>

                <MenuItem onPress={ hideMenu }>Use Player 1</MenuItem>
                <MenuItem onPress={ hideMenu }>Use Player 2</MenuItem>
                <MenuItem onPress={ hideMenu } disabled>
                    Use Native Player
                </MenuItem>
                <MenuDivider />
                <MenuItem onPress={ hideMenu }>Save to watch latter</MenuItem>
                <MenuItem onPress={ hideMenu }>Save to Playlist</MenuItem>
                <MenuItem onPress={ hideMenu }>Block this Playlist</MenuItem>
                <MenuItem onPress={ hideMenu }>Share</MenuItem>
                <MenuItem onPress={ hideMenu }>Report</MenuItem>
            </Menu>
        </View>
    )
};

export default Options;
