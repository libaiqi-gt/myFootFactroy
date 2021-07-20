<template>
  <div class="container">
    <h1>管理中心</h1>
    <div class="typeSelect">
      <Select v-model="manageType" placeholder="请选择管理类型" style="width:250px" @on-change="changeType">
        <Option :value="1">菜谱管理</Option>
        <Option :value="2">用户管理</Option>
        <Option :value="3">食材管理</Option>
      </Select>
      <Button type="primary" icon="md-add" v-if="manageType === 3" @click="showAdd = true">新增分类</Button>
    </div>
    <div class="table">
      <Table
        border
        :columns="manageType === 1 ? columns1 : manageType === 2 ? columns2 : columns3"
        :data="tabelData"
        no-data-text="暂无数据">
        <template slot-scope="{ row }" slot="cookbookSort">
          <span>{{row.cookbookSort?row.cookbookSort.name:''}}</span>
        </template>
        <template slot-scope="{ row }" slot="createDate">
          <span>{{computDate(row.createDate)}}</span>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Poptip
            confirm
            title="确定删除这条数据吗？"
            transfer
            @on-ok="remove(row.id)"
            >
            <Button type="error" size="small">删除</Button>
          </Poptip>
        </template>
      </Table>
      <div class="pageBox">
        <Page
          :total="totle"
          :page-size="limit"
          :current="page"
          @on-change="changePage"
          show-total />
      </div>
    </div>
    <Modal
      v-model="showAdd"
      title="新增食材分类"
      transfer
      >
      <Form ref="formRef" :model="addForm" :label-width="100" :rules="addFormRule">
        <FormItem label="上级分类：" prop="cookbookSort">
          <Select v-model="addForm.cookbookSort" placeholder="请选择上级分类" style="width:250px">
            <Option v-for="(item,index) in cookbookSortList" :key="index" :value="item.id" :label="item.name"></Option>
          </Select>
        </FormItem>
        <FormItem label="食材名称：" prop="name">
          <Input v-model="addForm.name" type="text" placeholder="请输入反馈内容" style="width:250px" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="closeAdd">取消</Button>
        <Button type="primary" @click="addSortData">确认提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getAllCookbook, delCookbook, getList, getDetailsSortPage, delSort, getcookbookSort, addSort } from '@/api/home'
