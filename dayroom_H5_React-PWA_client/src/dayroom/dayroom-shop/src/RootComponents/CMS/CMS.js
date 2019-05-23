import React, { Component } from 'react';
import CategoryList from '../../components/CategoryList';
import TopBanner from '../../components/TopBanner';

export default class CMS extends Component {
    render() {

        return (
            <div>
            <TopBanner/>
            <CategoryList title="Shop by categoryf" id={2} />
            </div>
        )
    }
}
