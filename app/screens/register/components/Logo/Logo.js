import React from "react";
import PropTypes from "prop-types";
import {Image, Text, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import styles from "./Logo.style";

const Logo = props => {
    const { logoText, logoComponent } = props;
    return (
        <View style={styles.container}>
            {logoComponent || (
                <View style={styles.row}>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ resizeMode: 'contain', height: 250, width: 250, marginTop: 65 }} source={ require('../../../../assets/images/PlayHubFullCommunity.png') }/>
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
