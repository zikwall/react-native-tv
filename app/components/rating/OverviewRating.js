import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Progress from '../ui/Progress';
import Ratings from './Ratings';
import { human } from 'react-native-typography';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const OverViewRating = ({ totalCount, rating, stars }) => {
    const theme = useSelector(state => getAppTheme(state));
    const starsMark = {
        '5': 0,
        '4': 0,
        '3': 0,
        '2': 0,
        '1': 0
    };

    const [ contentStars, setContentStars ] = useState(starsMark);

    useEffect(() => {
        if (!Array.isArray(stars) && stars.length !== 0) {
            setContentStars(stars)
        }
    }, []);

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 45 }}>
                <Text style={{ fontSize: 50, color: theme.primaryColor }}>
                    { rating || 0 }
                </Text>
                <Ratings size={15} disabled value={Math.round(parseFloat(rating))} />
                <Text style={[ human.caption1, { color: theme.secondaryColor, paddingTop: 5 } ]}>
                    { totalCount }
                </Text>
            </View>
            <View style={{ width: 150 }}>
                {
                    Object.entries(contentStars).map(([key, value], index) => (
                        <Progress key={index} label={key} labelColor={theme.primaryColor} current={value} top={totalCount} />
                    ))
                }
            </View>
        </View>
    )
};

export default OverViewRating;
