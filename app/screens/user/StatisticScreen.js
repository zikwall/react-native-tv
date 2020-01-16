import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { Heading, Divider } from '../../components';

const {width} = Dimensions.get('window');

const StatisticScreen = () => {
    return (
        <ScrollView horizontal>
            <View style={{ paddingHorizontal: 5 }}>
                <Heading text={'Unique View by Months'} />
                <Divider />
                <LineChart
                    data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jule", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }
                        ]
                    }}
                    width={width + width * 0.3} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    chartConfig={{
                        backgroundColor: "#fff",
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#000"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default StatisticScreen;
