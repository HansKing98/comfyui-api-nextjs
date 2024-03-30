
// export const runtime = 'edge';
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url || '')
  const prompt_id = searchParams.get('prompt_id')
  console.log('prompt_id', prompt_id);

  const host = process.env.COMFYUI_HOST


  const res = await fetch(`${host}/history?prompt_id=${prompt_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY!,
    },
  })

  const history = await res.json()

  let str = ''
  
  const thishistory = Object.values(history).filter((item: any) => item.status.messages[0][1].prompt_id === prompt_id)

  if (prompt_id) {
    str = JSON.stringify(thishistory)
    // str = JSON.stringify(history)
  } else {
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
