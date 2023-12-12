<template>
  <el-card shadow="never"
           :body-style="{ padding: '30px' }">
    <el-form :model="form"
             ref="form"
             disabled
             label-width="150px"
             style="width: 60%;">
      <el-form-item label="User ID"
                    prop="userId">
        <el-input v-model="userInfo.userId"
                  clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="Account"
                    prop="name">
        <el-input v-model="userInfo.name"
                  clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="Image"
                    prop="avatar">
        <el-image style="width: 100px; height: 100px;border-radius: 50%;"
                  :src="userInfo.avatar"
                  :preview-src-list="[userInfo.avatar]"
                  fit="fit"></el-image>
        </el-input>
      </el-form-item>
      <el-form-item label="Create Time"
                    prop="date">
        <el-input v-model="userInfo.date"
                  clearable>
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-button type="primary"
                   size="small"
                   @click="submit"
                   row="3"
                   style="width: 100%">保存</el-button>
      </el-form-item> -->
    </el-form>
  </el-card>
</template>

<script>
import { apiAdd } from '@/api/task';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      form: {
      },
    };
  },
  created () { },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // submit () {
    //   this.$refs['form'].validate((valid) => {
    //     if (valid) {
    //       let form = JSON.parse(JSON.stringify(this.form));

    //       apiAdd(form).then(() => {
    //         this.$message.success('添加成功');
    //         this.$router.push({
    //           path: '/index/list'
    //         });
    //       });
    //     }
    //   });
    // }
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
