import React, { useRef, useEffect } from 'react';
import { TouchableOpacity } from "react-native";

const DoubleTap = ({ children, delay, style, onTap, onDoubleTap }) => {
    const Timer = useRef(false);
    const FirstPress = useRef(true);
    const LastTime = useRef(new Date());

    useEffect(() => {
        return () => {
            Timer.current && clearTimeout(Timer.current);
        }
    }, []);

    const _onTap = () => {
        let now = new Date().getTime();

        if (FirstPress.current) {
            FirstPress.current = false;

            Timer.current = setTimeout(() => {
                onTap();

                FirstPress.current = true;
                Timer.current = false;
            }, delay);

            LastTime.current = now;
        } else {
            if (now - LastTime.current < delay) {
                Timer.current && clearTimeout(Timer.current);

                onDoubleTap();
                FirstPress.current = true;
            }
        }
    };

    return (
        <TouchableOpacity onPress={_onTap} activeOpacity={1} style={style}>
            { children }
        </TouchableOpacity>
    );
};

DoubleTap.defaultProps = {
    delay: 150,
    style: {},
    onTap: () => {},
    onDoubleTap: () => {}
};

export default DoubleTap;
