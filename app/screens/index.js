import HomeScreen from "./home/HomeScreen";
import PlayHubScreen from "./playhub/PlayHubScreen";
import WatchScreen from "./watch/WatchScreen";
import ProfileHomeScreen from "./user/ProfileHomeScreen";
import FollowingScreen from './user/FollowingScreen';
import FollowersScreen from './user/FollowersScreen';
import ProfileChannelScreen from './user/ProfileChannelScreen';
import LoginScreen from "./login/LoginScreen";
import RegisterScreen from './register/RegisterScreen';
import ForgotScreen from './forgot/ForgotScreen';
import MenuScreen from './menu/MenuScreen';
import CopyrightScreen from './static/CopyrightScreen';
import TermsScreen from './static/TermsScreen';
import PrivacyScreen from './static/PrivacyScreen';
import AboutScreen from './static/AboutScreen';
import FaqScreen from './static/FaqScreen';
import PlayHubBestScreen from './playhub/PlayHubBestScreen';
import PlayHubCategoryScreen from './playhub/PlayHubCategoryScreen';
import PlayHubForFamilyScreen from './playhub/PlayHubForFamilyScreen';
import PlayHubRecommendedScreen from './playhub/PlayHubRecommendedScreen';
import ContinueRegisterScreen from './register/ContinueRegisterScreen';
import SystemScreen from "./static/SystemScreen";
import StatisticScreen from "./user/StatisticScreen";
import UserMenuScreen from "./menu/UserMenuScreen";
import LikedScreen from './liked/LikedScreen';
import AccountScreen from './user/AccountScreen';
import DebugVideoScreen from './menu/DebugVideoScreen';
import ContactsScreen from './static/ContactsScreen';
import FriendshipRequestsScreen from './user/FrinedshipRequestsScreen';
import ContentWatch from './watch/ContentWatch';
import PremiumScreen from "./user/PremiumScreen";
import WriteDeveloperScreen from "./user/WriteDeveloperScreen";
import SecurityScreen from "./user/SecurityScreen";
import ParentControlScreen from "./user/ParentControlScreen";

export {
    // global
    HomeScreen, PlayHubScreen, WatchScreen, LikedScreen, ContentWatch,
    // user
    ProfileHomeScreen, FollowersScreen, FollowingScreen, ProfileChannelScreen, StatisticScreen, UserMenuScreen,
    FriendshipRequestsScreen, ParentControlScreen,
    // auth
    LoginScreen, RegisterScreen, ForgotScreen, ContinueRegisterScreen,
    // menu
    MenuScreen, CopyrightScreen, TermsScreen, PrivacyScreen, AboutScreen, FaqScreen, SystemScreen, AccountScreen,
    DebugVideoScreen, ContactsScreen, PremiumScreen, WriteDeveloperScreen, SecurityScreen,
    // playhub
    PlayHubBestScreen, PlayHubCategoryScreen, PlayHubForFamilyScreen, PlayHubRecommendedScreen
}
