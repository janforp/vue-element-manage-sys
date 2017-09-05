<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="大理石名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getStoneList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddStone">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="stoneList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="stoneName" label="大理石名" width="120" sortable></el-table-column>
      <el-table-column prop="costPrice" label="进价" width="100" sortable></el-table-column>
      <el-table-column prop="sellPrice" label="售价" width="100" sortable></el-table-column>
      <el-table-column prop="remainNum" label="数量" width="120" sortable></el-table-column>
      <el-table-column prop="sellPoints" label="特点" min-width="180" sortable></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleStoneEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelStone(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemoveStones" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentStoneChange" :page-size="pageSize" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addStoneFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="名称" prop="stoneName">
          <el-input v-model="addForm.stoneName" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="性别">-->
          <!--<el-radio-group v-model="addForm.sex">-->
            <!--<el-radio class="radio" :label="1">男</el-radio>-->
            <!--<el-radio class="radio" :label="0">女</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <el-form-item label="进价">
          <el-input-number v-model="addForm.costPrice" :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="售价">
          <el-input-number v-model="addForm.sellPrice" :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number v-model="addForm.remainNum" :min="0" ></el-input-number>
        </el-form-item>
        <!--<el-form-item label="生日">-->
          <!--<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>-->
        <!--</el-form-item>-->
        <el-form-item label="特点">
          <el-input type="textarea" v-model="addForm.sellPoints"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addStoneFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addStoneSubmit" :loading="addStoneLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editStoneFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="名称" prop="stoneName">
          <el-input v-model="editForm.stoneName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="进价">
          <el-input-number v-model="editForm.costPrice" :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="售价">
          <el-input-number v-model="editForm.sellPrice" :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number v-model="editForm.remainNum" :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="特点">
          <el-input type="textarea" v-model="editForm.sellPoints"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editStoneFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editStoneSubmit()" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import API from "../../api/api";
  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        stoneList: [],
        total:0,
        page:1,
        pageSize:20,
        listLoading:false,
        sels:[],

        editStoneFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          stoneId:'',
          stoneName: '',
          costPrice: '',
          sellPrice: '',
          remainNum: '',
          sellPoints: ''
        },

        addStoneFormVisible: false,//新增界面是否显示
        addStoneLoading: false,
        addFormRules: {
          stoneName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          stoneName: '',
          costPrice: '',
          sellPrice: '',
          remainNum: '',
          sellPoints: ''
        }
      }
    },
    mounted: function () {
        this.getStoneList();
    },
    methods: {
      handleCurrentStoneChange(val) {
        this.page = val;
        this.getStoneList();
      },
      getStoneList() {
          this.listLoading=true;
          const _self = this;
          API.getStoneListAPI(_self.page, _self.filters.name,function (result) {
              _self.stoneList=result.list;
              _self.total=result.total;
              _self.pageSize=result.pageSize;
              setTimeout(function () {
                _self.listLoading=false;
              },1000)
          })
      },
      //删除
      handleDelStone: function (index, row) {
        const _self = this;
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          _self.listLoading = true;
          API.deleteStoneAPI(row.stoneId,
          function(result){
            _self.$message({
              message: '删除成功',
              type: 'success'
            });
            _self.listLoading = false;
            _self.getStoneList();
          },
          function (message) {
            _self.$message({
              message: message,
              type: 'error'
            });
          });
        }).catch(() => {

        });
      },
      //显示编辑界面
      handleStoneEdit: function (index, row) {
        this.editStoneFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //显示新增界面
      handleAddStone: function () {
        this.addStoneFormVisible = true;
        this.addForm = {
          stoneName: '',
          costPrice: '',
          sellPrice: '',
          remainNum: '',
          sellPoints: ''
        };
      },
      //编辑
      editStoneSubmit: function () {
        const _self = this;
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              API.editStoneAPI(
                _self.editForm.stoneId,_self.editForm.stoneName,
                _self.editForm.costPrice,_self.editForm.sellPrice,
                _self.editForm.remainNum,_self.editForm.sellPoints,
                function (result) {
                  _self.editLoading=false;
                  _self.$message({
                    message:'提交成功',
                    type:'success'
                  });
                  _self.$refs['editForm'].resetFields();
                  _self.editStoneFormVisible=false;
                  _self.getStoneList()
                },
                function (message) {
                  _self.$message({
                    message:message,
                    type:'error'
                  });
                });
            });
          }
        });
      },
      //新增
      addStoneSubmit: function () {
        const _self = this;
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addStoneLoading = true;
              API.editStoneAPI(
                  null,_self.addForm.stoneName,
                  _self.addForm.costPrice,_self.addForm.sellPrice,
                  _self.addForm.remainNum,_self.addForm.sellPoints,
                  function (result) {
                      _self.addStoneLoading=false;
                      _self.$message({
                        message:'提交成功',
                        type:'success'
                      });
                      _self.$refs['addForm'].resetFields();
                      _self.addStoneFormVisible=false;
                      _self.getStoneList()
                  },
                  function (message) {
                    _self.$message({
                      message:message,
                      type:'error'
                    });
                  });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemoveStones: function () {
        const _self = this;
        const ids = this.sels.map(item => item.stoneId).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          API.batchDeleteStonesAPI(ids,
          function (result) {
            _self.$message({
              message:'提交成功',
              type:'success'
            });
            _self.getStoneList()
          },
          function (message) {
            _self.$message({
              message:message,
              type:'error'
            });
          });
        }).catch(() => {
        });
      }
    }
  }
</script>
