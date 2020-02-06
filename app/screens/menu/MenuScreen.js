import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    View
} from 'react-native';
import { withNavigation } from 'react-navigation';
import {connect, useSelector} from 'react-redux';
import {
    MenuItemLine,
    NavigationHeaderRight,
    NavigationHeaderComponent,
    NavigationHeaderLogo,
    ThemedView,
    SearchBar,
} from '../../components';
import { UserHelper, Fake } from '../../utils';
import MenuUserInfo from './MenuUserInfo';
import { getAppTheme } from '../../redux/reducers';

const { width, height } = Dimensions.get('window');

const MenuScreen = ({ navigation, user, isAuthenticated }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ cancelVisible, setCancelVisible ] = useState(false);
    const [ searchText, setSearchText ] = useState('');

    const handleSettingsPress = () => {
        navigation.navigate('UserMenuScreen');
    };

    const handleSearchPress = () => {
        alert('Press Search')
    };

    const handleOnChangeSearchText = (text) => {
        if (!!text && !cancelVisible) {
            setCancelVisible(true);
        }

        setSearchText(text);
    };

    const onMenuPress = (to) => {
        navigation.navigate(to);
    };

    return (
        <ThemedView>
            <View style={{ paddingBottom: 10 }}>
                <SearchBar
                    width={width / 2 + 150}
                    height={ 40 }
                    placeholder="Глобальный поиск"
                    fontColor={theme.primaryColor}
                    iconColor={theme.primaryColor}
                    cancelIconColor={theme.primaryColor}
                    backgroundColor={theme.primaryBackgroundColor}
                    borderColor={theme.primaryColor}
                    onChangeText={handleOnChangeSearchText}
                    onPressCancel={() => {
                        setSearchText('');
                        setCancelVisible(false);
                    }}
                    onPress={() => alert("onPressss")}
                    cancelVisible={ cancelVisible }
                />
            </View>
            <ScrollView>
                {
                    isAuthenticated && <MenuUserInfo
                        username={user.username}
                        displayName={UserHelper.buildUserId(user)}
                        avatarUrlMedium={UserHelper.makeUserAvatar(user)}
                        onSettingsPress={handleSettingsPress}
                        onSearchPress={handleSearchPress}
                    />
                }
                <MenuItemLine onPress={onMenuPress} to={'CopyrightScreen'} icon={'book'} name={'Правила размещения контента'} />
                <MenuItemLine onPress={onMenuPress} to={'CopyrightScreen'} icon={'alert-circle'} name={'Правообладателям'} />
                <MenuItemLine onPress={onMenuPress} to={'TermsScreen'} icon={'book'} name={'Условия использования'} />
                <MenuItemLine onPress={onMenuPress} to={'PrivacyScreen'} icon={'book-open'} name={'Политика конфиденциальности'} />

                <MenuItemLine onPress={onMenuPress} to={'ContactsScreen'} icon={'at-sign'} name={'Контакты'} />
                <MenuItemLine onPress={onMenuPress} to={'FaqScreen'} icon={'help-circle'} name={'FAQ'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'help-circle'} name={'Помощь'} />

                <MenuItemLine onPress={onMenuPress} to={'SystemScreen'} icon={'layers'} name={'Система & Сервис'} />
                <MenuItemLine onPress={onMenuPress} to={'AboutScreen'} icon={'info'} name={'О Проекте'} />
            </ScrollView>
        </ThemedView>
    );
};

MenuScreen.navigationOptions = ({ navigation }) => {
    return {
        header: (props) =>
            <NavigationHeaderComponent
                rightComponent={
                    <NavigationHeaderRight />
                }
                leftComponent={
                    <NavigationHeaderLogo />
                }
                {...props}
            />
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.authentication.token,
    user: state.authentication.user
});

export default connect(mapStateToProps)(withNavigation(MenuScreen));
