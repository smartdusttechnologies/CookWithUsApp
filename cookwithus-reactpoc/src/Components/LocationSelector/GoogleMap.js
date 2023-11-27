import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class GoogleMap extends Component {
  render() {
    const { latitude, longitude, zoom , width , height } = this.props;
    const mapStyles = {
      width: width ? width : '100%',
      height: height ? height : '400px',
      margin:'20px auto',
    };

    return (
      <Map
        google={this.props.google}
        zoom={zoom ? zoom : 12}
        style={mapStyles}
        initialCenter={{ lat: latitude, lng: longitude }}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA',
})(GoogleMap);