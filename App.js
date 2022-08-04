import {View, Text} from 'react-native-ui-lib';
import React from 'react';
import 'Configs/index';
import {Provider} from 'react-redux';
import {store, persistor} from 'Store/reduxProvider';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClientProvider} from 'react-query';
import queryClient from 'Services/QueryClient';
import RNBootSplash from 'react-native-bootsplash';
import AppNavigation from 'Navigations/AppNavigation';
import {setDefaultHeaders} from 'Services/Axios';
export default function App() {
  const Loading = () => <View></View>;

  const restoreToken = async () => {
    const {auth} = await store.getState().auth;
    if (auth.isLogged) {
      setDefaultHeaders({
        Authorization: `${auth.type} ${auth.token}`,
      });
    }
  };

  const onBeforeLift = () => {
    restoreToken();
    RNBootSplash.hide();
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate
          persistor={persistor}
          loading={<Loading />}
          onBeforeLift={onBeforeLift}>
          <AppNavigation />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}
