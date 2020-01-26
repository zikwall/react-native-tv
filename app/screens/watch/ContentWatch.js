import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    NavigationHeaderTitle,
    ThemedView,
    VideoViewContent,
} from '../../components';
import { getActiveContent } from '../../redux/reducers';

const ContentWatch = ({ navigation, content }) => {
    useEffect(() => {
        console.log('MOUNT CONTENT WATCH');

        return () => {
            console.log('UNMOUNT CONTENT WATCH');
        }
    }, []);

    return (
        <ThemedView>
            <View style={{ height: 200 }}>
                <VideoViewContent content={content} />
            </View>
        </ThemedView>
    );
};

ContentWatch.navigationOptions = ({ navigation }) => {
    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={<NavigationHeaderTitle title={'Watch Content'} />}
            leftComponent={ <NavigationHeaderLeft onHome /> } {...props}
        />
    }
};

const mapStateToProps = state => ({
    content: getActiveContent(state),
});

export default connect(mapStateToProps)(ContentWatch);
