import React, { Component, Suspense } from 'react';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Price } from '@magento/peregrine';
import { compose } from 'redux';

import classify from 'parentSrc/classify';
import { connect } from 'parentSrc/drivers';
import Button from 'src/components/Button';
import { loadingIndicator } from 'parentComponents/LoadingIndicator';
// import Carousel from 'parentComponents/ProductImageCarousel';
import Quantity from 'parentComponents/ProductQuantity';
// import RichText from 'parentComponents/RichText';
import defaultClasses from './productFullDetail.css';
import appendOptionsToPayload from 'parentSrc/util/appendOptionsToPayload';
import findMatchingVariant from 'parentSrc/util/findMatchingProductVariant';
import isProductConfigurable from 'parentSrc/util/isProductConfigurable';
import Accordion from 'src/components/Accordion'
import Category from 'src/components/Category';

import SwiperContainer from "src/components/SwiperContainer";
import SwiperSlide from "src/components/SwiperSlide";

// import { resourceUrl } from 'parentSrc/drivers';
import { transparentPlaceholder } from 'parentSrc/shared/images';

import  "./productFullDetail.scss"

const Options = React.lazy(() => import('parentComponents/ProductOptions'));

class ProductFullDetail extends Component {
    static propTypes = {
        classes: shape({
            cartActions: string,
            description: string,
            descriptionTitle: string,
            details: string,
            detailsTitle: string,
            imageCarousel: string,
            options: string,
            productName: string,
            productPrice: string,
            quantity: string,
            quantityTitle: string,
            root: string,
            title: string
        }),
        product: shape({
            __typename: string,
            id: number,
            sku: string.isRequired,
            price: shape({
                regularPrice: shape({
                    amount: shape({
                        currency: string.isRequired,
                        value: number.isRequired
                    })
                }).isRequired
            }).isRequired,
            media_gallery_entries: arrayOf(
                shape({
                    label: string,
                    position: number,
                    disabled: bool,
                    file: string.isRequired
                })
            ),
            description: string
        }).isRequired,
        addToCart: func.isRequired,
        buyNow: func.isRequired
    };

    static getDerivedStateFromProps(props, state) {
        const { configurable_options } = props.product;
        const optionCodes = new Map(state.optionCodes);

        // if this is a simple product, do nothing
        if (!isProductConfigurable(props.product)) {
            return null;
        }

        // otherwise, cache attribute codes to avoid lookup cost later
        for (const option of configurable_options) {
            optionCodes.set(option.attribute_id, option.attribute_code);
        }

        return { optionCodes };
    }

    state = {
        optionCodes: new Map(),
        optionSelections: new Map(),
        quantity: 1
    };

    setQuantity = quantity => this.setState({ quantity });
    
    addToCart = () => {
        const { props, state } = this;
        const { optionSelections, quantity, optionCodes } = state;
        const { addToCart, product } = props;

        const payload = {
            item: product,
            productType: product.__typename,
            quantity
        };

        if (isProductConfigurable(product)) {
            appendOptionsToPayload(payload, optionSelections, optionCodes);
        }
        addToCart(payload);
    };

    buyNow = () => {
        const { props, state } = this;
        const { optionSelections, quantity, optionCodes } = state;
        const { buyNow, product } = props;

        const payload = {
            item: product,
            productType: product.__typename,
            quantity
        };

        if (isProductConfigurable(product)) {
            appendOptionsToPayload(payload, optionSelections, optionCodes);
        }
        buyNow(payload);
    }

    handleSelectionChange = (optionId, selection) => {
        this.setState(({ optionSelections }) => ({
            optionSelections: new Map(optionSelections).set(
                optionId,
                Array.from(selection).pop()
            )
        }));
    };

    get fallback() {
        return loadingIndicator;
    }

    get productOptions() {
        const { fallback, handleSelectionChange, props } = this;
        const { configurable_options } = props.product;
        const isConfigurable = isProductConfigurable(props.product);
        if (!isConfigurable) {
            return null;
        }

        return (
            <Suspense fallback={fallback}>
                <Options
                    options={configurable_options}
                    onSelectionChange={handleSelectionChange}
                />
                {/* <select onSelect={handleSelectionChange}>
                    {
                        configurable_options[0].values.map(item => (
                            <option value ={item.value_index} >{item.label}</option>
                        ))
                    }
                </select> */}
            </Suspense>
        );
    }

