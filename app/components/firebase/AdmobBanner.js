import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from "@react-native-firebase/admob";

const AdmobBanner = () => {
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
                    console.error('Advert failed to load: ', error);
                }}
            />
        </View>
    );
};

export default AdmobBanner;
