import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button, Customtext, LoadingModal } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserContext } from '../contexts';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { diseasesData, diseaseTranslation } from '../data/diseasesData';
import { IP_ADDRESS } from '../secret/env';
import { ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';

const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
  width: 100%;
`;

const MultipleSelectListContainer = styled.View`
  margin: 10px 0px;
`;

const GUIDE_TEXT = `가지고 있는 
건강고민을 선택해주세요`;

const Signupdiseases = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width - 50;

  const [selectedCardio, setSelectedCardio] = useState([]);
  const [selectedDigestive, setSelectedDigestive] = useState([]);
  const [selectedKidney_disease, setSelectedKidney_disease] = useState([]);
  const [selectedNervous_system, setSelectedNervous_system] = useState([]);
  const [selectedCancer, setSelectedCancer] = useState([]);
  const [selectedAllergy, setSelectedAllergy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser: updateUserInfo } = useContext(UserContext);

  const compileDiseaseInfo = (selectedDiseases) => {
    return selectedDiseases
      .map((disease) => diseaseTranslation[disease] || '')
      .filter((title) => title !== '')
      .join(', ');
  };

  const toggleUserState = (category, diseases) => {
    const updatedCategoryItems = diseasesData[category].map((item) => {
      if (diseases.includes(item.value)) {
        return { ...item, check: true };
      } else {
        return item;
      }
    });

    updateUserInfo({
      [category]: updatedCategoryItems,
    });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const _handleSignupBtnPress = async () => {
    setIsLoading(true);

    toggleUserState('cardio', selectedCardio);
    toggleUserState('digestive', selectedDigestive);
    toggleUserState('kidney_disease', selectedKidney_disease);
    toggleUserState('nervous_system', selectedNervous_system);
    toggleUserState('cancer', selectedCancer);
    toggleUserState('allergy', selectedAllergy);

    const formattedUser = {
      name: user.name ? user.name[0] : '', // 배열 첫 요소 접근 또는 빈 문자열
      email: user.email ? user.email[0] : '',
      password: user.password ? user.password[0] : '',
      birth: user.birth ? formatDate(user.birth) : '',
      gender: user.gender ? user.gender[0] : '',
      pregnant: !!user.pregnant,
      breastfeeding: !!user.breastfeeding,
      height: parseFloat(user.height ? user.height[0] : 0),
      weight: parseFloat(user.weight ? user.weight[0] : 0),
      diabetes: !!user.diabetes,
      cardio: compileDiseaseInfo(selectedCardio),
      digestive: compileDiseaseInfo(selectedDigestive),
      kidney_disease: compileDiseaseInfo(selectedKidney_disease),
      nervous_system: compileDiseaseInfo(selectedNervous_system),
      osteoporosis: !!user.osteoporosis,
      constipation: !!user.constipation,
      anaemia: !!user.anaemia,
      stone: !!user.urinarystone,
      gout: !!user.gout,
      vegan: !!user.vegan,
      cancer: compileDiseaseInfo(selectedCancer),
      allergy: compileDiseaseInfo(selectedAllergy),
    };

    const payload = formattedUser;
    console.table('Payload to be sent:', payload);

    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:8080/api/member/join`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const statusRes = await response.status;

      if (response.ok) {
        console.log('Signup successful', statusRes);
        navigation.popToTop();
      } else {
        console.error('Signup failed:', statusRes);
      }
    } catch (error) {
      console.error('Network or other error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20} enableOnAndroid={true}>
      <Container>
        <LoadingModal
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        ></LoadingModal>

        <Customtext text={GUIDE_TEXT} margin={20}></Customtext>

        <Customtext text="심혈관질환" fontSize={14} margin={0}></Customtext>
        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedCardio(val)}
            data={diseasesData.cardio}
            save="value"
            label="심혈관질환"
            placeholder="심혈관질환을 선택해주세요"
            searchPlaceholder="심혈관질환"
            boxStyles={{ width: screenWidth }}
            maxHeight={200}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <Customtext text="소화기질환" fontSize={14} margin={0}></Customtext>
        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedDigestive(val)}
            data={diseasesData.digestive}
            save="value"
            label="소화기질환"
            placeholder="소화기질환을 선택해주세요"
            searchPlaceholder="소화기질환"
            boxStyles={{ width: screenWidth }}
            maxHeight={200}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <Customtext text="신장질환" fontSize={14} margin={0}></Customtext>
        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedKidney_disease(val)}
            data={diseasesData.kidney_disease}
            save="value"
            label="신장질환"
            placeholder="신장질환을 선택해주세요"
            searchPlaceholder="신장질환"
            boxStyles={{ width: screenWidth }}
            maxHeight={200}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <Customtext text="신경질환" fontSize={14} margin={0}></Customtext>
        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedNervous_system(val)}
            data={diseasesData.nervous_system}
            save="value"
            label="신경질환"
            placeholder="신경질환을 선택해주세요"
            searchPlaceholder="신경질환"
            boxStyles={{ width: screenWidth }}
            maxHeight={160}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <Customtext text="암" fontSize={14} margin={0}></Customtext>
        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedCancer(val)}
            data={diseasesData.cancer}
            save="value"
            label="암"
            placeholder="암을 선택해주세요"
            searchPlaceholder="암"
            boxStyles={{ width: screenWidth }}
            maxHeight={200}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <Customtext text="알레르기" fontSize={14} margin={0}></Customtext>
        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedAllergy(val)}
            data={diseasesData.allergy}
            save="value"
            label="알레르기"
            placeholder="알레르기를 선택해주세요"
            searchPlaceholder="알레르기"
            boxStyles={{ width: screenWidth }}
            maxHeight={200}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <Button title="저장" onPress={_handleSignupBtnPress}></Button>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signupdiseases;
