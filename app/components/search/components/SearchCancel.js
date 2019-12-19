import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import styles from "./styles/SearchCancel.style";

export default class SearchCancel extends React.PureComponent {
  renderIcon(props) {
    const {
      onPressCancel,
      cancelIconName,
      cancelIconType,
      cancelIconSize,
      cancelIconColor,
      cancelIconComponent,
      cancelButtonDisable
    } = props;

    return (
      !cancelButtonDisable && (
        <TouchableOpacity onPress={onPressCancel} style={styles.iconContainer}>
          {cancelIconComponent || (
            <Icon
              name={cancelIconName || "x"}
              type={cancelIconType || "MaterialIcons"}
              size={cancelIconSize || 23}
              color={cancelIconColor || "#b3b6c3"}
            />
          )}
        </TouchableOpacity>
      )
    );
  }

  render() {
    const { cancelComponent, cancelVisible } = this.props;

    if (!cancelVisible) {
      return null;
    }

    return cancelComponent || this.renderIcon(this.props);
  }
}
