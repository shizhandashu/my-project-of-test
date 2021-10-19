<template>
  <div>
    <el-input v-model="data" @input="sendData"></el-input>
  </div>
</template>
<script>
export default {
  name: 'Children',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    this.data = this.title
  },
  computed: {},
  methods: {
    sendData () {
      this.$emit('update:title', this.data)
    }
  }
}
</script>
<style lang="scss" scoped></style>
