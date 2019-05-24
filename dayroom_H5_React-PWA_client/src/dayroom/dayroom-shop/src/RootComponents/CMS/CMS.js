import React, { Component } from 'react';
import CategoryList from '../../components/CategoryList';
import EntranceList from '../../components/EntranceList'
import Category from '../../components/Category';
export default class CMS extends Component {
    render() {
        return (
            <div> 
            <CategoryList id={2} />
            <Category pageSize={4} currentPage={1} id={3}/>
            <EntranceList />
            </div>
        )
    }
}
