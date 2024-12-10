/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    background: '#FFF',
    vitalGreen: '#C2DE4C',
    lightGreen: '#AFC944',
    mediumGreen: '#899E33',
    darkGreen: '#687729',
    attentionRed: '#FC6060', // #FF6347
    darkGray: '#3B3B3B', // '#333'
    mediumGray: '#A0A0A0', // '#A3A3A3'
    lightGray: '#E0E0E0', // '#F2F2F2'
    black: '#000',
    white: '#FFF',
  },
  dark: {
    text: '#11181C',
    background: '#11181C',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
