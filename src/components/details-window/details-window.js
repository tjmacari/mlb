import Component from 'Components/component';

import './details-window.scss';

class DetailsWindow extends Component {
    constructor() {
        super(); // Must call in order to access parent scope / parent methods

        this.isActive = false;
    }

    // Show/hide details window
    toggleActive() {
        this.isActive = !this.isActive;

        if(this.isActive) {
            this.base.classList.remove('hide');
        } else {
            this.base.classList.add('hide');
        }
    }

    update(gameInfo) {
        // Background image
        const img = gameInfo.editorial.recap.mlb.image.cuts[0].src;
        this.content.style.backgroundImage = `url(${img})`; // Details window

        // Apply headline
        this.headline.innerHTML = gameInfo.editorial.recap.mlb.headline;
    }

    render(parent) {
        this.base = this.createElem("details-window");
        this.base.classList.add("hide");
        parent.append(this.base);

        this.content = this.createElem("box");
        this.content.classList.add("content");
        this.base.append(this.content);

        this.headline = this.createElem("headline");
        this.content.append(this.headline);

    }
}
export default DetailsWindow;
