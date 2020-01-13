import s from './styles';
import {Text, View} from 'react-native';
import React from 'react';

const Hubs = ({ github }) => {
    return (
        <View style={s.github}>
            <View style={s.githubItem}>
                <Text style={s.bold}>{github.followers}</Text>
                <Text style={s.githubItemText}>followers</Text>
            </View>
            <View style={s.githubItem}>
                <Text style={s.bold}>{github.public_repos}</Text>
                <Text style={s.githubItemText}>repos</Text>
            </View>
            <View style={s.githubItem}>
                <Text style={s.bold}>{github.following}</Text>
                <Text style={s.githubItemText}>following</Text>
            </View>
        </View>
    );
};

export default Hubs;
