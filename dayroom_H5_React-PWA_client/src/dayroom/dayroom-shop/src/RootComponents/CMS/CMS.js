import React, { Component } from 'react';
import CategoryList from '../../components/CategoryList';

export default class CMS extends Component {
    render() {
        return (
            <div> 
            <CategoryList title="Shop by categoryf" id={2} />
            </div>
        )
    }
}
