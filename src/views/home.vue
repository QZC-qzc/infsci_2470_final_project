<template>
  <el-card shadow="never"
           :body-style="{ padding: '30px' }">
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content">
          <div class="statistics-box">
            <div class="item">
              Total number of meetings
              <p>{{statisticsInfo.total || 0}}</p>
            </div>
            <div class="item">

              Total number of new meetings
              <p>{{statisticsInfo.newTotal || 0}}</p>
            </div>
            <div class="item">

              Total number of meetings held
              <p>{{statisticsInfo.hasTotal || 0}}</p>
            </div>
            <div class="item">

              Total issued
              <p>{{statisticsInfo.publishTotal || 0}}</p>
            </div>

          </div>

          <div class="entry-box">
            <div class="item"
                 @click="go('/add/add')">
              <img src="@/assets/icon1.png">
              New to the Conference
            </div>
            <div class="item"
                 @click="go('/user/list?type=add')">
              <img src="@/assets/icon2.png">
              User additions
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content">
          <el-row :gutter="20"
                  style="margin-bottom: 25px;">
            <el-col :span="7">
              <el-input v-model="searchForm.title"
                        size="small"
                        clearable
                        placeholder="Please enter a session title"></el-input>
            </el-col>
            <el-col :span="7">
              <el-date-picker type="date"
                              clearable
                              size="small"
                              placeholder="Select Time"
                              value-format="yyyy-MM-dd"
                              v-model="searchForm.starttime"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="7">
              <el-select v-model="searchForm.status"
                         size="small"
                         clearable
                         placeholder="Please select a release status">
                <el-option v-for="item in statuss"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-button size="small"
                         @click="search">search</el-button>
            </el-col>
          </el-row>
          <div class="grid-list">
            <div class="item"
                 v-for="(item, index) in tableData"
                 :key="item.id">
              <div class="time">
                <p style="margin-bottom: 6px;"> {{ item.starttime }}</p>

                <el-tag type="success"
                        size="small"
                        v-if="item.status === '2'">Released</el-tag>
                <el-tag type="warning"
                        size="small"
                        v-else>unreleased</el-tag>
              </div>
              <div class="info">
                <div class="title">{{ item.title }}</div>
                <div class="content">presiding officer:{{ item.take }}</div>
                <div class="content">Conference venue:{{ item.address }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { apiGetList, apistatistics } from '@/api/task';

export default {
  data () {
    return {
      tableData: [],
      searchForm: {},
      statisticsInfo: {},
      statuss: [
        {
          label: 'Released', value: '2'
        },
        {
          label: 'unreleased', value: '1'
        }
      ]
    };
  },
  created () {
    this.apiGetData();

    apistatistics()
      .then((res) => {
        this.statisticsInfo = res.body || {}
      })
      .finally(() => { });

  },
  methods: {
    search () {
      this.apiGetData();
    },
    apiGetData () {
      apiGetList(this.searchForm)
        .then((res) => {
          this.tableData = res.body.list;
        })
        .finally(() => { });
    },
    go (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style scoped lang="scss">
.statistics-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 60px;

  .item {
    cursor: pointer;
    padding: 10px 0;
    width: 150px;
    font-size: 16px;
    margin: 10px;
    height: 85px;
    border-radius: 3px;
    box-shadow: 0 0 5px 1px #f4f4f4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999;
    p {
      font-size: 25px;
      font-weight: bold;
      margin-top: 10px;
      color: #333;
    }
  }
}
.entry-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .item {
    cursor: pointer;
    padding: 10px 0;
    width: 145px;
    height: 105px;
    border-radius: 3px;
    box-shadow: 0 0 5px 1px #f4f4f4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999;
    img {
      margin-bottom: 10px;
    }
  }
}
.grid-list {
  .item {
    display: flex;
    padding: 20px;
    border: 1px solid #e4e4e4;
    box-shadow: 0 0 5px 1px #f4f4f4;
    border-radius: 8px;
    margin-bottom: 20px;
    .time {
      font-size: 19px;
      color: #999;
      margin-right: 15px;
    }
    .info {
      flex: 1;
      .title {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .content {
        margin: 5px 0;
      }
    }
  }
}
</style>