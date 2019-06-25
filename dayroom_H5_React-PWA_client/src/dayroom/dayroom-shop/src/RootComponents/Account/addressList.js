import React, { Component } from "react";
import classify from "src/classify";
import defaultClasses from "./addressBook.css";
import { shape, string } from "prop-types";

class addressList extends Component {
  static propTypes = {
    classes:shape({
      root:string,
      content:string,
    })
  }

  render() {
    return (
      <h1>Address List</h1>
    )
  }
}

export default classify(defaultClasses)(addressList)