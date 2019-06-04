import React, { Component } from 'react';
import classify from 'src/classify';
import Gallery from 'src/components/Gallery';
import Pagination from 'src/components/Pagination';
import defaultClasses from './category.css';

class CategoryContent extends Component {
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
                            categoryTab.map(item => (
                                <li key={item.id} className={classes.munuItem}>{item.name}</li>
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

export default classify(defaultClasses)(CategoryContent);
