import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMigrate} from 'redux-persist';

export const generatePersistConfig = ({whitelist = [], version = 1}) => {
  const migrations = {
    [version]: state => {
      return state;
    },
  };

  return {
    key: 'root',
    version,
    whitelist: [...whitelist, '_persist'],
    storage: AsyncStorage,
    debug: __DEV__,
    migrate: createMigrate(migrations, {debug: __DEV__}),
  };
};
