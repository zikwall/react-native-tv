import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { withNavigation } from 'react-navigation';

const ProfileSettings = (props) => {
    return (
        <TouchableOpacity style={{paddingHorizontal: 15}}>
            <Icon
                name="settings"
                size={25}
                color={'#000'}
                onPress={() => {
                    props.navigation.goBack();
                }}
            />
        </TouchableOpacity>
    );
};

export default ProfileSettings;
