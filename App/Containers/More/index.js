import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import Wrapper from 'Components/Commons/Wrapper';
import {useAuth} from 'Hooks/API/Auth';
import FImage from 'Components/Commons/FImage';
import {RootState} from 'Store/reduxProvider';
import {useSelector} from 'react-redux';
import {useChangeLang, useListLanguages} from 'Hooks/useLang';
import {useTranslation} from 'react-i18next';
import FList from 'Components/Commons/FList';

export default function More() {
  const {onLogout} = useAuth();
  const {onChangeLang} = useChangeLang();
  const {t} = useTranslation();
  const {listLanguages} = useListLanguages();
  const {lang} = useSelector(state => state.lang);
  const {user} = useSelector(state => state.auth);

  return (
    <Wrapper>
      <View flex px-16 pt-40>
        <View flex-row items-center>
          <View rounded-9999 border-xsss border-primary5 w-80 h-80 mr-16>
            <FImage url="https://i.pravatar.cc/300" radius={9999} />
          </View>
          <Text text-grey10 text-40 font-medium>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>
        <View flex-row justify-between mt-40 px-20>
          <TouchableOpacity
            onPress={onLogout}
            p-16
            bg-primary5
            rounded-xl
            justify-center
            items-center>
            <Text text-base text-white>
              {t('more.logout')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onChangeLang(lang)}
            p-16
            rounded-xl
            bg-primary5
            _key="ADMIN">
            <Text text-base text-white>
              {t('more.change_lang')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Wrapper>
  );
}
