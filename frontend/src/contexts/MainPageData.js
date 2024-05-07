import React, { useState, createContext } from 'react';

const formatDate = (date) => {
  const today = new Date(date);
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

const initialMainPageData = {
  carbohydrateTotal: 'NaN',
  proteinTotal: 'NaN',
  fatTotal: 'Nan',
  kcalTotal: 'Nan',

  carbohydrateValue: 0,
  proteinValue: 0,
  fatValue: 0,
  kcalValue: 0,

  score: 0,

  date: formatDate(new Date()),

  feedback: '해당 날짜의 식사 정보가 없거나 정보 분석중입니다',
};

const MainPageDataContext = createContext({
  data: { ...initialMainPageData },
  setData: () => {},
});

const MainPageDataProvider = ({ children }) => {
  const [data, setData] = useState({ ...initialMainPageData });

  const updateDataInfo = (updates) => {
    setData((prevData) => ({
      ...prevData,
      ...updates,
    }));
  };

  return (
    <MainPageDataContext.Provider value={{ data, setData: updateDataInfo }}>
      {children}
    </MainPageDataContext.Provider>
  );
};

export { MainPageDataContext, MainPageDataProvider };
