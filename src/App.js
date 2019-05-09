import React, { Component } from "react";
import "./App.css";
import globalStyles from "./Assets/bootstrap.min.module.css";

import { AddressBookContainer } from "./containers/AddressBookContainer";

class App extends Component {
  render() {
    return (
      <div className={globalStyles.container}>
        <AddressBookContainer />
      </div>
    );
  }
}

export default App;
