import React, { Component } from "react";
import classify from 'src/classify';
import { string,shape } from "prop-types";
import defaultClasses from './addressBook.css'
import { Link } from 'src/drivers';

class AddressBook extends Component {
  static propTypes = {
    classes:shape({
      root:string,
      title:string,
      content:string,
      contentItem:string,
      subTitle:string,
      addressInfo:string,
      name:string,
      addressDetail:string,
      addressCity:string,
      addressCountry:string,
      telephone:string,
      actions:string,
      edit:string,
      status:string,
      button:string
    })
  }

  getShippingAddressTitle(is){
    return is?<div className={this.props.classes.subTitle}>default shipping address</div>:null
  }

  getBillingAddressTitle(is){
    return is?<div className={this.props.classes.subTitle}>default shipping address</div>:null
  }

  render() {
    const { classes, addresses } = this.props;
    const shippingAddress = addresses.filter(function(item,index){
      return item.default_shipping
    })

    console.log('shippingAddress:',shippingAddress);
    const defautlShippingAddress = shippingAddress[0];


    const billingAddress = addresses.filter(function(item,index){
      return item.default_billing
    })

    const defaultBillingAddress = billingAddress[0];

    const generalAddress = addresses.filter(function(item,index){
      return !item.default_shipping && !item.default_billing
    })

    return (
      <div className={classes.root}>
        <h2 className={classes.title}>Address Book</h2>
        <div className={classes.content}>

        <div className={classes.contentItem}>
          <div className={classes.subTitle}>default shipping address</div>
          <div className={classes.addressInfo}>
            <address>
              <p className={classes.name}>{defautlShippingAddress.firstname}{defautlShippingAddress.lastname}</p>
              <p className={classes.addressStreet}>{defautlShippingAddress.street}</p>
              <p className={classes.addressDetail}>{defautlShippingAddress.city},{defautlShippingAddress.region.region},{defautlShippingAddress.postcode}</p>
              <p className={classes.addressCountry}>{defautlShippingAddress.country_id}</p>
              <p className={classes.telephone}>T:{defautlShippingAddress.telephone}</p>
            </address>
            <p className={classes.actions}><Link className={classes.edit} to="/accountNewAddress">edit</Link></p>
          </div>
        </div>
        <div className={classes.contentItem}>
          <div className={classes.subTitle}>default billing address</div>
          <div className={classes.addressInfo}>
            <address>
              <p className={classes.name}>{defaultBillingAddress.firstname}{defaultBillingAddress.lastname}</p>
              <p className={classes.addressStreet}>{defaultBillingAddress.street}</p>
              <p className={classes.addressDetail}>{defaultBillingAddress.city},{defaultBillingAddress.region.region},{defaultBillingAddress.postcode}</p>
              <p className={classes.addressCountry}>{defautlShippingAddress.country_id}</p>
              <p className={classes.telephone}>T:{defaultBillingAddress.telephone}</p>
            </address>
            <p className={classes.actions}><Link className={classes.edit} to="/accountNewAddress">edit</Link></p>
          </div>
        </div>
          {
            generalAddress.map((item, index) => (
              <div className={classes.contentItem} key={item.postcode}>
                <div className={classes.addressInfo}>
                <address>
                  <p className={classes.name}>{item.firstname}{item.lastname}</p>
                  <p className={classes.addressStreet}>{item.street}</p>
                  <p className={classes.addressDetail}>{item.city},{item.region.region},{item.postcode}</p>
                  <p className={classes.addressCountry}>{item.country_id}</p>
                  <p className={classes.telephone}>T:{item.telephone}</p>
                </address>
                  <p className={classes.actions}><Link className={classes.edit} to="/accountNewAddress">edit</Link></p>
                </div>
              </div>
            ))
          }
        </div>
        <div className={classes.actions}><Link to="/accountNewAddress" className={classes.button}>add new address</Link></div>
      </div>
    )
  }
}

export default classify(defaultClasses)(AddressBook)