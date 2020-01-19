import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from 'react-redux';
import {
    MenuItemLine,
    Heading,
    CellView,
    CellViewSwitch,
    NavigationHeaderTitle,
    NavigationHeaderLeft,
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

    useEffect(() => {
        navigation.setParams({ backgroundColor: theme.primaryBackgroundColor });
    }, [ theme.primaryColor ]);

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
                <CellView
                    leftContent={
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Icon name={'sun'} size={25} color={theme.primaryColor}/>
                            <Text style={{ marginLeft: 25, color: theme.primaryColor }} numberOfLines={1} ellipsizeMode="tail">
                                Dark Theme
                            </Text>
                        </View>
                    }
                    rightContent={
                        <CellViewSwitch disabled={false} value={themeValue} onValueChange={theme => handleThemeChange(theme)} />
                    }
                    rightStyle={{ flexDirection: 'column', justifyContent: 'center' }}
                    cellStyles={{
                        height: 60,
                        paddingHorizontal: 10,
                        paddingTop: 7,
                        paddingBottom: 7,
                        paddingLeft: 19,
                    }}
                />
                <Heading icon={'server'} text={'The main'} color={theme.primaryColor} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'bell'} name={'Notifications'} />
                <MenuItemLine onPress={onMenuPress} to={'AccountScreen'} icon={'user-check'} name={'Account'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'lock'} name={'Security'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'eye'} name={'Privacy settings'} />
                <Heading icon={'database'} text={'Content'} color={theme.primaryColor} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'film'} name={'Your Videos'} />
                <MenuItemLine onPress={onMenuPress} to={'UserStatisticScreen'} icon={'bar-chart-2'} name={'Your Analytics'} />
                <Heading icon={'terminal'} text={'Developer Block'} color={theme.primaryColor} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'video'} name={'Debug Video'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'edit-3'} name={'Write to developer'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'heart'} iconColor={'#DC143C'} name={'Andrey, do you want a PlayHub team?'} />
            </ScrollView>
        </View>
    )
};

UserMenuScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { backgroundColor: navigation.getParam('backgroundColor')},
        headerTitle: () => (
            <NavigationHeaderTitle title={'You Dashboard'} />
        ),
        headerLeft: () => (
            <NavigationHeaderLeft />
        )
    }
};

export default UserMenuScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
