import React, { Component } from "react";
import styled from "styled-components";
import { Card, Text, Image } from "rebass";
//images
import line from "./images/line.png";

//components
const DeliveryCard = styled(Card)`
  background-color: white;
  width: 260px;
  height: 115px;
  margin: 15px 0px 15px 30px;
  padding: 15px;
  flex-shrink: 0;
`;

//text
const DeliveryTitle = styled(Text)`
  font-size: 13px;
  color: #004350;
`;

const Time = styled(Text)`
  font-size: 13px;
  color: #258ea2;
  text-align: right;
  margin-top: -15px;
`;

const NextStop = styled(Text)`
  font-size: 13px;
  color: #a4a8a8;
  margin: 10px 0px;
`;

const Recipient = styled(Text)`
  font-size: 13px;
  font-weight: bold;
  color: #004350;
`;

const Address = styled(Text)`
  font-size: 13px;
  color: #004350;
  text-align: right;
  margin-top: -15px;
`;

//images
const Line = styled(Image)`
  width: 100%;
  height: 1px;
`;

class Delivery extends Component {
  render() {
    return (
      <DeliveryCard>
        <DeliveryTitle>{this.props.courier}'s Route</DeliveryTitle>
        <Time>Arriving {this.props.time}</Time>
        <Line src={line} />
        <NextStop>NEXT STOP</NextStop>
        <Recipient>{this.props.recipient}</Recipient>
        <Address>{this.props.address}</Address>
      </DeliveryCard>
    );
  }
}

export default Delivery;
