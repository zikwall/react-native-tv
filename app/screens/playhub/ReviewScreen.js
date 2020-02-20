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
import { Review } from '../../services';

const ReviewScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const token = useSelector(state => state.authentication.token);

    const { user, id, value, existReview } = navigation.state.params;
    const [ reviewContent, setReviewContent ] = useState('');
    const [ extraTags, setExtraTags ] = useState([]);

    const [ success, setSuccess ] = useState({
        has: false,
        text: 'Unexpected text',
    });

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
        attributes: [
            ''
        ]
    });

    const markAsError = (text, attributes) => {
        if (success) {
            setSuccess({
                has: false,
                text: 'Unexpected text',
            })
        }

        setError({
            has: true,
            error: text,
            attributes: attributes
        });
    };

    const markAsSuccess = (text) => {
        if (error.has) {
            setError({
                has: false,
                error: "Unexpected error",
                attributes: []
            })
        }

        setSuccess({
            has: true,
            text: text
        })
    };

    const onSendReview = () => {
        let attributes = {
            id: id,
            content: reviewContent,
            value: value
        };

        Review.addReview(token, attributes).then(({ code, message, attributes }) => {
            if (code === 200) {
                markAsSuccess(message);

                return true;
            }

            markAsError(message, attributes);
        });
    };

    return (
        <ThemedView>
            <View style={{ alignItems: 'center', padding: 10 }}>
                <Ratings size={25} value={value} disabled />
            </View>
            <Form
                headerColor={theme.primaryColor}
                header={'Оставьте свой нереальный отзыв!'}
                buttonTitle={'Оставить отзыв!'}
                onSubmit={onSendReview}
                hasError={error.has}
                hasSuccess={success.has}
                flashText={error.has ? error.error : (success.has ? success.text : '')}
            >
                <ExtendedTextArea
                    onChangeText={text => setReviewContent(text)}
                    lineNumbers={10}
                    maxLength={500}
                    placeholder={'Поделитесь впечатлениями'}
                />
                <View style={{ paddingTop: 10 }}>
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
                </View>
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
