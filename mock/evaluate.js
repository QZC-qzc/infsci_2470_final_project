const Mock = require('mockjs')
const userList = [
  '醉挽清风',
  '素衣清颜淡若尘',
  '夜雨微澜',
  '墨玲珑',
  '天生傲骨岂能输',
  '凉薄少女梦',
  '若只如初见',
  '秦凝雪月',
  '镜湖月',
  '霓裳晚歌',
  '扬眉共醉',
  '夏末凉薄',
  '青袂婉约',
  '浪子回头',
  '不离不弃只是童言无忌',
  '爱海搁浅',
  '百合',
  '浅吟旧情歌',
  '嫣然一笑',
  '南玖',
  '冷心为王',
  '烟寒若雨',
  '未语淚先流',
  '孤音',
  '浅浅爱',
  '暖色调',
  '暮白寒窗雪',
  '深海里的星星',
  '空城旧梦',
  '南风知我意',
  '清风徐来',
  '北巷南猫',
  '浅墨清荷〃明媚了谁的泪',
  '夏末__涼薄'
]

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
let inittData = [
  {
    id: '1000000000',
    avatar: '/img/img.jpg',
    name: 'Ice',
    content: `I am really looking forward to this conference theme. Innovative technologies in environmental science and strategies for sustainable development are crucial for our future. I am particularly interested in learning about how different countries are addressing climate change and how we can benefit from interdisciplinary collaboration.`,
    createTime: 1672185600000
  },
  {
    id: '1000000001',
    avatar: '/img/img.jpg',
    name: 'gold',
    content: `This theme is extremely pertinent to current technological advancements. I am curious about how AI and machine learning can be applied to practical problems, especially the potential in education and healthcare. Also, discussions on the ethical and societal impacts of these technologies are indispensable, as they help us develop these technologies more responsibly.`,
    createTime: 1672185600000
  }
]

let listData = []
Mock.mock('/api/evaluate/list', 'post', (req) => {
  const data = JSON.parse(req.body).body
  const list = listData.filter((item) => item.meetingId == data.id)
  return {
    header: {
      code: 0
    },
    body: {
      list: [...inittData, ...list]
    }
  }
})
Mock.mock('/api/evaluate/add', 'post', (req) => {
  const data = JSON.parse(req.body).body
  let id = ++JSON.parse(JSON.stringify(listData)).length
  id = id > 100 ? id + '' : `00${id}`

  listData.push({
    ...data,
    id,
    avatar: '/img/img.jpg',
    name: userList[getRandomInt(0, userList.length)],
    createTime: Date.now()
  })

  return {
    header: {
      code: 0
    },
    body: {}
  }
})
Mock.mock('/api/evaluate/del', 'post', (req) => {
  const id = JSON.parse(req.body).body.id
  listData = listData.filter((item) => item.id !== id)
  return {
    header: {
      code: 0
    },
    body: {}
  }
})
