## Чаsтые ошибки

#### 1. Чистый проект, только что спулил с гитхаба. Ок.

- `npm update`
- Нужно настроить права на директории /android/app/build и для чтения из /android/.gradle
- Прилинковать, что странно [autolink](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) не работает:
    - `react-native link react-native-reanimated`
    - `react-native link react-native-gesture-handler`
    - `react-native link react-native-screens`
    
    - `react-native link react-native-orientation`
    - `react-native link react-native-svg`
- Попробовать `npx jetify`
