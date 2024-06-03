import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: ${({ margin }) => `${margin}px 0`};
`;

const Text = styled.Text`
  font-size: ${({ fontsize }) => fontsize}px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ color }) => color};
`;

const Customtext = ({
  text,
  fontsize = 20,
  color = 'black',
  margin = '10',
}) => {
  return (
    <Container margin={margin}>
      <Text fontsize={fontsize} color={color}>
        {text}
      </Text>
    </Container>
  );
};

Customtext.protoType = {
  text: PropTypes.string.isRequired,
};

export default Customtext;
