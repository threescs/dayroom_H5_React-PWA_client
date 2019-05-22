import React, { Component } from 'react';
import { string, shape } from 'prop-types';
import classify from 'src/classify';
import defaultClasses from './entranceList.css';
import EntranceItem from './entranceItem';
import blog from './blog-home-pc.png';
import story from './story-home-pc.png';

class EntranceList extends Component {
    static propTypes = {
        title: string,
        classes: shape({
            root: string,
        })
    };
    render() {
        const mapEntranceData = [
            {
                text: 'Bright ideas for every room and every moment.',
                href: 'blog.html',
                hrefName: 'discover',
                src: blog,
            },
            {
                text: 'Factory-direct means you get the best stuff first, for way less.',
                href: 'story.html',
                hrefName: 'discover',
                src: story,
            },
        ]
        const mapEntranceList = mapEntranceData.map((item, index) => {
            return  <EntranceItem items={item} key={index}/>
        })
        const { classes } = this.props;
        return (
            <div className={classes.entranceBox}>
                 {mapEntranceList}
            </div>
        )
    }
}
export default classify(defaultClasses)(EntranceList);