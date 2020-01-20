import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/actions';
import { getAppTheme } from '../../redux/reducers';
import { human, iOSColors } from 'react-native-typography';
import { Theme } from '../../constants';
import { ThemeService } from '../../services';

const ThemeItem = ({ colorScheme, colorName, textColor, onSelect, name }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <TouchableOpacity onPress={() => onSelect(name)} style={[styles.channelCard, { height: 80, width: 80, borderColor: theme.primaryColor, backgroundColor: colorScheme }]}>
            <Text numberOfLines={1} style={[ styles.title, { color: textColor }]}>{ colorName }</Text>
        </TouchableOpacity>
    )
};

ThemeItem.defaultProps = {
    colorScheme: '#fff',
    textColor: '#000'
};

const ThemePicker = () => {
    const dispatch = useDispatch();
    const selectTheme = useCallback(theme => dispatch(changeTheme(theme)), [ dispatch ]);

    const handleSelectTheme = (theme) => {
        ThemeService.setAppThemeService(theme).then(() => {
            selectTheme(theme);
        });
    };

    return (
        <View style={{ marginHorizontal: 5 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Object.entries(Theme).map(([themeName, theme], index) => {
                    return <ThemeItem key={index}
                                      name={themeName}
                                      colorName={theme.info.name}
                                      colorScheme={theme.primaryBackgroundColor}
                                      textColor={theme.primaryColor}
                                      onSelect={handleSelectTheme}
                    />
                })}
            </ScrollView>
        </View>
    )
};

export default ThemePicker;

const styles = StyleSheet.create({
    channelCard: {
        marginRight: 5,
        marginBottom: 5,
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
    title: {
        ...human.subhead,
        marginTop: 5
    }
});
