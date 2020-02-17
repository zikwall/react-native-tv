import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import {
    MenuItemLine,
    Heading,
    NavigationHeaderTitle,
    NavigationHeaderLeft,
    ThemePicker,
    NavigationHeaderComponent,
    ModalizeWrapper,
    ParentControlModal
} from '../../components';
import { getAppTheme, getAppParentControl } from '../../redux/reducers';
import { Fake } from '../../utils';

const UserMenuScreen = ({ navigation, checkAuth }) => {
    const theme = useSelector(state => getAppTheme(state));
    const parentControlMode = useSelector(state => getAppParentControl(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);

    useEffect(() => {
        if (!isAuthorized) {
            navigation.goBack();
        }
    }, [ isAuthorized ]);

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
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'grid'} name={'Сообщества'} />
                <MenuItemLine onPress={onMenuPress} to={'UsersScreen'} icon={'users'} name={'Пользователи'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'shopping-bag'} name={'Покупки'} />
                {/*<Heading icon={'server'} text={'The main'} color={theme.primaryColor} />*/}
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'bell'} name={'Уведомления'} />
                <MenuItemLine onPress={onMenuPress} to={'AccountScreen'} icon={'user-check'} name={'Аккаунт'} />
                <MenuItemLine onPress={onMenuPress} to={'SecurityScreen'} icon={'lock'} name={'Безопасность'} />
                <MenuItemLine onPress={handleParentControlMenuItem} to={'ParentControlScreen'} icon={'shield'} name={'Родительский контроль'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'eye'} name={'Настройки приватности'} />
                {/*<Heading icon={'database'} text={'Content'} color={theme.primaryColor} />*/}
                {/*<Heading icon={'terminal'} text={'Developer Block'} color={theme.primaryColor} />*/}
                <MenuItemLine onPress={onMenuPress} to={'DebugVideoScreen'} icon={'video'} name={'Проверить контент'} />
                <MenuItemLine onPress={onMenuPress} to={'LocalDatabaseScreen'} icon={'database'} name={'Локальная база данных'} />
                <MenuItemLine onPress={onMenuPress} to={'IPTVScreen'} icon={'tv'} name={'IPTV'} />
                <MenuItemLine onPress={onMenuPress} to={'WriteDeveloperScreen'} icon={'edit-3'} name={'Написать разработчику'} />
                <MenuItemLine onPress={onMenuPress} to={'PremiumScreen'} icon={'gift'} iconColor={'#DC143C'} name={'Активировать премиум'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'heart'} iconColor={'#DC143C'} name={'Andrey, хотите в команду PlayHub?'} />
            </ScrollView>

            <ModalizeWrapper
                referal={modal}
                adjustToContentHeight={{
                    showsVerticalScrollIndicator: false
                }}
            >
                <ParentControlModal
                    onCloseModal={closeModal}
                    onVerifyAccess={handleOnVerifyAccess}
                    onSuccessVerify={handleOnSuccessVerify}
                />
            </ModalizeWrapper>
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
    }
});
