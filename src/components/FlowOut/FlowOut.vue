<template>
  <div>
    <!-- 外层弹出框 -->
    <el-dialog
      :visible.sync="outerVisible"
      :title="dialogTitle"
      width="80%"
      :before-close="quxiao"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品类目">
          <el-button type="primary" @click="innerFn">选择类目</el-button>
          <span>{{nodeName}}</span>
        </el-form-item>
        <el-form-item label="商品标题">
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
        <el-form-item label="商品图片">
          <el-button type="primary" @click="uploadFn">上传图片</el-button>
          <img :src="form.image" alt class="uploadPic" />
        </el-form-item>
        <el-form-item label="商品描述">
          <!-- 富文本编辑器 -->
          <vue-ueditor-wrap v-model="form.desc" :config="myConfig"></vue-ueditor-wrap>
        </el-form-item>

        <!-- 规格参数 -->
        <el-form-item label="规格参数">
          <div v-for='(item,index) in guige' :key='index'>
            <h2>{{item.value}}</h2>
            <el-form-item :label="cs.value" v-for='(cs,idx) in item.children' :key='idx'>
              <el-input v-model="cs.uservalue"></el-input>
            </el-form-item>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="quxiao">取消</el-button>
        </el-form-item>
      </el-form>

      <!-- 上传弹出框 -->
      <el-dialog :visible.sync="uploadVisible" title="上传图片" append-to-body width="50%">
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
      </el-dialog>

      <!-- 商品类目 内层弹出框 -->
      <el-dialog :visible.sync="innerVisible" title="商品类目选择" append-to-body width="70%">
        <el-tree :props="props" :load="loadNode" lazy></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="leimu">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  props: ["outerVisible", "dialogTitle", "predata","curpage"],
  components: { VueUeditorWrap },
  data() {
    return {
      innerVisible: false,
      uploadVisible: false,
      id: "", //商品id
      form: {
        title: "",
        sellPoint: "",
        num: "",
        price: "",
        desc: "", // 商品描述
        image: "", // 商品图片地址
        cid: "" // 类名id
      },
      myConfig: {
        autoHeightEnabled: false,
        initialFrameHeight: 240,
        initialFrameWidth: "100%",
        UEDITOR_HOME_URL: "/UEditor/"
      },
      // tree组件的属性
      props: {
        label: "name",
        children: "true"
      },
      // 规格参数
      guige:[],
      // 选中的类名，汉字形式
      nodeName: ""
    };
  },
  methods: {
    // tree的加载事件
    loadNode(node, resolve) {
      console.log(node);

      if (node.level === 0) {
        this.axios
          .get(this.$base.egoBaseUrl + this.$base.selectItemCategoryByParentId)
          .then(data => {
            console.log(data);
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

        // 选中的类名，汉字形式
        this.nodeName = node.data.name;
        // 选中的类名id
        this.form.cid = node.data.id;
      }
    },
    innerFn() {
      this.innerVisible = true;
    },
    uploadFn() {
      this.uploadVisible = true;
    },
    // 上传组件的上传功能
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 上传组件成功事件
    uploadSuccess(response) {
      console.log(response);
      this.form.image = response.data;
      this.uploadVisible = false;
    },
    // form表单提交事件
    onSubmit() {
      // console.log(this.form)
      //   需要判断是修改还是新增
      // 判断标准是是否有id
      if (this.id) {
      // console.log(this.guige)
        // 修改
        this.axios
          .get(this.$base.egoBaseUrl + this.$base.updateProduct, {
            params: { id: this.id, itemParams:encodeURIComponent(JSON.stringify(this.guige)) ,...this.form }
          })
          .then(data => {
            if (data.data.status == 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              // 修改父级中的outerVisible属性
              this.$parent.outerVisible = false;
              this.$parent.getdata(this.curpage);
              //   初始化
              this.id = "";
              this.guige=[];
              this.form = {
                title: "",
                sellPoint: "",
                num: "",
                price: "",
                desc: "", // 商品描述
                image: "", // 商品图片地址
                cid: "", // 类名id
              };
              this.nodeName = "";
            }
          });
      } else {
        // 添加商品
        this.axios
          .get(this.$base.egoBaseUrl + this.$base.insertTbItem, {
            params: {itemParams:encodeURIComponent(JSON.stringify(this.guige)),...this.form}
          })
          .then(data => {
            if (data.data.status == 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              // 修改父级中的outerVisible属性
              this.$parent.outerVisible = false;
              this.$parent.getdata(this.curpage);
            }
          });
      }
    },
    // 类名弹出框中的确认按钮
    leimu() {
      this.innerVisible = false;
      // 获取规格参数
      this.axios.get(this.$base.egoBaseUrl+this.$base.selectItemParamByItemCatId+'/'+this.form.cid)
      .then(data=>{
        console.log(data.data)
        if(data.data.status==200){
          this.guige = JSON.parse(data.data.data.paramData)
        }
      })
    },
    quxiao() {
      this.$parent.outerVisible = false;
      //   初始化
      this.id = "";
      this.form = {
        title: "",
        sellPoint: "",
        num: "",
        price: "",
        desc: "", // 商品描述
        image: "", // 商品图片地址
        cid: "" // 类名id
      };
      this.nodeName = "";
    }
  },
  watch: {
    predata(n) {
      // 商品id
      this.id = n.item.id;
      //   商品参数
      this.form.title = n.item.title;
      this.form.sellPoint = n.item.sellPoint;
      this.form.num = n.item.num;
      this.form.price = n.item.price;
      this.form.desc = n.itemDesc;
      this.form.image = n.item.image;
      this.form.cid = n.item.cid;
      this.nodeName = n.itemCat;
      // 
      this.guige = JSON.parse(decodeURIComponent(n.itemParamItem))
      console.log(this.guige)
    }
  }
};
</script>

<style lang="less" scoped>
.uploadPic {
  width: 200px;
}
</style>