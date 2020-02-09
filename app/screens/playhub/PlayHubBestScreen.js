import React from 'react';
import { ScrollView } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { ChannelsLine, ThemedView } from '../../components';
import { Fake } from '../../utils';
import { bindActionCreators } from 'redux';
import { setPlayhubDetailed } from '../../redux/actions';

const PlayHubBestScreen = ({ navigation, setDetailed }) => {
    const theme = useSelector(state => getAppTheme(state));

    const handleOnTitlePress = (title, items) => {
        setDetailed({
            title: title,
            items: items
        });
        navigation.navigate('PlayhubDetailed');
    };

    return (
        <ThemedView style={{ paddingLeft: 5}}>
            <ScrollView>
                <ChannelsLine titlePress={handleOnTitlePress} title={'Новостные'} items={Fake.userPlaylist} />
                <ChannelsLine titlePress={handleOnTitlePress} title={'Развлекательные'} items={[...Fake.userPlaylist, ...Fake.userPlaylist]} />
                <ChannelsLine titlePress={handleOnTitlePress} title={'Кино и фильмы'} items={Fake.userPlaylist} />
                <ChannelsLine titlePress={handleOnTitlePress} title={'Спортивные'} items={Fake.userPlaylist} />
            </ScrollView>
        </ThemedView>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({
    setDetailed: setPlayhubDetailed,
}, dispatch);

export default connect(state => state, mapDispatchToProps)(PlayHubBestScreen);
