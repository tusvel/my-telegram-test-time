import { ElementNode } from 'lexical';

export class CustomParagraph extends ElementNode {
  constructor(text) {
    super();
    this.text = text;
  }

  static getType() {
    return 'custom-toggle';
  }

  static clone(node) {
    return new CustomParagraph(node.__key);
  }

  createDOM() {
    // Define the DOM element here
    const dom = document.createElement('tg-spoiler');
    dom.insertAdjacentHTML('afterbegin', this.text);
    return dom;
  }

  updateDOM(prevNode, dom) {
    // Returning false tells Lexical that this node does not need its
    // DOM element replacing with a new copy from createDOM.
    return false;
  }
}

export function $createCustomToggle() {
  return new CustomParagraph();
}
