import { Colors } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  LayoutChangeEvent,
} from 'react-native';

type FormWrapperProps = {
  children: React.ReactNode;
  footer: React.ReactNode;
  buttonStyle?: Record<string, unknown>;
  contentContainerStyle?: Record<string, unknown>;
};

const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  footer,
  buttonStyle,
  contentContainerStyle,
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const [isFooterAbsolute, setIsFooterAbsolute] = useState(false);
  const { height: windowHeight } = useWindowDimensions();

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  //decide if footer should be absolute or relative
  useEffect(() => {
    if (contentHeight < windowHeight * 0.7) {
      setIsFooterAbsolute(true);
    } else {
      setIsFooterAbsolute(false);
    }
  }, [contentHeight, windowHeight]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.contentContainerStyle,
        contentContainerStyle && contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View onLayout={handleContentLayout}>{children}</View>

      <View
        style={[
          isFooterAbsolute
            ? styles.footerContainerAbsolute
            : styles.footerContainerRelative,
          buttonStyle && buttonStyle,
        ]}
      >
        {footer}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  footerContainerRelative: {
    marginVertical: 10,
  },
  footerContainerAbsolute: {
    position: 'absolute',
    bottom: '6%',
    right: '4%',
    width: '100%',
  },
  contentContainerStyle: {
    flexGrow: 1,
    padding: 15,
    paddingTop: 40,
    backgroundColor: Colors.light.white,
    paddingVertical: '7.5%',
  },
});

export default FormWrapper;
