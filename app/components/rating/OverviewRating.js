import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Progress from '../ui/Progress';
import Ratings from './Ratings';
import { human } from 'react-native-typography';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const OverViewRating = ({ stars }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ commonState, setCommonState ] = useState({
        totalCount: 0,
        averageValue: 0,
        stars: {
            '5': 0,
            '4': 0,
            '3': 0,
            '2': 0,
            '1': 0
        }
    });

    useEffect(() => {
        let count = 0;
        let sum = 0;
        let starsMark = {
            '5': 0,
            '4': 0,
            '3': 0,
            '2': 0,
            '1': 0
        };

        for (let star of stars) {
            count += 1;
            sum += star.stars;
            starsMark[star.stars] += 1;
        }

        setCommonState({
            totalCount: count,
            stars: starsMark,
            averageValue: sum / count
        })
    }, []);

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 45 }}>
                <Text style={{ fontSize: 50, color: theme.primaryColor }}>
                    { commonState.averageValue || 0 }
                </Text>
                <Ratings size={15} disabled value={Math.round(parseFloat(commonState.averageValue))} />
                <Text style={[ human.caption1, { color: theme.secondaryColor, paddingTop: 5 } ]}>
                    { commonState.totalCount }
                </Text>
            </View>
            <View style={{ width: 150 }}>
                {
                    Object.entries(commonState.stars).map(([key, value], index) => (
                        <Progress key={index} label={key} labelColor={theme.primaryColor} current={value} top={commonState.totalCount} />
                    ))
                }
            </View>
        </View>
    )
};

export default OverViewRating;
