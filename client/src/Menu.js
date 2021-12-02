import React from "react";

export default class Menu extends React.Component {

    constructor() {
        super();
        this.state = {
            latitude: 0,
            longitude: 0,
            foundValidLocation: false,
            locationMessage: "Finding your location..."
        }
    }

    componentDidMount() {
        navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    foundValidLocation: true,
                })
            },
            (error) => {
                console.log(error.message);
                this.setState({
                    foundValidLocation: false,
                    locationMessage: "Your device's location could not be determined."
                })
            }
        );
    }

    findDistanceBetweenCoordinates(lat1, long1, lat2, long2) {
        lat1 = lat1 / (180/Math.PI);
        long1 = long1 / (180/Math.PI);
        lat2 = lat2 / (180/Math.PI);
        long2 = long2 / (180/Math.PI);

        let distance = 3963 * Math.acos((Math.sin(lat1) * Math.sin(lat2)) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2-long1));
        distance = distance * 5280;
        return distance;
    }

    render() {

        if (this.state.foundValidLocation) {
            return (
                <div>
                    <div>{this.state.latitude}, {this.state.longitude}</div>
                    <div>{this.findDistanceBetweenCoordinates(this.state.latitude, this.state.longitude, 47.594298, -122.316559)}</div>
                </div>
            )
        } else {
            return (
                <div>{this.state.locationMessage}</div>
            )
        }

    }
}