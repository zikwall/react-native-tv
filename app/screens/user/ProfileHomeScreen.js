import React from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import moment from 'moment';
import {
    human,
} from "react-native-typography";

import CalendarHeatmap from '../../components/heatmap/CalendarHeatmap';
import { Fake } from '../../utils';
import NotificationCard from '../../components/notification/NotificationCard';

const {height, width} = Dimensions.get('window');

const ProfileHomeScreen = () => {
    return (
        <View style={ styles.container }>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingRight: width * 0.02, paddingLeft: width * 0.02, paddingBottom: 15 }}>
                    <CalendarHeatmap
                        endDate={ moment().endOf('month').format('YYYY-MM-DD') }
                        numDays={ 100 }
                        onPress={(value, day) => {
                           if (value && typeof value.date !== 'undefined') {
                               alert(value.date);
                           }
                        }}
                        values={ Fake.contributingData }
                    />
                    <View style={{ paddingTop: 5 }}>
                        <Text style={human.caption2}>{ Fake.contributingData.length } contributions in the 100 days</Text>
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
                                alert('aaaa')
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
