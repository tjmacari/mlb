import './component.scss';

// Useful as an abstract class to provide common functionality to children
class Component {

    // Create div and add to parent dom element, 3rd arg is optional
    createElem(classes, parent, type = 'div') {

        // Create new div
        const elem = document.createElement(type);

        // Classes to element
        classes.forEach((classStr) => {
            elem.classList.add(classStr);
        });

        console.log(elem);

        // Append to parent
        parent.append(elem);

        // Return dom element
        return elem;
    }

    // Set background image to element
    setBgImage(elem, url) {
        elem.style.backgroundImage = `url(${url})`;
    }

    // Apply content
    applyContent(elem, str) {
        elem.innerHTML = str;
    }
}
export default Component;
