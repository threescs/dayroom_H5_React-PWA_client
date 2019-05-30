import React, { Component } from 'react';
import CategoryList from '../../components/CategoryList';
import TopBanner from '../../components/TopBanner';
import EntranceList from '../../components/EntranceList'
import Category from '../../components/Category';
import Collection from '../../components/Collection';
import SwiperHint from '../../components/SwiperHint';
import SwiperProduct from '../../components/SwiperProduct';
export default class CMS extends Component {
    render() {

        return (
            <div>
            <TopBanner />
            <CategoryList title="Shop by categoryf" id={2} />
            <SwiperProduct />
            <Collection />
            <Category pageSize={4} currentPage={1} id={53}/>
            <SwiperHint />
            <EntranceList />
            </div>
        )
    }
}
