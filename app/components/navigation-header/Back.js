import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from 'react-navigation';
import Icon from "react-native-vector-icons/Feather";
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const Back = ({ navigation, onHome, icon, outside }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <TouchableOpacity style={{paddingHorizontal: 15}}>
            <Icon name={icon}
                  size={25}
                  color={theme.primaryColor}
                  onPress={() => {
                      if (onHome) {
                          navigation.goBack(null);
                      } else {
                          if (outside) {
                              navigation.goBack(null);
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
    outside: false
};

export default withNavigation(Back);
