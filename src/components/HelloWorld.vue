<template>
  <div id="box">
    <codemirror
      ref="myCm"
      v-model="curCode"
      :options="cmOptions"
      class="code"
    ></codemirror>
    <el-button type="primary" @click="changeCode">获取code</el-button>
  </div>
</template>

<script>
// require component
import { codemirror } from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'

// require more codemirror resource...

import 'codemirror/mode/javascript/javascript' // 这js模式必须引入的

import 'codemirror/addon/selection/active-line' // 光标行背景高亮，配置里面也需要styleActiveLine设置为true
import 'codemirror/keymap/sublime' // sublime编辑器效果
import 'codemirror/mode/css/css'
import 'codemirror/theme/monokai.css' // 编辑器主题样式，配置里面theme需要设置monokai

// 下面这几个引入的主要是验证提示类的,配置里的lint需要设置true,gutters: ['CodeMirror-lint-markers']
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/json-lint'
// 代码折叠
import 'codemirror/addon/display/autorefresh' // 及时自动更新，配置里面也需要设置autoRefresh为true
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
// 代码搜索
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'

import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'

export default {
  name: 'HelloWorld',
  components: {
    codemirror
  },
  data () {
    return {
      curCode: '{"jiangbo":123,"bobo":345}',
      cmOptions: {
        mode: 'application/json',
        theme: 'monokai',
        lineNumbers: true, // 显示行号
        firstLineNumber: 1, // 起始行号
        styleActiveLine: true, // 选中行高亮
        tabSize: 2, // tab缩进
        matchBrackets: true, // 匹配括号
        lint: true, // 代码出错提醒
        smartIndent: false,
        foldGutter: true,
        lineWrapping: true,
        gutters: [
          'CodeMirror-lint-markers',
          'CodeMirror-linenumbers',
          'CodeMirror-foldgutter',
          'CodeMirror-lint-markers'
        ]
      }
    }
  },
  // watch: {
  //   curCode (n, o) {
  //     this.codemirror.setValue(JSON.stringify(JSON.parse(n), null, 2))
  //   }
  // },
  computed: {
    codemirror () {
      return this.$refs.myCm.codemirror
    }
  },
  mounted () {},
  methods: {
    changeCode () {
      console.log(this.curCode)
    },
    insertVar () {
      this.codemirror.replaceSelection('"{{lanfeng}}"')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#box {
  .CodeMirror {
    height: 50vh !important;
    width: 50vw;
  }
}
</style>
