import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from 'react-navigation';
import Icon from "react-native-vector-icons/Feather";
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { NavigationActions } from 'react-navigation'

const backAction = NavigationActions.back({
    key: null
});

const Back = ({ navigation, onHome, icon, on }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <TouchableOpacity style={{paddingHorizontal: 15}}>
            <Icon name={icon}
                  size={25}
                  color={theme.primaryColor}
                  onPress={() => {
                      if (onHome) {
                          navigation.navigate('Main')
                      } else {
                          if (!!on) {
                              navigation.navigate(on);
                              return true;
                          }

                          navigation.goBack()
                      }
                  }}
            />
        </TouchableOpacity>
    )
};

Back.defaultProps = {
    onHome: false,
    icon: 'arrow-left',
    on: null
};

export default withNavigation(Back);
