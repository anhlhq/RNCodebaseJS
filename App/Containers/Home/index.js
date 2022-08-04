import React from 'react';
import Wrapper from 'Components/Commons/Wrapper';
import {TouchableOpacity, View, Text} from 'react-native-ui-lib';

export default function Home() {
  return (
    <Wrapper>
      <TouchableOpacity h-80 w-156>
        <Text text-primary5>Home</Text>
      </TouchableOpacity>
      <View h-80 w-156>
        <Text>Home</Text>
      </View>
      <TouchableOpacity>
        <Text>Home</Text>
      </TouchableOpacity>
    </Wrapper>
  );
}
