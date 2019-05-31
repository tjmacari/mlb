import './component.scss';

// Useful as an abstract class to provide common functionality to children
class Component {
    createElem(className) {
        const elem = document.createElement('div');
        elem.className = className;
        return elem;
    }
}
export default Component;
