import React from 'react';
import {
    ScrollView,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
    MenuItemLine,
    NavigationHeaderRight,
    NavigationHeaderComponent,
    NavigationHeaderLogo,
    ThemedView,
} from '../../components';
import { UserHelper, Fake } from '../../utils';
import MenuUserInfo from './MenuUserInfo';

const MenuScreen = ({ navigation, user, isAuthenticated }) => {

    const handleSettingsPress = () => {
        navigation.navigate('UserMenuScreen');
    };

    const handleSearchPress = () => {
        alert('Press Search')
    };

    const onMenuPress = (to) => {
        navigation.navigate(to);
    };

    return (
        <ThemedView>
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
                <MenuItemLine onPress={onMenuPress} to={'ContentPostingRules'} icon={'book'} name={'Правила размещения контента'} />
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
