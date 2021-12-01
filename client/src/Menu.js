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
        navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            () => {
                this.setState({
                    latitude: 1,
                    longitude: 1
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