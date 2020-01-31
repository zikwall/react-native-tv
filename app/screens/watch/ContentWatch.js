import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import {
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    NavigationHeaderTitle,
    ThemedView,
    VideoViewContent,
    Row, IconWrap, Heading, Avatar, Tag, UserLineItem
} from '../../components';
import { getActiveContent, getAppTheme } from '../../redux/reducers';
import { human } from "react-native-typography";

const ContentWatch = ({ navigation, content }) => {
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
        navigation.setParams({'title': content.name, image: content.image });

        return () => {
            console.log('UNMOUNT CONTENT WATCH');
        }
    }, []);

    return (
        <ThemedView>
            <View style={{ height: 200, backgroundColor: '#000' }}>
                <VideoViewContent content={content} />
            </View>
            <Row style={{ padding: 10, alignItems: 'center' }}>
                <View>
                    <Text style={[human.callout, { color: theme.primaryColor }]}>
                        Опубликовал
                    </Text>
                    <Text style={{ color: theme.secondaryColor }}>
                        zikwall
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <IconWrap name={'heart'} size={25} />
                    <View style={{ marginLeft: 15, marginRight: 15, borderLeftWidth: 1, borderLeftColor: theme.primaryColor }} />
                    <IconWrap name={'save'} size={25} />
                    <View style={{ marginLeft: 15, marginRight: 15, borderLeftWidth: 1, borderLeftColor: theme.primaryColor }} />
                    <IconWrap name={'triangle'} size={25} />
                </View>
            </Row>
            <ScrollView>
                <View>
                    <Heading color={theme.primaryColor} text={'Описание'} />
                    <Text style={[ human.caption1, { paddingLeft: 15, paddingRight: 15, paddingTop: 0 } ]}>
                        Описание контента! Описание контента! Описание контента!
                        Описание контента!
                        Описание контента! Описание контента! Описание контента!
                    </Text>
                </View>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Row style={{ paddingLeft: 15, paddingTop: 14 }}>
                            <Tag label={'Социальные'} id={10} />
                            <Tag label={'Выбор редакции'} id={20} />
                            <Tag label={'Топ бесплатных'} id={20} />
                        </Row>
                    </ScrollView>
                    <Heading style={{ padding: 0 }} color={theme.primaryColor} text={'Оценить конент'} />
                    <Row style={{ paddingHorizontal: 15 }}>
                        <IconWrap name={'star'} size={25} />
                        <IconWrap name={'star'} size={25} />
                        <IconWrap name={'star'} size={25} />
                        <IconWrap name={'star'} size={25} />
                        <IconWrap name={'star'} size={25} />
                    </Row>
                </View>
                <View style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <UserLineItem name={'AndreyKa'} username={'zikwall'} />
                        <Text style={[ human.caption1, { paddingTop: 5, paddingLeft: 15, paddingRight: 15 } ]}>
                            Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв!
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <UserLineItem name={'AndreyKa 2'} username={'zikwall'} />
                        <Text style={[ human.caption1, { paddingTop: 5, paddingLeft: 15, paddingRight: 15 } ]}>
                            Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв!
                            Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв!
                            Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв!
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <UserLineItem name={'AndreyKa 3'} username={'zikwall'} />
                        <Text style={[ human.caption1, { paddingTop: 5, paddingLeft: 15, paddingRight: 15 } ]}>
                            Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв! Отзыв!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </ThemedView>
    );
};

ContentWatch.navigationOptions = ({ navigation }) => {
    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={
                <>
                    <View style={{ marginRight: 10 }}>
                        <Avatar src={{ uri: navigation.getParam('image') }} size={ 40 } resizeMode="contain" />
                    </View>
                    <NavigationHeaderTitle title={navigation.getParam('title')} />
                </>
            }
            leftComponent={ <NavigationHeaderLeft onHome /> } {...props}
            rightComponent={<IconWrap name={'frown'} size={25} style={{ paddingHorizontal: 15  }} />}
        />
    }
};

const mapStateToProps = state => ({
    content: getActiveContent(state),
});

export default connect(mapStateToProps)(ContentWatch);
