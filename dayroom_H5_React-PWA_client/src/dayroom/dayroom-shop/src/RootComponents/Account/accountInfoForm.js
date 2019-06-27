import React, { Component } from 'react';
import { string, shape } from 'prop-types';
import classify from 'src/classify';
import defaultClasses from './accountInfoForm.css';
import { Mutation } from "react-apollo";
import editCustomer from "src/queries/editCustomerInfo.graphql";
import changeCustomerPassword from "src/queries/changeCustomerPassword.graphql"

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


  constructor(props){
    super(props);
    this.state = {
      changePassword:false,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentWillMount(){
    const currentUrl = window.location.href;
    const reg = new RegExp("accountChangePwd$","ig");
    const isChangePassword = reg.test(currentUrl);
    this.setState({
      changePassword:isChangePassword
    })

  }

  onChangeHandler(){
    this.setState({
      changePassword:!this.state.changePassword
    });
    console.log(this.refs.changePwdBlock);
    this.refs.changePwdBlock.querySelectorAll('input').forEach(function(item){
      item.value = "";
    })
    // document.getElementById('changePwdBlock').querySelectorAll("input").forEach(function(item){
    //   item.value = "";
    // })
    this.refs.changePwdBlock.querySelectorAll('input').value = "";
    this.refs.changePwdBlock.style.display = this.state.changePassword?"block":"none";
  }

  render() {
    const { classes } = this.props;

    return (
      <Mutation mutation={this.state.changePassword?changeCustomerPassword:editCustomer}>
        {(editCustomer,{data}) => {

          return (
            <div className={classes.root}>
              <div className={classes.title}>account information</div>
              <div className={classes.content}>
                <form className={classes.editForm} id="editCustomerForm" onSubmit={e=>{
                  e.preventDefault();
                  const editCustomerForm = document.getElementById('editCustomerForm');
                  if(this.state.changePassword){
                    console.log('changePassword');
                    editCustomer({
                      variables:{
                        input:{
                          currentPassword:editCustomerForm.currentPassword.value,
                          newPassword:editCustomerForm.newPassword.value,
                        }
                      }
                    })
                  }else {
                    console.log('updateCustomer');
                    editCustomer({
                      variables :{
                        input:{
                          firstname:editCustomerForm.firstname.value,
                          lastname:editCustomerForm.lastname.value,
                        }
                      }
                    })
                  }
                }}>
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
                  <div className={classes.checkboxField}>
                    <input className={classes.checkboxItem} id="changePwd" type="checkbox" defaultChecked = {this.state.changePassword}  ref="changePwdControl" onChange={ this.onChangeHandler }/><label htmlFor="changePwd">Change Password</label>
                  </div>
                  <div className={classes.changePwdBlock} style={{"display":this.state.changePassword?"block":"none"}} id="changePwdBlock" ref="changePwdBlock">
                    <h2>Change Password</h2>
                    <div className={classes.fieldItem}>
                      <input className={classes.currentPwd} type="password" name="currentPassword" placeholder="Current password"/>
                    </div>
                    <div className={classes.fieldItem}>
                      <input className={classes.newPwd} type="password" name="newPassword" placeholder="New password" />
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
        }}
      </Mutation>
    )
  }
}

export default classify(defaultClasses)(AccountInfoForm)