<template>
  <div class="dragrid" :name="name" :class="{'drag': current != ''}">
    <div 
      class="dragrid-item dragrid-animate" 
      v-for="node of nodes"
      :dg-id="node.id"
      :class="{'dragrid-placeholder': node.id === current}"
      :style="getStyle(node)">
      <div class="dragrid-item-content">
        
      </div>
      <div class="dragrid-drag-bar"></div>
      <div class="dragrid-resize-bar"></div>
    </div>
    <div class="dragrid-dragdrop"></div>
  </div>
</template>

<script>
  import {config, nodes} from './config';
  import eventHandler from './event';
  import cache from './cache';

  export default {
    name: 'dragrid',

    created() {
      eventHandler.init(this);
      cache.set(this.name, this);
    },

    data() {
      return {
        name: 'dragrid',
        containerWidth: 960,
        nodes: nodes,
        current: ""
      };
    },

    computed: {
      cfg() {
        let cfg = Object.assign({}, config);
        cfg.cellW = Math.floor(this.containerWidth / cfg.col);
        cfg.cellH = cfg.cellW; // 1:1
        return cfg;
      },

      currentNode() {
        if(!this.current) return null;
        return this.nodes.find(n => n.id === this.current);
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
  * {
    box-sizing: border-box;
  }

  .dragrid{
    position: relative;
    user-select: none;
  }

  .dragrid-item{
    position: absolute;
    padding: 5px;
  }

  .dragrid-item.current {
    background: #111;
  }

  .dragrid-animate{
    transition: transform .2s;
  }

  .dragrid-item-content{
    width: 100%;
    height: 100%;
    background: #AAC814;
  }

  .dragrid-drag-bar{
    position: absolute;
    width: 40px;
    height: 20px;
    top: 5px;
    background-color: #999;
    left: 50%;
    /*transform: translate(-20px, 5px);*/
    margin-left: -20px;
    border-radius: 0 0 20px 20px;
    cursor: move;
  }

  .dragrid-resize-bar{
    position: absolute;
    width: 0px;
    height: 0px;
    bottom: 5px;
    right: 5px;
    border-left: 30px solid transparent;
    border-bottom: 30px solid #999;
    cursor: se-resize;
  }

  .dragrid-placeholder:before{
    z-index: 1;
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    bottom: 5px;
    right: 5px;
    background: #ccc;
  }

  .dragrid-dragdrop{
    position: absolute;
    display: none;
  }

  .drag .dragrid-dragdrop{
    display: block;
    padding: 5px;
  }
</style>