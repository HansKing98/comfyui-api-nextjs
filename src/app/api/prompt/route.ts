import { NextResponse,NextRequest } from 'next/server'

// 导入 json 的 function
const { prompt_template_ai_4k } = require('./ai_4k');
const { prompt_template_ai_1080 } = require('./ai_1080');
const { prompt_template_ai_invert_mask_4k } = require('./ai_invert_mask_4k');
const { prompt_template_ai_invert_mask_1080 } = require('./ai_invert_mask_1080');

const host = process.env.COMFYUI_HOST

export async function POST(
  request: NextRequest
) {
  const req = await request.json();
  // console.log(req.input_image);

  const input_image_name = req.input_image
  const prompt_text = req.prompt
  const segment_anything_text = req.segment_anything

  const invertMask = req.invertMask === true // InvertMask NoInvertMask
  const open4k = req.open4k === true


  // apiFox 导出
  var myHeaders = new Headers();
  myHeaders.append("Proxy-Connection", "keep-alive");
  myHeaders.append("Content-Type", "application/json");


  let template = prompt_template_ai_4k
  if (!open4k) {
    if (invertMask) {
      template = prompt_template_ai_invert_mask_1080
    } else {
      template = prompt_template_ai_1080
    }
  } else {
    if (invertMask) {
      template = prompt_template_ai_invert_mask_4k
    }
  }

  var raw = JSON.stringify(template({
    input_image_name,
    prompt_text,
    segment_anything_text
  }));


  const res = await fetch(`${host}/prompt`, {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })

  const prompt = await res.json()
  return NextResponse.json(prompt)
}