import {CommonActions} from '@react-navigation/native';
import {createRef, MutableRefObject} from 'react';

export const navigationRef = createRef();

const setContainer = container => {
  navigationRef.current = container;
};

const reset = (name, params, key) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name, params, key}],
    }),
  );
};

const Navigator = {
  setContainer,
  reset,
};

export default Navigator;
