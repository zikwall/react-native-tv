import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import DrawerUserInfo from './DrawerUserInfo'
import MenuItem from '../../components/menu-item/MenuItem';
import Divider from '../../components/divider';

const DrawerScreen = ({ navigation, isAuthenticated }) => {
    const handleSettingsPress = () => {
        alert('Press settings')
    };

    const handleSearchPress = () => {
        alert('Press Search')
    };

    const onMenuClick = (to) => {
        navigation.navigate(to);
    };

    return (
        <View style={styles.container}>
            {
                isAuthenticated && <DrawerUserInfo
                    username='zikwall'
                    displayName='AndreyKa'
                    avatarUrlMedium='https://avatars2.githubusercontent.com/u/23422968?s=460&v=4'
                    onSettingsPress={handleSettingsPress}
                    onSearchPress={handleSearchPress}
                />
            }
            <ScrollView>
                <MenuItem onPress={onMenuClick} to={''} icon={ 'user-check' } name={'Friends'}/>
                <MenuItem unreadItems={20} onPress={onMenuClick} to={''} icon={ 'message-square' } name={'Messages'}/>
                <MenuItem onPress={onMenuClick} to={''} icon={ 'users' } name={'Communities'}/>
                <MenuItem onPress={onMenuClick} to={''} icon={ 'star' } name={'Bookmarks'}/>
                <MenuItem onPress={onMenuClick} to={''} icon={ 'heart' } name={'Liked'}/>
                <MenuItem onPress={onMenuClick} to={''} icon={ 'shopping-bag' } name={'Purchases'}/>
                <Divider />
                <MenuItem onPress={onMenuClick} to={'CopyrightScreen'} icon={ 'alert-circle' } name={'Copyright holders'}/>
                <MenuItem onPress={onMenuClick} to={'TermsScreen'} icon={ 'book' } name={'Terms of Use'}/>
                <MenuItem onPress={onMenuClick} to={'PrivacyScreen'} icon={ 'book-open' } name={'Privacy policy'}/>
                <MenuItem onPress={onMenuClick} to={''} icon={ 'at-sign' } name={'Contacts'}/>
                <Divider />
                <MenuItem onPress={onMenuClick} to={'AboutScreen'} icon={ 'info' } name={'About the Project'}/>
                <MenuItem onPress={onMenuClick} to={'FaqScreen'} icon={ 'help-circle' } name={'FAQ'}/>
                <MenuItem onPress={onMenuClick} to={''} icon={ 'help-circle' } name={'Help'}/>
            </ScrollView>
        </View>
    );
};

const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);

export default connect(mapStateToProps)(withNavigation(DrawerScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
