import React from 'react';
import { View, Text } from 'react-native';
import WebView from 'react-native-webview';
import { iOSUIKit } from "react-native-typography";

import viewStyles from './styles';
import { NavigationHeaderComponent, NavigationHeaderLeft, NavigationHeaderTitle } from "../../components";

const CopyrightScreen = () => {
    return (
        <View style={viewStyles.screenContainer}>
            <View style={viewStyles.header}>
                <View>
                    <Text style={viewStyles.date}>ИНФОРМАЦИЯ</Text>
                    <Text style={iOSUIKit.largeTitleEmphasized}>Правообладателям</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <WebView source={{ uri: 'http://tv.zikwall.ru/vktv/static/copyright' }} />
            </View>
        </View>
    );
};

CopyrightScreen.navigationOptions = {
    header: (props) => <NavigationHeaderComponent
        titleComponent={<NavigationHeaderTitle title={'Правообладателям'} />}
        leftComponent={ <NavigationHeaderLeft /> } {...props}
    />
};

export default CopyrightScreen;
