import React, { useEffect } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart } from "react-native-chart-kit";
import { Heading, Divider } from '../../components';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const {width} = Dimensions.get('window');

const StatisticScreen = () => {
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
        console.log('MOUNT ANALYTICS');

        return () => {
            console.log('UNMOUNT ANALYTICS');
        }
    });

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
        backgroundColor: theme.primaryBackgroudColor,
        backgroundGradientFrom: theme.primaryBackgroudColor,
        backgroundGradientTo: theme.primaryBackgroudColor,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => theme.primaryColor,
        labelColor: (opacity = 1) => theme.primaryColor,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: theme.primaryColor
        }
    };

    return (
        <ScrollView style={{ backgroundColor: theme.primaryBackgroudColor }}>
            <Heading text={'Unique Users by Months'} icon={'user-plus'} color={theme.primaryColor}/>
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

            <Heading text={'Count of Views'} icon={'eye'} color={theme.primaryColor} />
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
