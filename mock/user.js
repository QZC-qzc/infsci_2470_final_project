const Mock = require('mockjs')

let listData = [
  {
    id: '001',
    avatar: '/img/avg.jpeg',
    name: 'admin',
    password: '123456',
    type: '1',
    nextTime: '2023-01-01',
    createTime: 1672185600000
  }
]
Mock.mock('/api/user/list', 'post', (req) => {
  const data = JSON.parse(req.body).body
  return {
    header: {
      code: 0
    },
    body: {
      count: listData.length,
      list: listData.slice(
        (data.pageNo - 1) * data.pageSize,
        data.pageNo * data.pageSize
      )
    }
  }
})
Mock.mock('/api/user/detail', 'post', (req) => {
  const id = JSON.parse(req.body).body.id
  const data = listData.find((item) => item.id === id)
  return {
    header: {
      code: 0
    },
    body: {
      data
    }
  }
})

Mock.mock('/api/user/add', 'post', (req) => {
  const data = JSON.parse(req.body).body
  let id = ++JSON.parse(JSON.stringify(listData)).length
  id = id > 100 ? id + '' : `00${id}`

  listData.push({
    ...data,
    id,
    createTime: Date.now()
  })

  return {
    header: {
      code: 0
    },
    body: {}
  }
})

Mock.mock('/api/user/del', 'post', (req) => {
  const id = JSON.parse(req.body).body.id
  listData = listData.filter((item) => item.id !== id)
  return {
    header: {
      code: 0
    },
    body: {}
  }
})

Mock.mock('/api/user/login', 'post', (req) => {
  const data = JSON.parse(req.body).body

  const current = listData.find((item) => {
    if (item.name === data.name && item.password === data.password) {
      return true
    }
    return false
  })

  if (current) {
    return {
      header: {
        code: 0
      },
      body: {
        userId: '001',
        name: data.name,
        type: current.type,
        date:
          new Date().toLocaleDateString() +
          ' ' +
          new Date().toLocaleTimeString(),
        avatar: current.avatar
      }
    }
  }
  return {
    header: {
      code: 200,
      message: '账号密码错误'
    },
    body: {}
  }
})

Mock.mock('/api/user/logout', 'get', () => {
  return {
    header: {
      code: 0
    },
    body: {}
  }
})

Mock.mock('/api/user/changePassword', 'post', () => {
  return {
    header: {
      code: 0
    },
    body: {}
  }
})
