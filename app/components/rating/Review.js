import React from 'react';
import { Text, View } from 'react-native';
import { human } from 'react-native-typography';
import UserLineItem from '../user-item/UserLineItem';
import Row from '../ui/Row';
import Tag from '../ui/Tag';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Ratings from './Ratings';

const Review = ({ user, review, date, stars, usefulCount, isOwnUseful }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View style={{ flexDirection: 'column' }}>
            <UserLineItem name={user.name} username={user.username} />
            <Text style={[ human.caption1, { paddingTop: 5, paddingLeft: 15, paddingRight: 15, color: theme.primaryColor } ]}>
                { review }
            </Text>
            <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 5, alignItems: 'center' }}>
                <Ratings size={10} />
                <Text style={[ human.caption1, { paddingLeft: 15, paddingRight: 15, color: theme.primaryColor } ]}>
                    { date }
                </Text>
            </View>
            {
                (usefulCount > 0) &&
                <Text style={[ human.caption1, { paddingTop: 15, paddingLeft: 15, color: theme.primaryColor } ]}>
                    { usefulCount } человек считают это полезным
                </Text>
            }
            <Row style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[ human.caption1, { paddingTop: 15, paddingLeft: 15, paddingBottom: 15, color: theme.primaryColor } ]}>
                    Был ли этот отзыв полезен?
                </Text>
                <Row style={{ marginHorizontal: 15 }}>
                    <Tag label={'Да'} borderColor={isOwnUseful ? 'green' : null} />
                    <Tag label={'Нет'} borderColor={isOwnUseful === false ? 'red' : null}/>
                </Row>
            </Row>
        </View>
    )
};

Review.defaultProps = {
    isOwnUseful: undefined,
    usefulCount: 0
};

export default Review;
