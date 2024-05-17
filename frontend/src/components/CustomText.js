import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

const Text = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text};
`;

const Customtext = ({ text }) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

Customtext.protoType = {
  text: PropTypes.string.isRequired,
};

export default Customtext;
