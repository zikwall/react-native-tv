import React, { useState } from "react";
import { Dimensions, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { IconWrap } from "../index";
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import SearchBar from "./SearchBar";

const { width, height } = Dimensions.get('window');

const FilterBar = ({ onSearch, onPressFilter }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ visibleFilterBar, setVisibleFilterBar ] = useState(false);

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 10,
            justifyContent: 'space-between'
        }}>
            <View style={{ marginLeft: 10 }}>
                <SearchBar
                    width={width / 2 + 100}
                    height={ 40 }
                    placeholder="Поиск"
                    fontColor={theme.primaryColor}
                    iconColor={theme.primaryColor}
                    cancelIconColor={theme.primaryColor}
                    backgroundColor={theme.primaryBackgroundColor}
                    borderColor={theme.primaryColor}
                    onChangeText={(text) => {
                        onSearch(text);
                    }}
                    onPressCancel={() => {
                        onSearch("");
                    }}
                    onPress={() => alert("onPressss")}
                    cancelVisible={ false }
                />
            </View>
            <TouchableOpacity onPress={onPressFilter}>
                <IconWrap name={'filter'} size={25} style={{ marginRight: 25, paddingTop: 10 }} />
            </TouchableOpacity>

            {
                visibleFilterBar && <>
                    <View style={[
                        styles.overlay, {
                            width: width - 10,
                            margin: 5,
                            height: 360,
                            zIndex: 999,
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            borderColor: theme.primaryColor,
                            borderWidth: 1
                        }
                    ]}>
                        <Text>wswsw</Text>
                    </View>
                    <View style={[styles.overlay, {
                        zIndex: 1,
                        width: width,
                        height: height,
                        opacity: 0.5,
                        backgroundColor: '#fff',
                    } ]}/>
                </>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
    }
});

FilterBar.defaultOptions = {
    onSearch: (text) => {},
    onPressFilter: () => {}
};

export default FilterBar;
