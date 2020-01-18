import React, { useState, useEffect } from 'react';
import { Bullets } from '@sarmad1995/react-native-content-loader';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { iOSUIKit} from 'react-native-typography';

import viewStyles from './styles';
import { Accordion, _renderHeader, _renderContent} from '../../components/collapse';
import { FAQ } from '../../services';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import {NavigationHeaderLeft, NavigationHeaderTitle} from '../../components';

const {height, width} = Dimensions.get('window');

const FaqScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ activeSection, setActiveSection ] = useState([]);
    const [ faqContent, setFaqContent ] = useState(null);

    useEffect(() => {
        navigation.setParams({ backgroundColor: theme.primaryBackgroundColor });
    }, [ theme ]);

    useEffect(() => {
        async function initFAQ() {
            const faq = await FAQ.getFAQList();

            setFaqContent(faq);
        }

       initFAQ();
    }, []);

    const renderFAQ = (color) => {
        if (!faqContent) {
            return <Bullets active listSize={20} tWidth={width * 0.8} tHeight={15}/>;
        }

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Accordion
                    color={color}
                    activeSections={activeSection}
                    sections={faqContent}
                    touchableComponent={TouchableOpacity}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    duration={400}
                    onChange={setSections}
                />
            </ScrollView>
        );
    };

    const setSections = (sections) => {
        setActiveSection(
            sections.includes(undefined) ? [] : sections,
        );
    };

    return (
        <View style={[ viewStyles.screenContainer, { backgroundColor: theme.primaryBackgroundColor }]}>
            <View style={viewStyles.header}>
                <View>
                    <Text style={viewStyles.date}>ИНФОРМАЦИЯ</Text>
                    <Text style={[ iOSUIKit.largeTitleEmphasized, { color: theme.primaryColor }]}>Часто задаваемые вопросы</Text>
                </View>
            </View>
            <View>
                <View style={{ margin: 15, paddingBottom: 100 }}>
                    { renderFAQ(theme.primaryColor) }
                </View>
            </View>
        </View>
    );
};

FaqScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { backgroundColor: navigation.getParam('backgroundColor')},
        headerTitle: () => (
            <NavigationHeaderTitle title={'FAQ'} />
        ),
        headerLeft: () => (
            <NavigationHeaderLeft />
        )
    }
};

export default FaqScreen;
