'use client'

import { EllipsisOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { ProTable, TableDropdown } from '@ant-design/pro-components'
import { Button, Dropdown, Input, message } from 'antd'
import DetailPage from './Detail'
import { useState } from 'react'
import getColumns from './columns'
import mockData from './mock'

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
}
const tableListDataSource = []

const creators = ['admin', 'user', 'admin', 'user', 'user']

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    botId: 'TradeCode_' + i,
    name: 'TradeCode_' + i,
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '')],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    updateTime: "2024-01-23 15:31:08",
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  })
}


const Page = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [rowData, setRowData] = useState({})
  const [showDetail, setShowDetail] = useState(true)
  const [detailStatus, setDetailStatus] = useState('')
  const [selected, setSelected] = useState([])

  const editRow = (row) => {
    setDetailStatus('edit')
    setRowData(row)
    setShowDetail(true)
  }

  const addRow = () => {
    setDetailStatus('add')
    setRowData({})
    setShowDetail(true)
  }

  const batchSetPrivate = (arg) => {
    if (!selected.length) {
      messageApi.error('请至少勾选一条数据')
    }
  }

  const detailEvent = {
    'cancel': () => {
      setDetailStatus('')
      setRowData({})
      setShowDetail(false)
    }
  }
  if (showDetail) {
    return <DetailPage data={rowData} status={detailStatus} someEvent={detailEvent} />
  }

  return (
    <>
      {contextHolder}
      <ProTable
        rowSelection={
          { onChange: (_, rows) => setSelected(rows) }
        }
        span={24}
        columns={getColumns({ editRow })}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter)
          return Promise.resolve({
            data: mockData,
            success: true,
          })
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          // layout: 'vertical',
          defaultCollapsed: true,
          span: 6,
          // labelWidth:80
          // defaultColsNumber:5
        }}
        dateFormatter="string"
        toolbar={{
          title: <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              type="primary"
              key="new"
              icon={<PlusOutlined />}
              onClick={() => addRow()}
            >
              New Generat
            </Button>
            <Button key="private" loading={true} onClick={() => batchSetPrivate('private')}>批量 private</Button>
            <Button key="public" onClick={() => batchSetPrivate('public')}>批量 public</Button>
          </div>,
          // tooltip: '这是一个标题提示',
        }}
      />
    </>
  )
}

export default Page