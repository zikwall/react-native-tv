import React, { useState } from 'react';
import {
    TextInput,
    TextArea,
    Form,
    ThemedView,
    Heading,
    CellViewSwitch,
    TagPicker,
} from '../../components';
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import { View } from 'react-native';
import {Content, Players} from '../../constants';
import { Validator } from '../../utils';
import { ContentService } from '../../services';

const CreateContentScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const user = useSelector(state => state.authentication.user);
    const token = useSelector(state => state.authentication.token);

    const [ inMain, setInMain ] = useState(false);
    const [ name, setName ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ imageUrl, setImageUrl ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ adUrl, setAdUrl ] = useState('');
    const [ type, setType ] = useState([]);
    const [ category, setCategory ] = useState([]);
    const [ pinned, setPinned ] = useState(null);
    const [ isArchive, setIsArchive ] = useState(false);
    const [ isActive, setIsActive ] = useState(true);
    const [ useOwnPlayer, setUseOwnPlayer ] = useState(false);
    const [ ownPlayerUrl, setOwnPlayerUrl ] = useState('');
    const [ isAge18, setIsAge18 ] = useState(false);
    const [ useOrigin, setUseOrigin ] = useState(true);
    const [ visibility, setVisibility ] = useState([Content.VISIBILITY.PUBLIC]);
    const [ defaultPlayer, setDefaultPlayer ] = useState([Players.NATIVE_PLAYER]);

    const { __onCreateContent } = navigation.state.params;

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

    const handleFormSubmit = async () => {
        if (inMain && !user.is_official) {
            markAsError('Вы не являетесь оффициальным представителем и не можете добавлять контент на главную страницу!', ['in_main']);
            return true;
        }

        if (!name || name.length > 30) {
            markAsError('Наименование не может быть пустым и длинее 30 символов.', ['name']);
            return true;
        }

        if (!url || url.length > 250) {
            markAsError('Ссылка на вещание не может быть пустым и длинее 250 символов.', ['url']);
            return true;
        }


        if (url && (!url.match( /([a-zA-Z0-9\s_\\.\-\(\):])+(.m3u|.m3u8)$/i ) || !Validator.isValidURL(url))) {
            markAsError('Некорректная ссылка на вещание.', ['url']);
            return true;
        }

        if (imageUrl) {
            if (imageUrl.length > 500) {
                markAsError('Ссылка на изображение не может быть пустым и длинее 500 символов.', ['image']);
                return true;
            }

            if (!Validator.isValidURL(imageUrl)) {
                markAsError('Некорректная ссылка на изображение', ['image']);
                return true;
            }
        }

        if (adUrl) {
            if (adUrl.length > 500) {
                markAsError('Ссылка на изображение не может быть пустым и длинее 500 символов.', ['ad_url']);
                return true;
            }

            if (!Validator.isValidURL(adUrl)) {
                markAsError('Некорректная ссылка на рекламу', ['ad_url']);
                return true;
            }
        }

        if (useOwnPlayer || ownPlayerUrl) {
            if (useOwnPlayer && ownPlayerUrl.length === 0) {
                markAsError('Вы установлили флаг "Использовать свой плеер", но не указали ссылку на плеер.', ['own_player_url']);
                return true;
            }

            if (ownPlayerUrl.length > 500) {
                markAsError('Ссылка на плеер не может быть длинее 500 символов.', ['own_player_url']);
                return true;
            }

            if (!Validator.isValidURL(ownPlayerUrl)) {
                markAsError('Некорректная ссылка на свой плеер', ['own_player_url']);
                return true;
            }
        }

        if (!!desc) {
            if (desc.length > 1000) {
                markAsError('Описание не может быть длинее 1000 символов.', ['desc']);
                return true;
            }
        }

        if (type.length === 0) {
            markAsError('Пожалуйста, выберите тип контента.', ['type']);
            return true;
        }

        if (category.length === 0) {
            markAsError('Пожалуйста, выберите категорию.', ['category']);
            return true;
        }

        const fields = {
            name: name,
            url: url,
            image_url: imageUrl,
            ad_url: adUrl,
            type: type[0],
            desc: desc,
            category: category[0],
            in_main: inMain,
            is_pinned: pinned,
            is_archive: isArchive,
            is_active: isActive,
            use_own_player: useOwnPlayer,
            own_player_url: ownPlayerUrl,
            is_18_years_old: isAge18,
            use_origin: !!useOrigin ? 1 : 0,
            visibility: visibility[0],
            default_player: defaultPlayer[0]
        };

        ContentService.createContent(fields, token).then((response) => {
            if (response.code === 200) {
                markAsSuccess(response.response);

                if (typeof __onCreateContent === 'function') {
                    // todo
                    __onCreateContent({
                        ...fields,
                        id: response.new_content.id,
                        image: fields.image_url,
                        age_limit: fields.is_18_years_old
                    });
                }

                return true;
            }

            markAsError(response.response, response.attributes);
        });
    };

    return (
        <ThemedView>
            <Form
                onSubmit={handleFormSubmit}
                header={'Создание нового контента'}
                buttonTitle={'Давай, давай. создавай быстрее!'}
                headerColor={theme.primaryColor}
                hasError={error.has}
                hasSuccess={success.has}
                flashText={error.has ? error.error : (success.has ? success.text : '')}
            >
                <TextInput
                    maxLength={30}
                    description={'Решать Вам, как люди будут видеть Ваш контент, больше некому.'}
                    value={name}
                    onChangeText={(field) => setName(field)}
                    customErrors={error.attributes}
                    placeholder={'Введите наименование'}
                    label={'Наименование'}
                    inputname={'name'}
                />
                <TextInput
                    maxLength={250}
                    description={'Плиз, ставьте сюда ссылку непосредственно на само вещание или поток или видео файл!'}
                    value={url}
                    onChangeText={(field) => setUrl(field)}
                    customErrors={error.attributes}
                    placeholder={'Введите ссылку на контент'}
                    label={'Ссылка (url)'}
                    inputname={'url'}
                />
                <TextInput
                    maxLength={500}
                    description={'Да, да, да, пока что нет возможности загружать картинки на сервер, поймите и простите, мы исправимся!'}
                    value={imageUrl}
                    onChangeText={(field) => setImageUrl(field)}
                    customErrors={error.attributes}
                    placeholder={'Введите ссылку на картинку'}
                    label={'Ссылка на картинку (url)'}
                    inputname={'image'}
                />
                <TextInput
                    maxLength={500}
                    description={'Вааах'}
                    value={adUrl}
                    onChangeText={(field) => setAdUrl(field)}
                    customErrors={error.attributes}
                    placeholder={'Введите ссылку на рекламу VPAID, VAST'}
                    label={'Ууу вкусняшки пошли! Ссылка на рекламу (url)'}
                    inputname={'ad_url'}
                />
                <TagPicker
                    headingColor={error.attributes.includes('type') ? 'red' : theme.primaryColor}
                    selectedItems={type}
                    onSelect={(items) => {
                        setType(items);
                    }}
                    label={'Тип'}
                    multiple={false}
                    tags={Object.values(Content.TYPES)}
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
                <TagPicker
                    headingColor={error.attributes.includes('category') ? 'red' : theme.primaryColor}
                    selectedItems={category}
                    onSelect={(items) => {
                        setCategory(items);
                    }}
                    label={'Категория'}
                    multiple={false}
                    tags={Object.values(Content.CATEGORIES)}
                />

                <TagPicker
                    headingColor={error.attributes.includes('visibility') ? 'red' : theme.primaryColor}
                    selectedItems={visibility}
                    onSelect={(items) => {
                        setVisibility(items);
                    }}
                    label={'Видимость'}
                    multiple={false}
                    tags={Object.values(Content.VISIBILITY_MAP)}
                />

                <TagPicker
                    headingColor={error.attributes.includes('default_player') ? 'red' : theme.primaryColor}
                    selectedItems={defaultPlayer}
                    onSelect={(items) => {
                        setDefaultPlayer(items);
                    }}
                    label={'Плеер по умолчанию'}
                    multiple={false}
                    tags={Object.values(Players.PLAYERS_MAP)}
                />

                <Heading styles={{ paddingLeft: 0, justifyContent: 'center' }} color={theme.primaryColor} text={'Ой сколько галочек, без паники!'} />

                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={error.attributes.includes('in_main') ? 'red' : theme.primaryColor}
                    text={'Добавить на главную?'}
                    description={'Не радуйся так легко туда попасть! Для начала ты должен стать оффициальным представителеем, а потмо уже посмотрим на Твое поведени ^_^'}
                />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch
                        disabled={user.is_official !== 1}
                        onValueChange={(status) => setInMain(status)}
                        value={inMain}
                    />
                </View>

                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={theme.primaryColor}
                    text={'Закрепить на Вашей стене?'}
                    description={'Его можно будет найти сразу на стене, ссамый вверх скролящиеся квадратики, видно? Хорошо. Пользователи первым делом увидят этот контент.'}
                />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch
                        disabled={false}
                        onValueChange={(status) => setPinned(status)}
                        value={pinned}
                    />
                </View>

                <Heading styles={{ paddingLeft: 0 }} color={theme.primaryColor} text={'Сразу в архив, серьезно?'} />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch
                        disabled={false}
                        onValueChange={(status) => setIsArchive(status)}
                        value={isArchive}
                    />
                </View>

                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={theme.primaryColor}
                    text={'Активно или нет, атвечай!?'}
                    description={'Если Вы решите не активировать, то данный контент не будет виден пользователям.'}
                />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch
                        disabled={false}
                        onValueChange={(status) => setIsActive(status)}
                        value={isActive}
                    />
                </View>

                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={theme.primaryColor}
                    text={'Возможность использовать нативный плеер'}
                    description={'Дает пользователям возможность смотреть контент в нативном плеере.'}
                />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch
                        disabled={false}
                        onValueChange={(status) => setUseOrigin(status)}
                        value={useOrigin}
                    />
                </View>

                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={error.attributes.includes('own_player_url') ? 'red' : theme.primaryColor} text={'Использовать свой плеер?'}
                    description={'Что это и с чем его есть? Понимаю. Крч есть возможность добавить полностью свой плеер и включть его, тогда всегда будет отображаться Ваш плеер не зависимо от выбора пользователя.'}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        maxLength={500}
                        inputStyles={{ flex: 1, marginRight: 10 }}
                        value={ownPlayerUrl}
                        onChangeText={(field) => setOwnPlayerUrl(field)}
                        customErrors={error.attributes}
                        placeholder={'Введите ссылку на свой плеер'}
                        inputname={'own_player_url'}
                    />
                    <View style={{ alignItems: 'flex-start' }}>
                        <CellViewSwitch
                            disabled={false}
                            onValueChange={(status) => setUseOwnPlayer(status)}
                            value={useOwnPlayer}
                        />
                    </View>
                </View>

                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={theme.primaryColor}
                    text={'Контент для лиц старше 18 лет'}
                    description={'Пожалуйста, соблюдайте правила размещения контента.'}
                />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch
                        disabled={false}
                        onValueChange={(status) => setIsAge18(status)}
                        value={isAge18}
                    />
                </View>

                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={theme.primaryColor} text={'Минутка принятия решений'}
                    description={'Нажимая на кнопку создания контента "Давай, давай. создавай быстрее!" Вы соглашаетесь с правилами публикациями контента и сервиса. Данную информацию можно легко найти в меню.'}
                />
            </Form>
        </ThemedView>
    );
};

export default CreateContentScreen;
