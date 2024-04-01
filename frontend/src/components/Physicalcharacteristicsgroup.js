import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import BoyImage from '../../assets/components/boyImage.png';
import GirlImage from '../../assets/components/girlImage.png';
import { Customcardbutton } from './index';
import { UserContext } from '../contexts';

const Cardcontainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0px 0px;
`;

const Cardrowcontainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`;

const Physicalcharacteristicsgroup = () => {
  const { user, setUser: updateUserInfo } = useContext(UserContext);

  const toggleUserState = (condition) => {
    updateUserInfo({
      [condition]: !user[condition],
    });
    console.log(condition);
  };

  useEffect(() => {
    console.table(user);
  }, [user]);

  return (
    <Cardcontainer>
      <Cardrowcontainer>
        <Customcardbutton
          onPress={() => toggleUserState('vegan')}
          url={BoyImage}
          title="채식주의"
          isFocused={user.vegan}
        ></Customcardbutton>
        <Customcardbutton
          onPress={() => toggleUserState('diabetes')}
          url={BoyImage}
          title="당뇨병"
          isFocused={user.diabetes}
        ></Customcardbutton>
        <Customcardbutton
          onPress={() => toggleUserState('constipation')}
          url={BoyImage}
          title="변비"
          isFocused={user.constipation}
        ></Customcardbutton>
      </Cardrowcontainer>
      <Cardrowcontainer>
        <Customcardbutton
          onPress={() => toggleUserState('anaemia')}
          url={BoyImage}
          title="빈혈"
          isFocused={user.anaemia}
        ></Customcardbutton>
        <Customcardbutton
          onPress={() => toggleUserState('osteoporosis')}
          url={BoyImage}
          title="골다공증"
          isFocused={user.osteoporosis}
        ></Customcardbutton>
        <Customcardbutton
          onPress={() => toggleUserState('gout')}
          url={BoyImage}
          title="통풍"
          isFocused={user.gout}
        ></Customcardbutton>
      </Cardrowcontainer>
      <Cardrowcontainer>
        <Customcardbutton
          onPress={() => toggleUserState('stone')}
          url={BoyImage}
          title="요로결석"
          isFocused={user.stone}
        ></Customcardbutton>
        <Customcardbutton
          onPress={() => toggleUserState('pregnant')}
          url={BoyImage}
          title="임신"
          isFocused={user.pregnant}
        ></Customcardbutton>
        <Customcardbutton
          onPress={() => toggleUserState('breastfeeding')}
          url={BoyImage}
          title="모유수유"
          isFocused={user.breastfeeding}
        ></Customcardbutton>
      </Cardrowcontainer>
    </Cardcontainer>
  );
};

export default Physicalcharacteristicsgroup;
