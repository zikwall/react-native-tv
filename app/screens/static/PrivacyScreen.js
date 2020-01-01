import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
    human,
    iOSUIKit,
} from "react-native-typography";

import viewStyles from './styles';

const PrivacyScreen = () => {
    return (
        <View style={viewStyles.screenContainer}>
            <View style={viewStyles.header}>
                <View>
                    <Text style={viewStyles.date}>ИНФОРМАЦИЯ</Text>
                    <Text style={iOSUIKit.largeTitleEmphasized}>Политика конфиденциальности</Text>
                </View>
            </View>
            <View>
                <View style={{ margin: 15, paddingBottom: 70 }}>
                    <ScrollView>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            На нашем сервисе мы используем рекламные кампании для показа объявлений.
                        </Text>
                        <Text style={[human.callout]}>
                            Эти кампании могут использовать информацию (за исключением вашего имени, адреса, адреса электронной почты и номера телефона) о ваших посещениях сайта playhub.ru и других веб-сайтов с целью предоставления наиболее релевантных объявлений о товарах и услугах.
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default PrivacyScreen;
