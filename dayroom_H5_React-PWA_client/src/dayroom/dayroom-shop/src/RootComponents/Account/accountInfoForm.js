import React, { Component } from 'react';
import { string, shape } from 'prop-types';
import classify from 'src/classify';
import defaultClasses from './accountInfoForm.css';


class AccountInfoForm extends Component {
  static propTypes = {
    classes:shape({
      root:string,
      title:string,
      content:string,
      editForm:string,
      fieldsGroup:string,
      fieldItem:string,
      checkboxField:string,
      checkboxItem:string,
      actionBar:string,
      actionSaveBtn:string,
    })
  }


  render() {
    const { classes } = this.props
    return (
      // <h1>Account Information Edit</h1>
      <div className={classes.root}>
        <h1 className={classes.title}>account information</h1>
        <div className={classes.content}>
          <form className={classes.editForm}>
            <div className={classes.fieldsGroup}>
              <div className={classes.fieldItem}>
                <label htmlFor="firstname">First name *</label>
                <input className={classes.firstNamInput} id="firstname" name="firstname" type="text" placeholder="please enter your first name"/>
              </div>
              <div className={classes.fieldItem}>
                <label htmlFor="firstname">Last name *</label>
                <input className={classes.lastNamInput} id="lastname" name="lastname" type="text" placeholder="please enter your last name"/>
              </div>
            </div>
            <div className={classes.fieldItem}>
              <label htmlFor="email">Email address *</label>
              <input classes={classes.emailInut} id="email" name="email" type="text" placeholder="Email address" />
            </div>
            <div className={classes.checkboxField}>
              <input className={classes.checkboxItem} id="changePwd" type="checkbox"/><label htmlFor="changePwd">Change Password</label>
            </div>
            <div className={classes.changePwdBlock}>
              <h2>Change Password</h2>
              <div className={classes.fieldItem}>
                <input className={classes.currentPwd} type="password" placeholder="Current password"/>
              </div>
              <div className={classes.fieldItem}>
                <input className={classes.newPwd} type="password" placeholder="New password" />
              </div>
              <div className={classes.fieldItem}>
                <input className={classes.confirmPwd} type="password" placeholder="Confirm password" />
              </div>
            </div>
            <div className={classes.actionBar}>
              <button className={classes.actionSaveBtn} type="submit">save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default classify(defaultClasses)(AccountInfoForm)