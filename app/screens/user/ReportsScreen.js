import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
    ThemedView,
    ChannelAvatar,
    CellView
} from '../../components';
import { useSelector } from 'react-redux';
import { ReportContent } from '../../services';
import { getAppTheme } from '../../redux/reducers';

const ReportsScreen = () => {
    const token = useSelector(state => state.authentication.token);
    const theme = useSelector(state => getAppTheme(state));

    const [ ownReports, setOwnReports ] = useState([]);

    useEffect(() => {
        ReportContent.own(token).then(({ response }) => {
            setOwnReports(response);
        });

    }, []);

    return (
        <ThemedView>
            <ScrollView>
                {
                    ownReports.map((report, index) => {
                        return (
                            <View key={index} style={{ padding: 15, borderBottomColor: theme.primaryColor, borderBottomWidth: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                    <ChannelAvatar src={{ uri: report.image }} resizeMode="contain" />
                                    <Text style={{ paddingLeft: 15, color: theme.primaryColor }}>
                                        { report.name }
                                    </Text>
                                    <Text style={{ paddingLeft: 15, color: theme.primaryColor }}>
                                        №: { report.id }
                                    </Text>
                                </View>
                                <View style={{ paddingTop: 5 }}>
                                    <CellView
                                        cellStyles={{ paddingTop: 10 }}
                                        leftContent={
                                            <Text style={{ color: theme.primaryColor }}>
                                                Статус
                                            </Text>
                                        }
                                        rightContent={
                                            <Text style={{ color: theme.primaryColor }}>
                                                { !!report.resolved ? 'На рассмотрении' : 'Рассмотрено' }
                                            </Text>
                                        }
                                    />
                                    <CellView
                                        cellStyles={{ paddingTop: 10 }}
                                        leftContent={
                                            <Text style={{ color: theme.primaryColor }}>
                                                Причина
                                            </Text>
                                        }
                                        rightContent={
                                            <Text style={{ color: theme.primaryColor }}>
                                                { report.cause }
                                            </Text>
                                        }
                                    />
                                    <CellView
                                        cellStyles={{ paddingTop: 10 }}
                                        leftContent={
                                            <Text style={{ color: theme.primaryColor }}>
                                                Описание
                                            </Text>
                                        }
                                        rightContent={
                                            <Text numberOfLines={3} style={{ width: 250, textAlign: 'right', color: theme.primaryColor }}>
                                                { report.description_cause }
                                            </Text>
                                        }
                                    />
                                </View>
                                {
                                    report.comment &&
                                    <View style={{ paddingTop: 10 }}>
                                        <Text style={{ color: theme.primaryColor }}>
                                            Комментарий:
                                        </Text>
                                        <Text style={{ color: theme.primaryColor }}>
                                            { report.comment }
                                        </Text>
                                    </View>
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>
        </ThemedView>
    )
};

export default ReportsScreen;
