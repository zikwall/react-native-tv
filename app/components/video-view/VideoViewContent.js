import React from 'react';
import PureVideoWebView from './PureVideoWebView';

const VideoViewContent = ({ content }) => {
    if (!content) {
        return null;
    }

    return (
        <PureVideoWebView source={content.url} />
    );
};

VideoViewContent.defaultProps = {
    content: null,
};

export default VideoViewContent;
