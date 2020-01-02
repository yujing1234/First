<template>
  <div>
    <el-tree
      :props="props"
      node-key="id"
      lazy
      :load="loadNode"
      :expand-on-click-node="false"
      :render-content="renderContent"
      @node-click = 'nodeclick'
    ></el-tree>
    <el-dialog :visible.sync="dialogVisible" :title="title" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-input v-model="form.name"></el-input>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="quxiao">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
    inject:['reload'],
  data() {
    return {
      //   mydata: []
      props: {
        label: "name",
        children: true
      },
      dialogVisible: false,
      form: {
        name: ""
      },
      curid: "",
      title: "添加名称",
      flag: 1
    };
  },
  methods: {
    //   点击节点事件函数
    nodeclick(data,node){
        if(node.level>2){
            console.log(data)
            console.log('有内容了')
            this.$emit('getId',{id:data.id,name:data.name})
        }
    },
    //   取消
    quxiao() {
      this.dialogVisible = false;
      this.form.name = "";
    },
    //   form表单提交事件
    onSubmit() {
      // 添加
      if (this.flag === 1) {
        this.axios
          .post(this.$base.contentBaseUrl + this.$base.insertContentCategory, {
            parentId: this.curid,
            name: this.form.name
          })
          .then(data => {
            if (data.data.status === 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.reload();
            } else {
              this.$message({
                message: "添加失败",
                type: "error"
              });
            }
            this.dialogVisible = false;
            this.form.name = "";
          });
      } else {
        // 修改
        this.axios
          .post(this.$base.contentBaseUrl + this.$base.updateContentCategory, {
            id: this.curid,
            name: this.form.name
          })
          .then(data => {
            if (data.data.status === 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.reload();
            } else {
              this.$message({
                message: "修改失败",
                type: "error"
              });
            }
            this.dialogVisible = false;
            this.form.name = "";
          });
      }
    },
    //   tree懒加载
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.axios
          .post(
            this.$base.contentBaseUrl +
              this.$base.selectContentCategoryByParentId
          )
          .then(data => {
            console.log(data);
            return resolve(data.data.data);
          });
      } else {
        // 子级数据，需要id属性值
        this.axios
          .post(
            this.$base.contentBaseUrl +
              this.$base.selectContentCategoryByParentId,
            {
              id: node.data.id
            }
          )
          .then(data => {
            if (data.data.status == 200) {
              return resolve(data.data.data);
            } else {
              return resolve([]);
            }
          });
      }
    },
    // 自定义内容 tree 函数
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              添加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.update(node, data)}
            >
              修改
            </el-button>
          </span>
        </span>
      );
    },
    append(data) {
      this.curid = data.id;
      this.dialogVisible = true;
      this.flag = 1;
    },
    remove(node, data) {
      this.axios
        .post(
          this.$base.contentBaseUrl + this.$base.deleteContentCategoryById,
          {
            categoryId: data.id
          }
        )
        .then(data => {
          if (data.data.status === 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.reload();
          } else {
            this.$message({
              message: "删除失败",
              type: "error"
            });
          }
        });
    },
    update(node, data) {
      this.dialogVisible = true;
      this.title = "修改名称";
      this.curid = data.id;
      this.flag = 2;
    }
  }
};
</script>

<style lang="less" scoped>
</style>