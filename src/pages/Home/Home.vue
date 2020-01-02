
<template>
  <div class="addProduct">
    控制内层弹出框显示
    <el-button type="primary" @click="outerFn" class="addProduct">添加商品</el-button>
    <!-- 弹出框 -->
    <!-- 外层弹出框 -->

    <!-- <el-dialog :visible.sync="outerVisible" :title="dialogTitle" width="80%">
      
      <el-form ref="form" :model="form" label-width="80px">
        
        <el-form-item label="商品类目">
          <el-button type="primary" @click="innerFn">选择类目</el-button>
          <span>{{nodeName}}</span>
         
        </el-form-item> -->
        <!--  -->
        <!-- <el-form-item label="商品标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点">
          <el-input v-model="form.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item label="条形码"></el-form-item>
        <el-form-item label="商品图片"> -->
          <!-- 上传弹出框 -->
          <!-- <el-button type="primary" @click="uploadFn">上传图片</el-button>
          <img :src="form.image" alt class="uploadPic" />
        </el-form-item>
        <el-form-item label="商品描述"> -->
          <!-- 富文本编辑器 -->
          <!-- <vue-ueditor-wrap v-model="form.desc" :config="myConfig"></vue-ueditor-wrap>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form> -->

      <!-- 上传弹出框 -->
      <!-- <el-dialog :visible.sync="uploadVisible" title="上传图片" append-to-body width="50%">
        <el-upload
          class="upload-demo"
          ref="upload"
          :on-success="uploadSuccess"
          :action="$base.egoBaseUrl+$base.uploadpic"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">添加图片</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog> -->
      <!-- 内层弹出框 -->
      <!-- <el-dialog :visible.sync="innerVisible" title="商品类目选择" append-to-body width="70%">
        <el-tree :props="props" :load="loadNode" lazy></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="leimu">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog> -->

    <!-- 第一天商品列表展示 -->
    <!-- <el-table :data="tableData" style="width: 90%; margin:0 auto;">
      <el-table-column :show-overflow-tooltip="true" prop="id" label="商品ID"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="商品标题" prop="title" width="180"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="商品图片" prop="image" width="180"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="商品卖点" prop="sellPoint" width="180"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="price" label="商品价格"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="cid" label="商品类目"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="商品库存" prop="num"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="barcode" label="条形码"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="status" label="状态"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="created" label="创建日期"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updated" label="更新日期"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button circle size="mini" @click="handleEdit(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
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
    </el-table>-->


<el-button type="primary" @click="outerFn" class="addProduct">添加商品</el-button>
    <!-- 弹出框部分 -->
    <FlowOut :curpage='curpage' :predata="predata" :dialogTitle="dialogTitle" :outerVisible="outerVisible"></FlowOut>

    <!-- 展示列表 -->
    <el-table :data="tableData" style="width: 90%; margin:0 auto;">
      <el-table-column :show-overflow-tooltip="true" prop="id" label="商品ID"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="商品标题" prop="title" width="180"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="商品图片" prop="image" width="180"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="商品卖点" prop="sellPoint" width="180"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="price" label="商品价格"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="cid" label="商品类目"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="商品库存" prop="num"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="barcode" label="条形码"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="status" label="状态"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="created" label="创建日期"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updated" label="更新日期"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button circle size="mini" @click="handleEdit(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
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
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change='changepage'
      :total="1000">
    </el-pagination>



  </div> 
</template>

<script>
import FlowOut from '../../components/FlowOut/FlowOut'
// import VueUeditorWrap from "vue-ueditor-wrap";
// export default {
//   components: { VueUeditorWrap },
//   data() {
//     return {
//       tableData: [],
//       outerVisible: false,
//       innerVisible: false,
//       uploadVisible: false,
//       dialogTitle: "添加产品",

//       form: {
//         price: "",
//         num: "",
//         sellPoint: "",
//         title: "",
//         desc: "", //商品描述
//         image: "", //图片地址
//         cid: ""
//       },
//       myConfig: {
//         autoHeightEnabled: false,
//         initialFrameHeight: 240,
//         initialFrameWidth: "100%",
//         UEDITOR_HOME_URL: "/UEditor/"
//       },

//       // tree组件的属性
//       props: {
//         label: "name",
//         children: "true"
//       },
//       // 选中的类名，汉子形式
//       nodeName: ""
//     };
//   },
//   methods: {
//     //  tree的加载事件

//     loadNode(node, resolve) {
//       console.log(node);

//       if (node.level=== 0) {
//         this.axios
//           .get(this.$base.egoBaseUrl + this.$base.selectItemCategoryByParentId)
//           .then(data => {
//             console.log(data);
//             return resolve(data.data.data);
//           });
//       } else {
//         // 子集数据，需要id属性
//         this.axios
//           .get(
//             this.$base.egoBaseUrl + this.$base.selectItemCategoryByParentId,
//             {
//               params: { id: node.data.id }
//             }
//           )
//           .then(data => {
//             if (data.data.status == 200) {
//               return resolve(data.data.data);
//             } else {
//               return resolve([]);
//             }
//           });

//           // 选中的类名汉子形式
//           this.nodeName=node.data.name;
//           // 选中的类名id
//           this.form.cid=node.data.id;
//       }
//     },
//     handleEdit() {},
//     handleDelete() {},
//     //第二天
//     outerFn() {
//       this.outerVisible = true;
//     },
//     innerFn() {
//       this.innerVisible = true;
//     },

//     uploadFn() {
//       this.uploadVisible = true;
//     },

//     //上传图片功能
//     submitUpload() {
//       this.$refs.upload.submit();
//     },
//     // 上传图片成功
//     uploadSuccess(response) {
//       console.log(response);
//       this.form.image = response.data;
//       this.uploadVisible = false;
//       this.uploadPic=response.data
//     },
//     // 表单提交
//     onSubmit() {
//       console.log(this.form);
//       this.axios.get(this.$base.egoBaseUrl+this.$base.insertTbItem,{
//         params:this.form
//       })
//       .then(data=>{
//         console.log(data)
//         if(data.data.status==200){
//           this.$message({
//             message:'添加成功',
//             type:'success'
//           })
//             this.outerVisible=false
//         }
//       })
//     },

//     // 类目弹出框中的确认按钮

//     leimu() {
      
//     }
//   },
//   mounted() {
//     this.axios
//       .get(this.$base.egoBaseUrl + this.$base.selectTbItemAllByPage, {
//         params: {
//           page: 1
//         }
//       })
//       .then(data => {
//         console.log(data);
//         this.tableData = data.data.data.result;
//       });
//   }
// };




export default {
  components: { FlowOut },
  data() {
    return {
      outerVisible: false,
      dialogTitle: "添加产品",
      tableData: [],
      predata:{},
      curpage:1
    };
  },
  mounted() {
    this.getdata(this.curpage);
  },
  methods: {
    getdata(page) {
      this.axios
        .get(this.$base.egoBaseUrl + this.$base.selectTbItemAllByPage, {
          params: {
            page: page
          }
        })
        .then(data => {
          console.log(data);
          if(data.data.status == 200){
            this.tableData = data.data.data.result;
          }else{
            this.tableData = []
            this.$message({
              message:data.data.msg,
              type:'error'
            })
          }
          // console.log(this.tableData);
        });
    },
    // 编辑按钮
    handleEdit(index,row) {
      this.outerVisible = true;
      // 请求数据
      this.axios.post(this.$base.egoBaseUrl+this.$base.preUpdateItem,{itemId:row.id})
      .then(data=>{
        console.log(data)
        this.predata = data.data.data
      })
    },
    // 删除
    handleDelete(index,row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.get(this.$base.egoBaseUrl+this.$base.deleteItemById,{
            params:{itemId:row.id}
          })
          .then(data=>{
            if(data.data.status == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getdata(this.curpage);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });          
        });
    },
    outerFn() {
      this.outerVisible = true;
    },
    // 分页器事件
    changepage(index){
      this.curpage = index;
      this.getdata(this.curpage)
    }
  }
};




















</script>

<style lang="less" scoped>
.addProduct {
  margin: 10px auto;
  display: block;
}

.uploadPic {
  width: 200px;
}
</style>