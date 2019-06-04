import React, { Component } from 'react';
import CategoryList from '../../components/CategoryList';
import TopBanner from '../../components/TopBanner';
import EntranceList from '../../components/EntranceList'
import Category from '../../components/Category';
import Collection from '../../components/Collection';
import SwiperHint from '../../components/SwiperHint';
import SwiperProduct from '../../components/SwiperProduct';
import Recommend from 'src/components/Recommend'
export default class CMS extends Component {
    render() {

        return (
            <div>
            <TopBanner />
            <CategoryList title="Shop by categoryf" id={2} />
            <SwiperProduct id={54}/>
            <Collection />
            <Category pageSize={4} currentPage={1} id={53}/>
            <Recommend />
            <Category pageSize={4} currentPage={1} id={55}/>
            <SwiperHint />
            <EntranceList />
            </div>
        )
    }
}
