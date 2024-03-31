import { NextResponse } from 'next/server'

const host = process.env.COMFYUI_HOST
const public_host = process.env.NEXT_PUBLIC_COMFYUI_IMAGE_HOST

export async function POST(
  req: Request
) {
  const formData = await req.formData()  // 获取formData的数据
  const file = formData.get('file') as File
  // apiFox 导出
  var myHeaders = new Headers();
  // myHeaders.append("Comfy-User", "undefined");
  myHeaders.append("Proxy-Connection", "keep-alive");
  var formdata = new FormData();
  formdata.append("image", file);
  const res = await fetch(`${host}/upload/image`, {
     method: 'POST',
     headers: myHeaders,
     body: formdata,
     redirect: 'follow'
  })
  const upload = await res.json()
  return NextResponse.json([{
    // ...{
    //   name: "test_upload.jpeg",
    //   subfolder: "",
    //   type: "input"
    // },
    ...upload,
    url:`${public_host}/view?filename=${upload.name}&type=input`
  }])
}