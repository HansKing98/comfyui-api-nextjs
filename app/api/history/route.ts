import { Image } from 'next/image';

// export const runtime = 'edge';
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url || '')
  const prompt_id = searchParams.get('prompt_id')
  console.log('prompt_id', prompt_id);

  const host = process.env.COMFYUI_HOST

  let url = `${host}/history`
  if (prompt_id) {
    url = `${host}/history?prompt_id=${prompt_id}`
  } else {
    url = `${host}/history?max_items=200`
  }
  // 官方支持 按 id 查询，但是传入 prompt_id 只能拿到全部的。
  // 这是个bug
  const res = await fetch(`${host}/history`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY!,
    },
  })

  const history = await res.json()

  interface ImageList {
    prompt_id: string;
    images: [];
  }

  const getOutPutImages = (item: any): string[] => {
    const str = JSON.stringify(item)
    const regex = /"filename".*?\.png/g
    const match = str.match(regex);
    const list: any = []
    match?.forEach((el: any) => {

      if (el.includes('_temp_')) {
        return
      }
      
      list.push(`${process.env.NEXT_PUBLIC_COMFYUI_IMAGE_HOST}/view?filename=${el.replace('"filename":"', '')}`)
    })

    return list.filter((item: any, index: any) => list.indexOf(item) === index)
  }

  const imageList: any[] = []

  if (prompt_id) {
    const thisRow = Object.values(history).filter((item: any) => item.status.messages[0][1].prompt_id === prompt_id)
    let a = getOutPutImages(thisRow[0])
    imageList.push(
      {
        prompt_id,
        input_images: [],
        output_images: a
      }
    )
    // str = JSON.stringify(history)
  } else {
    Object.keys(history).forEach((key: any) => {
      const thisRow = history[key]
      const prompt_id = thisRow.status.messages[0][1].prompt_id

      const a = getOutPutImages(thisRow)

      imageList.push(
        {
          prompt_id,
          input_images: [],
          output_images: a
        }
      )
    })
  }


  return NextResponse.json(imageList.reverse())
}
