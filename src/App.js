import React, { Component } from "react";
import styled from "styled-components";
import { Flex, Card, Text, Image } from "rebass";
import firebase from "firebase";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline
} from "react-google-maps";
//components
import Delivery from "./deliveries/Delivery.js";
import Patient from "./patients/Patient.js";
//images
import user from "./images/user.png";
import dashboard from "./images/dashboard.png";
import shipments from "./images/shipments.png";
import shipments_dark from "./images/shipments-dark.png";
import prescriptions from "./images/prescriptions.png";
import prescriptions_dark from "./images/prescriptions-dark.png";
import analysis from "./images/analysis.png";
import pillage from "./images/pillage.png";
import map from "./images/map.png";

//firebase

//polyline
var polyline = require("@mapbox/polyline");

//components
const RowWrapper = styled(Flex)`
  display: flex;
  flex-direction: row;
`;

const SideRowWrapper = styled(RowWrapper)`
  margin: 0px 0px 30px 0px;
`;

const MapWrapper = styled(Flex)`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const Header = styled(Card)`
  background-color: #004350;
  width: 250px;
  height: 150px;
  padding: 30px 0px 0px 45px;
`;

const TopBar = styled(Card)`
  background-color: #d3dadc;
  width: 100%;
  height: 150px;
  left: 250px;
  position: absolute;
`;

const Sidebar = styled(Card)`
  background-color: white;
  width: 250px;
  height: 100%;
  padding: 30px 0px 0px 45px;
  top: 150px;
  position: absolute;
`;

const Ledger = styled(Card)`
  width: 100%;
  height: 100%;
  top: 150px;
  left: 250px;
  position: absolute;
`;

const Map = styled(Card)`
  width: 1130px;
  height: calc(100% - 15px);
  background-color: white;
  position: absolute;
  top: 165px;
  left: 280px;
  border: solid 1px #d3dadc;
`;

const MapHeader = styled(Card)`
  width: 1130px;
  height: 85px;
  border-bottom: solid 1px #d3dadc;
  display: flex;
  align-items: center;
`;

const Rectangle = styled(Card)`
  background-color: #004350;
  width: 5px;
  height: 30px;
  margin-top: -5px;
  position: absolute;
  left: 245px;
`;

//text
const Title = styled(Text)`
  color: white;
  font-size: 25px;
  font-weight: 500;
  line-height: 1.2;
`;

const Subtitle = styled(Text)`
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: #258ea2;
  align-self: center;
`;

const SidebarHeader = styled(Text)`
  font-size: 11px;
  color: #a4a8a8;
  margin: 0px 0px 30px 0px;
`;

const SidebarMenu = styled(Text)`
  font-size: 15px;
  color: #a4a8a8;
  margin: 0px 0px 0px 30px;
  cursor: pointer;
`;

const MapText = styled(Text)`
  font-size: 15px;
  color: black;
`;

const MapSubtext = styled(Text)`
  font-size: 15px;
  color: #a4a8a8;
`;

//images
const Avatar = styled(Image)`
  width: 20px;
  height: 20px;
`;

const Logo = styled(Image)`
  width: 75px;
  height: 28px;
`;

const MapImage = styled(Image)`
  width: 1130px;
