ComfyUI-Nextjs-api-demo

# 用nextjs封装了 ComfyUI API

先上效果图

![截屏2024-04-01 00.59.34](http://image.hansking.cn/picgo/%E6%88%AA%E5%B1%8F2024-04-01%2000.59.34.png)

预览地址 https://comfyui-api-nextjs.vercel.app/admin/history

github link:[comfyui-api-nextjs](https://github.com/HansKing98/comfyui-api-nextjs)



## ComfyUI服务器环境变量配置：
请在根目录复制一份 `.env.example` 并重命名为 `.env文件`（这是 env 环境变量的标准用法）
- COMFYUI_HOST 是 ComfyUI的api调用地址 使用 =xxxxx 的环境变量（ip:端口）

- NEXT_PUBLIC_COMFYUI_IMAGE_HOST 静态资源host（默认机器ip对外公布是不安全的），请先将图片资源转存到安全的地址。
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```