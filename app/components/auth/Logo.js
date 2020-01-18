import React from "react";
import PropTypes from "prop-types";
import { Image, Dimensions, View } from "react-native";
import styles from "./Logo.style";
import { useSelector} from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const { height } = Dimensions.get('window');

const Logo = props => {
    const theme = useSelector(state => getAppTheme(state));
    const { logoText, logoComponent } = props;
    return (
        <View style={styles.container}>
            {logoComponent || (
                <View style={styles.row}>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ resizeMode: 'contain', height: height * 0.3, width: height * 0.3, marginTop: height * 0.1 }} source={theme.playHubCommunity} />
                    </View>
                </View>
            )}
        </View>
    );
};

Logo.propTypes = {
    logoText: PropTypes.string
};

Logo.defaultProps = {
    logoText: "GITHUB"
};

export default Logo;
