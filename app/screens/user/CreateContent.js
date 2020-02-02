import React, { useState } from 'react';
import {
    TextInput,
    TextArea,
    Form,
    ThemedView,
    PickerInput, Heading, CellViewSwitch,
} from '../../components';
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import {View} from 'react-native';

const CreateContentScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));

    const types = [
        { label: 'Телеканал', value: 10 },
        { label: 'Кино и фильмы', value: 20 },
    ];

    const categories = [

    ];

    const [ inMain, setInMain ] = useState(false);
    const [ name, setName ] = useState(null);
    const [ url, setUrl ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(null);
    const [ desc, setDesc ] = useState(null);
    const [ type, setType ] = useState(null);
    const [ category, setCategory ] = useState(null);

    const [ success, setSuccess ] = useState({
        has: false,
        text: 'Unexpected text'
    });

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
        attributes: []
    });

    const handleFormSubmit = async () => {

    };

    return (
        <ThemedView>
            <Form
                onSubmit={handleFormSubmit}
                header={'Создание нового контента'}
                buttonTitle={'Создать!'}
                headerColor={theme.primaryColor}
                hasError={error.has}
                hasSuccess={success.has}
                flashText={error.has ? error.error : (success.has ? success.text : '')}
            >
                <TextInput
                    value={name}
                    onChangeText={(field) => setName(field)}
                    customErrors={error.attributes}
                    placeholder={'Введите наименование'}
                    label={'Наименование'}
                    inputname={'name'}
                />
                <TextInput
                    value={url}
                    onChangeText={(field) => setUrl(field)}
                    customErrors={error.attributes}
                    placeholder={'Введите ссылку на контент'}
                    label={'Ссылка (url)'}
                    inputname={'url'}
                />
                <TextInput
                    value={imageUrl}
                    onChangeText={(field) => setImageUrl(field)}
                    customErrors={error.attributes}
                    placeholder={'Введите ссылку на картинку'}
                    label={'Ссылка на картинку (url)'}
                    inputname={'image'}
                />
                <PickerInput
                    label={'Тип'}
                    customErrors={error.attributes}
                    inputname={'type'}
                    items={types}
                    selectedValue={type}
                    onSelect={(t) => setType(t)}
                />
                <TextArea
                    lineNumbers={10}
                    value={desc}
                    onChangeText={(field) => setDesc(field)}
                    customErrors={error.attributes}
                    placeholder={'Напишите что-нибудь, пожалуйста...'}
                    label={'Описание'}
                    inputname={'desc'}
                />
                <Heading styles={{ paddingLeft: 0 }} color={theme.primaryColor} text={'Добавить на главную?'} />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch disabled={false} onValueChange={(status) => setInMain(status)} value={inMain} />
                </View>
            </Form>
        </ThemedView>
    );
};

export default CreateContentScreen;
