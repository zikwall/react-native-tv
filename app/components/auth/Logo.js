import React from "react";
import PropTypes from "prop-types";
import {Image, Dimensions, View} from "react-native";
import styles from "./Logo.style";

const {height, width} = Dimensions.get('window');

const Logo = props => {
    const { logoText, logoComponent } = props;
    return (
        <View style={styles.container}>
            {logoComponent || (
                <View style={styles.row}>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ resizeMode: 'contain', height: height * 0.3, width: height * 0.3, marginTop: height * 0.1 }} source={ require('../../assets/images/PlayHubFullCommunity.png') }/>
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
