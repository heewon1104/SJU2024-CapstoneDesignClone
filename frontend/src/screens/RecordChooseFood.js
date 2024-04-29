import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import {
  Input,
  ErrorMessage,
  Customtext,
  Button,
  FoodRadiobuttonContainer,
  InputButton,
} from '../components';
import { ThemeContext } from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { ScrollView } from 'react-native';
import { FoodContext } from '../contexts';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;
const SubmitContainer = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const GUIDE_TEXT1 = `음식 종류 선택`;
const GUIDE_TEXT2 = `날짜 선택`;
const GUIDE_TEXT3 = `식사 종류 선택`;

const RecordChooseFood = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const { food, setFood } = useContext(FoodContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const data = [
    { key: '1', value: '아침식사' },
    { key: '2', value: '점심식사' },
    { key: '3', value: '저녁식사' },
    { key: '4', value: '간식' },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (day) => {
    const dateString = day.toLocaleDateString(); // 날짜를 'MM/dd/yyyy' 포맷으로 변환
    setFood({ ...food, date: dateString }); // 전역 상태 업데이트
    console.log(dateString); // 디버깅을 위해 로그 출력
    hideDatePicker();
  };

  useEffect(() => {
    console.log(food);
    setDisabled(!(food.type && food.date && food.eattime && !errorMessage));
  }, [food.type, food.date, food.eattime, errorMessage]);

  useEffect(() => {
    let error = '';
    if (!food.type) {
      error = '음식 종류를 선택해주세요';
    } else if (!food.date) {
      error = '날짜를 선택해주세요';
    } else if (!food.eattime) {
      error = '식사 시간을 선택해주세요';
    } else {
      error = '';
    }

    setErrorMessage(error);
  }, [food.type, food.date, food.eattime]);

  const _handleBtnPress = () => {
    console.log(food.type, food.date, food.eattime);
    navigation.navigate('UploadImage');
  };

  return (
    <ScrollView>
      <Container>
        <Customtext text={GUIDE_TEXT1}></Customtext>
        <FoodRadiobuttonContainer
          foodType={food.type}
          setFoodType={(val) => setFood({ ...food, type: val })}
        ></FoodRadiobuttonContainer>
        <Customtext text={GUIDE_TEXT2}></Customtext>
        <InputButton
          title={food.date || '날짜를 선택하세요'}
          onPress={showDatePicker}
        ></InputButton>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Customtext text={GUIDE_TEXT3}></Customtext>
        <SelectList
          setSelected={(val) => setFood({ ...food, eattime: val })}
          data={data}
          save="value"
          search={false}
          placeholder="식사시간을 선택해 주세요"
          boxStyles={{
            width: 300,
            height: 50,
            borderColor: theme.inputBorder,
            alignItems: 'center',
          }}
          dropdownStyles={{ borderColor: theme.inputBorder }}
          maxHeight={120}
        />
        <SubmitContainer>
          <ErrorMessage message={errorMessage}></ErrorMessage>
          <Button
            title="다음"
            onPress={_handleBtnPress}
            disabled={disabled}
          ></Button>
        </SubmitContainer>
      </Container>
    </ScrollView>
  );
};
export default RecordChooseFood;
