import React, { Component } from "react";
import logo from "./logo.svg";
import HomePage from "./components/Homepage/HomePage";
import AddOrganiser from "./components/Organiser/AddOrganiser";
import AddVendor from "./components/Vendor/AddVendor";
class App extends Component {
  render() {
    return (
      <div>
        {/* <AddOrganiser /> */}
        <AddVendor />
      </div>
    );
  }
}

export default App;
