<!--
 * @Author: your name
 * @Date: 2021-09-15 21:59:28
 * @LastEditTime: 2021-09-16 22:42:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jiangbo\src\components\canvasImg.vue
-->
<template>
  <div>
    <canvas
      :height="height"
      :width="width"
      style="border: 1px solid #ccc"
      ref="myCanvas"
      @click="openView"
    />
    <el-dialog
      title="查看"
      :visible.sync="dialogView"
      width="1000px"
      :before-close="dialogViewClose"
    >
      <div style="margin:auto">
        <canvas ref="content" height="900" width="900"> </canvas>
      </div>
      <div slot="footer">
        <el-button @click="dialogViewClose">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'CanvasImg',
  props: {
    // 容器高度
    height: {
      type: Number,
      default: 300
    },
    // 容器宽度
    width: {
      type: Number,
      default: 300
    },
    // 图片地址
    imgSrc: {
      type: String,
      default: ''
    },
    // 框数据数组
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    imgSrc (n, o) {
      this.initImg(n)
    }
  },
  data () {
    return {
      ctx: null, // canvas实例
      imgX: 1, // 容器/图片宽比例
      imgY: 1, // 容器/图片高比例,
      dialogView: false
    }
  },
  methods: {
    dialogViewClose () {
      this.dialogView = false
    },
    openView () {
      this.dialogView = true
      this.$nextTick(() => {
        let canvas = this.$refs.content
        let viewCtx = canvas.getContext('2d')
        viewCtx.strokeStyle = 'red'
        viewCtx.lineWidth = 5
        let image = new Image()
        image.src = this.imgSrc
        image.onload = () => {
          let X = 900 / image.width
          let Y = 900 / image.height
          viewCtx.drawImage(image, 0, 0, 900, 900)
          this.dataList.forEach(item => {
            viewCtx.strokeRect(
              item.minX * X,
              item.minY * Y,
              item.width * X,
              item.height * Y
            )
          })
        }
      })
    },
    initImg (n) {
      let canvas = this.$refs.myCanvas
      this.ctx = canvas.getContext('2d')
      this.ctx.strokeStyle = 'red'
      this.ctx.lineWidth = 5
      let image = new Image()
      image.src = n
      image.onload = () => {
        this.imgX = this.width / image.width
        this.imgY = this.height / image.height
        this.ctx.drawImage(image, 0, 0, this.width, this.height)
        console.log(this.imgX, this.imgY)
        this.dataList.forEach(item => {
          this.ctx.strokeRect(
            item.minX * this.imgX,
            item.minY * this.imgY,
            item.width * this.imgX,
            item.height * this.imgY
          )
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
