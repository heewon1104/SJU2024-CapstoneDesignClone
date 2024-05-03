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
    { key: '1', value: '아침식사', title: 'BREAKFAST' },
    { key: '2', value: '점심식사', title: 'LUNCH' },
    { key: '3', value: '저녁식사', title: 'DINNER' },
    { key: '4', value: '간식', title: 'SNACK' },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (day) => {
    const dateString = day.toISOString();
    setFood({ ...food, date: dateString }); // 전역 상태 업데이트
    console.log(dateString); // 디버깅을 위해 로그 출력
    hideDatePicker();
  };

  const onSelectedChange = (val) => {
    // data 배열에서 선택된 value에 해당하는 title을 찾습니다.
    const selectedTitle = data.find((item) => item.value === val)?.title;
    // 찾은 title을 전역 상태에 설정합니다.
    setFood({ ...food, eattime: selectedTitle });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '날짜를 선택하세요';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일  ${hours}시 ${minutes}분`;
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
          title={formatDate(food.date)}
          onPress={showDatePicker}
        ></InputButton>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Customtext text={GUIDE_TEXT3}></Customtext>
        <SelectList
          setSelected={onSelectedChange}
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
