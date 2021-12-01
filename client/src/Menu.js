import React from "react";

export default class Menu extends React.Component {

    constructor() {
        super();
        this.state = {
            latitude: 0,
            longitude: 0
        }
    }

    componentDidMount() {

        this.setState({
            latitude: 3,
            longitude: 4
          });

        navigator.geolocation.watchPosition((position) => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
        });
      }

    render() {
        return (
            <div>{this.state.latitude}, {this.state.longitude}</div>
        )
    }
}