import React from "react";
import { createStackNavigator } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {
    AboutScreen,
    CopyrightScreen,
    FaqScreen,
    MenuScreen,
    PrivacyScreen,
    SystemScreen,
    TermsScreen,
    UserMenuScreen,
    AccountScreen,
    DebugVideoScreen,
    ContactsScreen,
    PremiumScreen,
    WriteDeveloperScreen,
    SecurityScreen,
    ParentControlScreen,
    CreativeStudioScreen,
    CreateContentScreen,
    IPTVScreen,
    ContentPostingRules,
    EditContentScreen,
    LocalDatabaseScreen,
    FriendsIncomingScreen,
    FriendsOutcomingScreen,
} from "../../screens";
import {
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    NavigationHeaderTitle
} from "../../components";
import TabBarComponent from "../../components/navigation-header/CustomTab";

const FriendshipNavigator = createMaterialTopTabNavigator({
    FriendsIncomingScreen: {
        screen: FriendsIncomingScreen,
        navigationOptions:{
            tabBarLabel: 'Входящие',
        }
    },
    FriendsOutcomingScreen: {
        screen: FriendsOutcomingScreen,
        navigationOptions:{
            tabBarLabel: 'Исходящие',
        }
    },
}, {
    tabBarOptions: {
        scrollEnabled: true,
    },
    tabBarComponent: (props) => <TabBarComponent {...props} />
});


const MenuNavigator = createStackNavigator({
    MemuScreen: {
        screen: MenuScreen,
    },
    FaqScreen: {
        screen: FaqScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'FAQ'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    SystemScreen: {
        screen: SystemScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'System & App State'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    UserMenuScreen: {
        screen: UserMenuScreen,
    },
    FriendshipRequestsScreen: {
        screen: FriendshipNavigator,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Заявки в друзья'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    AccountScreen: {
        screen: AccountScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Change Account'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    SecurityScreen: {
        screen: SecurityScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Security'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    PremiumScreen: {
        screen: PremiumScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Premium'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    ParentControlScreen: {
        screen: ParentControlScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Parent Control'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    WriteDeveloperScreen: {
        screen: WriteDeveloperScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Write to Developer'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    CreativeStudioScreen: {
        screen: CreativeStudioScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Creative Studio'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    CreateContentScreen: {
        screen: CreateContentScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Create content'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    EditContentScreen: {
        screen: EditContentScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Edit content'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    LocalDatabaseScreen: {
        screen: LocalDatabaseScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Local Database'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    DebugVideoScreen: {
        screen: DebugVideoScreen,
    },
    IPTVScreen: {
        screen: IPTVScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'IPTV'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    CopyrightScreen: {
        screen: CopyrightScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Правообладателям'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    ContentPostingRules: {
        screen: ContentPostingRules,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Правила размещения контента'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    TermsScreen: {
        screen: TermsScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Условия использования'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    PrivacyScreen: {
        screen: PrivacyScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Конфиденциальность'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    AboutScreen: {
        screen: AboutScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'О Проекте'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    },
    ContactsScreen: {
        screen: ContactsScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Контакты'} />}
                leftComponent={ <NavigationHeaderLeft /> } {...props}
            />
        }
    }
});


export default MenuNavigator;

