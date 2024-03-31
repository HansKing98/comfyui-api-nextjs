'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons"
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components"
import { Input, Dropdown } from "antd"
import defaultProps from "./_defaultProps"
import { useEffect, useState } from 'react'

import '@/app/global.scss'
import '@/app/globals.css'
  
import {
  getUserInfo
} from '@/api/login'

const DEFAULT_PAGE = '/admin/bot'
const Layout = ({ children }) => {
  const next_pathname = usePathname()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({})
  const [clientWidth, setClientWidth] = useState(0)

  // visibility: !mounted ? 'hidden' : '' 这用于解决页面加载时，样式不渲染
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // document.body.clientWidth
  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) setUserInfo(res)
    })
    // 页面宽度
    setClientWidth(document.body.clientWidth)
  }, [])

  const settings = {
    fixSiderbar: true,
    layout: "mix",
    splitMenus: false,
  }

  let pathname = DEFAULT_PAGE
  switch (next_pathname) {
    case '/admin/bot':
      pathname = '/bot/bot-list'
      break
    case '/admin/prompt':
      pathname = '/prompt/prompt-list'
      break
    default:
      break
  }

  if (!mounted) {
    return  <div className="w-screen h-screen flex justify-center items-center text-gray-800">loading...</div>
  }

  return (
    <div
      id="test-pro-layout"
      style={{
        height: "calc(100vh - 56px)",
        // 这用于解决页面加载时，样式不渲染
        visibility: !mounted ? 'hidden' : ''
      }}
    >
      <ProLayout
        loading={false}
        breadcrumbRender={(routers = []) => { return [...routers.map(el => ({ title: el.title }))] }}
        pageTitleRender={(props, defaultPageTitle, info) => info.pageName.replace('列表', '管理')}
        bgLayoutImgList={[
          {
            src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
            left: 85,
            bottom: 100,
            height: "303px",
          },
          {
            src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
            bottom: -68,
            right: -45,
            height: "303px",
          },
          {
            src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
            bottom: 0,
            left: 0,
            width: "331px",
          },
        ]}
        {...defaultProps}
        location={{
          pathname,
        }}
        menu={{
          type: "group",
        }}
        actionsRender={(props) => {
          if (props.isMobile) return []
          return [
            props.layout !== "side" && clientWidth > 800 ? (
              <div
                key="SearchOutlined"
                aria-hidden
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginInlineEnd: 24,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                <Input
                  style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: "rgba(0,0,0,0.03)",
                  }}
                  prefix={
                    <SearchOutlined
                      style={{
                        color: "rgba(0, 0, 0, 0.15)",
                      }}
                    />
                  }
                  placeholder="搜索方案"
                  variant={'borderless'}
                />
                <SearchOutlined
                  style={{
                    color: "var(--ant-primary-color)",
                    fontSize: 24,
                  }}
                />
              </div>
            ) : undefined,
            <BellOutlined key="BellOutlined" style={{
              color: "var(--ant-primary-color)",
              fontSize: 24,
            }} />,
          ]
        }}
        avatarProps={userInfo.name && {
          alt: 'avatar',
          src: userInfo.avatar,
          children: 'USER',
          icon: <UserOutlined />,
          title: userInfo.name,
          style: { backgroundColor: '#87d068' },
          size: "small",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: '退出登录',
                    },
                  ],
                  onClick: ({ key }) => {

                  }
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined
          return (
            <div
              style={{
                textAlign: "center",
                paddingBlockStart: 12,
              }}
            >
              <div>© 2024 Made with love</div>
              <div>by COMFYUI-API-NEXTJS</div>
            </div>
          )
        }}
        onMenuHeaderClick={(e) => location.href = '/'}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              router.replace(item.route || DEFAULT_PAGE)
            }}
          >
            {dom}
          </div>
        )}
        {...settings}
      >
        <PageContainer >
          <ProCard
            style={{
              // height: "calc(100vh - 300px)",
              minHeight: 800,
            }}
          >
            {children}
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  )
}


export default Layout