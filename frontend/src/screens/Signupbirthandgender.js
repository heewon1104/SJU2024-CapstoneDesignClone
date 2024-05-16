import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import {
  Button,
  Input,
  ErrorMessage,
  Customtext,
  Genderradiobuttoncontiner,
  InputButton,
} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { removeWhitespace } from '../utils';
import { UserContext } from '../contexts';
import DateTimePicker from '@react-native-community/datetimepicker';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;
const GUIDE_TEXT = `생일과 성별을 입력해주세요`;

const Signupbirthandgender = ({ navigation }) => {
  const [birth, setBirth] = useState(new Date(2000, 0, 0));
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [open, setOpen] = useState(false);

  const { user, setUser: updateUserInfo } = useContext(UserContext);

  const toggleUserState = (condition, value) => {
    updateUserInfo({
      [condition]: [value],
    });
  };

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
    toggleUserState('birth', birth);
    toggleUserState('gender', gender);
    navigation.navigate('Signupphysicalinformation');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '날짜를 선택하세요';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Customtext text={GUIDE_TEXT}></Customtext>

        <Customtext text="생년월일" fontSize={14}></Customtext>
        <InputButton
          title={formatDate(birth)}
          onPress={() => setOpen(true)}
        ></InputButton>
        {open && (
          <DateTimePicker
            mode="date"
            value={birth}
            minimumDate={new Date(1900, 0, 1)}
            onChange={(event, date) => {
              if (date) {
                setBirth(date);
                setOpen(false);
              }
            }}
          />
        )}

        <Genderradiobuttoncontiner
          gender={gender}
          setGender={setGender}
        ></Genderradiobuttoncontiner>
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
