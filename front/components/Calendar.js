/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { Row, Col, Modal } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import PostForm from './PostForm';
import Diary from './Diary';

const CalendarControl = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px;
  height: 80px;
  font-size: 19px;
  font-weight: bold;
`;

const CalendarToday = styled.td`
  color: #fff;
  background-color: gray;
  background-color: ${(props) => props.feelingColor};
  cursor: pointer;
  width: 120px;
  height: 107px;
  padding: 7px;
  vertical-align: top;
`;

const CalendarDays = styled.td`
  color: #fff;
  cursor: pointer;
  width: 120px;
  height: 107px;
  padding: 7px;
  vertical-align: top;
  background-color: ${(props) => props.feelingColor};
`;

const CalendarOtherMonths = styled.td`
  color: #c0bdbd;
  cursor: pointer;
  width: 120px;
  height: 107px;
  padding: 7px;
  background-color: ${(props) => props.feelingColor};
  opacity: 0.6;
  vertical-align: top;
`;

const DayOfTheWeek = styled.td`
  height: 35px;
  font-weight: 600;
  text-align: center;
  background-color: #fff;
`;

const Calendar = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id); // 로그인 한 사람 id
  const [postDate, setPostDate] = useState('');
  const [visible, setVisible] = useState(false);
  const [getMoment, setMoment] = useState(moment());

  const feelingColorParser = (days) => {
    const userPost = mainPosts.find((post) => post.date === days.format('YYYY-MM-DD') && id === post.User.id);
    let color = '';
    if (mainPosts.find((post) => post.date === days.format('YYYY-MM-DD') && id === post.User.id)) {
      if (userPost.feeling === 'best') {
        color = '#fb8c00';
      }
      if (userPost.feeling === 'good') {
        color = '#fff176';
      }
      if (userPost.feeling === 'soso') {
        color = '#9ccc65';
      }
      if (userPost.feeling === 'sad') {
        color = '#303f9f';
      }
      if (userPost.feeling === 'angry') {
        color = '#e53935';
      }
    }
    return color;
  };

  // 달력
  const today = getMoment; // totay === moment();
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

  const calendarArr = () => {
    let result = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {
            Array(7).fill(0).map((data, index) => {
              const days = today.clone().startOf('year').week(week).startOf('week')
                .add(index, 'day');
              if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                return (
                  <CalendarToday key={index} id={days.format('YYYYMMDD')} onClick={showModal} feelingColor={feelingColorParser(days)}>
                    <span>{days.format('D')}</span>
                  </CalendarToday>
                );
              } if (days.format('MM') !== today.format('MM')) {
                return (
                  <CalendarOtherMonths key={index} id={days.format('YYYYMMDD')} onClick={showModal} feelingColor={feelingColorParser(days)}>
                    <span>{days.format('D')}</span>
                  </CalendarOtherMonths>
                );
              }
              return (
                <CalendarDays key={index} id={days.format('YYYYMMDD')} onClick={showModal} feelingColor={feelingColorParser(days)}>
                  <span>{days.format('D')}</span>
                </CalendarDays>
              );
            })
          }
        </tr>,
      );
    }
    return result;
  };

  // 모달
  const showModal = (e) => {
    const year = e.currentTarget.id.substr(0, 4);
    const month = e.currentTarget.id.substr(4, 2);
    const date = e.currentTarget.id.substr(6, 2);
    const ymd = new Date(year, month - 1, date); // ymd = object(날짜 data)
    const selectDate = moment(ymd);
    setPostDate(selectDate.format('YYYY-MM-DD')); // string(ex: 2021년 01월 01일)
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <CalendarControl>
        <LeftOutlined onClick={() => { setMoment(getMoment.clone().subtract(1, 'month')); }} />
        <div>{today.format('YYYY년 MM월')}</div>
        <RightOutlined onClick={() => { setMoment(getMoment.clone().add(1, 'month')); }} />
      </CalendarControl>
      <Row justify="space-around" align="middle">
        <Col>
          <table>
            <thead>
              <tr>
                <DayOfTheWeek><span style={{ color: 'red' }}>일</span></DayOfTheWeek>
                <DayOfTheWeek><span>월</span></DayOfTheWeek>
                <DayOfTheWeek><span>화</span></DayOfTheWeek>
                <DayOfTheWeek><span>수</span></DayOfTheWeek>
                <DayOfTheWeek><span>목</span></DayOfTheWeek>
                <DayOfTheWeek><span>금</span></DayOfTheWeek>
                <DayOfTheWeek><span>토</span></DayOfTheWeek>
              </tr>
            </thead>
            <tbody>
              {calendarArr()}
              <Modal
                visible={visible}
                title={postDate}
                onCancel={handleCancel}
                footer={null}
              >
                {mainPosts.find((post) => post.date === postDate && id === post.User.id)
                  ? (
                    <Diary
                      postDate={postDate}
                      setVisible={setVisible}
                      post={
                        mainPosts.find((post) => post.date === postDate && id === post.User.id)
                      }
                    />
                  ) : (
                    <PostForm postDate={postDate} setVisible={setVisible} />
                  )}
              </Modal>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default Calendar;
