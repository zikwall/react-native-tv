import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import ChannelBackgroundCard from './ChannelBackgroundCard';
import { iOSUIKit } from 'react-native-typography';
import IconWrap from '../icon/IconWrap';
import Row from '../ui/Row';

const ChannelsLine = ({ title, titlePress, items }) => {
    const theme = useSelector(state => getAppTheme(state));

    const handleTitlePress = () => {
        titlePress(title, items);
    };

    return (
        <View style={{ paddingTop: 10, paddingBottom: 20 }}>
            <TouchableOpacity onPress={handleTitlePress}>
                <Row style={{ alignItems: 'center' }}>
                    <Text style={[ iOSUIKit.title3, { padding: 5, paddingLeft: 15, paddingBottom: 15, fontWeight: '500', color: theme.primaryColor } ]}>
                        { title }
                    </Text>
                    <IconWrap name={'arrow-right'} style={{ padding: 5, paddingRight: 15, paddingBottom: 10 }} size={25} />
                </Row>
            </TouchableOpacity>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row' }}>
                    {
                        items.map((item, i) => {
                            return <ChannelBackgroundCard key={i} type={item.type} name={item.channel} image={item.cover} playlist={item} />
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
};

ChannelsLine.defaultProps = {
    title: 'Unnamed',
    titlePress: () => {},
    items: []
};

export default ChannelsLine;
