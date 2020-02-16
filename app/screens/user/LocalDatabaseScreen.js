import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, connect } from 'react-redux';
import { getAppTheme, getCurrentDatabase } from '../../redux/reducers';
import { CommonChannelListItem, Heading, OverlayLoader, ThemedView } from '../../components';
import { setLocalContent } from "../../redux/actions";
import {bindActionCreators} from 'redux';

const LocalDatabaseScreen = ({ navigation, selectLocalContent }) => {
    const theme = useSelector(state => getAppTheme(state));
    const currentDatabase = useSelector(state => getCurrentDatabase(state));

    useEffect(() => {
        console.log(currentDatabase);
    }, [ currentDatabase ]);

    const onSelectContent = (content, image, title, visibility) => {
        selectLocalContent(content);
        navigation.navigate('LocalWatch');
    };

    const MyLocalContent = () => {
        return (
            <View>
                <FlatList
                    ListHeaderComponent={
                        <View>
                            <Heading text={'Ваши локально сохраненные данные'} color={theme.primaryColor} />
                        </View>
                    }
                    data={currentDatabase}
                    renderItem={({ item, index }) => <CommonChannelListItem
                        key={index}
                        title={item.name}
                        subtitle={item.category}
                        type={item.type}
                        image={{ uri: item.image }}
                        rating={item.rating}
                        visibility={item.visibility}
                        playlist={item}
                        onPress={onSelectContent}
                    />}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    };

    return (
        <ThemedView>
            <OverlayLoader visible={false} />
            <MyLocalContent />
        </ThemedView>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({
    selectLocalContent: setLocalContent
}, dispatch);

export default connect(state => state, mapDispatchToProps)(LocalDatabaseScreen);
