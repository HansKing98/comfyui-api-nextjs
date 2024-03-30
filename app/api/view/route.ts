
// export const runtime = 'edge';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

type ResponseData = {
  message: string
}
export async function GET(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  const { searchParams } = new URL(request.url || '')
  const prompt_id = searchParams.get('prompt_id')
  const host = process.env.COMFYUI_HOST


  const res = await fetch(`${host}/history?max_items=200&prompt_id=${prompt_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY!,
    },
  })

  const history = await res.json()

  let str = ''

  if (prompt_id) {
    str = JSON.stringify(history)
  }

  const regex = /"filename".*?\.png/g
  const match = str.match(regex);
  const imageList: any = []
  // console.log(match);

  match?.forEach(el => {
    imageList.push(el.replace(`"filename":"`, ''))
  })


  return NextResponse.json({ prompt_id, message: 'has done', imageList: imageList.filter((item: any, index: any) => imageList.indexOf(item) === index) })
}
