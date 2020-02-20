import React from 'react';
import IconWrap from "../icon/IconWrap";
import Row from "../ui/Row";
import Ratings from "./Ratings";
import { Text, TouchableOpacity, View } from "react-native";
import { human } from "react-native-typography";
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import { withNavigation } from 'react-navigation';
import { Heading } from '../index';

const ReviewMaker = ({ navigation, onSelectStar, star, existReview, exist }) => {
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
                    <IconWrap name={'log-in'} size={25} style={{ paddingRight: 15 }} />
                </TouchableOpacity>
            </Row>
        )
    }

    return (
        <>
            <View style={{ paddingHorizontal: 15 }}>
                <Ratings value={star} size={25} full onSelect={onSelectStar} />
            </View>
            {
                isAuthorized && exist &&
                <>
                    <Heading text={'Ваш отзыв'} />
                    <View style={{ margin: 15, marginTop: 0 }}>
                        <Text style={human.caption1}>
                            { existReview.content }
                        </Text>
                    </View>
                </>
            }
        </>
    )
};

export default withNavigation(ReviewMaker);
