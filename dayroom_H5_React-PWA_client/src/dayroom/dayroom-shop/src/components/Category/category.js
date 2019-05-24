import React, { Component } from 'react';
import { string, number, shape } from 'prop-types';
import { compose } from 'redux';
import { Query } from 'parentSrc/drivers';

import classify from 'src/classify';
import CategoryContent from './categoryContent';
import defaultClasses from './category.css';
import categoryQuery from 'src/queries/getCategory.graphql';

class Category extends Component {
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
        id: 3,
    };

    componentDidUpdate(prevProps) {
        // If the current page has changed, scroll back up to the top.
        if (this.props.currentPage !== prevProps.currentPage) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        const {
            id,
            classes,
            currentPage,
            pageSize,
        } = this.props;
         console.log(this.props);
        return (
            <Query
                query={categoryQuery}
                variables={{
                    id: Number(id),
                    onServer: false,
                    pageSize: Number(pageSize),
                    currentPage: Number(currentPage)
                }}
            >
                {({ loading, error, data }) => {
                    if (error) return <div>Data Fetch Error</div>;
                    // If our pagination component has mounted, then we have
                    // a total page count in the store, so we continue to render
                    // with our last known total
                    if (loading)
                        // return pageControl.totalPages ? (
                            <CategoryContent
                                pageSize={pageSize}
                            />

                    return (
                        <CategoryContent
                            classes={classes}
                            data={data}
                        />
                    );
                }}
            </Query>
        );
    }
}


export default compose(classify(defaultClasses))(Category);
