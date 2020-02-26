import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { ThemedView, Form, TextArea, TagPicker } from '../../components';
import { UserHelper } from '../../utils';
import { useSelector } from 'react-redux';
import { User } from '../../constants';
import { User as UserService } from '../../services';

const WantTeamScreen = ({ navigation }) => {
    const user = useSelector(state => state.authentication.user);
    const token = useSelector(state => state.authentication.token);

    const [ cause, setCause ] = useState('');
    const [ skills, setSkills ] = useState([]);

    const onSubmitForm = () => {
        UserService.IWantATeamRequest(token, {
            message: cause,
            skills: skills
        }).then(({ code, message, __attributes }) => {
            Alert.alert(
                'Ахтунг!',
                message,
                [
                    {text: 'Ооок!', onPress: () => navigation.goBack()},
                ],
                { cancelable: false }
            )
        });
    };

    return (
        <ThemedView>
            <Form
                header={`Мы приветствуем тебя, ${UserHelper.buildUserName(user)}!`}
                buttonTitle={'Хочу попробовать!'}
                onSubmit={onSubmitForm}
            >
                <TextArea
                    maxLength={500}
                    lineNumbers={12}
                    onChangeText={(text) => setCause(text)}
                    label={'Все кратко ^_^'}
                    description={'Напишите, пожалуйста, нам - почему Вы хотите попасть в нашу команду?'}
                />

                <View style={{ paddingTop: 10 }}/>

                <TagPicker
                    multiple
                    selectedItems={skills}
                    onSelect={(items) => setSkills(items)}
                    tags={Object.values(User.SKILLS)}
                />
            </Form>
        </ThemedView>
    )
};

export default WantTeamScreen;
