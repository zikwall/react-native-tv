import React from 'react';
import { Text, View } from 'react-native';
import { CellView, IconWrap, ThemedView } from '../../components';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { human } from 'react-native-typography';

const NameView = ({ name, level, skills }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View>
            <Text style={[human.callout, { color: theme.primaryColor }]}>{ name }</Text>
            <Text style={[human.footnote, { color: theme.secondaryColor, paddingTop: 5 }]}>{ level }</Text>
            <Text style={[human.footnote, { color: theme.secondaryColor, paddingTop: 5 }]}>{ skills }</Text>
        </View>
    )
};

const NicknameView = ({ nickname }) => {
    const theme = useSelector(state => getAppTheme(state));

    return  (
        <View style={{ flexDirection: 'row' }}>
            <Text style={[human.callout, { color: theme.primaryColor }]}>
                { nickname }
            </Text>
            <IconWrap name={'github'} size={15} style={{ paddingLeft: 10 }} />
        </View>
    );
};

const AuthorsScreen = () => {

    return (
        <ThemedView style={{ paddingHorizontal: 15 }}>
            <CellView
                leftContent={
                    <NameView
                        name={'Тихонов Сергей'}
                        level={'Full-stack developer'}
                        skills={'Netx.js, React, ReactNative, Vue, PHP7, Yii2'}
                    />
                }
                rightContent={
                    <NicknameView nickname={'Kluivert9'} />
                }
                cellStyles={{ paddingVertical: 15, alignItems: 'center' }}
            />
            <CellView
                leftContent={
                    <NameView
                        name={'Капитонов Андрей'}
                        level={'Full-stack developer'}
                        skills={'Netx.js, React, ReactNative, Go, PHP7, Yii2'}
                    />
                }
                rightContent={
                    <NicknameView nickname={'zikwall'} />
                }
                cellStyles={{ paddingVertical: 15, alignItems: 'center' }}
            />
        </ThemedView>
    );
};

export default AuthorsScreen;
