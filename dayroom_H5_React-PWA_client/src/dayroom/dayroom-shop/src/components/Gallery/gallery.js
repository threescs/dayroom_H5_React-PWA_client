import React, { Component } from 'react';
import { string, shape, array, number } from 'prop-types';

import classify from 'parentSrc/classify';
import GalleryItems, { emptyData } from './items';
import defaultClasses from './gallery.css';

class Gallery extends Component {
    static propTypes = {
        classes: shape({
            filters: string,
            items: string,
            pagination: string,
            root: string
        }),
        data: array,
        pageSize: number
    };

    static defaultProps = {
        data: emptyData
    };

    render() {
        const { classes, data, pageSize } = this.props;
        const hasData = Array.isArray(data) && data.length;
        const items = hasData ? data : emptyData;
        items.map(item => {
            // if(item) {
            //     item.colorsLength = 0;
            // }
            if(item && item.media_gallery_entries) {
                item.media_gallery_entries.forEach(itm => {
                    if(itm.types.includes('small_image')) {
                        return item.small_image.url = itm.file;
                    }
                })
            }
            // if(item && item.configurable_options) {
            //     const colorsLength = item.configurable_options.values.length + 1;
            //     item['colorsLength'] = colorsLength;
            // }
        })
        return (
            <div className={classes.root}>
                <div className={classes.items}>
                    <GalleryItems items={items} pageSize={pageSize} />
                </div>
            </div>
        );
    }
}

export default classify(defaultClasses)(Gallery);
