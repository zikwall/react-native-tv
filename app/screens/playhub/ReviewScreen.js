import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
    Avatar,
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    NavigationHeaderTitleContent, TextInput,
    ThemedView,
} from '../../components';
import ExtendedTextArea from '../../components/ui/TextArea';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Form from '../../components/ui/Form';
import TagPicker from '../../components/ui/TagPicker';
import Ratings from '../../components/rating/Ratings';

const ReviewScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ reviewContent, setReviewContent ] = useState('');
    const { id, value } = navigation.state.params;
    const [ extraTags, setExtraTags ] = useState([]);

    const onSendReview = () => {
        //
    };

    return (
        <ThemedView>
            <View style={{ alignItems: 'center', padding: 10 }}>
                <Ratings size={25} value={value} disabled />
            </View>
            <Form
                header={'Оставьте свой нереальный отзыв!'}
                buttonTitle={'Оставить отзыв!'}
                onSubmit={() => alert('Ok ok!')}
            >
                <ExtendedTextArea
                    onChangeText={text => setReviewContent(text)}
                    lineNumbers={10}
                    maxLength={500}
                    placeholder={'Поделитесь впечатлениями'}
                />
                <TagPicker
                    multiple
                    onSelect={(items) => {
                        setExtraTags(items);
                    }}
                    tags={[
                        {id: 1, title: 'Качество', description: 'Как по Вашему, контент действительно качественный?'},
                        {id: 2, title: 'Стабильность', description: 'Поддерживает ли Автор стабильность своего контента, были ли у Вас проблемы с трансляцией?'},
                        {id: 3, title: 'Бесит!', description: 'Нет ли запрещенной рекламы и очень плохой?'}
                    ]}
                />
            </Form>
        </ThemedView>
    )
};

ReviewScreen.navigationOptions = ({ navigation }) => {
    const { image, title } = navigation.state.params;

    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={
                <>
                    <View style={{ marginRight: 10 }}>
                        <Avatar src={{ uri: image }} size={ 40 } resizeMode="contain" />
                    </View>
                    <NavigationHeaderTitleContent title={title} />
                </>
            }
            leftComponent={ <NavigationHeaderLeft outside icon={'x'} /> } {...props}
        />
    }
};

export default ReviewScreen;
