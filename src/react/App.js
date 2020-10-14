import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { channels } from "../shared/constants";
const { ipcRenderer } = window;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: "",
      appVersion: "",
      aaa: [],
    };
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion, aaa } = arg;
      this.setState({ appName, appVersion, aaa });
    });
  }
  render() {
    const { appName, appVersion, aaa } = this.state;
    console.log(aaa);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {appName} version {appVersion}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
