import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleLogout } from '../../services/auth';

const Right = ({ isAuthenticated, logout, navigation }) => {

    const handlePress = async () => {
        await logout();

        if (['Profile'].includes(navigation.state.routeName)) {
            navigation.navigate('HomeScreen');
        }
    };

    return (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>

            {
                isAuthenticated &&

                <TouchableOpacity style={{paddingHorizontal: 15}} onPress={ handlePress }>
                    <Icon name='log-out' size={ 25 } color={'#000'} />
                </TouchableOpacity>
            }

            <TouchableOpacity style={{paddingHorizontal: 15}}>
                <Icon name='user' size={ 25 } color={'#000'}
                      onPress={() => {
                          let route = 'Login';

                          if (isAuthenticated) {
                              route = 'Profile';
                          }

                          navigation.navigate(route)
                      }}
                />
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);

const mapDispatchToProps = dispatch => bindActionCreators({
    logout: handleLogout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Right));
