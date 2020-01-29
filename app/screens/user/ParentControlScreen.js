import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import {
    TextInput,
    Form,
    ThemedView,
    CellViewSwitch, Heading,
} from '../../components';
import { useDispatch, useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import { changeParentControlMode } from "../../redux/actions";
import { ParentControlService } from '../../services';

const ParentControlScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const dispatch = useDispatch();
    const changeParentControl = useCallback(controlOptions => dispatch(changeParentControlMode(controlOptions)), [ dispatch ]);
    const [ securityKey, setSecurityKey] = useState(null);
    const [ enabledControl, setEnabledControl ] = useState(false);

    const [ success, setSuccess ] = useState({
        has: false,
        text: 'Unexpected text'
    });

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
        attributes: []
    });

    useEffect(() => {
        ParentControlService.getParentControlMode().then((controlOptions) => {
            if (!!controlOptions) {
                setEnabledControl(controlOptions.enabled);
                setSecurityKey(controlOptions.securityKey)
            }
        });
    }, []);

    const handleFormSubmit = async () => {
        const options = {
            enabled: enabledControl,
            securityKey: securityKey
        };

        ParentControlService.setParentControlMode(options).then(() => {
            changeParentControl(options);

            setSuccess({
                has: true,
                text: `Вы успешно ${enabledControl ? 'включили' : 'выключили'} родительский контроль`
            })
        });
    };

    return (
        <ThemedView>
            <Form
                onSubmit={handleFormSubmit}
                header={'Активация родительского контроля'}
                buttonTitle={'Включить защиту'}
                headerColor={theme.primaryColor}
                hasError={error.has}
                hasSuccess={success.has}
                flashText={error.has ? error.error : (success.has ? success.text : '')}
            >
                <Heading styles={{ paddingLeft: 0 }} color={theme.primaryColor} text={'Активно?'} />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch disabled={false} onValueChange={(status) => setEnabledControl(status)} value={enabledControl} />
                </View>
                <TextInput
                    value={securityKey}
                    onChangeText={(key) => setSecurityKey(key)}
                    customErrors={error.attributes}
                    placeholder={'Введите пароль для защиты'}
                    label={'Пароль'}
                    inputname={'parent_control_password'}
                />
            </Form>
        </ThemedView>
    );
};

export default ParentControlScreen;
