import React, { Component } from 'react';
import defaultClasses from './tabItem.css';

class TabItem extends Component {
    static propTypes = {
        classes: shape({
            root: string
        }),
    };
    render() {
        const { props } = this;
        const { tabs, classes } = props;
        return (
            <div className={classes.slideMenu}>
                <ul className={classes.slideWraper}>
                    {
                        tabs.map( (item, index) => (
                            <li key={item.id} className={classes.munuItem} style={{color: (index===this.state.tabIndex) ? '#333' : '#999'}}>{item.name}</li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default classify(defaultClasses)(TabItem);