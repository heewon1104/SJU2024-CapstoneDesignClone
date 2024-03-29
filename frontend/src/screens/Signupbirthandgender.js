import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import {
  Button,
  Input,
  ErrorMessage,
  Customtext,
  Customcardbutton,
} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../utils';
import BoyImage from '../../assets/components/boyImage.png';
import GirlImage from '../../assets/components/girlImage.png';
import { Image, StyleSheet } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;

const Cardcontainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px 10px;
`;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const GUIDE_TEXT = `생일과 성별을 입력해주세요`;

const Signupbirthandgender = ({ navigation }) => {
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(birth && gender && !errorMessage));
  }, [birth, gender, errorMessage]);

  useEffect(() => {
    let error = '';
    if (!birth) {
      error = '생년월일을 입력해주세요';
    } else if (!gender) {
      error = '성별을 선택해주세요';
    } else {
      error = '';
    }

    setErrorMessage(error);
  }, [birth, gender]);

  const _handleSignupBtnPress = () => {
    console.log('Sign up logic');
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Customtext text={GUIDE_TEXT}></Customtext>
        <Input
          label="생년월일"
          placeholder="Birth"
          returnKeyType="next"
          value={birth}
          onChangeText={setBirth}
          onBlur={() => setBirth(removeWhitespace(birth))}
          maxLength={8}
        ></Input>
        <Cardcontainer>
          <Customcardbutton
            onPress={() => setGender('man')}
            url={BoyImage}
            title="남자"
          ></Customcardbutton>
          <Customcardbutton
            onPress={() => setGender('woman')}
            url={GirlImage}
            title="여자"
          ></Customcardbutton>
        </Cardcontainer>
        <ErrorMessage message={errorMessage}></ErrorMessage>
        <Button
          title="다음"
          onPress={_handleSignupBtnPress}
          disabled={disabled}
        ></Button>
      </Container>
    </KeyboardAwareScrollView>
  );
};
export default Signupbirthandgender;
