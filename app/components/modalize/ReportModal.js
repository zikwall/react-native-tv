import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import ErrorText from '../flash/ErrorText';
import FlatButton from '../ui/FlatButton';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Heading from '../heading';
import ExtendedTextArea from '../ui/TextArea';
import ModalizeCloseHeader from './ModalizeCloseHeader';
import { ReportContent } from '../../services';
import SuccessText from '../flash/SuccessText';

const DOES_NOT_MATCH = 'DOES_NOT_MATCH';
const FOR_ADULTS = 'FOR_ADULTS';
const OFFENSIVE = 'OFFENSIVE';

const REPORT_MAP = {
    DOES_NOT_MATCH: 'Не соответствует описанию',
    FOR_ADULTS: 'Контент для взрослых без указания 18+',
    OFFENSIVE: 'Оскорбительный/Ущемляющий права'
};

const ReportModal = ({ onCloseModal, onSend, content }) => {
    const theme = useSelector(state => getAppTheme(state));
    const token = useSelector(state => state.authentication.token);

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
    });

    const [ success, setSuccess ] = useState({
        has: false,
        message: "Unexpected",
    });

    const [ reportCause, setReportCause ] = useState({
        type: null,
        description: null
    });

    const onSendReport = async (id, reportObject, extraComment) => {
        const attributes = {
            id: id,
            type: reportObject.type,
            description: reportObject.description,
            comment: extraComment,
        };

        const { code, message } = await ReportContent.send(token, attributes);

        if (code === 200) {
            onSend(id, reportObject, extraComment);

            if (error.has) {
                setError({
                    has: false,
                    error: ""
                });
            }

            setSuccess({
                has: true,
                message: message
            });

            setTimeout(() => {
                onCloseModal();
            }, 3000);

            return true;
        }

        setError({
            has: true,
            error: message
        });
    };

    const [ extraComment, setExtraComment ] = useState('');
    const text1 = `Если Вы являетесь правообладателем, то пожалуйста напишите на почту: \n\nEmail: admin.playhub@gmail.com\n\n`;
    const text2 = `Укажите следующие данные: \n\n"PLAY ID: ${content.id}"\n"PLAY NAME: ${content.name}"\n\nТак же приложите документы, подтверждающие Ваши права.`;
    const text3 = `Подробнее можно прочитать в разделе "Правообладателям"`;

    return (
        <View style={styles.content}>
            <Text style={styles.content__subheading}>{'Пожаловаться'.toUpperCase()}</Text>
            <ModalizeCloseHeader onClose={onCloseModal} />
            {
                (success.has || error.has) &&
                <View style={{ paddingBottom: 10 }}>
                    <ErrorText hasError={error.has} error={error.error} />
                    <SuccessText hasMessage={success.has} message={success.message} />
                </View>
            }
            <Text style={{ color: theme.primaryColor }}>
                { text1 + text2 + text3 }
            </Text>

            <Heading text={'Пожалуйста, сообщите нам причину'} color={theme.primaryColor} styles={{ paddingLeft: 0 }} />

            <FlatButton
                isSelected={reportCause.type === DOES_NOT_MATCH}
                text={REPORT_MAP[DOES_NOT_MATCH]}
                style={{ backgroundColor: theme.secondaryBackgroundColor, borderRadius: 5 }}
                containerStyle={{ marginHorizontal: 0 }}
                onPress={() => setReportCause({
                    type: DOES_NOT_MATCH,
                    description: REPORT_MAP[DOES_NOT_MATCH]
                })}
            />

            <FlatButton
                isSelected={reportCause.type === FOR_ADULTS}
                text={REPORT_MAP[FOR_ADULTS]}
                style={{ backgroundColor: theme.secondaryBackgroundColor, borderRadius: 5 }}
                containerStyle={{ marginHorizontal: 0 }}
                onPress={() => setReportCause({
                    type: FOR_ADULTS,
                    description: REPORT_MAP[FOR_ADULTS]
                })}
            />

            <FlatButton
                isSelected={reportCause.type === OFFENSIVE}
                text={REPORT_MAP[OFFENSIVE]}
                style={{ backgroundColor: theme.secondaryBackgroundColor, borderRadius: 5 }}
                containerStyle={{ marginHorizontal: 0 }}
                onPress={() => setReportCause({
                    type: OFFENSIVE,
                    description: REPORT_MAP[OFFENSIVE]
                })}
            />

            <Heading text={'Комментарий модератору'} color={theme.primaryColor} styles={{ paddingLeft: 0 }} />
            <ExtendedTextArea maxLength={500} onChangeText={(comment) => setExtraComment(comment)} value={extraComment} />

            <TouchableOpacity style={styles.content__button} activeOpacity={0.9} onPress={() => onSendReport(content.id, reportCause, extraComment)}>
                <Text style={styles.content__buttonText}>Отправить жалобу</Text>
            </TouchableOpacity>
        </View>
    )
};

ReportModal.defaultProps = {
    onSend: (id, report, comment) => {}
};

export default ReportModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        paddingTop: 20,
        padding: 20,
    },
    content__subheading: {
        marginBottom: 10,

        fontSize: 16,
        fontWeight: '600',
        color: '#ccc',
    },
    content__button: {
        marginTop: 10,
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
