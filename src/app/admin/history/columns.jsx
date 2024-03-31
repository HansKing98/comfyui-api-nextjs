import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

const columns = ({ editRow }) => [
    // {
    //   title: '排序',
    //   dataIndex: 'index',
    //   valueType: 'indexBorder',
    //   width: 48,
    // },
    {
        title: 'prompt_id',
        dataIndex: 'id',
        width: 140,
        ellipsis:true,
        copyable: true,
        // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
        // filterDropdown: () => (
        //     <div style={{ padding: 8 }}>
        //         <Input style={{ width: 188, marginBlockEnd: 8, display: 'block' }} />
        //     </div>
        // ),
        // filterIcon: (filtered) => (
        //     <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        // ),
    },
    {
        title: 'avatar',
        dataIndex: 'avatar',
        hideInSearch: true,
        valueType: 'image',
        width: 80,
    },
    {
        title: 'bot_ name/bot short description',
        dataIndex: 'shortDescription',
        copyable: true,
        ellipsis: true,
        render: (_, row) => {
          return `${row.shortDescription}: `
        },
    },
    {
        title: '创建者',
        dataIndex: 'creator',
        initialValue: 'all',
        filters: true,
        onFilter: true,
        width: 90,
        valueEnum: {
            all: { text: '所有', status: 'all' },
            admin: { text: '平台', status: 'admin' },
            user: { text: '用户', status: 'user' },
        },
        render: (_, row) => {
            return `${row.userId==='5fbade8e-a62d-11ee-b9c0-020f803e25c0'?'平台':"用户"}`
        },
    },
    {
        title: '状态',
        dataIndex: 'status',
        initialValue: 'all',
        filters: true,
        onFilter: false,
        hideInSearch: true,
        width: 90,
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            close: { text: '关闭', status: 'Default' },
            running: { text: '运行中', status: 'Processing' },
            ONLINE: { text: 'ONLINE', status: 'Success' },
            error: { text: '异常', status: 'Error' },
        },
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        hideInSearch: true,
        width: 100,
        valueType:'dateTime'
    },
    {
        title: '操作',
        width: 60,
        valueType: 'option',
        render: (_, row) => [
            <a key="link" onClick={() => editRow(row)}>{row.userId==='5fbade8e-a62d-11ee-b9c0-020f803e25c0' ? '编辑' : '查看'}</a>,
            // <TableDropdown
            //   key="actionGroup"
            //   menus={[
            //     { key: 'copy', name: '复制' },
            //     { key: 'delete', name: '删除' },
            //   ]}
            // />,
        ],
    },
]
export default columns