import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Page } from '@magento/peregrine';
import ErrorView from 'parentSrc/components/ErrorView/index';
import CreateAccountPage from 'parentSrc/components/CreateAccountPage/index';
// import Search from 'src/RootComponents/Search';
// import Search from 'parentSrc/RootComponents/Search';
import Account from 'src/RootComponents/Account';
import AccountInfoForm from "src/RootComponents/Account/accountInfoForm";
import AccountAddress from "src/RootComponents/Account/accountAddress";
import AddNewAddress from "src/RootComponents/Account/addNewAddressForm"


const renderRoutingError = props => <ErrorView {...props} />;
const renderRoutes = () => (
    <Switch>
        <Route exact path="/accountEdit" component={AccountInfoForm} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/accountAddress" component={AccountAddress} />
        <Route exact path="/accountNewAddress" component={AddNewAddress} />


        {/* <Route exact path="/search.html" component={Search} /> */}
        <Route exact path="/create-account" component={CreateAccountPage} />
        <Route render={() => <Page>{renderRoutingError}</Page>} />
    </Switch>
);

export default renderRoutes;
