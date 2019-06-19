import React, { Component } from "react";
import { string, shape } from 'prop-types';
import classify from "src/classify";
import defaultClasses from './accountInfo.css';

class AccountInformation extends Component {
  static propTypes = {
    classes:shape({
      root:string,
      content:string,
      name:string,
      email:string,
      accountInfo:string,
      actions:string
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>account information</div>
        <div className={classes.content}>
          <div className={classes.accountInfo}>
            <p className={classes.name}>xiaoming</p>
            <p className={classes.emial}>xiaoming@reqo365.com</p>
            <div className={classes.actions}>
              <a className={classes.edit} href="#">Edit</a>
              <a className={classes.changePassword} href="">ChangePassword</a>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default classify(defaultClasses)(AccountInformation)