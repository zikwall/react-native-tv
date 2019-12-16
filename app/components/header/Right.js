import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { withNavigation } from 'react-navigation';

const Right = (props) => {
    return (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
           {/* <TouchableOpacity style={{paddingHorizontal: 15}}>
                <Icon name='search' size={25} color={'#000'} />
            </TouchableOpacity>*/}
            <TouchableOpacity style={{paddingHorizontal: 15}}>
                <Icon name='user' size={25} color={'#000'}
                      onPress={() => {
                          props.navigation.navigate('Profile')
                      }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default withNavigation(Right);
