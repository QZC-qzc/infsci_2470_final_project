const Mock = require('mockjs')
function getCurrentDateTimestamp() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() // 月份是从0开始的，所以需要加1
  const day = now.getDate()

  const zeroTime = new Date(year, month, day, 0, 0, 0, 0) // 设置时、分、秒、毫秒为0
  return zeroTime.getTime() // 获取时间戳（毫秒）
}

let listData = [
  {
    id: 1,
    type: '1',
    isDel: '1',
    status: '2',
    collect: '1',
    createTime: 1701388800000,
    title:
      'Sustainable Development and Environmental Science:',
    img: '/img/cover.jpg',
    userList: [],
    take: 'Dr. Deng',
    address: 'Information Science Building',
    video:
      'https://www.youtube.com/watch?v=zx04Kl8y4dE',
    starttime: '2023-12-07',
    endtime: '2023-12-08',
    alertRule: '2'
  },
  {
    id: 2,
    type: '1',
    isDel: '1',
    status: '2',
    collect: '1',
    createTime: 1701388800000,
    title:
      'Artificial Intelligence and Machine Learning',
    img: '/img/cover.jpg',
    userList: [],
    take: 'Dean',
    address: 'Lawrence Hall',
    video:
      'https://www.youtube.com/watch?v=mJeNghZXtMo',
    starttime: '2023-12-09',
    endtime: '2023-12-10',
    alertRule: '2'
  },
  {
    id: 3,
    type: '1',
    isDel: '1',
    status: '2',
    collect: '2',
    createTime: 1701388800000,
    title:
      'Global Health and Epidemiology',
    img: '/img/cover.jpg',
    userList: [],
    take: 'Dr. Li',
    address: 'Information Science Building',
    video:
      'https://www.youtube.com/watch?v=S5XRh47T420',
    starttime: '2023-12-09',
    endtime: '2023-12-10',
    alertRule: '2'
  }
]

Mock.mock('/api/task/list', 'post', (req) => {
  const data = JSON.parse(req.body).body
  let list = JSON.parse(JSON.stringify(listData))
  if (data && data.collect) {
    list = list.filter((item) => item.collect == data.collect)
  }
  if (data && data.title) {
    list = list.filter((item) => item.title == data.title)
  }
  if (data && data.starttime) {
    list = list.filter((item) => item.starttime == data.starttime)
  }
  if (data && data.status) {
    list = list.filter((item) => item.status == data.status)
  }

  return {
    header: {
      code: 0
    },
    body: {
      list: list
    }
  }
})
Mock.mock('/api/task/statistics', 'post', () => {
  let hasTotal = 0
  let newTotal = 0
  let publishTotal = 0
  let list = JSON.parse(JSON.stringify(listData))

  const timestamp = getCurrentDateTimestamp()

  list.map((item) => {
    if (item.createTime >= timestamp) {
      ++newTotal
    } else {
      ++hasTotal
    }
    if (item.status === '2') {
      ++publishTotal
    }
  })
  return {
    header: {
      code: 0
    },
    body: {
      hasTotal,
      newTotal,
      total: list.length,
      publishTotal
    }
  }
})
Mock.mock('/api/task/detail', 'post', (req) => {
  const id = JSON.parse(req.body).body.id
  const data = listData.find((item) => item.id == id)
  return {
    header: {
      code: 0
    },
    body: {
      data
    }
  }
})

Mock.mock('/api/task/add', 'post', (req) => {
  const data = JSON.parse(req.body).body
  let id = ++JSON.parse(JSON.stringify(listData)).length
  id = id > 100 ? id + '' : `00${id}`

  listData.push({
    ...data,
    id,
    type: '1',
    isDel: '1',
    status: '1',
    collect: '1',
    createTime: Date.now()
  })

  return {
    header: {
      code: 0
    },
    body: {}
  }
})

Mock.mock('/api/task/update', 'post', (req) => {
  const data = JSON.parse(req.body).body
  const index = listData.findIndex((item) => item.id === data.id)
  listData[index] = data
  return {
    header: {
      code: 0
    },
    body: {}
  }
})

Mock.mock('/api/task/del', 'post', (req) => {
  const data = JSON.parse(req.body).body
  const index = listData.findIndex((item) => item.id === data.id)
  listData.splice(index, 1)
  // listData[index] = {
  //   ...listData[index],
  //   status: '2',
  //   isDel: '2'
  // }

  return {
    header: {
      code: 0
    },
    body: {}
  }
})

Mock.mock('/api/task/stop', 'post', (req) => {
  const data = JSON.parse(req.body).body
  const index = listData.findIndex((item) => item.id === data.id)
  listData[index] = {
    ...listData[index],
    status: '2'
  }
  return {
    header: {
      code: 0
    },
    body: {}
  }
})
Mock.mock('/api/task/again', 'post', (req) => {
  const data = JSON.parse(req.body).body
  const index = listData.findIndex((item) => item.id === data.id)
  listData[index] = {
    ...listData[index],
    status: '1'
  }
  return {
    header: {
      code: 0
    },
    body: {}
  }
})
Mock.mock('/api/task/collect', 'post', (req) => {
  const data = JSON.parse(req.body).body
  const index = listData.findIndex((item) => item.id === data.id)
  listData[index] = {
    ...listData[index],
    collect: data.collect === '2' ? '2' : '1'
  }
  return {
    header: {
      code: 0
    },
    body: {}
  }
})
