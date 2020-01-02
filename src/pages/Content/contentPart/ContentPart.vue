<template>
  <div>
    <el-button type="primary" @click="add">添加{{name}}</el-button>
    <!-- 展示列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width='50'></el-table-column>
      <el-table-column prop="title" :show-overflow-tooltip="true" label="标题"></el-table-column>
      <el-table-column prop="subTitle" :show-overflow-tooltip="true" label="子标题"></el-table-column>
      <el-table-column prop="content" :show-overflow-tooltip="true" label="描述"></el-table-column>
      <el-table-column prop="url" :show-overflow-tooltip="true" label="连接"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="pic" label="图片"></el-table-column>
      <el-table-column prop="created" :show-overflow-tooltip="true" label="创建日期"></el-table-column>
      <el-table-column prop="updated" :show-overflow-tooltip="true" label="更新日期"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button circle @click="handleClick(scope.row)" type="danger" size="small">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ["id", "name"],
  methods: {
    add() {}
  },
  data() {
    return {
      tableData: []
    };
  },
  watch: {
    id(n) {
      this.axios
        .post(
          this.$base.contentBaseUrl + this.$base.selectTbContentAllByCategoryId,
          {
            categoryId: n
          }
        )
        .then(data => {
          console.log(data);
          if (data.data.status === 200) {
            this.tableData = data.data.data.result;
          }else{
              this.tableData = []
              this.$message({
                  message:'暂无数据',
                  type:'danger'
              })
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
</style>