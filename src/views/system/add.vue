<template>
  <el-card shadow="never"
           :body-style="{ padding: '30px' }">
    <el-form :model="form"
             :rules="rules"
             ref="form"
             label-width="150px"
             style="width: 60%;">
      <el-form-item label="title"
                    prop="title">
        <el-input v-model="form.title"
                  placeholder="please input the meeting title"
                  clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="video"
                    prop="video">
        <el-input v-model="form.video"
                  placeholder="please input the video's url"
                  clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="upload the video"
                    prop="avatar">
        <el-upload action=""
                   :limit="1"
                   accept="video/mp4,video/x-mp4,video/webm,video/ogg"
                   :multiple="false"
                   :auto-upload="false"
                   :on-change="handlePictureChange">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="img"
                    prop="img">
        <el-input v-model="form.img"
                  placeholder="please input the image's url"
                  clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="alert rule"
                    prop="alertRule">
        <el-select v-model="form.alertRule"
                   placeholder="please input the alert rule"
                   style="width: 100%">
          <el-option v-for="(item) in Object.keys(alertRules)"
                     :key="item"
                     :label="alertRules[item]"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="participant"
                    prop="peoples">
        <div>
          <el-button size="small"
                     @click="dialogVisible = true">choose</el-button>
          <div style="display: flex;margin-top: 10px;">
            <el-tag v-for="(tag,index) in form.userList"
                    :key="tag.name"
                    closable
                    @close="handleClose(index)"
                    :type="tag.type">
              {{tag.name}}
            </el-tag>
          </div>
        </div>

      </el-form-item>
      <el-form-item label="time"
                    prop="time">
        <el-col :span="11">
          <el-date-picker type="date"
                          placeholder="choose time"
                          value-format="yyyy-MM-dd"
                          v-model="form.starttime"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line"
                :span="2"
                style="text-align: center;">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date"
                          placeholder="choose time"
                          value-format="yyyy-MM-dd"
                          v-model="form.endtime"
                          style="width: 100%;"></el-date-picker>
        </el-col>

      </el-form-item>
      <el-form-item label="presiding officer"
                    prop="take">
        <el-input v-model="form.take"
                  placeholder="please input the presiding officer"
                  clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="Conference venue"
                    prop="address">
        <el-input v-model="form.address"
                  placeholder="please input the Conference venue"
                  clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="content"
                    prop="content">
        <el-input v-model="form.content"
                  type="textarea"
                  placeholder="please input the content"
                  clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary"
                   size="small"
                   @click="submit"
                   row="3"
                   style="width: 100%">save</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="Participants List"
               :visible.sync="dialogVisible">
      <el-table :data="userData"
                tooltip-effect="dark"
                ref="multipleTable"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="avatar"
                         label="image">
          <template slot-scope="scope">
            <el-avatar shape="square"
                       :size="45"
                       :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         label="username">
        </el-table-column>
      </el-table>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancelUser">cancel</el-button>
        <el-button type="primary"
                   @click="submitUser">confirm</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { apiAdd } from '@/api/task';
import * as userApi from '@/api/user';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      form: {},
      userData: [],
      userList: [],
      dialogVisible: false,
      rules: {
        title: [{ required: true, message: 'please input the meeting title', trigger: 'blur' }],
        video: [{ required: true, message: 'please input the video url', trigger: 'blur' }],
        img: [{ required: true, message: 'please input the img url', trigger: 'blur' }],
        alertRule: [{ required: true, message: 'please input the alertrule', trigger: 'change' }],
        starttime: [{ required: true, message: 'please choose time', trigger: 'change' }],
        take: [{ required: true, message: 'please input the presiding officer', trigger: 'blur' }],
        address: [{ required: true, message: 'please input the Conference venue', trigger: 'blur' }],
      }
    };
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters(['alertRules'])
  },
  methods: {
    handlePictureChange (e) {
      // 创建FileReader对象  
      const reader = new FileReader();

      // 定义回调函数  
      reader.onload = () => {
        // 将文件内容转换为Base64编码  
        const base64Data = reader.result;
        console.log(base64Data);
        this.$set(this.form, 'videoUrl', base64Data)
        this.base64Data = base64Data
      };

      // 以DataURL的形式读取文件内容  
      reader.readAsDataURL(e.raw);
    },
    handleClose (i) {
      this.form.userList.splice(i, 1)
    },
    getData () {
      userApi.apiGetList({
        pageNo: 1,
        pageSize: 100000
      })
        .then((res) => {
          this.userData = res.body.list;
        })
        .finally(() => {

        });
    },
    handleSelectionChange (e) {
      this.userList = e
    },
    submitUser () {
      this.$set(this.form, 'userList', this.userList)


      this.dialogVisible = false
      this.userList = []
    },
    cancelUser () {
      this.$refs.multipleTable.clearSelection();

      this.userList = []
      this.dialogVisible = false
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let form = JSON.parse(JSON.stringify(this.form));

          apiAdd(form).then(() => {
            this.$message.success('add success');
            this.$router.push({
              path: '/index/list'
            });
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-icon-error {
  font-size: 25px;
  vertical-align: middle;
  color: #f66;
  cursor: pointer;
  margin-left: 20px;
}
</style>
