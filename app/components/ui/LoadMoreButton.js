import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import FlatButton from './FlatButton';

const LoadMoreButton = ({ onLoadMorePress, label }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <FlatButton
                onPress={onLoadMorePress} text={label}
                backgroundColor={theme.secondaryBackgroundColor}
                style={{ borderRadius: 5, padding: 10 }}
            />
        </View>
    )
};

LoadMoreButton.defaultProps = {
    label: 'Загрузить ещё'
};

export default LoadMoreButton;
