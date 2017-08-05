export default {
  getOffset(node, parent, offset) {
    offset = offset || {offsetX: 0, offsetY: 0};

    if(node === parent) {
      return offset;
    }

    offset.offsetX += node.offsetLeft;
    offset.offsetY += node.offsetTop;
    
    return this.getOffset(node.offsetParent, parent, offset);
  },

  searchUp(node, className) {
    if(node.classList.contains(className) || node === document.body) return node;
    return this.searchUp(node.parentNode, className);
  }
};