import { delUser } from '@/api/user'
export default {
  name: 'admin',
  data(){
    return{
      manageType: 1,
      columns1: [
        {
          title: 'Id',
          key: 'id',
          align: 'center'
        },
        {
          title: '作者',
          key: 'author',
          align: 'center'
        },
        {
          title: '菜谱标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '菜谱概述',
          key: 'summary',
          align: 'center'
        },
        {
          title: '点赞量',
          key: 'likeNum',
          align: 'center'
        },
        {
          title: '创建日期',
          key: 'createDate',
          slot: 'createDate',
          align: 'center'
        },
        {
          title: "操作",
          key: 'action',
          slot: 'action',
          width: 300,
          align: 'center'
        }
      ],
      columns2: [
        {
          title: 'Id',
          key: 'id',
          align: 'center'
        },
        {
          title: '账号',
          key: 'account',
          align: 'center'
        },
        {
          title: '昵称',
          key: 'name',
          align: 'center'
        },
        {
          title: '邮箱',
          key: 'email',
          align: 'center'
        },
        {
          title: '创建日期',
          key: 'createDate',
          slot: 'createDate',
          align: 'center'
        },
        {
          title: "操作",
          key: 'action',
          slot: 'action',
          width: 300,
          align: 'center'
        }
      ],
      columns3: [
        {
          title: 'Id',
          key: 'id',
          align: 'center'
        },
        {
          title: '分类名',
          key: 'name',
          align: 'center'
        },
        {
          title: '上级分类名',
          key: 'cookbookSort',
          slot: 'cookbookSort',
          align: 'center'
        },
        {
          title: '创建日期',
          key: 'createDate',
          slot: 'createDate',
          align: 'center'
        },
        {
          title: "操作",
          key: 'action',
          slot: 'action',
          width: 300,
          align: 'center'
        }
      ],
      tabelData: [],
      page: 1,
      limit: 10,
      totle: 0,
      cookbookSortList: [],
      showAdd: false,
      addForm: {
        name: '',
        imgUrl: '',
        season: false,
        isHot: false,
        cookbookSort: 1
      },
      addFormRule: {
        name:[{ required: true, message: '请输入食材分类名', trigger: 'blur' }]
      },
    }
  },
  methods: {
    // 获取食材分类（大类）
    getcookbookSort(){
      getcookbookSort().then(res=>{
        this.cookbookSortList = res;
      })
    },
    // 获取所有的菜谱
    getAllCookbook(){
      let params = {
        page: this.page,
        limit: this.limit
      };
      getAllCookbook(params).then(res=>{
        this.tabelData = res.cookbookList;
        this.totle = res.totle;
      })
    },
    // 获取所有的用户
    getList(){
      const params = {
        page: this.page,
        limit: this.limit
      };
      getList(params).then(res=>{
        this.tabelData = res.userList;
        this.totle = res.total;
      })
    },
    // 获取食材分类
    getDetailsSortPage(){
      const params = {
        page: this.page,
        limit: this.limit
      };
      getDetailsSortPage(params).then(res=>{
        this.tabelData = res.sortList;
        this.totle = res.total;
      });
    },
    // 删除用户
    delUser(id){
      const params = {
        id
      };
      delUser(params).then(res=>{
        this.$Message.success('删除成功！');
        this.getList();
      })
    },
    // 删除菜谱
    delCookbook(id){
      const params = {
        cookbookId: id
      };
      delCookbook(params).then(res=>{
        this.$Message.success('删除成功！');
        this.getAllCookbook();
      })
    },
    // 删除食材分类
    delSort(id){
      delSort({id}).then(res=>{
        if(res === 'success'){
          this.$Message.success('删除成功！');
          this.getDetailsSortPage();
        }
      })
    },
    remove(id){
      switch(this.manageType){
        case 1:
          this.delCookbook(id);
          break;
        case 2:
          this.delUser(id);
          break;
        case 3:
          this.delSort(id);
          break;
      };
    },
    // 改变选项
    changeType(value){
      this.page = 1;
      this.limit = 10;
      switch(value){
        case 1:
          this.getAllCookbook();
          break;
        case 2:
          this.getList();
          break;
        case 3:
          this.getDetailsSortPage();
          break;
      }
    },
     // 时间格式转换
    computDate(date){
      let dates = new Date(date).toJSON();
      return new Date(+new Date(dates) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    },
    // 改变页码
    changePage(value){
      this.page = value;
       switch(this.manageType){
        case 1:
          this.getAllCookbook();
          break;
        case 2:
          this.getList();
          break;
        case 3:
          this.getDetailsSortPage();
          break;
      };
    },
    closeAdd(){
      this.$refs.formRef.resetFields();
      this.showAdd = false;
    },
    // 新增食材分类
    addSortData(){
      this.$refs.formRef.validate((valid) => {
        if(valid){
          const params = {
            ...this.addForm
          };
          addSort(params).then(res=>{
            if(res === '新增成功'){
              this.$Message.success('新增成功！');
              this.$refs.formRef.resetFields();
              this.showAdd = false;
              this.getDetailsSortPage();
            }
          });
        }
      });
    },
  },
  created(){
    this.getAllCookbook();
    this.getcookbookSort();
  }
}
</script>

<style lang="less" scoped>
.container{
  margin: 20px 40px;
  min-height: 700px;
  .typeSelect{
    margin: 20px 0;
  }
  .pageBox{
    margin: 10px 0;
  }
}
</style>
