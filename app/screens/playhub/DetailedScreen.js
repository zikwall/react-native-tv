import React from 'react';
import { FlatList } from 'react-native';
import {
    ChannelBackgroundCard,
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    NavigationHeaderTitle,
    ThemedView,
} from '../../components';
import { Fake } from '../../utils';
import { useSelector } from 'react-redux';
import { getPlayhubDetailed } from '../../redux/reducers';

const DetailedScreen = ({ navigation }) => {
    const detailed = useSelector(state => getPlayhubDetailed(state));

    return (
        <ThemedView>
            <FlatList
                columnWrapperStyle={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
                numColumns={3}
                data={detailed.items}
                renderItem={({ item, index }) => <ChannelBackgroundCard
                    name={item.channel}
                    type={item.type}
                    image={item.cover}
                    playlist={item}
                />}
                keyExtractor={(item, i) => item.channel + '_' + i}
            />
        </ThemedView>
    )
};

DetailedScreen.navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={<NavigationHeaderTitle title={title} />}
            leftComponent={ <NavigationHeaderLeft onHome /> } {...props}
        />
    }
};

export default DetailedScreen;
