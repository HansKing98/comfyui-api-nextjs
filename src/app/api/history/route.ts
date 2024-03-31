// export const runtime = 'edge';
import { NextResponse } from 'next/server'

const input_regex = /"inputs":{"image":".*?\.(png|jpg|jpeg|gif|bmp|svg|webp)/g
const output_regex = /"filename".*?\.(png|jpg|jpeg|gif|bmp|svg|webp)/g

const host = process.env.COMFYUI_HOST

export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url || '')
  const prompt_id = searchParams.get('prompt_id')
  console.log('prompt_id', prompt_id);

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

  interface ImageObj {
    input_images: string[];
    output_images: string[];
  }
  interface DetailObj extends ImageObj {
    prompt_id: string;
    queue_code: number;
  }


  const getDetail = (item: any): ImageObj => {
    const str = JSON.stringify(item)

    // get input image
    const input_match = str.match(input_regex);
    const input_1: any = []
    input_match?.forEach((el: any) => {
      if (el.includes('_temp_')) {
        return
      }
      input_1.push(`${process.env.NEXT_PUBLIC_COMFYUI_IMAGE_HOST}/view?filename=${el.replace('"inputs":{"image":"', '')}&type=input`)
    })
    // 
    // get output image
    const output_match = str.match(output_regex);
    const output_1: any = []
    output_match?.forEach((el: any) => {
      if (el.includes('_temp_')) {
        return
      }
      output_1.push(`${process.env.NEXT_PUBLIC_COMFYUI_IMAGE_HOST}/view?filename=${el.replace('"filename":"', '')}`)
    })
    //

    let input_2: string[] = input_1.filter((item: any, index: any) => input_1.indexOf(item) === index)
    let output_2: string[] = output_1.filter((item: any, index: any) => output_1.indexOf(item) === index)

    return {
      input_images: input_2,
      output_images: output_2
    }
  }

  const imageList: DetailObj[] = []

  if (prompt_id) {
    const thisRow: any[] = Object.values(history).filter((item: any) => item.status.messages[0][1].prompt_id === prompt_id)
    const queue_code = thisRow[0].prompt[0]
    // console.log('thisRow', thisRow);
    // console.log('thisRow', JSON.stringify(thisRow));

    let detail: ImageObj = getDetail(thisRow[0])
    imageList.push(
      {
        prompt_id,
        queue_code,
        ...detail
      }
    )

  } else {
    Object.keys(history).forEach((key: any) => {
      const thisRow: any = history[key]
      const prompt_id = thisRow.status.messages[0][1].prompt_id
      const queue_code = thisRow.prompt[0]
      let detail: ImageObj = getDetail(thisRow)

      imageList.push(
        {
          prompt_id,
          queue_code,
          ...detail
        }
      )
    })
  }


  return NextResponse.json(imageList.reverse())
}
