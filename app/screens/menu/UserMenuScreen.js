import React, { useState, useCallback, useEffect } from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    MenuItemLine,
    Heading,
    NavigationHeaderTitle,
    NavigationHeaderLeft,
    ThemePicker,
    NavigationHeaderComponent,
} from '../../components';
import { changeTheme } from "../../redux/actions";
import { ThemeService } from "../../services";
import { getAppTheme, getAppParentControl } from '../../redux/reducers';
import { Fake } from '../../utils';
import { Modalize } from 'react-native-modalize';
import { TextInput, ErrorMessage } from '../../components';

const ParentControlModal = ({ onCloseModal, onVerifyAccess, onSuccessVerify }) => {
    const [ accessPassword, setAccessPassword ] = useState('');
    const [ error, setError ] = useState({
        has: false, message: null
    });

    const handleAccess = () => {
        if (onVerifyAccess(accessPassword)) {
            onSuccessVerify();

            if (error.has) {
                setError({
                    has: false,
                    message: null
                });
            }

            return true;
        }

        setError({
            has: true,
            message: 'Не правильный ключ защиты!'
        });
    };

    return (
        <View style={styles.content}>
            <Text style={styles.content__subheading}>{'Проверка'.toUpperCase()}</Text>
            <ErrorMessage hasError={error.has} error={error.message} />
            <View style={{ paddingBottom: 15}}>
                <TextInput
                    headingColor={'#000'}
                    textInputStyles={{ borderColor: '#000', color: '#000' }}
                    value={accessPassword}
                    onChangeText={(key) => setAccessPassword(key)}
                    placeholder={'Введите пароль для защиты'}
                    label={'Безопасный ключ доступа'}
                    inputname={'parent_control_password'}
                    description={'Пожалуста, подтвердите доступ.'}
                />
            </View>
            <TouchableOpacity style={styles.content__button} activeOpacity={0.9} onPress={handleAccess}>
                <Text style={styles.content__buttonText}>Открыть доступ!</Text>
            </TouchableOpacity>
        </View>
    )
};

const UserMenuScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const selectTheme = useCallback(theme => dispatch(changeTheme(theme)), [ dispatch ]);
    const theme = useSelector(state => getAppTheme(state));
    const parentControlMode = useSelector(state => getAppParentControl(state));

    const modal = React.createRef();

    const openModal = () => {
        if (modal.current) {
            modal.current.open();
        }
    };

    const closeModal = () => {
        if (modal.current) {
            modal.current.close();
        }
    };

    useEffect(() => {
        ThemeService.getAppThemeService().then((theme) => {
            setThemeValue(theme === 'dark');
        });
    }, []);

    const onMenuPress = (to) => {
        if (to) {
            navigation.navigate(to);
        }
    };

    const handleParentControlMenuItem = (to) => {
        if (!parentControlMode.enabled) {
            onMenuPress(to);
            return true;
        }

        openModal();
    };

    const handleOnVerifyAccess = (accessPassword) => {
        return accessPassword.trim() === parentControlMode.securityKey;
    };

    const handleOnSuccessVerify = () => {
        closeModal();
        onMenuPress('ParentControlScreen');
    };

    return (
        <View style={ [styles.container, { backgroundColor: theme.primaryBackgroundColor }]}>
            <ScrollView>
                <Heading icon={'target'} text={'Выберите цветовую схему'} color={theme.primaryColor} />
                <ThemePicker />
                <MenuItemLine onPress={onMenuPress} to={'CreativeStudioScreen'} icon={'film'} name={'Творческая студия'} />
                <MenuItemLine onPress={onMenuPress} to={'FriendshipRequestsScreen'} icon={'user-check'} name={'Заявки в друзья'} onLongPress={() => alert('Looong!')} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'message-square'} name={'Сообщения'} unreadItems={20} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'users'} name={'Сообщества'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'star'} name={'Закладки'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'shopping-bag'} name={'Покупки'} />
                {/*<Heading icon={'server'} text={'The main'} color={theme.primaryColor} />*/}
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'bell'} name={'Уведомления'} />
                <MenuItemLine onPress={onMenuPress} to={'AccountScreen'} icon={'user-check'} name={'Аккаунт'} />
                <MenuItemLine onPress={onMenuPress} to={'SecurityScreen'} icon={'lock'} name={'Безопасность'} />
                <MenuItemLine onPress={handleParentControlMenuItem} to={'ParentControlScreen'} icon={'shield'} name={'Родительский контроль'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'eye'} name={'Настройки приватности'} />
                {/*<Heading icon={'database'} text={'Content'} color={theme.primaryColor} />*/}
                <MenuItemLine onPress={onMenuPress} to={'UserStatisticScreen'} icon={'bar-chart-2'} name={'Ваша аналитика'} />
                {/*<Heading icon={'terminal'} text={'Developer Block'} color={theme.primaryColor} />*/}
                <MenuItemLine onPress={onMenuPress} to={'DebugVideoScreen'} icon={'video'} name={'Проверить контент'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={'DebugVideoScreen'} icon={'database'} name={'Локальная база данных'} />
                <MenuItemLine onPress={onMenuPress} to={'IPTVScreen'} icon={'tv'} name={'IPTV'} />
                <MenuItemLine onPress={onMenuPress} to={'WriteDeveloperScreen'} icon={'edit-3'} name={'Написать разработчику'} />
                <MenuItemLine onPress={onMenuPress} to={'PremiumScreen'} icon={'gift'} iconColor={'#DC143C'} name={'Активировать премиум'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'heart'} iconColor={'#DC143C'} name={'Andrey, хотите в команду PlayHub?'} />
            </ScrollView>

            <Modalize
                ref={modal}
                adjustToContentHeight={{
                    showsVerticalScrollIndicator: false
                }}
            >
                <ParentControlModal
                    onCloseModal={closeModal}
                    onVerifyAccess={handleOnVerifyAccess}
                    onSuccessVerify={handleOnSuccessVerify}
                />
            </Modalize>
        </View>
    )
};

UserMenuScreen.navigationOptions = ({ navigation }) => {
    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={<NavigationHeaderTitle title={'Панель управления'} />}
            leftComponent={ <NavigationHeaderLeft /> } {...props}
        />
    }
};

export default UserMenuScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        padding: 20,
    },
    content__subheading: {
        marginBottom: 10,

        fontSize: 16,
        fontWeight: '600',
        color: '#ccc',
    },
    content__button: {
        paddingVertical: 15,

        width: '100%',

        backgroundColor: '#333',
        borderRadius: 6,
    },
    content__buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
});
