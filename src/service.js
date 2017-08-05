export default {
  getArea(nodes) {
    let area = [];
    nodes.forEach(n => {
      for(let row = n.y; row < n.y + n.h; row++){
        let rowArr = area[row];
        if(rowArr === undefined){
          area[row] = new Array();
        }
        for(let col = n.x; col < n.x + n.w; col++){
          area[row][col] = n.id;
        }
      }
    });
    return area;
  }
};