import React from "react";

export default class Menu extends React.Component {

    constructor() {
        super();
        this.state = {
            latitude: 0,
            longitude: 0,
            foundValidLocation: false,
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
                console.log(error);
                this.setState({
                    foundValidLocation: false,
                })
            }
        );
    }

    render() {
        return (
            <div>{this.state.latitude}, {this.state.longitude}</div>
        )
    }
}