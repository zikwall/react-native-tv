import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart } from "react-native-chart-kit";
import { Heading, Divider } from '../../components';

const {width} = Dimensions.get('window');

const data = {
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
};

const chartOptions = {
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
};

const StatisticScreen = () => {
    return (
        <ScrollView>
            <Heading text={'Unique Users by Months'} icon={'user-plus'}/>
            <Divider />
            <ScrollView horizontal>
                <View style={{ paddingHorizontal: 5 }}>
                    <LineChart
                        data={data}
                        width={width + width * 0.9} // from react-native
                        height={220}
                        yAxisLabel="V: "
                        yAxisSuffix="k"
                        chartConfig={chartOptions}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16 }}
                    />
                </View>
            </ScrollView>

            <Heading text={'Count of Views'} icon={'eye'}/>
            <Divider />
            <ScrollView horizontal>
                <View style={{ paddingHorizontal: 5 }}>
                    <BarChart
                        style={{ marginVertical: 8, borderRadius: 16 }}
                        data={data}
                        width={width + width * 0.9}
                        height={220}
                        yAxisLabel="V: "
                        chartConfig={chartOptions}
                        verticalLabelRotation={30}
                    />
                </View>
            </ScrollView>
        </ScrollView>
    );
};

export default StatisticScreen;
