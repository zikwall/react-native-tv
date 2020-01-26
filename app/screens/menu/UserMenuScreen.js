import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    MenuItemLine,
    Heading,
    NavigationHeaderTitle,
    NavigationHeaderLeft,
    ThemePicker,
    NavigationHeaderComponent
} from '../../components';
import { changeTheme } from "../../redux/actions";
import { ThemeService } from "../../services";
import { getAppTheme } from '../../redux/reducers';
import { Fake } from '../../utils';

const UserMenuScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const selectTheme = useCallback(theme => dispatch(changeTheme(theme)), [ dispatch ]);
    const theme = useSelector(state => getAppTheme(state));
    const [ themeValue, setThemeValue ] = useState(false);

   /* useEffect(() => {
        navigation.setParams({ backgroundColor: theme.primaryBackgroundColor });
    }, [ theme.info.name ]);*/

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

    const handleThemeChange = (theme) => {
        setThemeValue(!!theme);
        let themeName = !!theme ? 'dark' : 'light';

        ThemeService.setAppThemeService(themeName).then(() => {
            selectTheme(themeName);
        });
    };

    return (
        <View style={ [styles.container, { backgroundColor: theme.primaryBackgroundColor }]}>
            <ScrollView>
                <Heading icon={'target'} text={'Выберите цветовую схему'} color={theme.primaryColor} />
                <ThemePicker />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'user-check'} name={'Заявки в друзья'} onLongPress={() => alert('Looong!')} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'message-square'} name={'Сообщения'} unreadItems={20} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'users'} name={'Сообщества'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'star'} name={'Закладки'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'shopping-bag'} name={'Покупки'} />
                {/*<Heading icon={'server'} text={'The main'} color={theme.primaryColor} />*/}
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'bell'} name={'Уведомления'} />
                <MenuItemLine onPress={onMenuPress} to={'AccountScreen'} icon={'user-check'} name={'Аккаунт'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'lock'} name={'Безопасность'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'eye'} name={'Настройки приватности'} />
                {/*<Heading icon={'database'} text={'Content'} color={theme.primaryColor} />*/}
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'film'} name={'Творческая студия'} />
                <MenuItemLine onPress={onMenuPress} to={'UserStatisticScreen'} icon={'bar-chart-2'} name={'Ваша аналитика'} />
                {/*<Heading icon={'terminal'} text={'Developer Block'} color={theme.primaryColor} />*/}
                <MenuItemLine onPress={onMenuPress} to={'DebugVideoScreen'} icon={'video'} name={'Проверить контент'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'edit-3'} name={'Написать разработчику'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'heart'} iconColor={'#DC143C'} name={'Andrey, хотите в команду PlayHub?'} />
            </ScrollView>
        </View>
    )
};

UserMenuScreen.navigationOptions = ({ navigation }) => {
    return {
        /*headerStyle: { backgroundColor: navigation.getParam('backgroundColor')},
        headerTitle: () => (
            <NavigationHeaderTitle title={'You Dashboard'} />
        ),
        headerLeft: () => (
            <NavigationHeaderLeft />
        )*/
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
