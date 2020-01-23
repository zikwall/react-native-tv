import React, { useEffect } from 'react';
import {
    View,
    ScrollView,
    Image
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { connect, useSelector } from 'react-redux';

import {
    MenuItemLine,
    Divider,
    NavigationHeaderRight,
    NavigationHeaderComponent
} from '../../components';

import { UserHelper, Fake } from '../../utils';
import MenuUserInfo from './MenuUserInfo';
import { getAppTheme } from '../../redux/reducers';

const MenuScreen = ({ navigation, user, isAuthenticated }) => {
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
        navigation.setParams({ logo: theme.logo });
    }, [ theme ]);

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
        <View>
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

                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'user-check'} name={'Friends'} onLongPress={() => alert('Looong!')} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'message-square'} name={'Messages'} unreadItems={20} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'users'} name={'Communities'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'star'} name={'Bookmarks'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'heart'} name={'Liked'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'shopping-bag'} name={'Purchases'} />
                <Divider />
                <MenuItemLine onPress={onMenuPress} to={'CopyrightScreen'} icon={'alert-circle'} name={'Copyright holders'} />
                <MenuItemLine onPress={onMenuPress} to={'TermsScreen'} icon={'book'} name={'Terms of Use'} />
                <MenuItemLine onPress={onMenuPress} to={'PrivacyScreen'} icon={'book-open'} name={'Privacy policy'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'at-sign'} name={'Contacts'} />
                <Divider />
                <MenuItemLine onPress={onMenuPress} to={'AboutScreen'} icon={'info'} name={'About the Project'} />
                <MenuItemLine onPress={onMenuPress} to={'FaqScreen'} icon={'help-circle'} name={'FAQ'} />
                <MenuItemLine onPress={Fake.onComingSoonFeaturePress} to={''} icon={'help-circle'} name={'Help'} />
                <MenuItemLine onPress={onMenuPress} to={'SystemScreen'} icon={'layers'} name={'System & App State'} />
            </ScrollView>
        </View>
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
                    <Image
                        source = {navigation.getParam('logo')}
                        style = {{ height: 32, width: 98, marginLeft: 10, }}
                    />
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
