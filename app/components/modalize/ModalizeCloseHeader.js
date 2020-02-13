import React from 'react';
import { TouchableOpacity } from 'react-native';
import IconWrap from '../icon/IconWrap';

const ModalizeCloseHeader = ({ onClose }) => (
    <TouchableOpacity
        style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 3,
            alignItems: 'center',
            justifyContent: 'center',
            width: 25,
            height: 25,
        }}
        activeOpacity={0.8}
        onPress={onClose}
    >
        <IconWrap name={'x-square'} size={25} />
    </TouchableOpacity>
);

export default ModalizeCloseHeader;