`;

class App extends Component {
  state = {
    patients: [
      {
        rx: "12021423",
        name: "Steve Fischer",
        doc: "Sandra Garcia",
        prescriptions: "Lisinopril",
        filled: "Yes",
        time: "3:47pm",
        address: "111 Main Street"
      },
      {
        rx: "14567928",
        name: "Lucy Wright",
        doc: "Anita Thomas",
        prescriptions: "Diazepam",
        filled: "No",
        time: "3:10pm",
        address: "987 Bleak Circle"
      },
      {
        rx: "99432107",
        name: "Geoff Davison",
        doc: "Keith Allan",
        prescriptions: "Adderall",
        filled: "Yes",
        time: "1:36pm",
        address: "255 Sunset Street"
      },
      {
        rx: "66948322",
        name: "Jenna Kramer",
        doc: "Tao Yi",
        prescriptions: "Prozac",
        filled: "Yes",
        time: "10:29pm",
        address: "5543 Wren Court"
      }
    ],
    deliveries: [],
    polylines: [],
    coordinates: [],
    dispatched: [],
    ledger: true,
    map: false
  };

  handleDispatch = data => {
    this.setState({ dispatched: [...this.state.dispatched, data] });
  };

  showPrescriptions = () => {
    this.setState({ ledger: true, map: false });
  };

  showShipments = () => {
    this.setState({ ledger: false, map: true });
  };

  updateMap() {
    this.state.coordinates.push(
      polyline.decode(
        JSON.stringify(this.state.polylines["Puxico Drugs 1"]["0"])
      )
    );
    this.state.coordinates.push(
      polyline.decode(
        JSON.stringify(this.state.polylines["Puxico Drugs 2"]["0"])
      )
    );
    for (var i = 0; i <= 1; i++) {
      for (
        var j = 0;
        j < this.state.coordinates[JSON.stringify(i)].length;
        j++
      ) {
        for (var k = 0; k <= 1; k++) {
          if (k === 0) {
            this.state.coordinates[JSON.stringify(i)][JSON.stringify(j)][
              "lat"
            ] = this.state.coordinates[JSON.stringify(i)][JSON.stringify(j)][
              JSON.stringify(k)
            ];
          } else if (k === 1) {
            this.state.coordinates[JSON.stringify(i)][JSON.stringify(j)][
              "lng"
            ] = this.state.coordinates[JSON.stringify(i)][JSON.stringify(j)][
              JSON.stringify(k)
            ];
          }
        }
      }
    }
    console.log(this.state.coordinates);
  }

  componentDidMount() {
    let currentComponent = this;
    var starCountRef = firebase.database().ref("current");
    starCountRef.on("value", function(snapshot) {
      console.log(snapshot.val());
      [snapshot.val().solution].forEach(element => {
        currentComponent.setState({
          deliveries: element
        });
        console.log(currentComponent.state.deliveries);
      });
      [snapshot.val().polylines].forEach(element => {
        currentComponent.setState({
          polylines: element
        });
        console.log(currentComponent.state.polylines);
      });
    });
  }

  render() {
    const MyMapComponent = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: 37.306047, lng: -89.518874 }}
        >
          <Polyline
            path={this.state.coordinates["0"]}
            options={{
              strokeColor: "#ff2343",
              strokeOpacity: "0.5",
              strokeWeight: 2
            }}
          />
          <Polyline
            path={this.state.coordinates["1"]}
            options={{
              strokeColor: "#ff2343",
              strokeOpacity: "0.5",
              strokeWeight: 2
            }}
          />
        </GoogleMap>
      ))
    );

    const patientOutput = [];
    for (const [index] of this.state.patients.entries()) {
      patientOutput.push(
        <Patient
          key={index}
          rx={this.state.patients[index].rx}
          name={this.state.patients[index].name}
          doc={this.state.patients[index].doc}
          prescriptions={this.state.patients[index].prescriptions}
          filled={this.state.patients[index].filled}
          time={this.state.patients[index].time}
          address={this.state.patients[index].address}
          dispatch={this.handleDispatch}
        />
      );
    }

    const dispatchedOutput = [];
    for (const [index] of this.state.dispatched.entries()) {
      dispatchedOutput.push(
        <Delivery
          key={index}
          courier="TBD"
          time="TBD"
          recipient={this.state.dispatched[index].name}
          address={this.state.dispatched[index].address}
        />
      );
    }

    const deliveryOutput = [];
    deliveryOutput.push(
      <Delivery
        key={1}
        courier="John"
        time="2:11pm"
        recipient="Henry Yang"
        address="995 Hack Street"
      />,
      <Delivery
        key={2}
        courier="Stacy"
        time="4:03pm"
        recipient="Linda Howe"
        address="243 Code Road"
      />
    );

    return (
      <div>
        <SideRowWrapper>
          <Header>
            <Title>FamilyRx Overview</Title>
            <RowWrapper>
              <Subtitle>by </Subtitle>
              <Logo src={pillage} />
            </RowWrapper>
          </Header>
          <TopBar>
            <RowWrapper>
              {deliveryOutput}
              {dispatchedOutput}
            </RowWrapper>
          </TopBar>
        </SideRowWrapper>
        <Sidebar>
          <SidebarHeader>RECENT PRESCRIPTIONS</SidebarHeader>
          <SideRowWrapper>
            <Avatar src={user} />
            <SidebarMenu>{this.state.patients[0].name}</SidebarMenu>
          </SideRowWrapper>
          <SideRowWrapper>
            <Avatar src={user} />
            <SidebarMenu>{this.state.patients[1].name}</SidebarMenu>
          </SideRowWrapper>
          <SidebarHeader>MANAGEMENT</SidebarHeader>
          <SideRowWrapper>
            <Avatar src={dashboard} />
            <SidebarMenu>Dashboard</SidebarMenu>
          </SideRowWrapper>
          <SideRowWrapper>
            <Avatar
              src={this.state.ledger ? prescriptions_dark : prescriptions}
            />
            <SidebarMenu
              style={this.state.ledger ? { color: "#004350" } : null}
              onClick={this.showPrescriptions}
            >
              Prescriptions
            </SidebarMenu>
            {this.state.ledger ? <Rectangle /> : null}
          </SideRowWrapper>
          <SideRowWrapper>
            <Avatar src={!this.state.map ? shipments : shipments_dark} />
            <SidebarMenu
              style={this.state.map ? { color: "#004350" } : null}
              onClick={() => {
                this.updateMap();
                this.showShipments();
              }}
            >
              Shipments
            </SidebarMenu>
            {!this.state.map ? null : <Rectangle />}
          </SideRowWrapper>
          <SideRowWrapper>
            <Avatar src={analysis} />
            <SidebarMenu>Analysis</SidebarMenu>
          </SideRowWrapper>
        </Sidebar>
        {this.state.ledger ? (
          <Ledger>{patientOutput}</Ledger>
        ) : this.state.map ? (
          <Map>
            <MapHeader>
              <MapWrapper>
                <MapText>Driver Routes</MapText>
              </MapWrapper>
              <MapWrapper>
                <MapText>John Stewarts</MapText>
                <MapSubtext>On route</MapSubtext>
              </MapWrapper>
              <MapWrapper>
                <MapText>Stacy Jackson</MapText>
                <MapSubtext>On route</MapSubtext>
              </MapWrapper>
            </MapHeader>
            <MapImage src={map} />
          </Map>
        ) : null}
      </div>
    );
  }
}

export default App;
