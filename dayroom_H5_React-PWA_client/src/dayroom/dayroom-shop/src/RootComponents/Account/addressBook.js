import React, { Component } from "react";
import classify from 'src/classify';
import { string,shape } from "prop-types";
import defaultClasses from './addressBook.css'

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
    render() {
      const { classes, addresses } = this.props;
      return (
        <div className={classes.root}>
          <h2 className={classes.title}>Address Book</h2>
          <div className={classes.content}>
            {
              addresses.map((item, index) => (
                <div className={classes.contentItem} key={item.postcode}>
                  <div className={classes.subTitle}>default billing address</div>
                  <div className={classes.addressInfo}>
                    <address>
                      <p className={classes.name}>{item.firstname}{item.lastname}</p>
                      <p className={classes.addressDetail}>{item.city},{item.region.region},{item.postcode}</p>
                      <p className={classes.addressCity}>Sydney,NAW,1523</p>
                      <p className={classes.addressCountry}>Australia</p>
                      <p className={classes.telephone}>T:{item.telephone}</p>
                      {/* <p className={classes.status}><em>(selected)</em></p> */}
                    </address>
                    <p className={classes.actions}><a className={classes.edit} href="#">edit</a></p>
                  </div>
                </div>
              ))
            }
          </div>
          <div className={classes.actions}><a href="#" className={classes.button}>add new address</a></div>
        </div>
      )
    }
}

export default classify(defaultClasses)(AddressBook)