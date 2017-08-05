<template>
  <div class="dragrid">
    <div 
      class="dragrid-item" 
      v-for="node of nodes"
      :style="getStyle(node)">
      <div class="dragrid-item-content">
        
      </div>
      <div class="dragrid-drag-bar"></div>
      <div class="dragrid-resize-bar"></div>
    </div>
  </div>
</template>

<script>
  import {config, nodes} from './config';

  export default {
    name: 'dragrid',

    data() {
      return {
        containerWidth: 960,
        nodes: nodes
      };
    },

    computed: {
      cfg() {
        let cfg = Object.assign({}, config);
        cfg.cellW = Math.floor(this.containerWidth / cfg.col);
        cfg.cellH = cfg.cellW; // 1:1
        return cfg;
      }
    },

    methods: {
      getStyle(node) {
        return {
          width: node.w * this.cfg.cellW + 'px',
          height: node.h * this.cfg.cellH + 'px',
          transform: "translate("+ node.x * this.cfg.cellW +"px, "+ node.y * this.cfg.cellH +"px)"
        };
      }
    }
  };
</script>

<style>
  .dragrid{
    position: relative;
  }

  .dragrid-item{
    position: absolute;
    width:320px;
    height: 320px;
  }

  .dragrid-item-content{
    margin: 5px;
    height: 100%;
    background: #ccc;
  }

  .dragrid-drag-bar{
    position: absolute;
    width: 40px;
    height: 20px;
    top: 0;
    background-color: #999;
    left: 50%;
    transform: translate(-20px, 5px);
    border-radius: 0 0 20px 20px;
    cursor: move;
  }

  .dragrid-resize-bar{
    position: absolute;
    width: 0px;
    height: 0px;
    bottom: -5px;
    right: 5px;
    border-left: 30px solid transparent;
    border-top: 30px solid transparent;
    border-bottom: 30px solid #999;
    cursor: se-resize;
  }
</style>