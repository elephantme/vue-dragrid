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
    console.log('bind')
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },

  onMouseDown(event){
    
    const isOnDrag = !!event.target.classList.contains('dragrid-drag-bar');
    if(isOnDrag) {
      console.log('down');
      eventHandler.pageX = event.pageX;
      eventHandler.pageY = event.pageY;
      eventHandler.el = event.target;
      eventHandler.offsetX = event.offsetX;
      eventHandler.offsetY = event.offsetY;
      console.log(event, event.offsetX)
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
      dragdrop.dragStart(eh.el, eh.offsetX, eh.offsetY);
      eh.drag = true;
    }
  },

  onMouseUp(event){
    if(!eventHandler.drag) return;
    delete eventHandler.pageX;
    delete eventHandler.pageY;
    delete eventHandler.drag;
    eventHandler.el = null;
    delete eventHandler.el;

    dragdrop.dragEnd();
  },

  isDrag(pageXFrom, pageYFrom, pageXTo, pageYTo){
    return Math.abs(pageXFrom - pageXTo) > 5 || 
      Math.abs(pageYFrom - pageYTo) > 5;
  }
};

export default eventHandler;