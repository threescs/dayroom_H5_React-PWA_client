import React, { Component } from 'react';
import CategoryList from '../../components/CategoryList';
import TopBanner from '../../components/TopBanner';

import EntranceList from '../../components/EntranceList'
import Category from '../../components/Category';
export default class CMS extends Component {
    render() {

        return (
            <div>
            <TopBanner/>
            <CategoryList title="Shop by categoryf" id={1} />
            <Category pageSize={4} currentPage={1} />
            <EntranceList />
            </div>
        )
    }
}
