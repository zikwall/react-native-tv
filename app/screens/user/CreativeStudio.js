import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { CommonChannelListItem, FlatButton, Heading, OverlayLoader, ThemedView } from '../../components';
import { ContentService } from '../../services';

const CreativeStudioScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const token = useSelector(state => state.authentication.token);
    const user = useSelector(state => state.authentication.user);

    const [ ownContent, setOwnContent ] = useState([]);
    const [ completeConfiguring, setCompleteConfiguring ] = useState(false);

    useEffect(() => {
        ContentService.fetchOwnContents(token).then((response) => {
            setOwnContent(response.response);
            setCompleteConfiguring(true);
        }).catch(() => {
            setCompleteConfiguring(true);
        });
    }, []);

    const Content = () => {
        return (
            <View>
                <FlatList
                    ListHeaderComponent={
                        <View>
                            <FlatButton
                                text={'Добавить новый контент'}
                                icon={'upload-cloud'} color={theme.primaryColor}
                                onPress={() => {
                                    navigation.navigate('CreateContentScreen');
                                }}
                            />
                            <Heading text={'Ваши видео'} color={theme.primaryColor} />
                        </View>
                    }
                    data={ownContent}
                    renderItem={({ item, index }) => <CommonChannelListItem
                        key={index}
                        title={item.name}
                        subtitle={item.category}
                        type={item.type}
                        image={{ uri: item.image }}
                        rating={item.rating}
                        visibility={item.visibility}
                        playlist={item}
                    />}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    };

    return (
        <ThemedView>
            <OverlayLoader visible={!completeConfiguring} />
            <Content />
        </ThemedView>
    );
};

export default CreativeStudioScreen;
