import React from "react";
import "./Menu.css";

function LocationChecker(props) {
    const [data, setData] = React.useState();
    const encodedLat = encodeURIComponent(props.latitude);
    const encodedLong = encodeURIComponent(props.longitude);

    React.useEffect(() => {
        fetch("/checkLocation?lat=" + encodedLat + "&long=" + encodedLong)
        .then((res) => res.json())
        .then((data) => setData(data));
    }, [props.latitude, props.longitude]);

    if (data && data.scene) {
        props.setSceneToLoad(data.scene);
    }

    return (
        <div>There's nothing to find here</div>
    );
}

function Scene(props) {
    const [data, setData] = React.useState({
        sceneData: {
            introText: "",
            optionsList: []
        }
    });

    React.useEffect(() => {
        fetch("/getScene?scene=" + props.scene)
        .then((res) => res.json())
        .then((data) => setData(data));
    }, [props.scene]);

    if (!data.sceneData) {
        return (
            <div>
                There's been an error
            </div>
        )
    }

    let options = [];
    for (let i=0; i < data.sceneData.optionsList.length; i++) {
        options.push(<div className="optionButton" onClick={() => props.setSceneToLoad(data.sceneData.optionsList[i].destination)}
            key={i}>{data.sceneData.optionsList[i].text}</div>);
    }

    return (
        <div>
            <h1 className="typewriter">{data.sceneData.introText}</h1>
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
            locationMessage: "Finding your location...",
            sceneToLoad: "",
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

    setSceneToLoad(scene) {
        this.setState({
            sceneToLoad : scene
        });
    }

    render() {

        if (this.state.sceneToLoad) {
            return (
                <Scene scene={this.state.sceneToLoad} setSceneToLoad={(scene) => this.setSceneToLoad(scene)} />
            )
        } else if (this.state.foundValidLocation) {
            return (
                <div>
                    <LocationChecker latitude={this.state.latitude} longitude={this.state.longitude} setSceneToLoad={(scene) => this.setSceneToLoad(scene)} />
                </div>
            )
        } else {
            return (
                <div>{this.state.locationMessage}</div>
            )
        }

    }
}