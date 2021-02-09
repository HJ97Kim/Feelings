import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

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
`;

const CalendarOtherMonths = styled.td`
  color: #c0bdbd;
  cursor: pointer;
  width: 120px;
  height: 107px;
  padding: 7px;
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
  const [getMoment, setMoment] = useState(moment());

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
              let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
              
              if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                return (
                  <CalendarToday key={index} id={days.format('YYYYMMDD')}>
                    <span>{days.format('D')}</span>
                  </CalendarToday>
                );
              } else if (days.format('MM') !== today.format('MM')) {
                return (
                  <CalendarOtherMonths key={index} id={days.format('YYYYMMDD')}>
                    <span>{days.format('D')}</span>
                  </CalendarOtherMonths>
                );
              } else {
                return (
                  <CalendarDays key={index} id={days.format('YYYYMMDD')}>
                    <span>{days.format('D')}</span>
                  </CalendarDays>
                );
              }
            })
          }
        </tr>);
    }
    return result;
  };

  return (
    <div>
      <CalendarControl>
        <LeftOutlined onClick={() => { setMoment(getMoment.clone().subtract(1, 'month')) }} />
        <div>{today.format('YYYY년 MM월')}</div>
        <RightOutlined onClick={() => { setMoment(getMoment.clone().add(1, 'month')) }} />
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
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default Calendar;