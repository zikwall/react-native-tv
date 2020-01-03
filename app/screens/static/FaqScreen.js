import React, { useState } from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {
    human,
    iOSUIKit,
} from 'react-native-typography';
import faker from 'faker';

import viewStyles from './styles';
import { Accordion, _renderHeader, _renderContent} from '../../components/collapse';

const CONTENT = [
    {
        title: 'В чем суть сервиса?',
        content: faker.lorem.sentences(),
    },
    {
        title: 'Как создать учетную запись в системе?',
        content: faker.lorem.sentences(),
    },
    {
        title: 'Как я могу опубликовать свой плейлист?',
        content: faker.lorem.sentences() + '\n' + faker.lorem.sentences(),
    },
    {
        title: 'Что такое m3u/m3u8 потоки и где их взять?',
        content: faker.lorem.sentences(),
    },
    {
        title: 'Как я могу монетизировать свой контент?',
        content: faker.lorem.sentences(),
    },
    {
        title: 'Где я могу получить ссылки на рекламу?',
        content: faker.lorem.sentences(),
    },
    {
        title: 'Что такое VAST/VPAID/VMAP?',
        content: faker.lorem.sentences(),
    },
    {
        title: 'Как часто обновляются основные плейлисты?',
        content: faker.lorem.sentences(),
    },
    {
        title: 'Куда исчез канал, который был минуту назад?',
        content: faker.lorem.sentences(),
    },
    {
        title: 'Как я могу добавить канал на главную страницу приложения?',
        content: faker.lorem.sentences(),
    },
    {
        title: 'Что такое рейтинги и репутация?',
        content: faker.lorem.sentences(),
    },
];

const FaqScreen = () => {
    const [ activeSection, setActiveSection ] = useState([]);

    const setSections = (sections) => {
        setActiveSection(
            sections.includes(undefined) ? [] : sections,
        );
    };

    return (
        <View style={viewStyles.screenContainer}>
            <View style={viewStyles.header}>
                <View>
                    <Text style={viewStyles.date}>ИНФОРМАЦИЯ</Text>
                    <Text style={iOSUIKit.largeTitleEmphasized}>Часто задаваемые вопросы</Text>
                </View>
            </View>
            <View>
                <View style={{ margin: 15, paddingBottom: 70 }}>
                   <ScrollView showsVerticalScrollIndicator={false}>
                       <Accordion
                           activeSections={activeSection}
                           sections={CONTENT}
                           touchableComponent={TouchableOpacity}
                           renderHeader={_renderHeader}
                           renderContent={_renderContent}
                           duration={400}
                           onChange={setSections}
                       />
                   </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default FaqScreen;
