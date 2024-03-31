// export const runtime = 'edge';
import { NextResponse } from 'next/server'

const host = process.env.COMFYUI_HOST

const input_regex = /"inputs":{"image":".*?\.(png|jpg|jpeg|gif|bmp|svg|webp)/g
const output_regex = /"filename".*?\.(png|jpg|jpeg|gif|bmp|svg|webp)/g

const getDetail = (item) => {
  const str = JSON.stringify(item)

  // get input image
  const input_match = str.match(input_regex);
  const input_1 = []
  input_match?.forEach((el) => {
    if (el.includes('_temp_')) {
      return
    }
    input_1.push(`${process.env.NEXT_PUBLIC_COMFYUI_IMAGE_HOST}/view?filename=${el.replace('"inputs":{"image":"', '')}&type=input`)
  })
  // 
  // get output image
  const output_match = str.match(output_regex);
  const output_1 = []
  output_match?.forEach((el) => {
    if (el.includes('_temp_')) {
      return
    }
    output_1.push(`${process.env.NEXT_PUBLIC_COMFYUI_IMAGE_HOST}/view?filename=${el.replace('"filename":"', '')}`)
  })
  //

  let input_2 = input_1.filter((item, index) => input_1.indexOf(item) === index)
  let output_2 = output_1.filter((item, index) => output_1.indexOf(item) === index)

  return {
    input_images: input_2,
    output_images: output_2
  }
}

export async function GET() {
  //获取指定位数的随机数
  function getRandom(num) {
    let random = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1));
    return random
  }
  // 可能是缓存，不太懂，加个随机参数
  const res = await fetch(`${host}/queue?b=${getRandom(8) + Math.random()}`, {});
  const queue = await res.json()
  queue.queue_running = queue.queue_running.map((item) => {
    if (item[1]) {

      return {
        prompt_id: item[0],
        queue_code: item[1],
        ...getDetail(item[2] || '')
      }
    }
  })
  queue.queue_pending = queue.queue_pending.map((item => {
    if (item[1]) {

      return {
        prompt_id: item[0],
        queue_code: item[1],
        ...getDetail(item[2] || '')
      }
    }

  }))

  return NextResponse.json(queue)
}
