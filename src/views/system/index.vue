<template>
  <el-card shadow="never"
           :body-style="{ padding: '30px' }">
    <el-table :data="tableData"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              stripe
              border>
      <el-table-column prop="title"
                       label="Theme">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column prop="img"
                       label="Cover"
                       width="230">
        <template slot-scope="scope">
          <el-image style="width: 200px; height: 95px"
                    :src="scope.row.img"
                    fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="alertRule"
                       label="Alertrule"
                       width="90">
        <template slot-scope="scope">
          <el-tag type="success">{{ alertRules[scope.row.alertRule] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="time"
                       label="Time">
        <template slot-scope="scope">
          {{ scope.row.starttime }}-{{ scope.row.endtime }}
        </template>
      </el-table-column>
      <el-table-column prop="status"
                       label="Release Status"
                       width="100">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.status === '1' ? 'unreleased' : 'released' }}</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="Operate"
                       width="300">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="small"
                     @click="preview(scope.row)">Details</el-button>
          <el-popconfirm title="Are you sure you want to collect this meeting?"
                         @confirm="collect(scope.row)">
            <el-button type="info"
                       slot="reference"
                       :disabled="scope.row.collect === '2'"
                       size="small">Favorite</el-button>
          </el-popconfirm>

          <el-popconfirm title="Are you sure you want to publish this meeting?"
                         @confirm="publish(scope.row)">
            <el-button type="success"
                       slot="reference"
                       v-if="scope.row.status === '1'"
                       size="small">Release</el-button>
          </el-popconfirm>
          <el-popconfirm title="Are you sure you want to unpublish this meeting?"
                         @confirm="cancelPublish(scope.row)">
            <el-button type="warn"
                       v-if="scope.row.status === '2'"
                       slot="reference"
                       size="small">Cancel</el-button>
          </el-popconfirm>
          <el-popconfirm title="Are you sure you want to delete this meeting?"
                         @confirm="delet(scope.row)">
            <el-button type="danger"
                       size="small"
                       slot="reference">Delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { apiGetList, apiStop, apiAgain, apiDel, apiCollect } from '@/api/task';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      tableData: [],
      form: {}
    };
  },
  created () {
    this.apiGetData();
  },
  computed: {
    ...mapGetters(['alertRules'])
  },
  methods: {
    tableRowClassName ({ row }) {
      if (row.status === '1') {
        return 'disable-row';
      }
      return ''
    },
    apiGetData () {
      apiGetList()
        .then((res) => {
          this.tableData = res.body.list;
        })
        .finally(() => { });
    },

    preview (row) {
      this.$router.push({
        path: '/detail/detail',
        query: {
          id: row.id
        }
      })
    },
    collect (row) {
      apiCollect({ id: row.id, collect: '2' })
        .then(() => {
          this.$message.success('Collect Success');
          this.apiGetData()
        })
        .finally(() => { });

    },
    publish (row) {
      apiStop({ id: row.id })
        .then(() => {
          this.$message.success('Release Success');
          this.apiGetData()
        })
        .finally(() => { });

    },
    cancelPublish (row) {
      apiAgain({ id: row.id })
        .then(() => {
          this.$message.success('Cancel Release Succuss');
          this.apiGetData()
        })
        .finally(() => { });
    },
    delet (row) {
      apiDel({ id: row.id })
        .then(() => {
          this.$message.success('Delete Success');
          this.apiGetData()
        })
        .finally(() => { });
    }
  }
};
</script>

<style lang="scss" scoped>
.disable-row {
  background: #999;
}
::v-deep .el-alert {
  padding: 15px 16px;
  margin: 20px 0;
}
.el-button {
  margin-right: 12px;
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
