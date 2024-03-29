import {useNavigation} from '@react-navigation/native';
import {API} from 'Configs/Constants/API';
import {QUERY_KEY} from 'Configs/Constants/QueryKeys';
import React, {useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import Axios, {setDefaultHeaders} from 'Services/Axios';
import {logout, setAuth, setUser} from 'Store/Reducers/authSlice';
import {store} from 'Store/reduxProvider';
import {useDebouncedCallback} from 'use-debounce';
import Navigator from 'Utils/Navigator';

const fetchAccount = async () => {
  const {data} = await Axios({
    method: 'get',
    url: API.AUTH.ACCOUNT,
  });
  return data.data;
};

export const useAccount = () =>
  useMutation(() => fetchAccount(), {
    onSuccess: data => {
      store.dispatch(setUser(data));
    },
    onError: error => {
      console.log(error);
    },
    mutationKey: [QUERY_KEY.AUTH.ACCOUNT],
  });

export const useLogin = () => {
  const dispatch = useDispatch();
  const {mutateAsync: onGetAccountAsync} = useAccount();

  const {
    mutateAsync: onLoginAsync,
    isLoading: loading,
    isSuccess: success,
  } = useMutation(
    async ({username, password}) => {
      const {data} = await Axios({
        method: 'post',
        url: API.AUTH.LOGIN,
        data: {
          username,
          password,
        },
      });
      return data;
    },
    {
      onSuccess: data => {
        dispatch(
          setAuth({
            ...data,
            isLogged: true,
          }),
        );
        console.log(data);
        setDefaultHeaders({
          Authorization: `Bearer ${data.access_token}`,
        });
        Navigator.reset('TabNavigation');
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  const onLogin = useDebouncedCallback(async account => {
    await onLoginAsync(account);
    await onGetAccountAsync();
  }, 250);

  return {
    onLogin,
    loading,
    success,
  };
};

export const useAuth = () => {
  const dispatch = useDispatch();

  const [account, setAccount] = useState({
    username: '',
    password: '',
  });

  const onSetAccount = (field, value) => {
    setAccount({
      ...account,
      [field]: value,
    });
  };

  const onLogout = () => {
    dispatch(logout());
    Navigator.reset('SignIn');
  };

  return {
    account,
    onSetAccount,
    onLogout,
  };
};
