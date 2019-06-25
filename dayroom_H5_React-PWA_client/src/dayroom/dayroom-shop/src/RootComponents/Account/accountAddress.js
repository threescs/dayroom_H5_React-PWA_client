import React, { Component } from "react";
import classify from "src/classify";
import defaultClasses from "./accountAddress.css";
import { string, shape } from "prop-types";


class AccountAddress extends Component {
  static propTypes = {
    classes:shape({
      root:string,
      title:string,
      status:string
    })
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>address book</div>
        <div className={classes.content}>
          <div className={classes.addressList}>
            <div className={classes.addressItem}>
              <address>
                <p className={classes.name}>hahaha</p>
                <p className={classes.blockAddress}>hihihi</p>
                <p className={classes.city}>hehehe</p>
                <p className={classes.country}>hiehiehie</p>
                <p className={classes.telephone}>T:18989896688</p>
                <p className={classes.status}><em>(selected)</em></p>
              </address>
              <div className={classes.action}>
                <a href="#">Edit</a>
              </div>
            </div>
            <div className={classes.addressItem}>
              <address>
                <p className={classes.name}>hahaha</p>
                <p className={classes.blockAddress}>hihihi</p>
                <p className={classes.city}>hehehe</p>
                <p className={classes.country}>hiehiehie</p>
                <p className={classes.telephone}>18989896688</p>
                <p className={classes.selected}><em>(selected)</em></p>
              </address>
              <div className={classes.action}>
                <a href="#">Edit</a>
              </div>
            </div>
            <div className={classes.addressItem}>
              <address>
                <p className={classes.name}>hahaha</p>
                <p className={classes.blockAddress}>hihihi</p>
                <p className={classes.city}>hehehe</p>
                <p className={classes.country}>hiehiehie</p>
                <p className={classes.telephone}>18989896688</p>
                <p className={classes.selected}><em>(selected)</em></p>
              </address>
              <div className={classes.action}>
                <a href="#">Edit</a>
              </div>
            </div>
            <div className={classes.addressItem}>
              <address>
                <p className={classes.name}>hahaha</p>
                <p className={classes.blockAddress}>hihihi</p>
                <p className={classes.city}>hehehe</p>
                <p className={classes.country}>hiehiehie</p>
                <p className={classes.telephone}>18989896688</p>
                <p className={classes.selected}><em>(selected)</em></p>
              </address>
              <div className={classes.action}>
                <a href="#">Edit</a>
              </div>
            </div>
          </div>
          <div className={classes.action}>
            <a className={classes.addBtn} href="#">add new address</a>
          </div>
        </div>
      </div>
    )
  }
}

export default classify(defaultClasses)(AccountAddress);
