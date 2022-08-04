import React from 'react';
import {View} from 'react-native-ui-lib';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useKeyboard} from 'Hooks/useKeyboard';

const BottomWrapper = ({
  disabled = false,
  ignoreKeyboardHeight = false,
  children,
  keyboardShownChilden,
  keyboardHideChilden,
  hideWhenShow = false,
}) => {
  const {bottom: paddingBottom} = useSafeAreaInsets();
  const {isKeyboardShow, keyboardHeight: marginBottom} = useKeyboard();

  if (hideWhenShow && isKeyboardShow) {
    return null;
  }

  return (
    <View
      style={[
        !isKeyboardShow && !disabled && {paddingBottom},
        isKeyboardShow && !ignoreKeyboardHeight && {marginBottom},
      ]}>
      {children}
      {isKeyboardShow ? keyboardShownChilden : keyboardHideChilden}
    </View>
  );
};

export default BottomWrapper;
