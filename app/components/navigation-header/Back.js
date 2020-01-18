import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from 'react-navigation';
import Icon from "react-native-vector-icons/Feather";

const Back = ({ navigation, onHome }) => (
    <TouchableOpacity style={{ paddingHorizontal: 15 }}>
        <Icon name="arrow-left"
              size={25}
              color={'#000'}
              onPress={() => {
                  if (onHome) {
                      navigation.navigate('Main')
                  } else {
                      navigation.goBack()
                  }
              }}
        />
    </TouchableOpacity>
);

Back.defaultProps = {
    onHome: false
};

export default withNavigation(Back);
