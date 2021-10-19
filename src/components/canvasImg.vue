<!--
 * @Author: your name
 * @Date: 2021-09-15 21:59:28
 * @LastEditTime: 2021-09-17 00:40:08
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
        <el-button type="primary" @click="backDraw">撤回</el-button>
        <el-button type="primary" @click="nextDraw">前进</el-button>

        <canvas ref="content" :height="dialogHeight" :width="dialogWidth">
        </canvas>
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
    },
    // 是否显示参数
    isParams: {
      type: Boolean,
      default: false
    },
    // 是否可以绘制
    isDraw: { type: Boolean, default: false }
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
      oldX: 0, // 起始x坐标
      oldY: 0, // 起始y坐标
      newX: 0, // 结束x坐标
      newY: 0, // 结束y坐标
      dialogView: false, // 弹框开关
      dialogWidth: '900', // 弹框宽度
      dialogHeight: '900', // 弹框高度
      status: false, // 绘画状态
      images: null, // 图片实例
      setArr: [], // 操作步骤
      backArr: [], // 反悔数组
      selectedItem: {} // 选中的框
    }
  },
  methods: {
    backDraw () {
      if (this.setArr.length > 0) {
        this.backArr.push(this.setArr.pop())
        this.resetDraw()
      } else {
        this.$message.warning('无法撤回')
      }
    },
    nextDraw () {
      if (this.backArr.length > 0) {
        this.setArr.push(this.backArr.pop())
        this.resetDraw()
      } else {
        this.$message.warning('无法前进')
      }
    },
    dialogViewClose () {
      this.dialogView = false
    },
    resetDraw () {
      this.ctx.drawImage(this.images, 0, 0, this.dialogWidth, this.dialogHeight)
      this.setArr.forEach(item => {
        this.ctx.fillRect(item.minX, item.minY, item.width, item.height)
        this.ctx.strokeRect(item.minX, item.minY, item.width, item.height)
      })
    },
    onMouseMove (event) {
      console.log('移动')
      if (this.status) {
        this.resetDraw()
        let moveWidth = event.layerX - this.oldX
        let moveHeight = event.layerY - this.oldY
        this.ctx.fillRect(this.oldX, this.oldY, moveWidth, moveHeight)
        this.ctx.strokeRect(this.oldX, this.oldY, moveWidth, moveHeight)
      }
    },
    onMouseDown (event) {
      console.log('按下')
      this.status = true
      this.ctx.beginPath()
      this.oldX = event.layerX
      this.oldY = event.layerY
    },
    onMouseUp (event) {
      console.log('弹起')
      this.status = false
      this.newX = event.layerX
      this.newY = event.layerY
      this.saveXY()
    },
    saveXY () {
      let width = Math.abs(this.newX - this.oldX)
      let height = Math.abs(this.newY - this.oldY)
      let minX = this.newX > this.oldX ? this.oldX : this.newX
      let minY = this.newY > this.oldY ? this.oldY : this.newY
      if (width !== 0 && height !== 0) {
        this.setArr.push({
          minX,
          minY,
          width,
          height
        })
      }
    },
    onMousedblclick (event) {
      console.log('双击666', this.setArr)
      let clickX = event.layerX
      console.log('clickX', clickX)
      let clickY = event.layerY
      console.log('clickY', clickY)
      for (let i = this.setArr.length - 1; i > 0; i--) {
        let item = this.setArr[i]
        if (
          clickX >= item.minX &&
          clickX <= item.minX + item.width &&
          clickY >= item.minY &&
          clickY <= item.minY + item.height
        ) {
          this.selectedItem = {
            item,
            index: i
          }
          console.log('item', item)
          this.setArr = [item]
          this.resetDraw()
          break
        }
      }
    },
    openView () {
      this.dialogView = true
      this.$nextTick(() => {
        let canvas = this.$refs.content
        if (this.isDraw) {
          canvas.addEventListener('mousemove', this.onMouseMove, false)
          canvas.addEventListener('mousedown', this.onMouseDown, false)
          canvas.addEventListener('mouseup', this.onMouseUp, false)
          canvas.addEventListener('dblclick', this.onMousedblclick, false)
        }

        this.ctx = canvas.getContext('2d')
        this.ctx.strokeStyle = 'red'
        this.ctx.fillStyle = 'rgba(255,255,255,0.5)'
        this.ctx.lineWidth = 5
        this.images = new Image()
        this.images.src = this.imgSrc
        this.images.onload = () => {
          this.imgX = this.dialogWidth / this.images.width
          this.imgY = this.dialogHeight / this.images.height
          this.ctx.drawImage(
            this.images,
            0,
            0,
            this.dialogWidth,
            this.dialogHeight
          )
          this.dataList.forEach(item => {
            this.ctx.fillRect(
              item.minX * this.imgX,
              item.minY * this.imgY,
              item.width * this.imgX,
              item.height * this.imgY
            )
            this.ctx.strokeRect(
              item.minX * this.imgX,
              item.minY * this.imgY,
              item.width * this.imgX,
              item.height * this.imgY
            )
          })
        }
      })
    },
    initImg (n) {
      let canvas = this.$refs.myCanvas
      let viewCtx = canvas.getContext('2d')
      viewCtx.strokeStyle = 'red'
      viewCtx.lineWidth = 5
      let image = new Image()
      image.src = n
      image.onload = () => {
        let X = this.width / image.width
        let Y = this.height / image.height
        viewCtx.drawImage(image, 0, 0, this.width, this.height)
        this.dataList.forEach(item => {
          viewCtx.strokeRect(
            item.minX * X,
            item.minY * Y,
            item.width * X,
            item.height * Y
          )
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
