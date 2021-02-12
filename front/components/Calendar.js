import React, { useCallback, useState } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { Row, Col, Modal, Button, Form, Input } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { addPost } from '../reducers/post';

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
  const { mainPosts } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id); // 로그인 한 사람 id
  const dispatch = useDispatch();
  const [postDate, setPostDate] = useState(''); // 나중에 onChangePostDate로 reducers 설정해줘야함(?)
  const [text, setText] = useState(''); // textArea value
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [getMoment, setMoment] = useState(moment());

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
              let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
              
              if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                return (
                  <CalendarToday key={index} id={days.format('YYYYMMDD')} onClick={showModal}>
                    <span>{days.format('D')}</span>
                  </CalendarToday>
                );
              } else if (days.format('MM') !== today.format('MM')) {
                return (
                  <CalendarOtherMonths key={index} id={days.format('YYYYMMDD')} onClick={showModal}>
                    <span>{days.format('D')}</span>
                  </CalendarOtherMonths>
                );
              } else {
                return (
                  <CalendarDays key={index} id={days.format('YYYYMMDD')} onClick={showModal}>
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

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText('');
  }, []);

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
              {mainPosts.find(mainPosts => mainPosts.date === postDate) ? 
                <Modal
                  visible={visible}
                  title={postDate}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="back" type="danger" onClick={handleCancel}>
                      삭제
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk} htmlType="submit">
                      수정
                    </Button>,
                  ]}
                >
                  {mainPosts.find(mainPosts => mainPosts.date === postDate).content}
                </Modal>
                : 
                <Modal
                  visible={visible}
                  title={postDate}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      취소
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk} htmlType="submit" from="addPost">
                      작성
                    </Button>,
                  ]}
                >
                  <Form id="addPost" style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
                    <Input.TextArea
                      rows={10}
                      value={text}
                      onChange={onChangeText}
                      maxLength={300}
                      placeholder="오늘 당신의 기분은?"
                    />
                  </Form>
                </Modal>
              }
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default Calendar;