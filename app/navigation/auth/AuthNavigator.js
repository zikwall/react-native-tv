import React from "react";
import { createStackNavigator } from "react-navigation";
import {
    ContinueRegisterScreen,
    ForgotScreen, LoginScreen,
    RegisterScreen,
} from "../../screens";
import { NavigationHeaderLeft, NavigationHeaderTitle } from "../../components";

const AuthNavigator = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    ContinueRegister: ContinueRegisterScreen,
    Forgot: ForgotScreen,
}, {
    defaultNavigationOptions: {
        headerTitle: () => (
            <NavigationHeaderTitle title={'Login'} />
        ),
        headerLeft: () => (
            <NavigationHeaderLeft onHome={true}/>
        )
    },
});


export default AuthNavigator;

