import React, { Component } from 'react';
import { View } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Feather';

const MenuItems = [
    "See fewer videos like this",
    "Block this chaneel",
    "Save to Watch later",
    "Save to playlist",
    "Share",
    "Report"
];

const Options = () => {
    let _menu = null;

    const showMenu = () => {
        _menu.show();
    };

    const hideMenu = () => {
        _menu.hide();
    };

    return (
        <View>
            <Menu
                ref={(ref) => _menu = ref }
                button={
                    <Icon name='sliders' size={ 25 } color={ '#000' } onPress={ showMenu } />
                }>

                {
                    MenuItems.map((data, i) => {
                        return(
                            <MenuItem
                                onPress={ hideMenu }
                                style={{ backgroundColor: "#fff" }}
                                textStyle={{ color:"#000" }}
                                underlayColor={ "#000" }
                                key={ i }>

                                { data }
                            </MenuItem>
                        );
                    })
                }
            </Menu>
        </View>
    )
};

export default Options;
