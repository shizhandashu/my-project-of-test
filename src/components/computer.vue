<template>
  <div class="main">
    <el-dialog
      v-if="show"
      title="获取人员"
      :visible.sync="show"
      width="width"
      :before-close="dialogBeforeClose"
    >
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="leftContent">
              <el-row :gutter="10">
                <el-col :span="18"
                  ><el-input
                    v-model="name"
                    placeholder="搜索名字"
                    prefix-icon="el-icon-search"
                    @input="changeName"
                  ></el-input
                ></el-col>
                <el-col :span="6">
                  <div>
                    <el-checkbox
                      v-model="myself"
                      @change="changeSelf"
                      style="line-height:40px"
                      >已勾选</el-checkbox
                    >
                  </div>
                </el-col>
              </el-row>

              <ul class="ulClass">
                <li v-for="(item, index) in newData" :key="index">
                  <el-checkbox
                    v-model="item.checkboxStatus"
                    @change="changeCheck(item)"
                    >{{ item.name }}</el-checkbox
                  >
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="rightContent">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="age" label="年龄" align="center">
                </el-table-column>
                <el-table-column fixed="right" align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" @click="deleteRow(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer">
        <el-button @click="dialogBeforeClose">取 消</el-button>
        <el-button type="primary" @click="submitTable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Computer',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      myself: false,
      name: '',
      tableData: [],
      newData: [],
      oldData: []
    }
  },
  mounted () {
    this.oldData = []
    this.data.forEach(x => {
      this.oldData.push(JSON.parse(JSON.stringify(x)))
    })
    this.newData = this.oldData
  },
  methods: {
    deleteRow (row) {
      let index = this.tableData.findIndex(x => x.name === row.name)
      this.tableData[index].checkboxStatus = false
      this.tableData.splice(index, 1)
    },
    changeCheck (item) {
      if (item.checkboxStatus) {
        this.tableData.push(item)
      } else {
        this.deleteRow(item)
      }
    },
    changeSelf () {
      if (this.myself) {
        this.newData = this.newData.filter(x => x.checkboxStatus)
      } else {
        this.newData = this.oldData
      }
    },
    changeName () {
      if (this.name.length > 0) {
        let re = new RegExp(this.name)
        this.newData = this.newData.filter(x => re.test(x.name))
      } else {
        this.newData = this.oldData
      }
    },
    dialogClose () {
      this.tableData = []
      this.myself = false
      this.name = ''
      this.changeSelf()
    },
    dialogBeforeClose () {
      this.tableData.forEach(x => delete x.checkboxStatus)
      this.$emit('getdata', [])
      this.dialogClose()
      this.$emit('update:show', false)
    },
    submitTable () {
      this.tableData.forEach(x => delete x.checkboxStatus)
      this.$emit('getdata', this.tableData)
      this.dialogClose()
      this.$emit('update:show', false)
    }
  }
}
</script>
<style lang="scss">
.main {
  padding: 20px;
}
.leftContent {
  border: 1px solid #ccc;
  padding: 10px;
  height: 50vh;
  .ulClass {
    padding: 10px;
    height: calc(100% - 100px);
    overflow: auto;
    li {
      height: 40px;
      text-align: left;
      list-style: none;
      font-size: 20px;
      line-height: 40px;
    }
  }
}
.rightContent {
  border: 1px solid #ccc;
  padding: 10px;
  height: 50vh;
}
</style>
