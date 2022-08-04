import {StyleSheet} from 'react-native';
import {ThemeManager} from 'react-native-ui-lib';
import {commonViewProps} from './Common';

ThemeManager.setComponentTheme(
  'TouchableOpacity',
  ({customStyle, ...props}) => {
    return {
      style: StyleSheet.flatten([
        {
          ...commonViewProps(props)?.style,
        },
        customStyle,
      ]),
    };
  },
);
