import React, { useState, useEffect } from 'react';
import { Bullets } from '@sarmad1995/react-native-content-loader';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {
    iOSUIKit,
} from 'react-native-typography';

import viewStyles from './styles';
import { Accordion, _renderHeader, _renderContent} from '../../components/collapse';
import { FAQ } from '../../services';

const FaqScreen = () => {
    const [ activeSection, setActiveSection ] = useState([]);
    const [ faqContent, setFaqContent ] = useState(null);

    useEffect(() => {
        async function initFAQ() {
            const faq = await FAQ.getFAQList();

            setFaqContent(faq);
        }

       initFAQ();
    }, []);

    const renderFAQ = () => {
        if (!faqContent) {
            return <Bullets active listSize={20} tWidth={260} tHeight={15}/>;
        }

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Accordion
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
        <View style={viewStyles.screenContainer}>
            <View style={viewStyles.header}>
                <View>
                    <Text style={viewStyles.date}>ИНФОРМАЦИЯ</Text>
                    <Text style={iOSUIKit.largeTitleEmphasized}>Часто задаваемые вопросы</Text>
                </View>
            </View>
            <View>
                <View style={{ margin: 15, paddingBottom: 100 }}>
                    { renderFAQ() }
                </View>
            </View>
        </View>
    );
};

export default FaqScreen;
