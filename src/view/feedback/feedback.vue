<template>
  <div class="container">
    <h1>服务中心</h1>
    <div class="btnBox">
      <Button type="primary" icon="md-add" @click="showAddDialog">新增问题反馈</Button>
    </div>
    <div>
      <Table
        border
        :columns="columns"
        :data="tabelData"
        no-data-text="暂无反馈信息">
        <template slot-scope="{ row }" slot="type">
          <span>{{row.type === 1 ? '优化意见' : row.type === 2 ? 'BUG反馈' : '用户投诉'}}</span>
        </template>
        <template slot-scope="{ row }" slot="state">
          <Tag color="blue">
            {{row.state !=='0' ? '已处理': '未处理'}}
          </Tag>
        </template>
        <template slot-scope="{ row }" slot="createDate">
          <span>{{computDate(row.createDate)}}</span>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Poptip :ref="`poptip${row.id}`" placement="left" width="400" title="回复问题反馈" transfer>
            <Button type="primary" size="small" v-if="$store.state.user.userInfo.id === 1">结果反馈</Button>
            <div slot="content">
              <Input v-model="answer" type="textarea" :rows="4" placeholder="请输入问题反馈的回复内容" />
              <div style="text-align: right;margin-top:10px">
                <Button type="primary" size="small" @click="feedbackResult(row.id)">确认</Button>
              </div>
            </div>
          </Poptip>
          <Button type="error" size="small" @click="remove(row.id)">删除</Button>
        </template>
      </Table>
      <Page :total="total" show-total :page-size="limit" :current="page" @on-change="changePage" style="margin-top:20px" />
    </div>
    <Modal
      v-model="showAdd"
      title="新增问题反馈"
      >
      <Form ref="formRef" :model="addForm" :label-width="100" :rules="addFormRule">
        <FormItem label="反馈类型：" prop="typeId">
          <Select v-model="addForm.typeId" placeholder="请选择反馈类型" style="width:250px">
            <Option value="1">优化意见</Option>
            <Option value="2">BUG反馈</Option>
            <Option value="3">用户投诉</Option>
          </Select>
        </FormItem>
        <FormItem label="反馈内容：" prop="content">
          <Input v-model="addForm.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入反馈内容" style="width:250px"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="closeAdd">取消</Button>
        <Button type="primary" @click="submitFeedback">确认提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { addFeedback, getFeedback, delFeedback, updateFeedback } from '@/api/user'
export default {
  name: 'feedback',
  data(){
    return {
      columns: [
        {
          title: '反馈类型',
          key: 'type',
          slot: 'type',
          align: 'center'
        },
        {
          title: '用户',
          key: 'userName',
          align: 'center'
        },
        {
          title: '反馈内容',
          key: 'content',
          align: 'center'
        },
        {
          title: '反馈进度',
          key: 'state',
          slot: 'state',
          align: 'center'
        },
        {
          title: '反馈结果',
          key: 'answer',
          align: 'center'
        },
        {
          title: '创建时间',
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
      showAdd: false,
      addForm: {
        typeId: null,
        content: ''
      },
      addFormRule: {
        typeId:[{ required: true, message: '请选择反馈类型', trigger: 'change' }],
        content:[{ required: true, message: '请输入反馈内容', trigger: 'blur' }]
      },
      page: 1,
      limit: 10,
      total: 0,
      answer: ''
    }
  },
  methods:{
    // 获取用户反馈列表
    getFeedback(){
      const params = {
        page: this.page,
        limit: this.limit,
        userId: this.$store.state.user.userInfo.id
      };
      getFeedback(params).then(res=>{
        this.tabelData = res.feedbackList;
        this.total = res.total;
      });
    },
    remove(id){
      delFeedback({id}).then(res=>{
        if(res === 'success'){
          this.$Message.success('删除成功！');
          this.getFeedback();
        }
      })
    },
    showAddDialog(){
      this.showAdd = true;
    },
    closeAdd(){
      this.$refs.formRef.resetFields();
      this.showAdd = false;
    },
    // 确认新增问题反馈
    submitFeedback(){
      this.$refs.formRef.validate((valid) => {
        if(valid){
          const params = {
            userId: this.$store.state.user.userInfo.id,
            type: this.addForm.typeId,
            content: this.addForm.content
          };
          addFeedback(params).then(res=>{
            if(res.message === 'success'){
              this.$Message.success('新增成功！');
              this.$refs.formRef.resetFields();
              this.showAdd = false;
              this.getFeedback();
            }
          });
        }
      });
    },
    // 反馈结果
    feedbackResult(id){
      const data = {
        id,
        answer: this.answer
      };
      updateFeedback(data).then(res=>{
        this.$refs[`poptip${id}`].handleClose();
        this.getFeedback();
      });
    },
    // 时间格式转换
    computDate(date){
      let dates = new Date(date).toJSON();
      return new Date(+new Date(dates) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    },
    // 改变页码
    changePage(page){
      this.page = page;
      this.getFeedback();
    }
  },
  created(){
    this.getFeedback();
  }
}
</script>

<style lang="less" scoped>
.container{
  margin: 20px 40px;
  height: 700px;
  .btnBox{
    margin: 20px 0;
  }
}
</style>
