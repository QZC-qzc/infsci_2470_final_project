<template>
  <el-card shadow="never"
           :body-style="{ padding: '30px' }">
    <div style="padding: 0 0 20px 0">
      <el-button @click="add"
                 icon="el-icon-plus"
                 size="small">add</el-button>
    </div>
    <el-table :data="tableData"
              style="width: 100%"
              stripe
              border
              v-loading="loading">
      <el-table-column prop="avatar"
                       label="User Images">
        <template slot-scope="scope">
          <el-avatar shape="square"
                     :size="45"
                     :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       label="username"></el-table-column>
      <el-table-column prop="type"
                       label="Type of user">
        <template slot-scope="scope">
          {{ typeDict[scope.row.type] }}
        </template>
      </el-table-column>
      <el-table-column prop="password"
                       label="password"></el-table-column>
      <el-table-column label="operate"
                       width="240">
        <template slot-scope="scope">
          <el-popconfirm title="Are you sure you want to delete this account?"
                         @confirm="delet(scope.row)">
            <el-button type="danger"
                       size="small"
                       slot="reference">delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Add user"
               :visible.sync="dialogVisible">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="100px">
        <el-form-item label="User Image"
                      prop="avatar">
          <el-upload action=""
                     :limit="1"
                     list-type="picture-card"
                     :multiple="false"
                     :auto-upload="false"
                     :on-change="handlePictureChange">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog> -->
        </el-form-item>
        <el-form-item label="username"
                      prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Type of user"
                      prop="type">
          <el-select v-model="form.type"
                     style="width: 100%">
            <el-option v-for="(item, index) in Object.keys(typeDict)"
                       :key="item"
                       :label="Object.values(typeDict)[index]"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="password"
                      prop="password">
          <el-input v-model="form.password"
                    type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button type="primary"
                   @click="submit">confirm</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { apiGetList, apiAdd, apiDelte } from '@/api/user';

export default {
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      loading: false,
      param: {
        pageNo: 1,
        pageSize: 10
      },
      typeDict: {
        1: 'Administrator',
        2: 'User'
      },
      form: {},
      rules: {
        avatar: [
          { required: true, message: 'please upload the user images', trigger: 'blur' }
        ],
        name: [{ required: true, message: 'please input the username', trigger: 'blur' }],
        password: [{ required: true, message: 'please input the password', trigger: 'blur' }]
      }
    };
  },
  created () {
    this.getData();

  },
  mounted () {
    if (this.$route.query.type === 'add') {
      setTimeout(() => {
        this.dialogVisible = true
      }, 200)

    }
  },
  methods: {
    getData () {
      this.loading = true;
      apiGetList(this.param)
        .then((res) => {
          this.tableData = res.body.list;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handlePictureChange (e) {
      this.$set(this.form, 'avatar', e.url)
    },
    add () {
      this.dialogVisible = true;
      this.form = {};
      this.$nextTick(() => {
        this.$refs['form'].clearValidate();
      });
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          apiAdd(this.form).then((res) => {
            this.dialogVisible = false;
            this.$message.success('add success');
            this.getData();
          });
        } else {
        }
      });
    },
    delet (row) {
      apiDelte({ id: row.id }).then((res) => {
        this.$message.success('delete success');
        this.getData();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// .el-card{
//   border: none;
// }
</style>
