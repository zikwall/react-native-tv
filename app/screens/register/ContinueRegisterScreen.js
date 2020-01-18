import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

import { NavigationHeaderLeft, NavigationHeaderTitle } from "../../components";
import { registerFinished, setProfile } from '../../redux/actions';
import { Validator, FormHelper } from '../../utils';
import { ERROR_INVALID_EMAIL_ADRESS, ERROR_INVALID_NAME } from '../../constants';
import ContinueRegisterScreenComponent from './ContinueRegisterScreenComponent';
import { getAppTheme } from '../../redux/reducers';
import LoginScreenComponent from '../login/LoginScreenComponent';

const ContinueRegisterScreen = ({ navigation, registerFinished, setProfile, isAuthenticated, token }) => {
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
        navigation.setParams({ backgroundColor: theme.primaryBackgroundColor });
    }, [ theme ]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigation.navigate('HomeScreen');
        }
    });

    const [ name, setName] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ avatar, setAvatar ] = useState({
        uri: null, type: null, name: null
    });

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
        attributes: []
    });

    const handleOnContinueLater = () => {
        navigation.navigate('HomeScreen');
        return true;
    };

    const handleOnContinueRegister = async () => {
        /*const photo = {
            uri: Platform.OS === 'android' ? avatar.uri.replace('file:///', 'file:///')  : avatar.uri,
            type: avatar.type,
            name: 'avatar.jpg',
        };*/

        if (!Validator.isValidName(name)) {
            setError({
                has: true,
                error: ERROR_INVALID_NAME.message,
                attributes: ERROR_INVALID_NAME.attributes
            });

            return false;
        }

        if (!Validator.isValidEmail(email)) {
            setError({
                has: true,
                error: ERROR_INVALID_EMAIL_ADRESS.message,
                attributes: ERROR_INVALID_EMAIL_ADRESS.attributes
            });

            return false;
        }

        const status = await registerFinished({name: name, publicEmail: email}, token);

        if (status.state === true) {
            navigation.navigate('HomeScreen');
            return true;
        }

        setError({
            has: true,
            error: status.response.message,
            attributes: status.response.attributes
        });
    };

    const handleTouchAvatar = (avatar) => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                setAvatar(response);
            }
        });
    };

    return (
        <View>
            <ContinueRegisterScreenComponent
                error={ error }
                onContinue={handleOnContinueRegister}
                onContinueLater={handleOnContinueLater}
                loginButtonBackgroundColor={theme.primaryColor}
                loginBackgorundColor={theme.primaryBackgroundColor}
                nameTitle={'Your Name'}
                publicEmailTitle={'Your Public Email'}
                publicEmailPlaceholder={'my.public@mail.my'}
                publicEmailIconComponent={
                    <Icon
                        size={ 30 }
                        name="at-sign"
                        color="black"
                    />
                }
                loginButtonTextStyle={{ color: theme.primaryColor }}
                nameOnChangeText={name => setName(name)}
                publicEmailOnChangeText={email => setEmail(email)}
                avatar={{ uri: avatar.uri }}
                onTouchAvatar={handleTouchAvatar}
            />
        </View>
    )
};

ContinueRegisterScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { backgroundColor: navigation.getParam('backgroundColor')},
        headerTitle: () => (
            <NavigationHeaderTitle title={'Login'} />
        ),
        headerLeft: () => (
            <NavigationHeaderLeft />
        ),
    };
};

const mapStateToProps = (state) => (
    {
        isAuthenticated: !!state.authentication.token,
        token: state.authentication.token
    }
);

const mapDispatchToProps = dispatch => bindActionCreators({
    registerFinished: registerFinished,
    setProfile: setProfile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContinueRegisterScreen);
