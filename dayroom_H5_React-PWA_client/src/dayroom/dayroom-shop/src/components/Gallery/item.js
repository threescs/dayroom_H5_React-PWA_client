import React, { Component } from 'react';
import { string, number, shape } from 'prop-types';
import { Link, resourceUrl } from 'src/drivers';
import { Price } from '@magento/peregrine';
import classify from 'src/classify';
import { transparentPlaceholder } from 'parentSrc/shared/images';
import defaultClasses from './item.css';

const imageWidth = '300';
const imageHeight = '372';
// 骨架屏 pending
const ItemPlaceholder = ({ children, classes }) => (
    <div className={classes.root_pending}>
        <div className={classes.images_pending}>{children}</div>
        <div className={classes.name_pending} />
        <div className={classes.price_pending} />
    </div>
);

// TODO: get productUrlSuffix from graphql when it is ready
const productUrlSuffix = '.html';

class GalleryItem extends Component {
    static propTypes = {
        classes: shape({
            image: string,
            image_pending: string,
            imagePlaceholder: string,
            imagePlaceholder_pending: string,
            images: string,
            images_pending: string,
            name: string,
            name_pending: string,
            price: string,
            price_pending: string,
            root: string,
            root_pending: string
        }),
        item: shape({
            id: number.isRequired,
            name: string.isRequired,
            small_image: string.isRequired,
            url_key: string.isRequired,
            price: shape({
                minimalPrice: shape({
                    amount: shape({
                        value: number.isRequired,
                        currency: string.isRequired
                    }).isRequired
                }).isRequired,
                regularPrice: shape({
                    amount: shape({
                        value: number.isRequired,
                        currency: string.isRequired
                    }).isRequired
                }).isRequired
            }).isRequired
        })
    };

    render() {
        const { classes, item } = this.props;

        if (!item) {
            return (
                <ItemPlaceholder classes={classes}>
                    {this.renderImagePlaceholder()}
                </ItemPlaceholder>
            );
        }

        const { name, price, url_key, configurable_options } = item;
        console.log(item);
        const productLink = `/${url_key}${productUrlSuffix}`;
        // let colorLength; 
        // if (configurable_options) {
        //     colorLength = configurable_options[0].values ? configurable_options[0].values.length + 1 : 0;
        // } else {
        //     colorLength = 0;
        // }
        return (
            <div className={classes.root}>
                <Link to={resourceUrl(productLink)} className={classes.images}>
                    {this.renderImagePlaceholder()}
                    {this.renderImage()}
                </Link>
                {/* {
                    Boolean(colorLength) ? (
                        <div className={classes.colors}>
                            <div className={classes.colormsg}>{colorLength} colors</div>
                        </div>
                    ) : ('')
                } */}
                <div className={classes.colors}>
                    <div className={classes.colormsg}>3 colors</div>
                </div>
                <Link to={resourceUrl(productLink)} className={classes.name}>
                    <span>{name}</span>
                </Link>
                <div className={classes.price}>
                    <Price
                        value={price.minimalPrice.amount.value}
                        currencyCode={price.minimalPrice.amount.currency}
                    />
                </div>
                {/* old price */}
                <div className={classes.oldPrice}> 
                    <span className={classes.lable}>Reference Price</span>
                    <Price
                        value={price.regularPrice.amount.value}
                        currencyCode={price.regularPrice.amount.currency}
                    />
                </div>
            </div>
        );
    }

    renderImagePlaceholder = () => {
        const { classes, item } = this.props;

        const className = item
            ? classes.imagePlaceholder
            : classes.imagePlaceholder_pending;

        return (
            <img
                className={className}
                // 站位图
                src=''
                alt=""
                width={imageWidth}
                height={imageHeight}
            />
        );
    };

    /**
     * TODO: Product images are currently broken and pending a fix from the `graphql-ce` project
     * https://github.com/magento/graphql-ce/issues/88
     */
    renderImage = () => {
        const { classes, item } = this.props;

        if (!item) {
            return null;
        }

        const { small_image, name } = item;
        return (
            <img
                className={classes.image}
                // 图片cdn暂时更改
                src={ 'https://cdn.dayroom.co/media/catalog/product' + small_image}
                // src={resourceUrl(small_image, {
                //     type: 'image-product',
                //     width: imageWidth
                // })}
                alt={name}
                width={imageWidth}
                height={imageHeight}
            />
        );
    };
}

export default classify(defaultClasses)(GalleryItem);
