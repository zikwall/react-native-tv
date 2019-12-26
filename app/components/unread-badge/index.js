import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import s from './styles';

const UnreadBadge = ({ unreadItems }) => {
    return (
      <View style={[s.container, s.unread]}>
        <Text style={s.text}>{unreadItems}</Text>
      </View>
    );
};

UnreadBadge.propTypes = {
  unreadItems: PropTypes.number,
};

export default UnreadBadge;
