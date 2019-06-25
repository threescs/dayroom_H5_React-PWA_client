import React, { Component } from "react";
import classify from 'src/classify'
// import defaultClasses from './accountMain.scss'
import { Query } from 'src/drivers';
import AddressBook from './addressBook';
import AccountInfo from "./accountInfo";
// import AccountInfoForm from './accountInfoForm';
import addressQuery from 'src/queries/getAddress.graphql';
import { loadingIndicator } from 'src/components/LoadingIndicator';
class AccountMain extends Component {
  render() {
    return (
      <Query
        query={addressQuery}
        >
          {({ loading, error, data }) => {
            const customerInfo = data ? data.customer : null;
            const addressesd = (data && data.customer) ? data.customer.addresses : null;
            if (error) return <div>Data Fetch Error</div>;
            if (loading) return (loadingIndicator)
            return (
              <div>
                <AccountInfo customerInfo={customerInfo}/>
                <AddressBook addresses={addressesd}/>
                {/* <AccountInfoForm/> */}
              </div>
            )
          }}
        </Query>

    )
  }
}

export default classify({})(AccountMain)