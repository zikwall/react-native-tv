import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
    human,
    iOSUIKit,
} from "react-native-typography";

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
            <View>
                <View style={{ margin: 15, paddingBottom: 70 }}>
                    <ScrollView>
                        <Text style={[human.headline, { marginBottom: 15 }]}>
                            Права на аудио и видео материалы, которые представленные в сервисе, принадлежат их законным владельцам (правообладателям) и предназначены исключительно для ознакомления.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Если Вы являетесь правообладателем какого-либо канала, который размещен на этом сервисе, и не хотели бы чтобы канал распространялся без Вашего на то согласия, то мы будем рады оказать Вам содействие.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Для этого достаточно, чтобы вы прислали нам письмо (в электронном виде) с E-mail официального почтового домена компании правообладателя.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            В электронном письме должна содержаться следующая информация:
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            - полное название канала;
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            - документ, свидетельствующий о наличии у Вас исключительных прав на канал;
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            - доверенность, если вы действуете от имени правообладателя;
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            - прямая ссылка на страницу с каналом, требующего корректировки или удаления;
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Для проверки вашего почтового ящика мы отправим Вам ответное письмо
                            с просьбой о подтверждении Вашей информации.
                        </Text>
                        <Text style={[human.headline]}>
                            Все каналы, размещенные на сервисе, взяты с открытых (общедоступных) источников.
                            На основании Указа Президента РФ №715.
                        </Text>
                    </ScrollView>
                </View>
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
