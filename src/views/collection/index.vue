<template>
  <el-card shadow="never"
           :body-style="{ padding: '30px' }">
    <el-row :gutter="20"
            v-loading="loading">
      <el-col :span="6"
              v-for="(item, index) in tableData"
              :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.img"
               class="image">
          <div style="padding: 14px;">
            <span>{{item.title}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.starttime }} - {{ item.endtime }}</time>
              <el-popconfirm title="Are you sure you want to cancel the meeting?"
                             slot="reference"
                             @confirm="cancelCollect(item)">
                <el-button type="text"
                           slot="reference"
                           class="button">Cancel collection</el-button>
              </el-popconfirm>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </el-card>
</template>

<script>
import { apiGetList, apiCollect } from '@/api/task';

export default {
  data () {
    return {
      tableData: [],
      loading: false
    };
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      this.loading = true;
      apiGetList({ collect: '2' })
        .then((res) => {
          this.tableData = res.body.list;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancelCollect (row) {
      apiCollect({ id: row.id, collect: '1' }).then((res) => {
        this.$message.success('cancel success');
        this.getData();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.image {
  width: 100%;
  height: 207px;
}
.time {
  margin-top: 10px;
  color: #999;
  display: block;
}
.el-button--text {
  padding-bottom: 0;
}
</style>>