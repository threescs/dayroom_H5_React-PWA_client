import React, { Component } from "react";
import { string, shape } from 'prop-types';
import classify from "src/classify";
import defaultClasses from './accountInfo.css';
import { Link } from 'src/drivers';

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
    const firstname= customerInfo ? customerInfo.firstname : "";
    const lastname= customerInfo ? customerInfo.lastname : "";
    // cons lastname =
    const email= customerInfo ? customerInfo.email : null;
    return (
      <div className={classes.root}>
        <div className={classes.title}>account information</div>
        <div className={classes.content}>
          <div className={classes.accountInfo}>
            <p className={classes.name}>{firstname} {lastname}</p>
            <p className={classes.emial}>{email}</p>
            <div className={classes.actions}>
              <Link className={classes.edit} to="/accountEdit">Edit</Link>
              <Link className={classes.changePassword} to="/accountChangePwd">ChangePassword</Link>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default classify(defaultClasses)(AccountInformation)