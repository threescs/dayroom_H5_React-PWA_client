import React, { Component } from "react";
import classify from 'src/classify'
// import defaultClasses from './accountMain.scss'

import AddressBook from './addressBook';
import AccountInfo from "./accountInfo";

class AccountMain extends Component {
  render() {
    return (
      <div>
        <AccountInfo/>
        <AddressBook/>
      </div>

    )
  }
}

export default classify({})(AccountMain)