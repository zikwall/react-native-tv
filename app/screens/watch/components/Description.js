import React from 'react';
import {Heading, Row, Tag} from '../../../components';
import {ScrollView, Text, View} from 'react-native';
import { human } from 'react-native-typography';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../../redux/reducers';

const Description = ({ description, tags }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View>
            <Heading color={theme.primaryColor} text={'Описание'} />
            <Text style={[ human.caption1, { paddingLeft: 15, paddingRight: 15, paddingTop: 0, color: theme.primaryColor } ]}>
                { description }
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Row style={{ paddingLeft: 15, paddingTop: 14 }}>
                    {
                        tags && tags.map((tag, index) => {
                            return <Tag key={index} label={tag.label} id={tag.id} />
                        })
                    }
                </Row>
            </ScrollView>
        </View>
    )
};

export default Description;