    get mediaGalleryEntries() {
        const { props, state } = this;
        const { product } = props;
        const { optionCodes, optionSelections } = state;
        const { media_gallery_entries, variants } = product;

        const isConfigurable = isProductConfigurable(product);

        if (
            !isConfigurable ||
            (isConfigurable && optionSelections.size === 0)
        ) {
            return media_gallery_entries;
        }

        const item = findMatchingVariant({
            optionCodes,
            optionSelections,
            variants
        });

        if (!item) {
            return media_gallery_entries;
        }

        return [
            ...item.product.media_gallery_entries,
            ...media_gallery_entries
        ];
    }

    get isMissingOptions() {
        const { product } = this.props;

        // Non-configurable products can't be missing options
        if (!isProductConfigurable(product)) {
            return false;
        }

        // Configurable products are missing options if we have fewer
        // option selections than the product has options.
        const { configurable_options } = product;
        const numProductOptions = configurable_options.length;
        const numProductSelections = this.state.optionSelections.size;

        return numProductSelections < numProductOptions;
    }

    render() {
        const {
            addToCart,
            isMissingOptions,
            mediaGalleryEntries,
            productOptions,
            props,
            buyNow
        } = this;
        const { classes, isAddingItem, product } = props;
        const { regularPrice, minimalPrice } = product.price;
        const reURL = /^(https?|ftp|file):\/\/.+$/;
        mediaGalleryEntries.map(item => {
            if(item && item.file) {
                if (!reURL.test(item.file)) {
                    item.file = "https://cdn.dayroom.co/media/catalog/product" + item.file;
                }
                return item;
            }
        })
        // We want this key to change whenever mediaGalleryEntries changes.
        // Make it dependent on a unique value in each entry (file),
        // and the order.

        // const carouselKey = mediaGalleryEntries.reduce((fullKey, entry) => {
        //     return `${fullKey},${entry.file}`;
        // }, '');
        const savePrice = (regularPrice.amount.value - minimalPrice.amount.value).toFixed(2);
        const saveFixed = ((savePrice / regularPrice.amount.value) * 100 ).toFixed(0) + '%';
        const afferPrice = ((minimalPrice.amount.value) / 4).toFixed(2);
        const descriptionData = [
            {
              id:0,
              title:'Description',
              sublists:[
                {
                  id:0,
                  content: '<div class="desc-value">' + product.description + '</div>',
                  url:'javascript:;'
                }
              ]
            },
            {
              id:1,
              title:'Dimensions',
              sublists:[
                {
                  id:0,
                  content:'contact us',
                  url:'javascript:;'
                },
                {
                  id:1,
                  content:'payment method',
                  url:'javascript:;'
                }
              ]
            },
            {
              id:3,
              title:'Specifications',
              sublists:[
                {
                  id:0,
                  content:'Terms & Conditions',
                  url:'javascript:;'
                },
                {
                  id:1,
                  content:'Privacy & Scurity policy',
                  url:'javascript:;'
                }
              ]
            }
          ];

        const settings = {
            thumbs:true,
            slidesPerView: 3.5,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            freeMode: true,
            loopedSlides: 5
        }

        return (
            <Form className={classes.root}>
                <section className={classes.imageCarousel}>
                    {/* <Carousel images={mediaGalleryEntries} key={carouselKey} /> */}
                    {/* <DetailSwiper /> */}
                    <div className="detail-swiper-gallery">
                        <SwiperContainer settings={settings} className="detail-swiper-gallery">
                            <div className="swiper-wrapper">
                                {
                                    mediaGalleryEntries.map(item=>(
                                        <SwiperSlide>
                                            {/* <img src={ item.file? resourceUrl( "https://cdn.dayroom.co/media/catalog/product" + item.file, { type: 'image-product'}):transparentPlaceholder} alt="" /> */}
                                            <img src={ item.file ? item.file : transparentPlaceholder} alt="" />
                                        </SwiperSlide>
                                    ))
                                }
                            </div>
                            <div className="swiper-wrapper">
                                {
                                    mediaGalleryEntries.map(item=>(
                                        <SwiperSlide>
                                            <div className="border-bottom"></div>
                                            <img src={ item.file ? item.file : transparentPlaceholder} alt="" />
                                        </SwiperSlide>
                                    ))
                                }
                            </div>
                        </SwiperContainer>
                    </div>
                </section>
                {/* 商品名称/价格 start */}
                <section className={classes.productBox}>
                    <div>
                        <h1 className={classes.prodacutName}>{product.name}</h1>
                    </div>
                    <p className={classes.price}>
                        <span className={classes.newPrice}>
                        <Price
                            currencyCode={minimalPrice.amount.currency}
                            value={minimalPrice.amount.value}
                        />
                        </span>
                        <span className={classes.oldPrice}>&nbsp;
                        Reference Price
                        <Price
                            currencyCode={regularPrice.amount.currency}
                            value={regularPrice.amount.value}
                        />
                        </span>
                    </p>
                    <p className={classes.savePrice}>
                        You Save {savePrice} ({saveFixed})
                    </p>
                    <p className={classes.installPrice}>
                    or 4 interest-free payments of A${afferPrice};
                    </p>
                    <div className={classes.amount}>
                        <span className={classes.logo}></span>
                        <span className={classes.afterpay}>Learn more</span>
                    </div>
                </section>
                {/* 商品名称/价格 end*/}
                <section className={classes.options}>{productOptions}</section>
                <section className={classes.quantity}>
                    {/* <h2 className={classes.quantityTitle}>
                        <span>Quantity</span>
                    </h2> */}
                    <Quantity
                        initialValue={this.state.quantity}
                        onValueChange={this.setQuantity}
                    />
                </section>
                <section className={classes.cartActions}>
                    <Button
                        priority="high"
                        onClick={addToCart}
                        disabled={isAddingItem || isMissingOptions}
                    >
                        <span>Add to Cart</span>
                    </Button>
                    <Button
                        priority="high"
                        onClick={buyNow}
                        disabled={isAddingItem || isMissingOptions}
                    >
                        <span>Buy It Now</span>
                    </Button>
                </section>
                <section className={classes.shiping}>
                    <p className={classes.shipingIcon}>
                        <img className={classes.icon} src='https://storage.googleapis.com/picksmart-img-au/assets/icon-fly.png' alt=''/>
                        Free shipping to Australia, US, UK and Canada</p>
                    <p className={classes.shipingIcon}>
                        <img className={classes.icon} src='https://storage.googleapis.com/picksmart-img-au/assets/icon-ship.png' alt=''/>
                        14 days no hassle returns</p>
                </section>
                <section className={classes.feature}>
                    <div className={classes.containerBox}>
                        <img className={classes.containerIcon} src={product.feature_1_icon} alt='' />
                        <div className={classes.text}>{product.feature_1_text}</div>
                    </div>
                    <div className={classes.containerBox}>
                        <img className={classes.containerIcon} src={product.feature_2_icon} alt='' />
                        <div className={classes.text}>{product.feature_2_text}</div>
                    </div>
                    <div className={classes.containerBox}>
                        <img className={classes.containerIcon} src={product.feature_3_icon} alt='' />
                        <div className={classes.text}>{product.feature_3_text}</div>
                    </div>
                </section>
                <section className={classes.description}>
                    <div className="product-accordion">
                        <Accordion items={descriptionData}> </Accordion>
                    </div>
                </section>
                <section className={classes.recommend}>
                    <h2 className={classes.titleTxt}>You May Also Like</h2>
                    <Category pageSize={4} currentPage={1} id={55}/>
                </section>
                {/* <section className={classes.details}>
                    <h2 className={classes.detailsTitle}>
                        <span>SKU</span>
                    </h2>
                    <strong>{product.sku}</strong>
                </section> */}
            </Form>
        );
    }
}

const mapStateToProps = ({ cart }) => {
    return {
        isAddingItem: cart.isAddingItem
    };
};

export default compose(
    classify(defaultClasses),
    connect(mapStateToProps)
)(ProductFullDetail);
