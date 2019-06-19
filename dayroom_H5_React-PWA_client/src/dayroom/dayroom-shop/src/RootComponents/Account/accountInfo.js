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
    const { classes, customerInfo } = this.props;
    const firstname= customerInfo ? customerInfo.firstname : null; 
    const email= customerInfo ? customerInfo.email : null; 
    return (
      <div className={classes.root}>
        <div className={classes.title}>account information</div>
        <div className={classes.content}>
          <div className={classes.accountInfo}>
            <p className={classes.name}>{firstname}</p>
            <p className={classes.emial}>{email}</p>
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