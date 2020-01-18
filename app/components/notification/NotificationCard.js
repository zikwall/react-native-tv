import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { human, iOSColors } from 'react-native-typography';

import Icon from 'react-native-vector-icons/Feather';
import { Avatar } from "../avatar";
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import IconWrap from '../icon/IconWrap';

const bolderText = (text, color) => {
    if (text.indexOf("*") === -1) return text;

    let boldFormatedText;
    let textSplit = text.split("*");
    for (let i = 0; i < textSplit.length; i++) {
        let item = textSplit[i];
        if (item !== "") {
            boldFormatedText = (
                <Text style={[ styles.maintext, { color: color }]}>
                    {boldFormatedText}
                    {item}
                </Text>
            );
        }
    }

    return <View style={{ flexDirection: "row" }}>{boldFormatedText}</View>;
};

const NotificationCard = ({ data }) => {
    const theme = useSelector(state => getAppTheme(state));

    const state = {
        discover: (
            <IconWrap
                name={"activity"}
                size={24}
                color={"#929"}
                style={{ marginLeft: 10 }}
            />
        ),
        follow: (
            <IconWrap
                name={"user"}
                size={24}
                style={{ marginLeft: 10 }}
            />
        ),
        like: (
            <IconWrap
                name={"heart"}
                size={24}
                color={"#f78"}
                style={{ marginLeft: 10 }}
            />
        )
    };


    let { type, users, title, desc } = data;

    let icon = state[type];

    return (
        <View
            style={{
                flexDirection: "row",
                paddingHorizontal: 5,
                paddingVertical: 20,
                alignItems: "flex-start",
                justifyContent: "space-between",
                backgroundColor: theme.primaryBackgroudColor
            }}
        >
            {icon}
            <View
                style={{
                    paddingLeft: 10,
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "flex-start"
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    {users.map((i, n) => (
                        <Avatar
                            src={i}
                            key={n}
                            style={{
                                marginRight: 5
                            }}
                        />
                    ))}
                </View>
                <View
                    style={{
                        paddingTop: 5,
                        alignItems: "flex-start",
                        justifyContent: "flex-start"
                    }}
                >
                    {bolderText(title, theme.primaryColor)}

                    <Text style={styles.sublinetext}>
                        {desc}
                    </Text>
                </View>
            </View>
            <View style={{ paddingRight: 5 }}>
                <IconWrap
                    name={"chevron-down"}
                    size={20}
                    color={'#ccc'}
                />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#FFF"
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    },
    maintext: {
        ...human.subhead,
        marginBottom: 5
    },
    sublinetext: {
        ...human.caption2,
        color: iOSColors.gray
    }
});

export default NotificationCard;
