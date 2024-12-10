import { Text as RNText, TextProps, StyleSheet } from 'react-native';

export default function Text(props: TextProps) {
  const getDefaultFont = () => {
    const style = StyleSheet.flatten(props.style);
    if (style?.fontWeight === '700' || style?.fontWeight === 'bold') {
      return 'Brother1816Printed700';
    }
    return 'Brother1816Printed';
  };
  return (
    <RNText
      {...props}
      style={[{ fontFamily: getDefaultFont() }, props.style]}
    />
  );
}
