import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ErrorText from '../flash/ErrorText';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import ExtendedTextArea from '../ui/TextArea';
import Ratings from './Ratings';
import Row from '../ui/Row';
import { human } from 'react-native-typography';

const WriteReview = ({ value, onSubmit, onCancel }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ reviewContent, setReviewContent ] = useState('');

    const onWriteHandle = () => {
        onSubmit(reviewContent);
        onCancel();
    };

    const [ error, setError ] = useState({
        has: true, message: 'Undefined error message'
    });

    return (
        <View>
            <View style={styles.content}>
                <Row style={{ paddingBottom: 15 }}>
                    <Text style={[ human.callout, { color: theme.primaryColor } ]}>
                        Ваш отзыв
                    </Text>
                    <Ratings size={25} value={value} disabled />
                </Row>
                <ErrorText hasError={error.has} error={error.message} />
                <View style={{ paddingBottom: 15, paddingTop: 10}}>
                    <ExtendedTextArea
                        onChangeText={text => setReviewContent(text)}
                        lineNumbers={10}
                        maxLength={500}
                    />
                </View>
                <TouchableOpacity style={styles.content__button} activeOpacity={0.9} onPress={onWriteHandle}>
                    <Text style={styles.content__buttonText}>Оставить отзыв!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default WriteReview;

const styles = StyleSheet.create({
    content: {
        padding: 20,
        paddingBottom: 150
    },
    content__button: {
        paddingVertical: 15,

        width: '100%',

        backgroundColor: '#333',
        borderRadius: 6,
    },
    content__buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
});
