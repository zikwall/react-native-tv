import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {
    human,
    iOSUIKit,
} from "react-native-typography";

import viewStyles from './styles';

const TermsScreen = () => {
    return (
        <View style={viewStyles.screenContainer}>
            <View style={viewStyles.header}>
                <View>
                    <Text style={viewStyles.date}>ИНФОРМАЦИЯ</Text>
                    <Text style={iOSUIKit.largeTitleEmphasized}>Условия использования</Text>
                </View>
            </View>
            <View>
                <View style={{ margin: 15, paddingBottom: 70 }}>
                    <ScrollView>
                        <Text style={[human.headline, { marginBottom: 15 }]}>
                            Права на аудио и видео материалы, которые представленные в сервисе, принадлежат их законным владельцам (правообладателям) и предназначены исключительно для ознакомления.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Источники трансляций (потоки) получены исключительно из открытых источников. Для полноценного просмотра или прослушивания контента посетите сайт правообладателя.
                        </Text>
                        <Text style={[human.headline]}>
                            Администрация сервиса не несет ответственности за:
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            - технические ошибки и перебои в сервисе
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            - устаревшую (не актуальную) информацию, указанную в сервисе.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            - за контент, размещаемымые пользователями: комментарии, плейлисты и видео-контент.
                        </Text>
                        <Text style={[human.headline]}>
                            Внимание!
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Возрастное ограничение некоторых каналов (материалов) может быть 18+.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Если Вы не согласны с условиями использования сервисом то, пожалуйста, покиньте его.
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default TermsScreen;

