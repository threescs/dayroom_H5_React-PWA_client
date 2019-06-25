import React, { Component } from 'react';
import { string, shape } from 'prop-types';
import classify from 'src/classify';
import defaultClasses from './accountInfoForm.css';


class AccountInfoForm extends Component {
  static propTypes = {
    classes:shape({
      root:string
    })
  }


  render() {
    return (
      <h1>account information edit</h1>
    )
  }
}

export default classify(defaultClasses)(AccountInfoForm)