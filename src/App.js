import React, { Component } from "react";
import "./App.css";

import { AddressBookContainer } from "./containers/AddressBookContainer";

class App extends Component {
  render() {
    return (
      <div className="container">
        <AddressBookContainer />
      </div>
    );
  }
}

export default App;
