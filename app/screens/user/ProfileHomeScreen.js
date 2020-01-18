import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import moment from 'moment';
import {
    human,
} from "react-native-typography";

import { CalendarHeatmap, NotificationCard } from '../../components';
import { Fake } from '../../utils';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const { width } = Dimensions.get('window');

const ProfileHomeScreen = () => {
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
       console.log('MOUNT PROFILE');

       return () => {
           console.log('UNMOUNT PROFILE');
       }
    });

    return (
        <View style={[ styles.container, { backgroundColor: theme.primaryBackgroudColor }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingRight: width * 0.02, paddingLeft: width * 0.02, paddingBottom: 15 }}>
                    <CalendarHeatmap
                        endDate={ moment().endOf('month').format('YYYY-MM-DD') }
                        numDays={ 100 }
                        onPress={(value, day) => {
                           if (value && typeof value.date !== 'undefined') {
                               alert(`User activity on this day ${value.date}`);
                           }
                        }}
                        values={ Fake.contributingData }
                    />
                    <View style={{ paddingTop: 5 }}>
                        <Text style={[ human.caption2, { color: theme.primaryColor }]}>{ Fake.contributingData.length } contributions in the 100 days</Text>
                    </View>
                </View>

                {Fake.notificationFeed.all.map((item, n) => {
                    return (
                        <TouchableOpacity
                            key={n.toString()}
                            style={{
                                borderColor: '#ccc',
                                borderBottomWidth: StyleSheet.hairlineWidth
                            }}
                            onPress={() =>
                                alert('You clicked on User Activity Stream item')
                            }
                        >
                            <NotificationCard data={item}/>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default ProfileHomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 5,
        justifyContent: "center",
        textAlign: 'center'
    }
});
