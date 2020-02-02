import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { human } from 'react-native-typography';
import ThemedView from './ThemedView';
import ExtendedButton from './Button';
import ErrorMessage from '../flash/ErrorText';
import SuccessText from '../flash/SuccessText';

const Form = ({ children, buttonEnd, buttonTitle, header, onSubmit, headerColor, hasError, hasSuccess, flashText }) => {
    return (
        <ThemedView style={{ margin: 10 }}>
            {
                header && <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[ human.headline, { color: headerColor } ]}>
                        { header }
                    </Text>
                </View>
            }

            {
                (hasError || hasSuccess) && <View style={{ marginTop: 10 }}>
                    <ErrorMessage hasError={hasError} error={flashText} />
                    <SuccessText hasMessage={hasSuccess} message={flashText} />
                </View>
            }

            <View style={{ height: '83%' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    { children }
                </ScrollView>
            </View>

            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                <ExtendedButton onPress={onSubmit} title={buttonTitle}/>
            </View>
        </ThemedView>
    );
};

Form.defaultProps = {
    buttonEnd: true,
    headerColor: '#000'
};

export default Form;
