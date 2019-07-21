import React, { Component } from "react";
import styled from "styled-components";
import { Flex, Card, Text, Button } from "rebass";

//components
const Bar = styled(Card)`
  width: 1063px;
  height: 100px;
  background-color: white;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  margin: 15px 0px 0px 30px;
  border: solid 1px #d3dadc;
`;

const Wrapper = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-self: self-end;
`;

const TextWrapper = styled(Wrapper)`
  margin: 30px;
`;

//text
const Header = styled(Text)`
  font-size: 15px;
  color: #a4a8a8;
`;

const Info = styled(Text)`
  font-size: 15px;
  color: #000000;
`;

const TopButton = styled(Button)`
  background-color: white;
  border: solid 1px #d3dadc;
  border-right: none;
  border-top: none;
  width: 229px;
  height: 50px;
  cursor: pointer;
  border-radius: 0;
`;

const BottomButton = styled(Button)`
  background-color: white;
  border-left: solid 1px #d3dadc;
  width: 229px;
  height: 50px;
  cursor: pointer;
  border-radius: 0;
`;

//text
const BlueText = styled(Text)`
  font-size: 15px;
  text-align: center;
  color: #258ea2;
`;

const RedText = styled(Text)`
  font-size: 15px;
  text-align: center;
  color: #ffae89;
`;

class Patient extends Component {
  state = { dispatched: false };

  hide = () => {
    this.setState({ dispatched: true });
  };

  render() {
    return (
      <Bar style={!this.state.dispatched ? null : { display: "none" }}>
        <TextWrapper width="66px">
          <Header>RX#</Header> <Info>{this.props.rx}</Info>
        </TextWrapper>
        <TextWrapper width="110px">
          <Header>Patient</Header>
          <Info>{this.props.name}</Info>
        </TextWrapper>
        <TextWrapper width="106px">
          <Header>Doctor</Header>
          <Info>{this.props.doc}</Info>
        </TextWrapper>
        <TextWrapper width="98px">
          <Header>Prescriptions</Header>
          <Info>{this.props.prescriptions}</Info>
        </TextWrapper>
        <TextWrapper width="41px">
          <Header>Filled</Header>
          <Info>{this.props.filled}</Info>
        </TextWrapper>
        <TextWrapper width="63px">
          <Header>Time</Header>
          <Info>{this.props.time}</Info>
        </TextWrapper>
        <Wrapper>
          <TopButton
            onClick={() => {
              this.props.dispatch(this.props);
              this.hide();
            }}
          >
            <BlueText>Dispatch</BlueText>
          </TopButton>
          <BottomButton
            onClick={() => {
              this.hide();
            }}
          >
            <RedText>Cancel</RedText>
          </BottomButton>
        </Wrapper>
      </Bar>
    );
  }
}

export default Patient;
