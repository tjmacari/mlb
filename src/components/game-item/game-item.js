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

    // Return base dom element
    getBase() {
        return this.base;
    }

    // Render the component and place inside parent
    render(parent) {
        this.base = this.createElem(["game-item"], parent); // Create base/root dom element for game item

        // Create dom elements for headline, image box, and description text
        const elementsList = [
            {name: "headline"}, // Index 0
            {name: "box"},      // Index 1
            {name: "desc"}      // Index 2
        ];
        elementsList.forEach((item) => {
            item.elem = this.createElem([item.name], this.base); // Save element to list for reference later
        });

        const d = this.data.editorial; // Get game data
        if(d && d.recap && d.recap && d.recap.mlb) {

            // Get recap data
            const mlb = d.recap.mlb;

            // Get date, will add this to desc below
            const dateStr = new Date(mlb.date).toDateString(); // ie: Wed May 29 2019
            
            // Grab info for headline, background image, and description
            const headlineStr = mlb.headline;
            const imageUrl = mlb.image.cuts[0].src;
            const descStr = `${dateStr}<br/><br/>${mlb.subhead || mlb.image.title}`; // Some recaps do not have a subhead, so default to image text

            // Apply headline
            const headline = elementsList[0].elem; // Reference DOM element
            headline.innerHTML = headlineStr;

            // Apply image
            const box = elementsList[1].elem; // Reference DOM element
            box.style.backgroundImage = `url(${imageUrl})`; // Apply to thumbnail

            // Apply desc
            const desc = elementsList[2].elem; // Reference DOM element
            desc.innerHTML = descStr; // Apply description
        }

    }
}
export default GameItem;
