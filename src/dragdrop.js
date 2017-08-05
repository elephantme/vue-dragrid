import utils from './utils';
import cache from './cache';

export default {
  dragStart(el, offsetX, offsetY) {
    // 要拖拽的节点
    const dragNode = utils.searchUp(el, 'dragrid-item');
    // 容器
    const dragContainer = utils.searchUp(el, 'dragrid');
    // 拖拽实例
    const instance = cache.get(dragContainer.getAttribute('name'));
    // 拖拽节点
    const dragdrop = dragContainer.querySelector('.dragrid-dragdrop');
    // 拖拽节点id
    const dragNodeId = dragNode.getAttribute('dg-id');

    // 设置拖拽节点
    dragdrop.setAttribute('style', dragNode.getAttribute('style'));
    dragdrop.innerHTML = dragNode.innerHTML;
    instance.current = dragNodeId;

    const offset = utils.getOffset(el, dragNode, {offsetX, offsetY});
    // 容器偏移
    const containerOffset = dragContainer.getBoundingClientRect();

    // 缓存数据
    this.offsetX = offset.offsetX;
    this.offsetY = offset.offsetY;
    this.dragrid = instance;
    this.dragElement = dragdrop;
    this.dragContainer = dragContainer;
    this.containerOffset = containerOffset;
  },

  drag(event) {
    const pageX = event.pageX, pageY = event.pageY;

    const x = pageX - this.containerOffset.left - this.offsetX,
          y = pageY - this.containerOffset.top - this.offsetY;

    console.log(x, y)

    this.dragElement.style.cssText += ';transform:translate('+ x +'px, '+ y +'px)';
  },

  dragEnd() {
    this.dragrid.current = "";

    this.offsetX = undefined;
    this.offsetY = undefined;
    this.dragrid = null;
    this.dragElement = null;
    this.dragContainer = null;
    this.containerOffset = null;
  }
};