import React, { useState } from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from "@react-native-firebase/admob";

const AdmobBanner = () => {
    const [ adOk, setAdOk ] = useState(true);

    if (!adOk) {
        return null;
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
            <BannerAd
                unitId={'ca-app-pub-3049855368077051/1739765306'}
                size={BannerAdSize.BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
                onAdLoaded={() => {
                    console.log('Advert loaded');
                }}
                onAdFailedToLoad={(error) => {
                    console.log('Advert failed to load: ', error);
                    setAdOk(false);
                }}
            />
        </View>
    );
};

export default AdmobBanner;
