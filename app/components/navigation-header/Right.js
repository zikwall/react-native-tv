import React from "react";
import { Dimensions, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { withNavigation } from 'react-navigation';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleLogout } from '../../services/auth';
import { getAppTheme } from '../../redux/reducers';

const { width } = Dimensions.get('window');

const Right = ({ isAuthenticated, logout, navigation }) => {
    const theme = useSelector(state => getAppTheme(state));

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

                <TouchableOpacity style={{ paddingHorizontal: width * 0.01 }} onPress={ handlePress }>
                    <Icon name='log-out' size={25} color={theme.primaryColor} />
                </TouchableOpacity>
            }

            <TouchableOpacity style={{ paddingHorizontal: 15 }}>
                <Icon
                    name='user'
                    size={25}
                    color={theme.primaryColor}
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

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.authentication.token
});

const mapDispatchToProps = dispatch => bindActionCreators({
    logout: handleLogout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Right));
