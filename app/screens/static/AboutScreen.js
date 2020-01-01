import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
    human,
    iOSUIKit,
} from "react-native-typography";

import viewStyles from './styles';

const AboutScreen = () => {
    return (
        <View style={viewStyles.screenContainer}>
            <View style={viewStyles.header}>
                <View>
                    <Text style={viewStyles.date}>ИНФОРМАЦИЯ</Text>
                    <Text style={iOSUIKit.largeTitleEmphasized}>О Проекте</Text>
                </View>
            </View>
            <View>
                <View style={{ margin: 15, paddingBottom: 70 }}>
                    <ScrollView>
                        <Text style={[human.headline, { marginBottom: 15 }]}>
                            Playhub - удобный и современный стандарт онлайн-телевидения.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            На нашем сервисе Вы сможете смотреть более 300 популярных телевизионных каналов. Многие из них идут с поддержкой программы передач.
                            Трансляция на сервисе осуществляется без ограничений: без регистрации и бесплатно.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Мы постоянно совершенствуемся и работаем над увеличением количества и качества предоставляемого контента.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Вся информация находится в свободном доступе в Интернете.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Если у Вас есть вопросы или пожелания, то будем ждать по адресу: zikwall@mail.ru
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default AboutScreen;
