<template>
  <div>
      <el-main>
      <div class="box">
          <div>
            <span style="font-size: 13px; margin-right: 10px;">赛题名称</span><el-input placeholder="请输入内容" v-model="question_name" style="width: 250px;"></el-input>
          </div>
          <div>
            <span style="font-size: 13px; margin-right: 10px;">队长姓名</span><el-input placeholder="请输入内容" v-model="team_leader" style="width: 250px;"></el-input>
          </div>
          <div>
            <span style="font-size: 13px; margin-right: 10px;">队长所属学校</span><el-input placeholder="请输入内容" v-model="leader_school" style="width: 250px;"></el-input>
          </div>
      </div>
      <div class="box0">
        <div style="margin-right: 10%">
            <span style="font-size: 13px; margin-right: 10px;">队长手机号</span><el-input placeholder="请输入内容" v-model="leader_phone" style="width: 250px;"></el-input>
        </div>
        <div>
            <span style="font-size: 13px; margin-right: 10px;">团队名称</span><el-input placeholder="请输入内容" v-model="name" style="width: 250px;"></el-input>
        </div>
      </div>
      <el-row style="margin-bottom: 20px;">
        <el-col :span="8">
          <div style="margin-left: 12%">
              <span style="font-size: 13px; margin-right: 10px;">作品状态</span>
              <el-radio v-model="work_status" label="1">未提交</el-radio>
              <el-radio v-model="work_status" label="2">提交完成</el-radio>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="margin-left: 12%">
            <span style="font-size: 13px; margin-right: 10px;">参赛状态</span>
            <el-radio v-model="contest_status" label="processing">审核中</el-radio>
            <el-radio v-model="contest_status" label="ok">审核通过</el-radio>
            <el-radio v-model="contest_status" label="fail">审核未通过</el-radio>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box1">
            <div>
              <span style="margin-left: 110px"><el-button @click="load">查询</el-button></span>
              <span style="margin-left: 10px"><el-button @click="empty">清空</el-button></span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" border strips :header-cell-class-name="headerBg"
      @selection-change="handleSelectionChange">
        <el-table-column type="index" :index="indexFn" width="50">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text" style="margin-left: 0" slot="reference" @click="handleShow(scope.row.work_id)">查看作品</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="question_name" label="赛题" width="140">
        </el-table-column>
        <el-table-column prop="name" label="团队名称" width="140">
        </el-table-column>
        <el-table-column prop="work_name" label="作品名称" width="200">
        </el-table-column>
        <el-table-column prop="team_leader" label="队长姓名" width="140">
        </el-table-column>
        <el-table-column prop="leader_school" label="队长学校" width="140">
        </el-table-column>
        <el-table-column prop="advisor" label="指导教师">
        </el-table-column>
      </el-table>
      <div style="padding: 10px 0;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="float: right">
      </el-pagination>
      </div>
      <el-dialog title="作品信息" :visible.sync="dialogFormVisible" width="30%">
        <div slot="footer" class="dialog-footer">
          <div><span style="font-size: 13px;">作品名称</span></div>
          <div><span style="font-size: 13px;">作品链接</span></div>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<style>
.headerBg {
  background: #fafafa!important;
}
.box {
    width:95%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 10px;
}
.box0 {
    margin-left: 5%;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
}
.box1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    justify-content: space-around;
    margin-right: 10%;
    margin-bottom: 10px;
}
.box2 {
    width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:space-between;
    margin-bottom: 10px;
}

</style>
