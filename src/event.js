import dragdrop from './dragdrop';

const eventHandler = {
  init() {
    if(this.isBind) return;
    this.isBind = true;
    this.bindEvents();
  },

  unBindEvents() {
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  },

  bindEvents() {
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },

  onMouseDown(event){
    const isOnDrag = !!event.target.classList.contains('dragrid-drag-bar');
    const isOnResize = !!event.target.classList.contains('dragrid-resize-bar');
    console.log(event)
    if(isOnDrag || isOnResize) {
      eventHandler.pageX = event.pageX;
      eventHandler.pageY = event.pageY;
      eventHandler.el = event.target;
      eventHandler.offsetX = event.offsetX;
      eventHandler.offsetY = event.offsetY;
      eventHandler.isResize = isOnResize;
    }
    
  },

  onMouseMove(event){
    const eh = eventHandler;
    if(eh.el == null) return;

    if(eh.drag) {
      dragdrop.drag(event);
      return;
    }

    if(eh.isDrag(eh.pageX, eh.pageY, event.pageX, event.pageY)) {
      console.log('isDrag')
      dragdrop.dragStart(eh.el, eh.offsetX, eh.offsetY, eh.isResize);
      eh.drag = true;
    }
  },

  onMouseUp(event){
    if(eventHandler.drag){
      dragdrop.dragEnd();
    }
    delete eventHandler.pageX;
    delete eventHandler.pageY;
    delete eventHandler.drag;
    eventHandler.el = null;
    delete eventHandler.el;
    delete eventHandler.isResize;
  },

  isDrag(pageXFrom, pageYFrom, pageXTo, pageYTo){
    return Math.abs(pageXFrom - pageXTo) > 5 || 
      Math.abs(pageYFrom - pageYTo) > 5;
  }
};

export default eventHandler;