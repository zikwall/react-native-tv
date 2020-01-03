import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { human, iOSColors } from 'react-native-typography';

import Icon from 'react-native-vector-icons/Feather';
import { Avatar } from "../avatar";

const bolderText = text => {
    if (text.indexOf("*") === -1) return text;

    let boldFormatedText;
    let textSplit = text.split("*");
    for (let i = 0; i < textSplit.length; i++) {
        let item = textSplit[i];
        if (item !== "") {
            boldFormatedText = (
                <Text style={styles.maintext}>
                    {boldFormatedText}
                    {item}
                </Text>
            );
        }
    }

    return <View style={{ flexDirection: "row" }}>{boldFormatedText}</View>;
};

class NotificationCard extends React.Component {
    state = {
        discover: (
            <Icon
                name={"activity"}
                size={24}
                color={"#929"}
                style={{ marginLeft: 10 }}
            />
        ),
        follow: (
            <Icon
                name={"user"}
                size={24}
                color={'#000'}
                style={{ marginLeft: 10 }}
            />
        ),
        like: (
            <Icon
                name={"heart"}
                size={24}
                color={"#f78"}
                style={{ marginLeft: 10 }}
            />
        )
    };

    render() {
        let { type, users, title, desc } = this.props.data;

        let icon = this.state[type];

        return (
            <View
                style={{
                    flexDirection: "row",
                    paddingHorizontal: 5,
                    paddingVertical: 20,
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    backgroundColor: '#fff'
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
                        {bolderText(title)}

                        <Text style={styles.sublinetext}>
                            {desc}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingRight: 5 }}>
                    <Icon
                        name={"chevron-down"}
                        size={10}
                        color={'#ccc'}
                    />
                </View>
            </View>
        );
    }
}

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
