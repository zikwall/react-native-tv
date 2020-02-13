import React from 'react';
import { Modalize } from 'react-native-modalize';
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";

const ModalizeWrapper = ({ children, referal, adjustToContentHeight, snapPoint, HeaderComponent, closeOnOverlayTap, keyboardAvoidingOffset, scrollViewProps, ...props }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <Modalize
            {...props}
            modalStyle={{ backgroundColor: theme.primaryBackgroundColor }}
            handleStyle={{ backgroundColor: theme.primaryColor }}
            ref={referal}
            adjustToContentHeight={adjustToContentHeight}
            HeaderComponent={HeaderComponent}
            snapPoint={snapPoint}
            closeOnOverlayTap={closeOnOverlayTap}
            keyboardAvoidingOffset={keyboardAvoidingOffset}
            scrollViewProps={scrollViewProps}
        >
            { children }
        </Modalize>
    )
};

export default ModalizeWrapper;
