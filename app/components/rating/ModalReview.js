import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import Ratings from "./Ratings";
import IconWrap from "../icon/IconWrap";
import Row from "../ui/Row";
import ExtendedTextArea from "../ui/TextArea";
import FlatButton from "../ui/FlatButton";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: {
        flex: 2,
        position: 'absolute',
        left: 0,
        top: 0,
    }
});

const ModalReview = ({ size, value, onClose, onOpen, onWrite, visible }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ reviewContent, setReviewContent ] = useState('');

    const close = () => {
        onClose();
    };

    const onCloseHandle = () => {
        close();
    };

    const onOpenHandle = () => {
        onOpen();
    };

    const onWriteHandle = () => {
        onWrite(reviewContent);
        close();
    };

    if (!visible) {
        return null;
    }

    return (
        <View style={[styles.overlay, {
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
        }]}>
            <View style={[
                {
                    width: width - 10,
                    height: 350,
                    zIndex: 2,
                    backgroundColor: theme.primaryBackgroundColor,
                    borderRadius: 10,
                    borderColor: theme.primaryColor,
                    borderWidth: 1,
                    padding: 15,
                }
            ]}>
                <Row>
                    <Ratings size={25} full value={value} disabled />
                    <TouchableOpacity onPress={onCloseHandle}>
                        <IconWrap name={'x'} size={25} />
                    </TouchableOpacity>
                </Row>
                <View style={{ paddingTop: 15 }}>
                    <ExtendedTextArea
                        onChangeText={text => setReviewContent(text)}
                        lineNumbers={10}
                        maxLength={500}
                    />
                    <FlatButton
                        text={'Оставить отзыв!'}
                        backgroundColor={theme.secondaryBackgroundColor}
                        style={{ borderRadius: 5, padding: 10 }}
                        onPress={onWriteHandle}
                    />
                </View>
            </View>
            <Animated.View style={[styles.overlay, {
                zIndex: 1,
                width: width,
                height: height,
                opacity: 0.9,
                backgroundColor: theme.primaryBackgroundColor,
            }]}/>
        </View>
    )
};

ModalReview.defaultProps = {
    value: 0,
    visible: false
};

export default ModalReview;
