import React, { Component } from 'react';
import classify from 'src/classify';
import Gallery from 'src/components/Gallery';
import Pagination from 'src/components/Pagination';
import defaultClasses from './category.css';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import categoryQuery from 'src/queries/getCategory.graphql';
import { Query } from 'src/drivers';

class CategoryContent extends Component {
    constructor(){
        super()
        this.state = { 
            tabIndex : 0
        }
    }
    setPage = (pageNumber, shouldReplace = false) => {
        const { history, location } = this.props;
        
        const { search } = location;
        const queryParams = new URLSearchParams(search);
        console.log(queryParams);
        const method = shouldReplace ? 'replace' : 'push';
        queryParams.set('id', pageNumber);
        history[method]({ search: queryParams.toString() });
    };
    getId() {
        const id = getQueryParameterValue({location:undefined,queryParameter:'id'});
        return id || 7;
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    render() {
        const { classes, pageControl, data, pageSize } = this.props;
        const items = data ? data.category.products.items : null;
        const title = data ? data.category.description : null;
        const categoryTitle = data ? data.category.name : null;
        const categoryImg = data ? data.category.custom_image_mobile : null;
        const categoryTab = data ? data.category.children : null;
        return (

            <article className={classes.root}>
                <h1 className={classes.title}>
                    {/* TODO: Switch to RichContent component from Peregrine when merged */}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                    <div className={classes.categoryBox}>
                        <div className={classes.categoryBanner}>
                            <img src={categoryImg} alt=''/>
                        </div>
                        <div className={classes.categoryTitle}>{categoryTitle}</div>
                    </div>
                </h1>
                <div className={classes.slideMenu}>
                    <ul className={classes.slideWraper}>
                        {
                            categoryTab.map( (item, index) => (
                                <li key={item.id} className={classes.munuItem} onClick={() => {this.setPage(item.id)}} style={{color: (index===this.state.tabIndex) ? '#333' : '#999'}}>{item.name}</li>
                            ))
                        }
                    </ul>
                </div>
                <section className={classes.gallery}>
                    <Gallery data={items} title={title} pageSize={pageSize} />
                </section>
                <div className={classes.pagination}>
                    <Pagination pageControl={pageControl} />
                </div>
            </article>
        );
    }
}

export default compose(classify(defaultClasses),
withRouter,
)(CategoryContent);
