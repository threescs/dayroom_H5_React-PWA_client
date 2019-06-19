import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Page } from '@magento/peregrine';
import ErrorView from 'src/components/ErrorView/index';
import CreateAccountPage from 'src/components/CreateAccountPage/index';
import Search from 'src/RootComponents/Search';
import Home from 'parentComponents/Home';
const renderRoutingError = props => <ErrorView {...props} />;

const renderRoutes = () => (
    <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/search.html" component={Search} />
        <Route exact path="/create-account" component={CreateAccountPage} />
        <Route render={() => <Page>{renderRoutingError}</Page>} />
    </Switch>
);

export default renderRoutes;
