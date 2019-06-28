import React, { Component } from "react";
import { string, shape } from "prop-types";
import classify from "src/classify";
import defaultClasses from "./accountInfoForm.css";
import { Query, Mutation } from 'react-apollo';
import newAddressMutation from "src/queries/addNewAddress.graphql";

class AddNewAddressForm extends Component {
  static propTypes = {
    classes:shape({
      editForm:string,
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={newAddressMutation}>
        {(createCustomerAddress,{data}) => {

          return (
            <div className={classes.root}>
              <div className={classes.title}>add address</div>
              <div className={classes.content}>
                <form className={classes.editForm} id="addAddressForm" onSubmit={e => {
                  e.preventDefault();
                  const addressForm = document.getElementById('addAddressForm')
                  createCustomerAddress({variables:{input:{
                    firstname:addressForm.firstname.value,
                    lastname:addressForm.lastname.value,
                    region:{
                      region:addressForm.state.text,
                      region_id:0,
                      region_code:addressForm.state.value
                    },
                    country_id:addressForm.country.value,
                    street:[addressForm.streetsddress.value],
                    city:addressForm.city.value,
                    telephone:addressForm.phonenumber.value,
                    postcode:addressForm.postcode.value,
                    default_shipping:addressForm.defaultshipping.checked,
                    default_billing:addressForm.defaultbilling.checked,
                  }}})
                }}>
                  <div className={classes.basicInfo}>
                    <div className={classes.fieldItem}>
                      <label htmlFor="firstname">First name*</label>
                      <input type="text" id="firstname" name="firstname" />
                    </div>
                    <div className={classes.fieldItem}>
                      <label htmlFor="lastname">Last name*</label>
                      <input type="text" id="lastname" name="lastname" />
                    </div>
                    <div className={classes.fieldItem}>
                      <label htmlFor="phonenumber">Phone number*</label>
                      <input type="text" id="phonenumber" name="phonenumber" />
                    </div>
                  </div>
                  <div className={classes.addressInfo}>
                    <h2>Address</h2>
                    <div className={classes.fieldItem}>
                      <label htmlFor="streetsddress">Street Address*</label>
                      <input type="text" id="streetsddress" name="streetsddress"/>
                    </div>
                    <div className={classes.fieldItem}>
                      <label htmlFor="city">City*</label>
                      <input type="text" id="city" name="city" />
                    </div>
                    <div className={classes.fieldItem}>
                      <label htmlFor="state">State/Province</label>
                      <select type="text" id="state" name="state" >
                        <option value="test">test</option>
                        <option value="test1">test1</option>
                        <option value="test2">test2</option>
                        <option value="test3">test3</option>
                      </select>
                    </div>
                    <div className={classes.fieldItem}>
                      <label htmlFor="postcode">Zip/Postal Code *</label>
                      <input type="text" id="postcode" name="postcode" />
                    </div>
                    <div className={classes.fieldItem}>
                      <label htmlFor="country">Country*</label>
                      <select type="text" id="country" name="country" >
                        <option value="US">America</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>

                    <div className={classes.checkboxField}>
                      <input type="checkbox" id="defaultbilling" name="defaultbilling"/>
                      <label htmlFor="defaultbilling">Use as my default billing address</label>
                    </div>
                    <div className={classes.checkboxField}>
                      <input type="checkbox" id="defaultshipping" name="defaultshipping"/>
                      <label htmlFor="defaultshipping">Use as my default shipping address</label>
                    </div>
                  </div>
                  <div className={classes.actionBar}>
                    <button type="submit" className={classes.actionSaveBtn}>save</button>
                  </div>
                </form>
              </div>
            </div>
          )
        }}
      </Mutation>


      // <div className={classes.root}>
      //   <div className={classes.title}>add address</div>
      //   <div className={classes.content}>
      //     <form className={classes.editForm}>
      //       <div className={classes.basicInfo}>
      //         <div className={classes.fieldItem}>
      //           <label htmlFor="firstname">First name*</label>
      //           <input type="text" id="firstname" name="firstname" />
      //         </div>
      //         <div className={classes.fieldItem}>
      //           <label htmlFor="lastname">Last name*</label>
      //           <input type="text" id="lastname" name="lastname" />
      //         </div>
      //         <div className={classes.fieldItem}>
      //           <label htmlFor="phonenumber">Phone number*</label>
      //           <input type="text" id="phonenumber" name="phonenumber" />
      //         </div>
      //       </div>
      //       <div className={classes.addressInfo}>
      //         <h2>Address</h2>
      //         <div className={classes.fieldItem}>
      //           <label htmlFor="streetsddress">Street Address*</label>
      //           <input type="text" id="streetsddress" name="streetsddress" />
      //         </div>
      //         <div className={classes.fieldItem}>
      //           <label htmlFor="city">City*</label>
      //           <input type="text" id="city" name="city" />
      //         </div>
      //         <div className={classes.fieldItem}>
      //           <label htmlFor="state">State/Province</label>
      //           <select type="text" id="state" name="state" >
      //             <option value="ab">test</option>
      //             <option value="ab2">test1</option>
      //             <option value="ab3">test2</option>
      //             <option value="ab4">test3</option>
      //           </select>
      //         </div>
      //         <div className={classes.fieldItem}>
      //           <label htmlFor="postcode">Zip/Postal Code *</label>
      //           <input type="text" id="postcode" name="postcode" />
      //         </div>
      //         <div className={classes.fieldItem}>
      //           <label htmlFor="phonenumber">Phone number*</label>
      //           <input type="text" id="phonenumber" name="phonenumber" />
      //         </div>
      //         <div className={classes.fieldItem}>
      //           <label htmlFor="country">Country*</label>
      //           <select type="text" id="country" name="country" >
      //             <option value="US">US</option>
      //             <option value="AU">AU</option>
      //           </select>
      //         </div>

      //         <div className={classes.checkboxField}>
      //           <input type="checkbox" id="defaultbilling" name="defaultbilling"/>
      //           <label htmlFor="defaultbilling">Use as my default billing address</label>
      //         </div>
      //         <div className={classes.checkboxField}>
      //           <input type="checkbox" id="defaultshipping" name="defaultshipping"/>
      //           <label htmlFor="defaultshipping">Use as my default shipping address</label>
      //         </div>
      //       </div>
      //       <div className={classes.actionBar}>
      //         <a href="#" className={classes.actionSaveBtn}>save</a>
      //       </div>
      //     </form>
      //   </div>
      // </div>
    )
  }
}

export default classify(defaultClasses)(AddNewAddressForm)