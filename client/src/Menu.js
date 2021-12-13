import React from "react";
import "./Menu.css";

function FetchTest(props) {
    const [data, setData] = React.useState(null);
    const encodedLat = encodeURIComponent(props.latitude);
    const encodedLong = encodeURIComponent(props.longitude);

    React.useEffect(() => {
        fetch("/location?lat=" + encodedLat + "&long=" + encodedLong)
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

    return (
        <p>{!data ? "Loading..." : data}</p>
    );
}

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

    render() {

        if (this.state.foundValidLocation) {
            return (
                <div className="typewriter">
                    <h1>{this.state.latitude}, {this.state.longitude}</h1>
                    <FetchTest latitude = {this.state.latitude} longitude = {this.state.longitude} />
                </div>
            )
        } else {
            return (
                <div>{this.state.locationMessage}</div>
            )
        }

    }
}