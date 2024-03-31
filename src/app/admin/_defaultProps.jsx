import {
    ChromeFilled,
    CrownFilled,
    SmileFilled,
    TabletFilled,
    RobotFilled,
    DatabaseFilled,
    ControlFilled
} from "@ant-design/icons"

const menu = {
    route: {
        path: "/",
        routes: [
            {
                path: "/history",
                name: "AI写真",
                icon: <RobotFilled />,
                routes: [
                    {
                        path: "bot-list",
                        route:"/admin/history",
                        name: "生成写真",
                        icon: <DatabaseFilled />
                    }
                ],
                onClick:()=>console.log(123)
            },
            {
                path: "/prompt",
                name: "写真管理",
                icon: <ChromeFilled />,
                routes: [
                    {
                        path: "prompt-list",
                        route:"/admin/output",
                        name: "生成历史",
                        icon: <ControlFilled />
                    }
                ],
            },
        ],
    },
    location: {
        pathname: "/",
    },
    logo:"https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ",
    title:"COMFYUI-API-NEXTJS"

}

export default menu