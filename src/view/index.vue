<!--
 * @Author: your name
 * @Date: 2021-07-14 22:40:16
 * @LastEditTime: 2021-09-16 23:30:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jiangbo\src\view\index.vue
-->
<template>
  <div>
    <children :title.sync="title"> </children>
    <p>{{ title }}</p>
    <el-button type="primary" @click="openDialog">打开组件</el-button>
    <el-button type="primary" @click="sendSrc">获取图片</el-button>
    <computer :show.sync="isShow" :data="data" @getdata="getData"></computer>
    <canvas-img
      :height="500"
      :width="500"
      :img-src="imgSrc"
      :data-list="list"
      :is-params="false"
      :is-draw="true"
    ></canvas-img>
    <!-- <canvas-img
      :height="500"
      :width="500"
      :img-src="imgSrc1"
      :data-list="list"
    ></canvas-img> -->
    <!-- <draw-canvas :height="500" :width="1000" :img-src="imgSrc"></draw-canvas> -->
  </div>
</template>
<script>
import children from '@/view/children/children'
import computer from '@/components/computer'
import canvasImg from '@/components/canvasImg'
import drawCanvas from '../components/drawCanvas.vue'
export default {
  name: 'Index',
  components: {
    children,
    computer,
    canvasImg,
    drawCanvas
  },
  data () {
    return {
      title: '中心思想',
      isShow: false,
      imgSrc: '',
      imgSrc1: '',
      list: [],
      data: [
        { name: '江波', age: '21', sex: '男' },
        { name: '蒋波', age: '22', sex: '男' },
        { name: '吴荣杰', age: '23', sex: '男' },
        { name: '江媛媛', age: '24', sex: '女' },
        { name: '黎婷婷', age: '25', sex: '女' },
        { name: '梁正勇', age: '26', sex: '男' }
      ]
    }
  },
  mounted () {
    // console.log(this.toTree1(this.arr))
  },
  watch: {},
  methods: {
    sendSrc () {
      this.imgSrc =
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
      this.imgSrc1 =
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      this.list = [
        { minX: 250, minY: 456, width: 50, height: 50 },
        { minX: 0, minY: 0, width: 50, height: 50 },
        { minX: 577, minY: 899, width: 50, height: 100 },
        { minX: 78, minY: 654, width: 50, height: 50 },
        { minX: 800, minY: 900, width: 50, height: 50 }
      ]
    },
    openDialog () {
      this.isShow = true
    },
    getData (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped></style>
