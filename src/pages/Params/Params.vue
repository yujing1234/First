<template>
  <div class="paramsBox">
    <el-button type="primary" class="mybutton" @click="outerVisible=true">添加规格参数</el-button>
    <!-- 添加规格参数弹出窗 -->
    <el-dialog title="商品类目选择" :visible.sync="outerVisible" width="80%">
      <!-- 类目选择 tree -->
      <el-tree :props="props" :load="loadNode" lazy></el-tree>
      <el-dialog width="60%" title="添加分组" :visible.sync="innerVisible" append-to-body>
        <!-- 添加分组的Form -->
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
            <el-form-item>
                <el-button @click="addDomain">添加分组</el-button>
            </el-form-item>
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'规格' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
          >
            <el-input style="width:70%;" v-model="domain.value"></el-input>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>

            <el-button type='primary' @click="addDomainChild(index)">添加参数</el-button>
            <!-- 渲染子级 -->
            <el-form-item
              v-for="(item, idx) in dynamicValidateForm.domains[index].children"
              :label="'参数' + idx"
              :key="item.key"
              :prop="'domains['+index+'].children.' + idx + '.value'"
              :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
            >
              <el-input style="width:65%;" v-model="item.value"></el-input>
              <el-button @click.prevent="removeDomainChild(index,item)">删除</el-button>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
            <el-button type="primary" @click="resetForm('dynamicValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">确定并打开分组</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" style="width: 80%;margin:0 auto;">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="itemCatId" label="类目ID"></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="paramData"
        label="规格(只显示分组名称)"
        width="400"
      ></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="created" width="180" label="创建日期"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updated" width="180" label="更新日期"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            circle
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      outerVisible: false,
      innerVisible: false,
      props: {
        label: "name",
        children: "true"
      },
      cid: "",
      dynamicValidateForm: {
        domains: [
          {
            value: "",
            key: new Date().getTime(),
            children: [
              {
                value: "",
                uservalue:'',  //供用户输入的数据存储位置
                key: new Date().getTime()
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.getParams()
  },
  methods: {
    //   获取数据
    getParams(){
        this.axios
      .get(this.$base.egoBaseUrl + this.$base.selectItemParamAll)
      .then(data => {
        // console.log(data);
        if (data.data.status == 200) {
          this.tableData = data.data.data.result;
        }
      })
    },
      removeDomainChild(index,item){
          let num = this.dynamicValidateForm.domains[index].children.indexOf(item)
          if(num !=-1){
              this.dynamicValidateForm.domains[index].children.splice(num,1)
          }
      },
      addDomainChild(index){
          this.dynamicValidateForm.domains[index].children.push({
              value:'',
              key:new Date().getTime()
          })
      },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: new Date().getTime(),
        children:[]
      });
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item);
      if (index != -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    // 提交form表单
    submitForm(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log(this.dynamicValidateForm.domains,this.cid)
            this.axios.post(this.$base.egoBaseUrl+this.$base.insertItemParam,{
                itemCatId:this.cid,
                paramData:JSON.stringify(this.dynamicValidateForm.domains)
            }).then(data=>{
                if(data.data.status == 200){
                    this.$message({
                        message:'添加成功',
                        type:'success'
                    })
                    // 重新获取数据
                    this.getParams();
                    // 关闭窗口
                    this.outerVisible = false;
                    this.innerVisible = false;
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    handleDelete(index, row) {
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.get(this.$base.egoBaseUrl+this.$base.deleteItemParamById,{
            params:{id:row.id}
          })
          .then(data=>{
            //   console.log(data)
            if(data.data.status == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getParams();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });          
        });
    },
    // tree的加载事件
    loadNode(node, resolve) {
      // console.log(node)
      if (node.level === 0) {
        this.axios
          .get(this.$base.egoBaseUrl + this.$base.selectItemCategoryByParentId)
          .then(data => {
            // console.log(data);
            return resolve(data.data.data);
          });
      } else {
        // 子级数据，需要id属性值
        this.axios
          .get(
            this.$base.egoBaseUrl + this.$base.selectItemCategoryByParentId,
            {
              params: { id: node.data.id }
            }
          )
          .then(data => {
            if (data.data.status == 200) {
              return resolve(data.data.data);
            } else {
              return resolve([]);
            }
          });

        // 选中的类名id
        this.cid = node.data.id;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.paramsBox {
  text-align: center;
  .mybutton {
    margin: 10px 0;
  }
}
</style>