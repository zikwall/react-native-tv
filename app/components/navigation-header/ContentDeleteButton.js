import React from 'react';
import FlatButton from '../ui/FlatButton';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { ContentService } from '../../services';

const ContentDeleteButton = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const token = useSelector(state => state.authentication.token);

    const { contentId } = navigation.state.params;

    const onFail = navigation.getParam('onFail');
    const onDelete = navigation.getParam('onDelete');

    const onDeletePress = () => {
        ContentService.deleteContent(token, contentId).then(({ code, message }) => {
            if (code === 200) {
                if (typeof onDelete === 'function') {
                    onDelete(contentId, code, message);
                }

                navigation.goBack();
            } else {
                if (typeof onFail === 'function') {
                    onFail(contentId, code, message);
                }
            }
        });
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <FlatButton
                text={'Удалить'}
                color={'tomato'}
                backgroundColor={theme.secondaryBackgroundColor}
                style={{ borderRadius: 5 }}
                onPress={() => onDeletePress(contentId)}
            />
        </View>
    )
};

export default withNavigation(ContentDeleteButton);
