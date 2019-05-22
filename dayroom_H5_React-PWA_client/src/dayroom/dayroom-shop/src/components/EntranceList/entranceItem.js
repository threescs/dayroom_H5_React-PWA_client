import React, { Component } from 'react';
import { string, shape } from 'prop-types';
import classify from 'src/classify';
import { Link } from 'src/drivers';
import defaultClasses from './entranceItem.css';

class EntranceItem extends Component {
    static propTypes = {
        items: shape({
            text: string,
            hrefName: string,
            href: string.isRequired,
            src: string,
        }).isRequired,
        classes: shape({
            containerBox: string,
            containerText: string,
            text: string,
            btn: string
        }).isRequired
    };
    render() {
        const { props } = this;
        const { classes, items } = props;
        return (
            <div className={classes.containerBox}>
                <div className={classes.containerText}>
                    <p className={classes.text}>{items.text}</p>
                    <Link className={classes.btn} to={items.href}>{items.hrefName}</Link>    
                </div>
                <img src={items.src} alt=''/>
            </div>
        )
    }
}

export default classify(defaultClasses)(EntranceItem);