<template>
  <el-card shadow="never"
           :body-style="{ padding: '30px' }">
    <div class="el-form-item">
      <label class="el-form-item__label">theme: </label>
      <div class="el-form-item__content">{{ info.title }}</div>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label">video's url: </label>
      <div class="el-form-item__content">
        <a :href="info.video"
           target="_blank">{{ info.video }}</a>
      </div>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label">Current Video: </label>
      <div class="el-form-item__content">
        <template v-if="info.videoUrl">
          <video :src="info.videoUrl"
                 controls
                 style="width: 100%;"></video>
        </template>
        <div v-else
             style="text-align: center;color: #999;">No video</div>
      </div>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label">Repetition rules: </label>
      <div class="el-form-item__content">
        {{ alertRules[info.alertRule] }}
      </div>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label">participant: </label>
      <div class="el-form-item__content">
        <el-tag type="success"
                style="margin-right: 10px;"
                v-for="(item,index) in info.userList"
                :key="index">{{item.name}}</el-tag>
      </div>
    </div>

    <div class="el-form-item">
      <label class="el-form-item__label">time: </label>
      <div class="el-form-item__content">
        {{ info.starttime }} - {{ info.endtime }}
      </div>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label">presiding officer: </label>
      <div class="el-form-item__content">
        {{ info.take || '-'}}
      </div>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label">Conference venue: </label>
      <div class="el-form-item__content">
        {{ info.address || '-'}}
      </div>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label">Content of the meeting: </label>
      <div class="el-form-item__content">
        {{ info.content || '-'}}
      </div>
    </div>
    <div class="el-form-item"
         style="flex-direction: column;display: flex;">
      <label class="el-form-item__label"
             style="text-align: left;">Comments: </label>
      <div class="el-form-item__content">
        <div class="evaluate-item"
             v-for="(item,index) in evaluateList"
             :key="index">
          <div class="img-box">
            <img :src="item.avatar">
          </div>
          <div class="info">
            <div class="name">
              {{ item.name }}
              <span class="time">{{ new Date(item.createTime).toLocaleDateString() }} {{ new Date(item.createTime).toLocaleTimeString() }}</span>
            </div>
            <div class="content">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="el-form-item">
      <label class="el-form-item__label"
             style="display: block;">Comment</label>
      <div class="el-form-item__content">
        <el-input type="textarea"
                  :rows="5"
                  placeholder="please input the content"
                  v-model="content">
        </el-input>
      </div>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label"
             style="display: block;">
        <el-button type="primary"
                   size="small"
                   @click="handleSubmit">upload</el-button>
      </label>
    </div>

    <el-dialog title="reminder"
               :visible.sync="dialogVisible"
               width="30%">
      <span>Sure you want to submit the content of this review?</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button type="primary"
                   @click="evaluateAdd">confirm</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { apiGetDetail } from '@/api/task'
import * as evaluateApi from '@/api/evaluate'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      info: {},
      evaluateList: [],
      content: '',
      dialogVisible: false
    }
  },
  created () {
    this.apiGetData()
    this.apiGetEvaluateData()
  },
  computed: {
    ...mapGetters(['alertRules'])
  },
  methods: {
    handleSubmit () {
      if (!this.content) {
        this.$message.error('please input the content');
        return false
      }
      this.dialogVisible = true
    },

    apiGetData () {
      apiGetDetail({ id: this.$route.query.id })
        .then((res) => {
          this.info = res.body.data
        })
        .finally(() => { })
    },
    apiGetEvaluateData () {
      evaluateApi.apiGetList({ id: this.$route.query.id })
        .then((res) => {
          this.evaluateList = res.body.list
        })
        .finally(() => { })
    },
    evaluateAdd () {
      this.dialogVisible = false

      evaluateApi.apiAdd({ meetingId: this.$route.query.id, content: this.content })
        .then((res) => {
          this.$message({
            message: 'review submission success',
            type: 'success'
          });
          this.content = ''
          this.apiGetEvaluateData()
        })
        .finally(() => { })
    },

  }
}
</script>

<style lang="scss" scoped>
.evaluate-item {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #e4e4e4;
  .img-box {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .info {
    flex: 1;
    .name {
      display: flex;
      align-items: center;
      font-display: 15px;
      .time {
        margin-left: 10px;
        font-size: 13px;
        color: #999;
      }
    }
    .content {
      font-size: 15px;
      width: 60%;
    }
  }
}
.line {
  // border-top: 1px solid #e4e4e4;
  padding: 10px 0;
}
::v-deep .el-alert {
  padding: 15px 16px;
  margin: 20px 0;
}
.flex {
  display: flex;
}
.item {
  flex: 1;
  margin: 0 10px;
}
.a {
  cursor: pointer;
  color: #409eff;
}
</style>
