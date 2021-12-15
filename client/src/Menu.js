import React from "react";
import "./Menu.css";

function FetchTest(props) {
    const [data, setData] = React.useState({
        sceneData: {
            introText:"",
            optionsList: [{}]
        }
    });
    const encodedLat = encodeURIComponent(props.latitude);
    const encodedLong = encodeURIComponent(props.longitude);

    React.useEffect(() => {
        fetch("/checkLocation?lat=" + encodedLat + "&long=" + encodedLong)
        .then((res) => res.json())
        .then((data) => setData(data));
    }, [props.latitude, props.longitude]);

    return (
        <div>
            <Scene text={data.sceneData.introText} options={data.sceneData.optionsList} />
        </div>
    );
}

function Scene(props) {
    let options = [];
    for (let i = 0; i < props.options.length; i++) {
        options.push(<div data-destionationscene={props.options[i].destination} key={i}>{props.options[i].text}</div>);
    }

    return (
        <div>
            {props.text}
            {options}
        </div>
    )
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