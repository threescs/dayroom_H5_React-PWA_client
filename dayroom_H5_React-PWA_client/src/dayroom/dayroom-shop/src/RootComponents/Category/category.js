import React, { Component } from 'react';
import { string, number, shape } from 'prop-types';
import { compose } from 'redux';
import { connect, Query } from 'src/drivers';

import classify from 'src/classify';
import { setCurrentPage, setPrevPageTotal } from 'src/actions/catalog';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import CategoryContent from './categoryContent';
import defaultClasses from './category.css';
import categoryQuery from 'src/queries/getCategory.graphql';
import getQueryParameterValue from 'src/util/getQueryParameterValue';

class Category extends Component {
    constructor(){
        super()
        this.state = { 
            tabIndex : 0
        }
    }
    static propTypes = {
        id: number,
        classes: shape({
            gallery: string,
            root: string,
            title: string
        }),
        currentPage: number,
        pageSize: number,
        prevPageTotal: number
    };

    // TODO: Should not be a default here, we just don't have
    // the wiring in place to map route info down the tree (yet)
    static defaultProps = {
        id: 3
    };
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
    getCurrentPage() {
        const page = getQueryParameterValue({location:undefined,queryParameter:'page'});
        return page && page <= this.props.prevPageTotal?page:1; 
    }
    componentDidUpdate(prevProps) {
        // If the current page has changed, scroll back up to the top.
        if (this.props.currentPage !== prevProps.currentPage) {
            window.scrollTo(0, 0);
        }
    }
    componentWillReceiveProps(nextProps) {
       console.log(nextProps);
       }
    render() {
        const {
            id,
            classes,
            currentPage,
            pageSize,
            prevPageTotal,
            setCurrentPage,
            setPrevPageTotal
        } = this.props;
        const pageControl = {
            currentPage: currentPage,
            setPage: setCurrentPage,
            updateTotalPages: setPrevPageTotal,
            totalPages: prevPageTotal
        };
        return (
            <Query
                query={categoryQuery}
                variables={{
                    id: Number(id),
                    onServer: false,
                    pageSize: 6,
                    currentPage: this.getCurrentPage()
                }}
            >
                {({ loading, error, data }) => {
                    if (error) return <div>Data Fetch Error</div>;
                    // If our pagination component has mounted, then we have
                    // a total page count in the store, so we continue to render
                    // with our last known total
                    if (loading)
                        return pageControl.totalPages ? (
                            <CategoryContent
                                pageControl={pageControl}
                                pageSize={pageSize}
                            />
                        ) : (
                            loadingIndicator
                        );

                    // TODO: Retrieve the page total from GraphQL when ready
                    const pageCount =
                        data.category.products.total_count / pageSize;
                    const totalPages = Math.ceil(pageCount);
                    const totalWrapper = {
                        ...pageControl,
                        totalPages: totalPages
                    };

                    return (
                    <div>
                        {/* <div className={classes.slideMenu}>
                            <ul className={classes.slideWraper}>
                                {
                                    data.category.children.map( (item, index) => (
                                        <li key={item.id} className={classes.munuItem} onClick={() => {this.setPage(item.id)}} style={{color: (index===this.state.tabIndex) ? '#333' : '#999'}}>{item.name}</li>
                                    ))
                                }
                            </ul>
                        </div> */}
                         <CategoryContent
                            classes={classes}
                            pageControl={totalWrapper}
                            data={data}
                        />
                    </div>
                    );
                }}
            </Query>
        );
    }
}

const mapStateToProps = ({ catalog }) => {
    return {
        currentPage: catalog.currentPage,
        pageSize: catalog.pageSize,
        prevPageTotal: catalog.prevPageTotal
    };
};
const mapDispatchToProps = { setCurrentPage, setPrevPageTotal };

export default compose(
    classify(defaultClasses),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Category);
