import React, { Component } from 'react';
import CategoryList from '../../components/CategoryList';
import EntranceList from '../../components/EntranceList'
export default class CMS extends Component {
    render() {
        return (
            <div> 
            <CategoryList title="Shop by categoryf" id={2} />
            <EntranceList />
            </div>
        )
    }
}
