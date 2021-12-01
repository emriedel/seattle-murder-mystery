import React from "react";

export default class Menu extends React.Component {


    render() {
        let lat = 0;
        let long = 0;
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
          });
        return (
            <div>{lat}, {long}</div>
        )
    }
}