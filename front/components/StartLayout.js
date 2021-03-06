import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled, { createGlobalStyle } from 'styled-components';
import { Row, Col } from 'antd';

const Global = createGlobalStyle`
  html,
  body,
  body > div:first-child,
  div#__next,
  div#__next > div {
    height: 100%;
  }

  body {
    font-family: 'Gaegu', cursive;
  }
`;

const BackgroundImg = styled.div`
  border: 0;
  padding: 0;
  background-image: url('background.jpg');
  min-height: 100%;
  background-position: center;
  background-size: cover;
`;

const Box = styled.div`
  padding: 60px 0;
  margin-bottom: 50px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 5px 5px 13px rgb(0 0 0 / 20%);
`;

const StartLayoutRow = styled(Row)`
  height: 100%;
`;

const StartLayout = ({ children }) => (
  <BackgroundImg>
    <Global />
    <StartLayoutRow justify="space-around" align="middle">
      <Col xs={24} md={12}>
        <h2>
          <Link href="/"><a><img src="/logo_transparent.png" alt="logo" style={{ width: '150px' }} /></a></Link>
        </h2>
        <Box>
          {children}
        </Box>
      </Col>
    </StartLayoutRow>
  </BackgroundImg>
);

StartLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StartLayout;
