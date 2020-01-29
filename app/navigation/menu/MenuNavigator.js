import React from "react";
import { createStackNavigator } from "react-navigation";
import {
    AboutScreen,
    CopyrightScreen,
    FaqScreen,
    MenuScreen,
    PrivacyScreen,
    StatisticScreen,
    SystemScreen,
    TermsScreen,
    UserMenuScreen,
    AccountScreen,
    DebugVideoScreen,
    ContactsScreen,
    FriendshipRequestsScreen,
    PremiumScreen,
    WriteDeveloperScreen,
    SecurityScreen,
    ParentControlScreen
} from "../../screens";
import {
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    NavigationHeaderTitle
} from "../../components";

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
        screen: FriendshipRequestsScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Запросы в друзья'} />}
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
    DebugVideoScreen: {
        screen: DebugVideoScreen,
    },
    UserStatisticScreen: {
        screen: StatisticScreen,
        navigationOptions:{
            header: (props) => <NavigationHeaderComponent
                titleComponent={<NavigationHeaderTitle title={'Your Analytics'} />}
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

