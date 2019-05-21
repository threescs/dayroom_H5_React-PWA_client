import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classify from 'parentSrc/classify';
import { Link, resourceUrl } from 'parentSrc/drivers';
import Icon from 'parentComponents/Icon';
import SearchIcon from 'react-feather/dist/icons/search';
import MenuIcon from 'react-feather/dist/icons/menu';
import CartTrigger from 'parentComponents/Header/cartTrigger';
import NavTrigger from 'parentComponents/Header/navTrigger';

import defaultClasses from './header.css';
import Logo from '../Logo';

class Header extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            logo: PropTypes.string,
            primaryActions: PropTypes.string,
            root: PropTypes.string,
            open: PropTypes.string,
            secondaryActions: PropTypes.string,
            toolbar: PropTypes.string
        }),
    };

    get searchIcon() {
        return <Icon src={SearchIcon} />;
    }

    render() {
        const { classes } = this.props;

        return (
            <header className={classes.open}>
                <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <NavTrigger>
                            <Icon src={MenuIcon} />
                        </NavTrigger>
                        <CartTrigger />
                    </div>
                    <Link to={resourceUrl('/')}>
                        <Logo classes={{ logo: classes.logo }} />
                    </Link>
                    
                </div>
            </header>
        );
    }
}

export default classify(defaultClasses)(Header);
