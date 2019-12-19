import * as React from "react";
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import s from '../../screens/user/components/user-top/styles';

const Tab = ({ focusAnim, title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{backgroundColor: '#fff'}}>
            <Animated.View style={[s.githubItem, {backgroundColor: '#fff'}]}>
                <Animated.Text style={s.bold}>{200}</Animated.Text>
                <Animated.Text style={s.githubItemText}>followers</Animated.Text>
            </Animated.View>
        </TouchableOpacity>
    )
};

export default Tab;
