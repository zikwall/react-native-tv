import React, { useState } from "react";
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";
import {
    CellViewSwitch,
    FlatButton,
    Heading,
    IconWrap,
    Row,
    Tag
} from '../index';
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import SearchBar from "./SearchBar";
import { human } from 'react-native-typography';

const { width, height } = Dimensions.get('window');

const FilterBar = ({ onSearch, onPressFilter, onAccept, visibleSearchCancel }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ visibleFilterBar, setVisibleFilterBar ]     = useState(false);

    const [ isSelectedChannels, setIsSelectedChannels ] = useState(true);
    const [ isSelectedMovies, setIsSelectedMovies ]     = useState(true);
    const [ isSelectedAdults, setIsSelectedAdults ]     = useState(true);

    const handleCloseEvent = (reset = true) => {
        setVisibleFilterBar(false);

        if (reset) {
            setIsSelectedChannels(false);
            setIsSelectedMovies(false);
            setIsSelectedAdults(false);
        }
    };

    const handleOnPressFilter = () => {
        setVisibleFilterBar(true);

        onPressFilter();
    };

    const handleOnPressClose = () => {
        handleCloseEvent();
    };

    const handleOnPressAccept = () => {
        onAccept(isSelectedChannels, isSelectedMovies, isSelectedAdults);

        handleCloseEvent(false)
    };

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
                    cancelVisible={ visibleSearchCancel }
                />
            </View>
            <TouchableOpacity onPress={handleOnPressFilter}>
                <IconWrap name={'filter'} size={25} style={{ marginRight: 25, paddingTop: 10 }} />
            </TouchableOpacity>

            {
                visibleFilterBar && <>
                    <View style={[
                        styles.overlay, {
                            width: width - 10,
                            margin: 5,
                            height: 300,
                            zIndex: 2,
                            backgroundColor: theme.primaryBackgroundColor,
                            borderRadius: 10,
                            borderColor: theme.primaryColor,
                            borderWidth: 1,
                        }
                    ]}>
                        <Row>
                            <Text style={[human.caption1, { padding: 14, flex: 1, flexWrap: 'wrap', color: theme.primaryColor } ]}>
                                Подберите свои оптимальные настройки!
                            </Text>
                            <TouchableOpacity onPress={handleOnPressClose} style={{ padding: 10 }}>
                                <IconWrap name={'x'} size={20}/>
                            </TouchableOpacity>
                        </Row>
                        <Heading styles={{ paddingLeft: 10 }} color={theme.primaryColor} text={'Выберите тип контента, который нужно отображать.'} />

                        <Row style={{ alignItems: 'center', paddingRight: 15 }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row', paddingLeft: 10 }}>
                                <CellViewSwitch disabled={false} onValueChange={(status) => setIsSelectedChannels(status)} value={isSelectedChannels} />
                                <Text style={[human.caption1, { color: theme.primaryColor } ]}>
                                    Телеканалы
                                </Text>
                            </View>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <CellViewSwitch disabled={false} onValueChange={(status) => setIsSelectedMovies(status)} value={isSelectedMovies} />
                                <Text style={[human.caption1, { color: theme.primaryColor } ]}>
                                    Кино и фильмы
                                </Text>
                            </View>
                        </Row>
                        <View style={{ alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingLeft: 10 }}>
                            <CellViewSwitch disabled={false} onValueChange={(status) => setIsSelectedAdults(status)} value={isSelectedAdults} />
                            <Text style={[human.caption1, { color: theme.primaryColor } ]}>
                                18+
                            </Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Row style={{ paddingLeft: 15, paddingTop: 14 }}>
                                <Tag label={'Кино и фильмы'} id={10} />
                                <Tag label={'Позновательные'} id={20} />
                                <Tag label={'Новостные'} id={30} />
                                <Tag label={'Спортивные'} id={40} />
                                <Tag label={'Детские'} id={50} />
                                <Tag label={'Хобби'} id={60} />
                                <Tag label={'Развлекательные'} id={70} />
                                <Tag label={'Музыкальные'} id={80} />
                                <Tag label={'Общие'} id={90} />
                            </Row>
                        </ScrollView>
                        <FlatButton
                            onPress={handleOnPressAccept}
                            text={'Применить'}
                            style={{ marginTop: 10, borderColor: theme.primaryColor, borderWidth: 1, borderRadius: 10, padding: 10 }}
                            color={theme.primaryColor}
                        />
                    </View>
                    <View style={[styles.overlay, {
                        zIndex: 1,
                        width: width,
                        height: height,
                        opacity: 0.9,
                        backgroundColor: theme.primaryBackgroundColor,
                    }]}/>
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

FilterBar.defaultProps = {
    onSearch: (text) => {},
    onPressFilter: () => {},
    onAccept: (useChannels, useMovies, useAdults) => {},
    visibleSearchCancel: false
};

export default FilterBar;
