import Component from 'Components/component';

import './game-item.scss';

/**
 * This component includes an image and meta information when highlights
 * If the user presses enter, a detailed screen will display
 */
class GameItem extends Component {
    constructor(data) {
        super();
        this.data = data;
    }

    getBase() {
        return this.base;
    }

    render(parent) {
        this.base = this.createElem("game-item");
        parent.append(this.base);

        // Create dom elements for headline, image box, and description text
        const elementsList = [
            {
                name: "headline"
            }, {
                name: "box"
            }, {
                name: "desc"
            }
        ];
        elementsList.forEach((item) => {
            item.elem = this.createElem(item.name); // Save element to list for reference later
            this.base.append(item.elem); // Add to parent
        });

        const d = this.data;
        const recapData = d.editorial.recap.mlb;

        // Apply headline
        const headline = elementsList[0].elem;
        headline.innerHTML = recapData.headline;

        // Apply image
        const box = elementsList[1].elem;
        const img = recapData.image.cuts[0].src; // Locate image
        box.style.backgroundImage = `url(${img})`; // Apply to thumbnail

        // Apply desc
        const desc = elementsList[2].elem;
        desc.innerHTML = recapData.subhead;
    }
}
export default GameItem;
