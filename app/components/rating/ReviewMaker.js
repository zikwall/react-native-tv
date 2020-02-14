import React from 'react';
import IconWrap from "../icon/IconWrap";
import Row from "../ui/Row";
import Ratings from "./Ratings";
import { Text, TouchableOpacity, View } from "react-native";
import { human } from "react-native-typography";
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import { withNavigation } from 'react-navigation';

const ReviewMaker = ({ navigation, onSelectStar }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);

    if (!isAuthorized) {
        return (
            <Row style={{ alignItems: 'center' }}>
                <Text style={[human.footnote, {
                    color: theme.primaryColor,
                    flex: 1,
                    flexWrap: 'wrap',
                    paddingHorizontal: 15
                }]}>
                    Для того, чтобы оставить отзыв нужно быть авторизированным
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <IconWrap name={'log-in'} size={25} style={{ paddingRight: 15 }}/>
                </TouchableOpacity>
            </Row>
        )
    }

    return (
        <View style={{ paddingHorizontal: 15 }}>
            <Ratings size={25} full onSelect={onSelectStar} />
        </View>
    )
};

export default withNavigation(ReviewMaker);
