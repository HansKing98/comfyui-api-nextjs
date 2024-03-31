import { NextResponse,NextRequest } from 'next/server'

const host = process.env.COMFYUI_HOST

export async function POST(
  request: NextRequest
) {
  const req = await request.json();
  // console.log(req.input_image);

  const input_image_name = req.input_image

  // apiFox 导出
  var myHeaders = new Headers();
  myHeaders.append("Proxy-Connection", "keep-alive");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "client_id": "b14ae9dedc0741dfb80c3b1605c3305f",
    "prompt": {
      "16": {
        "inputs": {
          "ckpt_name": "majicV7.safetensors"
        },
        "class_type": "CheckpointLoaderSimple",
        "_meta": {
          "title": "Load Checkpoint"
        }
      },
      "21": {
        "inputs": {
          "text": [
            "288",
            0
          ],
          "token_normalization": "none",
          "weight_interpretation": "A1111",
          "clip": [
            "301",
            1
          ]
        },
        "class_type": "BNK_CLIPTextEncodeAdvanced",
        "_meta": {
          "title": "CLIP Text Encode (Advanced)"
        }
      },
      "22": {
        "inputs": {
          "text": [
            "927",
            1
          ],
          "token_normalization": "none",
          "weight_interpretation": "A1111",
          "clip": [
            "301",
            1
          ]
        },
        "class_type": "BNK_CLIPTextEncodeAdvanced",
        "_meta": {
          "title": "CLIP Text Encode (Advanced)"
        }
      },
      "40": {
        "inputs": {
          "pixels": [
            "360",
            0
          ],
          "vae": [
            "16",
            2
          ]
        },
        "class_type": "VAEEncode",
        "_meta": {
          "title": "VAE Encode"
        }
      },
      "41": {
        "inputs": {
          "samples": [
            "40",
            0
          ],
          "mask": [
            "349",
            0
          ]
        },
        "class_type": "SetLatentNoiseMask",
        "_meta": {
          "title": "Set Latent Noise Mask"
        }
      },
      "144": {
        "inputs": {
          "image": input_image_name,
          "upload": "image"
        },
        "class_type": "LoadImage",
        "_meta": {
          "title": "Load Image"
        }
      },
      "288": {
        "inputs": {
          "action": "append",
          "tidy_tags": "yes",
          "text_a": [
            "927",
            0
          ],
          "text_b": "(((masterpiece))),(((best quality))),((ultra-detailed))"
        },
        "class_type": "StringFunction|pysssss",
        "_meta": {
          "title": "String Function 🐍"
        }
      },
      "299": {
        "inputs": {
          "switch": "Off",
          "lora_name": "AIX/绪儿-绝美彩虹天使_v1.0.safetensors",
          "strength_model": 0.9,
          "strength_clip": 1,
          "model": [
            "16",
            0
          ],
          "clip": [
            "16",
            1
          ]
        },
        "class_type": "CR Load LoRA",
        "_meta": {
          "title": "💊 CR Load LoRA"
        }
      },
      "300": {
        "inputs": {
          "switch": "Off",
          "lora_name": "None",
          "strength_model": 0.8,
          "strength_clip": 1,
          "model": [
            "299",
            0
          ],
          "clip": [
            "299",
            1
          ]
        },
        "class_type": "CR Load LoRA",
        "_meta": {
          "title": "💊 CR Load LoRA"
        }
      },
      "301": {
        "inputs": {
          "switch": "Off",
          "lora_name": "None",
          "strength_model": 1,
          "strength_clip": 1,
          "model": [
            "300",
            0
          ],
          "clip": [
            "300",
            1
          ]
        },
        "class_type": "CR Load LoRA",
        "_meta": {
          "title": "💊 CR Load LoRA"
        }
      },
      "325": {
        "inputs": {
          "image": [
            "144",
            0
          ],
          "mask": [
            "349",
            0
          ]
        },
        "class_type": "InpaintPreprocessor",
        "_meta": {
          "title": "Inpaint Preprocessor"
        }
      },
      "326": {
        "inputs": {
          "control_net_name": "control_v11p_sd15_inpaint.pth"
        },
        "class_type": "ControlNetLoader",
        "_meta": {
          "title": "Load ControlNet Model"
        }
      },
      "327": {
        "inputs": {
          "strength": 1,
          "start_percent": 0,
          "end_percent": 0.5,
          "positive": [
            "21",
            0
          ],
          "negative": [
            "22",
            0
          ],
          "control_net": [
            "326",
            0
          ],
          "image": [
            "325",
            0
          ]
        },
        "class_type": "ControlNetApplyAdvanced",
        "_meta": {
          "title": "Apply ControlNet (Advanced)"
        }
      },
      "331": {
        "inputs": {
          "control_net_name": "control_v11p_sd15_openpose_fp16.safetensors"
        },
        "class_type": "ControlNetLoader",
        "_meta": {
          "title": "Load ControlNet Model"
        }
      },
      "332": {
        "inputs": {
          "strength": 1,
          "start_percent": 0,
          "end_percent": 1,
          "positive": [
            "327",
            0
          ],
          "negative": [
            "327",
            1
          ],
          "control_net": [
            "331",
            0
          ],
          "image": [
            "333",
            0
          ]
        },
        "class_type": "ControlNetApplyAdvanced",
        "_meta": {
          "title": "Apply ControlNet (Advanced)"
        }
      },
      "333": {
        "inputs": {
          "preprocessor": "DWPreprocessor",
          "resolution": 512,
          "image": [
            "144",
            0
          ]
        },
        "class_type": "AIO_Preprocessor",
        "_meta": {
          "title": "AIO Aux Preprocessor"
        }
      },
      "338": {
        "inputs": {
          "samples": [
            "339",
            0
          ],
          "vae": [
            "16",
            2
          ]
        },
        "class_type": "VAEDecode",
        "_meta": {
          "title": "VAE Decode"
        }
      },
      "339": {
        "inputs": {
          "seed": 580099703059723,
          "steps": 20,
          "cfg": 8,
          "sampler_name": "dpmpp_sde",
          "scheduler": "karras",
          "denoise": 1,
          "model": [
            "301",
            0
          ],
          "positive": [
            "797",
            0
          ],
          "negative": [
            "797",
            1
          ],
          "latent_image": [
            "41",
            0
          ]
        },
        "class_type": "KSampler",
        "_meta": {
          "title": "KSampler"
        }
      },
      "349": {
        "inputs": {
          "start_offset": 19,
          "feathering_weight": 0.2,
          "mask": [
            "783",
            0
          ]
        },
        "class_type": "FeatheredMask",
        "_meta": {
          "title": "FeatheredMask"
        }
      },
      "360": {
        "inputs": {
          "max_width": 768,
          "max_height": 768,
          "min_width": 0,
          "min_height": 0,
          "crop_if_required": "no",
          "images": [
            "144",
            0
          ]
        },
        "class_type": "ConstrainImage|pysssss",
        "_meta": {
          "title": "Constrain Image 🐍"
        }
      },
      "487": {
        "inputs": {
          "upscale_model": [
            "488",
            0
          ],
          "image": [
            "734",
            0
          ]
        },
        "class_type": "ImageUpscaleWithModel",
        "_meta": {
          "title": "Upscale Image (using Model)"
        }
      },
      "488": {
        "inputs": {
          "model_name": "4x-UltraSharp.pth"
        },
        "class_type": "UpscaleModelLoader",
        "_meta": {
          "title": "Load Upscale Model"
        }
      },
      "497": {
        "inputs": {
          "pixels": [
            "510",
            0
          ],
          "vae": [
            "16",
            2
          ]
        },
        "class_type": "VAEEncode",
        "_meta": {
          "title": "VAE Encode"
        }
      },
      "500": {
        "inputs": {
          "model": "wd-v1-4-convnext-tagger-v2",
          "threshold": 0.35,
          "character_threshold": 0.85,
          "replace_underscore": "",
          "trailing_comma": false,
          "exclude_tags": "",
          "image": [
            "734",
            0
          ]
        },
        "class_type": "WD14Tagger|pysssss",
        "_meta": {
          "title": "WD14 Tagger 🐍"
        }
      },
      "501": {
        "inputs": {
          "action": "append",
          "tidy_tags": "yes",
          "text_a": [
            "500",
            0
          ],
          "text_b": "(((masterpiece))),(((best quality))),((ultra-detailed))",
          "text_c": ""
        },
        "class_type": "StringFunction|pysssss",
        "_meta": {
          "title": "String Function 🐍"
        }
      },
      "502": {
        "inputs": {
          "text": [
            "501",
            0
          ],
          "token_normalization": "none",
          "weight_interpretation": "A1111",
          "clip": [
            "690",
            1
          ]
        },
        "class_type": "BNK_CLIPTextEncodeAdvanced",
        "_meta": {
          "title": "CLIP Text Encode (Advanced)"
        }
      },
      "510": {
        "inputs": {
          "x": 0,
          "y": 0,
          "resize_source": true,
          "destination": [
            "673",
            0
          ],
          "source": [
            "144",
            0
          ],
          "mask": [
            "586",
            0
          ]
        },
        "class_type": "ImageCompositeMasked",
        "_meta": {
          "title": "ImageCompositeMasked"
        }
      },
      "555": {
        "inputs": {
          "samples": [
            "497",
            0
          ],
          "mask": [
            "585",
            0
          ]
        },
        "class_type": "SetLatentNoiseMask",
        "_meta": {
          "title": "Set Latent Noise Mask"
        }
      },
      "585": {
        "inputs": {
          "expand": 0,
          "tapered_corners": true,
          "mask": [
            "349",
            0
          ]
        },
        "class_type": "GrowMask",
        "_meta": {
          "title": "GrowMask"
        }
      },
      "586": {
        "inputs": {
          "mask": [
            "349",
            0
          ]
        },
        "class_type": "InvertMask",
        "_meta": {
          "title": "InvertMask"
        }
      },
      "667": {
        "inputs": {
          "value": [
            "906",
            0
          ]
        },
        "class_type": "ImpactImageInfo",
        "_meta": {
          "title": "ImpactImageInfo"
        }
      },
      "673": {
        "inputs": {
          "upscale_method": "nearest-exact",
          "width": [
            "667",
            2
          ],
          "height": [
            "667",
            1
          ],
          "crop": "disabled",
          "image": [
            "487",
            0
          ]
        },
        "class_type": "ImageScale",
        "_meta": {
          "title": "Upscale Image"
        }
      },
      "677": {
        "inputs": {
          "seed": 946312750284545,
          "steps": 28,
          "cfg": 8,
          "sampler_name": "dpmpp_sde",
          "scheduler": "karras",
          "denoise": 0.4,
          "model": [
            "690",
            0
          ],
          "positive": [
            "691",
            0
          ],
          "negative": [
            "691",
            1
          ],
          "latent_image": [
            "555",
            0
          ]
        },
        "class_type": "KSampler",
        "_meta": {
          "title": "KSampler"
        }
      },
      "690": {
        "inputs": {
          "switch": "On",
          "lora_name": "风格/add_detail.safetensors",
          "strength_model": 1,
          "strength_clip": 1,
          "model": [
            "301",
            0
          ],
          "clip": [
            "301",
            1
          ]
        },
        "class_type": "CR Load LoRA",
        "_meta": {
          "title": "💊 CR Load LoRA"
        }
      },
      "691": {
        "inputs": {
          "strength": 1,
          "start_percent": 0,
          "end_percent": 1,
          "positive": [
            "502",
            0
          ],
          "negative": [
            "22",
            0
          ],
          "control_net": [
            "692",
            0
          ],
          "image": [
            "694",
            0
          ]
        },
        "class_type": "ControlNetApplyAdvanced",
        "_meta": {
          "title": "Apply ControlNet (Advanced)"
        }
      },
      "692": {
        "inputs": {
          "control_net_name": "control_v11p_sd15_softedge.pth"
        },
        "class_type": "ControlNetLoader",
        "_meta": {
          "title": "Load ControlNet Model"
        }
      },
      "694": {
        "inputs": {
          "preprocessor": "DWPreprocessor",
          "resolution": 512,
          "image": [
            "906",
            0
          ]
        },
        "class_type": "AIO_Preprocessor",
        "_meta": {
          "title": "AIO Aux Preprocessor"
        }
      },
      "734": {
        "inputs": {
          "any_02": [
            "338",
            0
          ]
        },
        "class_type": "Any Switch (rgthree)",
        "_meta": {
          "title": "Any Switch (rgthree)"
        }
      },
      "774": {
        "inputs": {
          "prompt": [
            "777",
            0
          ],
          "threshold": 0.3,
          "sam_model": [
            "775",
            0
          ],
          "grounding_dino_model": [
            "776",
            0
          ],
          "image": [
            "144",
            0
          ]
        },
        "class_type": "GroundingDinoSAMSegment (segment anything)",
        "_meta": {
          "title": "GroundingDinoSAMSegment (segment anything)"
        }
      },
      "775": {
        "inputs": {
          "model_name": "sam_vit_b_01ec64.pth",
          "device_mode": "Prefer GPU"
        },
        "class_type": "SAMLoader",
        "_meta": {
          "title": "SAMLoader (Impact)"
        }
      },
      "776": {
        "inputs": {
          "model_name": "GroundingDINO_SwinB (938MB)"
        },
        "class_type": "GroundingDinoModelLoader (segment anything)",
        "_meta": {
          "title": "GroundingDinoModelLoader (segment anything)"
        }
      },
      "777": {
        "inputs": {
          "String": "people"
        },
        "class_type": "String",
        "_meta": {
          "title": "String"
        }
      },
      "783": {
        "inputs": {
          "mask": [
            "774",
            1
          ]
        },
        "class_type": "InvertMask",
        "_meta": {
          "title": "InvertMask"
        }
      },
      "796": {
        "inputs": {
          "control_net_name": "control_v11p_sd15_softedge.pth"
        },
        "class_type": "ControlNetLoader",
        "_meta": {
          "title": "Load ControlNet Model"
        }
      },
      "797": {
        "inputs": {
          "strength": 0.5,
          "start_percent": 0,
          "end_percent": 1,
          "positive": [
            "332",
            0
          ],
          "negative": [
            "332",
            1
          ],
          "control_net": [
            "796",
            0
          ],
          "image": [
            "798",
            0
          ]
        },
        "class_type": "ControlNetApplyAdvanced",
        "_meta": {
          "title": "Apply ControlNet (Advanced)"
        }
      },
      "798": {
        "inputs": {
          "preprocessor": "HEDPreprocessor",
          "resolution": 512,
          "image": [
            "144",
            0
          ]
        },
        "class_type": "AIO_Preprocessor",
        "_meta": {
          "title": "AIO Aux Preprocessor"
        }
      },
      "819": {
        "inputs": {
          "seed": 21461968751874,
          "tile_width": 512,
          "tile_height": 512,
          "tiling_strategy": "random",
          "steps": 25,
          "cfg": 7,
          "sampler_name": "dpmpp_2m",
          "scheduler": "karras",
          "denoise": 0.1,
          "model": [
            "690",
            0
          ],
          "positive": [
            "797",
            0
          ],
          "negative": [
            "797",
            1
          ],
          "latent_image": [
            "904",
            0
          ]
        },
        "class_type": "BNK_TiledKSampler",
        "_meta": {
          "title": "Tiled KSampler"
        }
      },
      "820": {
        "inputs": {
          "samples": [
            "819",
            0
          ],
          "vae": [
            "16",
            2
          ]
        },
        "class_type": "VAEDecode",
        "_meta": {
          "title": "VAE Decode"
        }
      },
      "903": {
        "inputs": {
          "samples": [
            "677",
            0
          ],
          "vae": [
            "16",
            2
          ]
        },
        "class_type": "VAEDecode",
        "_meta": {
          "title": "VAE Decode"
        }
      },
      "904": {
        "inputs": {
          "pixels": [
            "903",
            0
          ],
          "vae": [
            "16",
            2
          ]
        },
        "class_type": "VAEEncode",
        "_meta": {
          "title": "VAE Encode"
        }
      },
      "906": {
        "inputs": {
          "upscale_method": "nearest-exact",
          "scale_by": 2
        },
        "class_type": "ImageScaleBy",
        "_meta": {
          "title": "Upscale Image By"
        }
      },
      "925": {
        "inputs": {
          "text": "hyper-detailed digital illustration, cyberpunk, single girl with techsuite hoodie and headphones in the street, neon lights, lighting bar, city, cyberpunk city, film still, backpack, in megapolis, pro-lighting, high-res, masterpiece, (/qingning/), (\\MBTI\\), (\\shen ming shao nv\\)\n"
        },
        "class_type": "Text Multiline",
        "_meta": {
          "title": "Text Multiline"
        }
      },
      "927": {
        "inputs": {
          "text_positive": [
            "925",
            0
          ],
          "text_negative": [
            "977",
            0
          ],
          "style": "base",
          "log_prompt": "No"
        },
        "class_type": "SDXLPromptStyler",
        "_meta": {
          "title": "SDXL Prompt Styler"
        }
      },
      "977": {
        "inputs": {
          "action": "append",
          "tidy_tags": "yes",
          "text_a": [
            "1027",
            0
          ],
          "text_b": "NSFW,lowres,bad anatomy,bad hand,paintings,sketches,(worst quality:2),(low quality:2),(normal quality:2),lowres,((monochrome)),((grayscale)),skin spots,acnes,skin blemishes,age spot,glans,extra fingers,fewer fingers,((watermark:2)),(white letters:1),(multi nipples),bad anatomy,bad hands,text,error,missing fingers,missing arms,missing legs,extra digit,fewer digits,cropped,worst quality,jpeg artifacts,signature,watermark,username,bad feet,{Multiple people},blurry,poorly drawn hands,poorly drawn face,mutation,deformed,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands,polar lowres,bad body,bad proportions,gross proportions,wrong feet bottom render,abdominal stretch,briefs,knickers,kecks,thong,{{fused fingers}},{{bad body}},bad proportion body to legs,wrong toes,extra toes,missing toes,weird toes,2 body,2 pussy,2 upper,2 lower,2 head,3 hand,3 feet,extra long leg,super long leg,mirrored image,mirrored noise"
        },
        "class_type": "StringFunction|pysssss",
        "_meta": {
          "title": "String Function 🐍"
        }
      },
      "1013": {
        "inputs": {
          "filename_prefix": "ComfyUI",
          "images": [
            "338",
            0
          ]
        },
        "class_type": "SaveImage",
        "_meta": {
          "title": "Save Image"
        }
      },
      "1016": {
        "inputs": {
          "filename_prefix": "ComfyUI",
          "images": [
            "820",
            0
          ]
        },
        "class_type": "SaveImage",
        "_meta": {
          "title": "Save Image"
        }
      },
      "1017": {
        "inputs": {
          "mask": [
            "349",
            0
          ]
        },
        "class_type": "MaskToImage",
        "_meta": {
          "title": "Convert Mask to Image"
        }
      },
      "1018": {
        "inputs": {
          "images": [
            "1017",
            0
          ]
        },
        "class_type": "PreviewImage",
        "_meta": {
          "title": "Preview Image"
        }
      },
      "1027": {
        "inputs": {
          "string": "EasyNegative, badhandv4, verybadimagenegative_v1.3, bad-hands-5, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, Missing limbs, three arms, bad feet, text font ui, signature, blurry, text font ui, malformed hands, long neck, limb, Sleeveles, bad anatomy disfigured malformed mutated, (mutated hands and fingers :1.5).(long body :1.3), (mutation , poorly drawn :1.2), bad anatomy, disfigured, malformed, mutated, multiple breasts, futa, yaoi, three legs"
        },
        "class_type": "Simple String",
        "_meta": {
          "title": "Simple String"
        }
      }
    },
    "extra_data": {
      "extra_pnginfo": {
        "workflow": {
          "last_node_id": 1027,
          "last_link_id": 1984,
          "nodes": [
            {
              "id": 300,
              "type": "CR Load LoRA",
              "pos": [
                -13763.678910556097,
                2405.2057609744393
              ],
              "size": {
                "0": 330.93878173828125,
                "1": 170
              },
              "flags": {
                "pinned": false
              },
              "order": 21,
              "mode": 0,
              "inputs": [
                {
                  "name": "model",
                  "type": "MODEL",
                  "link": 595,
                  "label": "模型"
                },
                {
                  "name": "clip",
                  "type": "CLIP",
                  "link": 596,
                  "label": "CLIP"
                }
              ],
              "outputs": [
                {
                  "name": "MODEL",
                  "type": "MODEL",
                  "links": [
                    597
                  ],
                  "shape": 3,
                  "label": "模型",
                  "slot_index": 0
                },
                {
                  "name": "CLIP",
                  "type": "CLIP",
                  "links": [
                    598
                  ],
                  "shape": 3,
                  "label": "CLIP",
                  "slot_index": 1
                },
                {
                  "name": "show_help",
                  "type": "STRING",
                  "links": null,
                  "shape": 3,
                  "label": "show_help"
                }
              ],
              "properties": {
                "Node name for S&R": "CR Load LoRA"
              },
              "widgets_values": [
                "Off",
                "None",
                0.8,
                1
              ],
              "color": "#223",
              "bgcolor": "#335"
            },
            {
              "id": 301,
              "type": "CR Load LoRA",
              "pos": [
                -13283.678910556097,
                2405.2057609744393
              ],
              "size": {
                "0": 325.5738525390625,
                "1": 170
              },
              "flags": {
                "pinned": false
              },
              "order": 25,
              "mode": 0,
              "inputs": [
                {
                  "name": "model",
                  "type": "MODEL",
                  "link": 597,
                  "label": "模型"
                },
                {
                  "name": "clip",
                  "type": "CLIP",
                  "link": 598,
                  "label": "CLIP"
                }
              ],
              "outputs": [
                {
                  "name": "MODEL",
                  "type": "MODEL",
                  "links": [
                    1506,
                    1970
                  ],
                  "shape": 3,
                  "label": "模型",
                  "slot_index": 0
                },
                {
                  "name": "CLIP",
                  "type": "CLIP",
                  "links": [
                    601,
                    1507,
                    1976
                  ],
                  "shape": 3,
                  "label": "CLIP",
                  "slot_index": 1
                },
                {
                  "name": "show_help",
                  "type": "STRING",
                  "links": null,
                  "shape": 3,
                  "label": "show_help"
                }
              ],
              "properties": {
                "Node name for S&R": "CR Load LoRA"
              },
              "widgets_values": [
                "Off",
                "None",
                1,
                1
              ],
              "color": "#223",
              "bgcolor": "#335"
            },
            {
              "id": 333,
              "type": "AIO_Preprocessor",
              "pos": [
                -12694,
                3081
              ],
              "size": {
                "0": 315,
                "1": 82
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 17,
              "mode": 0,
              "inputs": [
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 719,
                  "label": "图像"
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    668
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "AIO_Preprocessor"
              },
              "widgets_values": [
                "DWPreprocessor",
                512
              ],
              "color": "#432",
              "bgcolor": "#653"
            },
            {
              "id": 586,
              "type": "InvertMask",
              "pos": [
                -11162,
                3404
              ],
              "size": {
                "0": 210,
                "1": 26
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 34,
              "mode": 0,
              "inputs": [
                {
                  "name": "mask",
                  "type": "MASK",
                  "link": 1393,
                  "label": "遮罩"
                }
              ],
              "outputs": [
                {
                  "name": "MASK",
                  "type": "MASK",
                  "links": [
                    1158
                  ],
                  "shape": 3,
                  "label": "遮罩",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "InvertMask"
              }
            },
            {
              "id": 500,
              "type": "WD14Tagger|pysssss",
              "pos": [
                -11182,
                2402
              ],
              "size": {
                "0": 320,
                "1": 220
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 44,
              "mode": 0,
              "inputs": [
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 1490,
                  "label": "图像"
                }
              ],
              "outputs": [
                {
                  "name": "STRING",
                  "type": "STRING",
                  "links": [
                    972
                  ],
                  "shape": 6,
                  "label": "字符串",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "WD14Tagger|pysssss"
              },
              "widgets_values": [
                "wd-v1-4-convnext-tagger-v2",
                0.35,
                0.85,
                "",
                false,
                ""
              ]
            },
            {
              "id": 501,
              "type": "StringFunction|pysssss",
              "pos": [
                -10827,
                2377
              ],
              "size": {
                "0": 400,
                "1": 270
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 46,
              "mode": 0,
              "inputs": [
                {
                  "name": "text_a",
                  "type": "STRING",
                  "link": 972,
                  "widget": {
                    "name": "text_a"
                  },
                  "label": "文本_A"
                }
              ],
              "outputs": [
                {
                  "name": "STRING",
                  "type": "STRING",
                  "links": [
                    973
                  ],
                  "shape": 3,
                  "label": "字符串",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "StringFunction|pysssss"
              },
              "widgets_values": [
                "append",
                "yes",
                "",
                "(((masterpiece))),(((best quality))),((ultra-detailed))",
                ""
              ]
            },
            {
              "id": 502,
              "type": "BNK_CLIPTextEncodeAdvanced",
              "pos": [
                -10351,
                2390
              ],
              "size": {
                "0": 400,
                "1": 200
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 48,
              "mode": 0,
              "inputs": [
                {
                  "name": "clip",
                  "type": "CLIP",
                  "link": 1508,
                  "label": "CLIP",
                  "slot_index": 0
                },
                {
                  "name": "text",
                  "type": "STRING",
                  "link": 973,
                  "widget": {
                    "name": "text"
                  },
                  "label": "文本"
                }
              ],
              "outputs": [
                {
                  "name": "CONDITIONING",
                  "type": "CONDITIONING",
                  "links": [
                    1428
                  ],
                  "shape": 3,
                  "label": "条件",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "BNK_CLIPTextEncodeAdvanced"
              },
              "widgets_values": [
                "",
                "none",
                "A1111"
              ]
            },
            {
              "id": 691,
              "type": "ControlNetApplyAdvanced",
              "pos": [
                -9773,
                2379
              ],
              "size": {
                "0": 315,
                "1": 166
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 50,
              "mode": 0,
              "inputs": [
                {
                  "name": "positive",
                  "type": "CONDITIONING",
                  "link": 1428,
                  "label": "正面条件"
                },
                {
                  "name": "negative",
                  "type": "CONDITIONING",
                  "link": 1429,
                  "label": "负面条件"
                },
                {
                  "name": "control_net",
                  "type": "CONTROL_NET",
                  "link": 1423,
                  "label": "ControlNet",
                  "slot_index": 2
                },
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 1424,
                  "label": "图像",
                  "slot_index": 3
                }
              ],
              "outputs": [
                {
                  "name": "positive",
                  "type": "CONDITIONING",
                  "links": [
                    1430
                  ],
                  "shape": 3,
                  "label": "正面条件",
                  "slot_index": 0
                },
                {
                  "name": "negative",
                  "type": "CONDITIONING",
                  "links": [
                    1431
                  ],
                  "shape": 3,
                  "label": "负面条件",
                  "slot_index": 1
                }
              ],
              "properties": {
                "Node name for S&R": "ControlNetApplyAdvanced"
              },
              "widgets_values": [
                1,
                0,
                1
              ]
            },
            {
              "id": 487,
              "type": "ImageUpscaleWithModel",
              "pos": [
                -10849,
                3018
              ],
              "size": {
                "0": 241.79998779296875,
                "1": 46
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 45,
              "mode": 0,
              "inputs": [
                {
                  "name": "upscale_model",
                  "type": "UPSCALE_MODEL",
                  "link": 959,
                  "label": "放大模型",
                  "slot_index": 0
                },
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 1491,
                  "label": "图像"
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    1343
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "ImageUpscaleWithModel"
              }
            },
            {
              "id": 694,
              "type": "AIO_Preprocessor",
              "pos": [
                -10587,
                2828
              ],
              "size": {
                "0": 315,
                "1": 82
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 16,
              "mode": 0,
              "inputs": [
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 1759,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    1424
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "AIO_Preprocessor"
              },
              "widgets_values": [
                "DWPreprocessor",
                512
              ]
            },
            {
              "id": 673,
              "type": "ImageScale",
              "pos": [
                -10151,
                2851
              ],
              "size": {
                "0": 315,
                "1": 130
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 47,
              "mode": 0,
              "inputs": [
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 1343,
                  "label": "图像"
                },
                {
                  "name": "width",
                  "type": "INT",
                  "link": 1345,
                  "widget": {
                    "name": "width"
                  },
                  "label": "宽度"
                },
                {
                  "name": "height",
                  "type": "INT",
                  "link": 1344,
                  "widget": {
                    "name": "height"
                  },
                  "label": "高度"
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    1346
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "ImageScale"
              },
              "widgets_values": [
                "nearest-exact",
                512,
                512,
                "disabled"
              ]
            },
            {
              "id": 510,
              "type": "ImageCompositeMasked",
              "pos": [
                -9685,
                2815
              ],
              "size": {
                "0": 315,
                "1": 146
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 49,
              "mode": 0,
              "inputs": [
                {
                  "name": "destination",
                  "type": "IMAGE",
                  "link": 1346,
                  "label": "目标图像"
                },
                {
                  "name": "source",
                  "type": "IMAGE",
                  "link": 1234,
                  "label": "源图像"
                },
                {
                  "name": "mask",
                  "type": "MASK",
                  "link": 1158,
                  "label": "遮罩"
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    1026
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "ImageCompositeMasked"
              },
              "widgets_values": [
                0,
                0,
                true
              ]
            },
            {
              "id": 667,
              "type": "ImpactImageInfo",
              "pos": [
                -10530,
                3008
              ],
              "size": {
                "0": 210,
                "1": 86
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 15,
              "mode": 0,
              "inputs": [
                {
                  "name": "value",
                  "type": "IMAGE",
                  "link": 1758,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "outputs": [
                {
                  "name": "batch",
                  "type": "FLOAT,INT,NUMBER,STRING",
                  "links": null,
                  "shape": 3,
                  "label": "批次大小"
                },
                {
                  "name": "height",
                  "type": "FLOAT,INT,NUMBER,STRING",
                  "links": [
                    1344
                  ],
                  "shape": 3,
                  "label": "高度",
                  "slot_index": 1
                },
                {
                  "name": "width",
                  "type": "FLOAT,INT,NUMBER,STRING",
                  "links": [
                    1345
                  ],
                  "shape": 3,
                  "label": "宽度",
                  "slot_index": 2
                },
                {
                  "name": "channel",
                  "type": "FLOAT,INT,NUMBER,STRING",
                  "links": null,
                  "shape": 3,
                  "label": "通道"
                }
              ],
              "properties": {
                "Node name for S&R": "ImpactImageInfo"
              }
            },
            {
              "id": 360,
              "type": "ConstrainImage|pysssss",
              "pos": [
                -14557,
                2550
              ],
              "size": {
                "0": 210,
                "1": 154
              },
              "flags": {
                "pinned": false
              },
              "order": 18,
              "mode": 0,
              "inputs": [
                {
                  "name": "images",
                  "type": "IMAGE",
                  "link": 741,
                  "label": "图像"
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    743
                  ],
                  "shape": 6,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "ConstrainImage|pysssss"
              },
              "widgets_values": [
                768,
                768,
                0,
                0,
                "no"
              ],
              "color": "#223",
              "bgcolor": "#335"
            },
            {
              "id": 783,
              "type": "InvertMask",
              "pos": [
                -13735,
                3459
              ],
              "size": {
                "0": 140,
                "1": 26
              },
              "flags": {
                "pinned": false,
                "collapsed": false
              },
              "order": 24,
              "mode": 0,
              "inputs": [
                {
                  "name": "mask",
                  "type": "MASK",
                  "link": 1544,
                  "label": "遮罩"
                }
              ],
              "outputs": [
                {
                  "name": "MASK",
                  "type": "MASK",
                  "links": [
                    1966
                  ],
                  "shape": 3,
                  "label": "遮罩",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "InvertMask"
              }
            },
            {
              "id": 40,
              "type": "VAEEncode",
              "pos": [
                -11634,
                2353
              ],
              "size": {
                "0": 210,
                "1": 46
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 23,
              "mode": 0,
              "inputs": [
                {
                  "name": "pixels",
                  "type": "IMAGE",
                  "link": 743,
                  "label": "图像"
                },
                {
                  "name": "vae",
                  "type": "VAE",
                  "link": 612,
                  "label": "VAE"
                }
              ],
              "outputs": [
                {
                  "name": "LATENT",
                  "type": "LATENT",
                  "links": [
                    63
                  ],
                  "shape": 3,
                  "label": "Latent",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "VAEEncode"
              },
              "color": "#232",
              "bgcolor": "#353"
            },
            {
              "id": 41,
              "type": "SetLatentNoiseMask",
              "pos": [
                -11633,
                2477
              ],
              "size": {
                "0": 210,
                "1": 46
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 31,
              "mode": 0,
              "inputs": [
                {
                  "name": "samples",
                  "type": "LATENT",
                  "link": 63,
                  "label": "Latent"
                },
                {
                  "name": "mask",
                  "type": "MASK",
                  "link": 726,
                  "label": "遮罩"
                }
              ],
              "outputs": [
                {
                  "name": "LATENT",
                  "type": "LATENT",
                  "links": [
                    935
                  ],
                  "shape": 3,
                  "label": "Latent",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "SetLatentNoiseMask"
              },
              "color": "#232",
              "bgcolor": "#353"
            },
            {
              "id": 338,
              "type": "VAEDecode",
              "pos": [
                -11605,
                3125
              ],
              "size": {
                "0": 210,
                "1": 46
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 41,
              "mode": 0,
              "inputs": [
                {
                  "name": "samples",
                  "type": "LATENT",
                  "link": 1977,
                  "label": "Latent"
                },
                {
                  "name": "vae",
                  "type": "VAE",
                  "link": 677,
                  "label": "VAE",
                  "slot_index": 1
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    1968,
                    1969
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "VAEDecode"
              },
              "color": "#232",
              "bgcolor": "#353"
            },
            {
              "id": 796,
              "type": "ControlNetLoader",
              "pos": [
                -12719,
                3314
              ],
              "size": {
                "0": 380.9180603027344,
                "1": 58
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 0,
              "mode": 0,
              "outputs": [
                {
                  "name": "CONTROL_NET",
                  "type": "CONTROL_NET",
                  "links": [
                    1556
                  ],
                  "shape": 3,
                  "label": "ControlNet",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "ControlNetLoader"
              },
              "widgets_values": [
                "control_v11p_sd15_softedge.pth"
              ],
              "color": "#432",
              "bgcolor": "#653"
            },
            {
              "id": 798,
              "type": "AIO_Preprocessor",
              "pos": [
                -12676,
                3546
              ],
              "size": {
                "0": 315,
                "1": 82
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 19,
              "mode": 0,
              "inputs": [
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 1558,
                  "label": "图像"
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    1557
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "AIO_Preprocessor"
              },
              "widgets_values": [
                "HEDPreprocessor",
                512
              ],
              "color": "#432",
              "bgcolor": "#653"
            },
            {
              "id": 692,
              "type": "ControlNetLoader",
              "pos": [
                -9812,
                2601
              ],
              "size": {
                "0": 382.4920654296875,
                "1": 69.208251953125
              },
              "flags": {
                "pinned": false
              },
              "order": 1,
              "mode": 0,
              "outputs": [
                {
                  "name": "CONTROL_NET",
                  "type": "CONTROL_NET",
                  "links": [
                    1423
                  ],
                  "shape": 3,
                  "label": "ControlNet"
                }
              ],
              "properties": {
                "Node name for S&R": "ControlNetLoader"
              },
              "widgets_values": [
                "control_v11p_sd15_softedge.pth"
              ],
              "color": "#232",
              "bgcolor": "#353"
            },
            {
              "id": 585,
              "type": "GrowMask",
              "pos": [
                -10925,
                3175
              ],
              "size": {
                "0": 315,
                "1": 82
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 33,
              "mode": 0,
              "inputs": [
                {
                  "name": "mask",
                  "type": "MASK",
                  "link": 1392,
                  "label": "遮罩"
                }
              ],
              "outputs": [
                {
                  "name": "MASK",
                  "type": "MASK",
                  "links": [
                    1154
                  ],
                  "shape": 3,
                  "label": "遮罩",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "GrowMask"
              },
              "widgets_values": [
                0,
                true
              ]
            },
            {
              "id": 497,
              "type": "VAEEncode",
              "pos": [
                -10527,
                3155
              ],
              "size": {
                "0": 210,
                "1": 46
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 51,
              "mode": 0,
              "inputs": [
                {
                  "name": "pixels",
                  "type": "IMAGE",
                  "link": 1026,
                  "label": "图像"
                },
                {
                  "name": "vae",
                  "type": "VAE",
                  "link": 967,
                  "label": "VAE"
                }
              ],
              "outputs": [
                {
                  "name": "LATENT",
                  "type": "LATENT",
                  "links": [
                    1077
                  ],
                  "shape": 3,
                  "label": "Latent",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "VAEEncode"
              }
            },
            {
              "id": 555,
              "type": "SetLatentNoiseMask",
              "pos": [
                -10216,
                3145
              ],
              "size": {
                "0": 210,
                "1": 46
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 52,
              "mode": 0,
              "inputs": [
                {
                  "name": "samples",
                  "type": "LATENT",
                  "link": 1077,
                  "label": "Latent"
                },
                {
                  "name": "mask",
                  "type": "MASK",
                  "link": 1154,
                  "label": "遮罩"
                }
              ],
              "outputs": [
                {
                  "name": "LATENT",
                  "type": "LATENT",
                  "links": [
                    1371
                  ],
                  "shape": 3,
                  "label": "Latent",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "SetLatentNoiseMask"
              }
            },
            {
              "id": 903,
              "type": "VAEDecode",
              "pos": [
                -9930,
                3128
              ],
              "size": {
                "0": 210,
                "1": 46
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 54,
              "mode": 0,
              "inputs": [
                {
                  "name": "samples",
                  "type": "LATENT",
                  "link": 1756,
                  "label": "Latent"
                },
                {
                  "name": "vae",
                  "type": "VAE",
                  "link": 1754,
                  "label": "VAE",
                  "slot_index": 1
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    1751
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "VAEDecode"
              }
            },
            {
              "id": 904,
              "type": "VAEEncode",
              "pos": [
                -9644,
                3113
              ],
              "size": {
                "0": 210,
                "1": 46
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 55,
              "mode": 0,
              "inputs": [
                {
                  "name": "pixels",
                  "type": "IMAGE",
                  "link": 1751,
                  "label": "图像"
                },
                {
                  "name": "vae",
                  "type": "VAE",
                  "link": 1755,
                  "label": "VAE",
                  "slot_index": 1
                }
              ],
              "outputs": [
                {
                  "name": "LATENT",
                  "type": "LATENT",
                  "links": [
                    1752
                  ],
                  "shape": 3,
                  "label": "Latent",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "VAEEncode"
              }
            },
            {
              "id": 819,
              "type": "BNK_TiledKSampler",
              "pos": [
                -9966,
                3264
              ],
              "size": {
                "0": 288.12652587890625,
                "1": 546.000244140625
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 56,
              "mode": 0,
              "inputs": [
                {
                  "name": "model",
                  "type": "MODEL",
                  "link": 1603,
                  "label": "模型"
                },
                {
                  "name": "positive",
                  "type": "CONDITIONING",
                  "link": 1601,
                  "label": "正面条件"
                },
                {
                  "name": "negative",
                  "type": "CONDITIONING",
                  "link": 1602,
                  "label": "负面条件"
                },
                {
                  "name": "latent_image",
                  "type": "LATENT",
                  "link": 1752,
                  "label": "Latent",
                  "slot_index": 3
                }
              ],
              "outputs": [
                {
                  "name": "LATENT",
                  "type": "LATENT",
                  "links": [
                    1604
                  ],
                  "shape": 3,
                  "label": "Latent",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "BNK_TiledKSampler"
              },
              "widgets_values": [
                21461968751874,
                "fixed",
                512,
                512,
                "random",
                25,
                7,
                "dpmpp_2m",
                "karras",
                0.1
              ]
            },
            {
              "id": 677,
              "type": "KSampler",
              "pos": [
                -10502,
                3312
              ],
              "size": {
                "0": 315,
                "1": 474.0001220703125
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 53,
              "mode": 0,
              "inputs": [
                {
                  "name": "model",
                  "type": "MODEL",
                  "link": 1972,
                  "label": "模型"
                },
                {
                  "name": "positive",
                  "type": "CONDITIONING",
                  "link": 1430,
                  "label": "正面条件"
                },
                {
                  "name": "negative",
                  "type": "CONDITIONING",
                  "link": 1431,
                  "label": "负面条件"
                },
                {
                  "name": "latent_image",
                  "type": "LATENT",
                  "link": 1371,
                  "label": "Latent",
                  "slot_index": 3
                }
              ],
              "outputs": [
                {
                  "name": "LATENT",
                  "type": "LATENT",
                  "links": [
                    1756
                  ],
                  "shape": 3,
                  "label": "Latent",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "KSampler"
              },
              "widgets_values": [
                946312750284545,
                "randomize",
                28,
                8,
                "dpmpp_sde",
                "karras",
                0.4
              ]
            },
            {
              "id": 820,
              "type": "VAEDecode",
              "pos": [
                -9636,
                3289
              ],
              "size": {
                "0": 210,
                "1": 46
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 57,
              "mode": 0,
              "inputs": [
                {
                  "name": "samples",
                  "type": "LATENT",
                  "link": 1604,
                  "label": "Latent"
                },
                {
                  "name": "vae",
                  "type": "VAE",
                  "link": 1606,
                  "label": "VAE"
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    1975
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "VAEDecode"
              }
            },
            {
              "id": 16,
              "type": "CheckpointLoaderSimple",
              "pos": [
                -14627,
                2385
              ],
              "size": {
                "0": 349.17059326171875,
                "1": 107.40789794921875
              },
              "flags": {
                "pinned": false
              },
              "order": 2,
              "mode": 0,
              "outputs": [
                {
                  "name": "MODEL",
                  "type": "MODEL",
                  "links": [
                    590
                  ],
                  "slot_index": 0,
                  "label": "模型"
                },
                {
                  "name": "CLIP",
                  "type": "CLIP",
                  "links": [
                    591
                  ],
                  "slot_index": 1,
                  "label": "CLIP"
                },
                {
                  "name": "VAE",
                  "type": "VAE",
                  "links": [
                    612,
                    677,
                    967,
                    1606,
                    1754,
                    1755
                  ],
                  "slot_index": 2,
                  "label": "VAE"
                }
              ],
              "properties": {
                "Node name for S&R": "CheckpointLoaderSimple"
              },
              "widgets_values": [
                "majicV7.safetensors"
              ],
              "color": "#223",
              "bgcolor": "#335"
            },
            {
              "id": 22,
              "type": "BNK_CLIPTextEncodeAdvanced",
              "pos": [
                -13623,
                2927
              ],
              "size": {
                "0": 400,
                "1": 200
              },
              "flags": {
                "pinned": false,
                "collapsed": true
              },
              "order": 28,
              "mode": 0,
              "inputs": [
                {
                  "name": "clip",
                  "type": "CLIP",
                  "link": 601,
                  "label": "CLIP",
                  "slot_index": 0
                },
                {
                  "name": "text",
                  "type": "STRING",
                  "link": 1798,
                  "widget": {
                    "name": "text"
                  },
                  "label": "文本"
                }
              ],
              "outputs": [
                {
                  "name": "CONDITIONING",
                  "type": "CONDITIONING",
                  "links": [
                    921,
                    1429
                  ],
                  "shape": 3,
                  "label": "条件",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "BNK_CLIPTextEncodeAdvanced"
              },
              "widgets_values": [
                "NSFW,lowres,bad anatomy,bad hand,paintings,sketches,(worst quality:2),(low quality:2),(normal quality:2),lowres,((monochrome)),((grayscale)),skin spots,acnes,skin blemishes,age spot,glans,extra fingers,fewer fingers,((watermark:2)),(white letters:1),(multi nipples),bad anatomy,bad hands,text,error,missing fingers,missing arms,missing legs,extra digit,fewer digits,cropped,worst quality,jpeg artifacts,signature,watermark,username,bad feet,{Multiple people},blurry,poorly drawn hands,poorly drawn face,mutation,deformed,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands,polar lowres,bad body,bad proportions,gross proportions,wrong feet bottom render,abdominal stretch,briefs,knickers,kecks,thong,{{fused fingers}},{{bad body}},bad proportion body to legs,wrong toes,extra toes,missing toes,weird toes,2 body,2 pussy,2 upper,2 lower,2 head,3 hand,3 feet,extra long leg,super long leg,mirrored image,mirrored noise",
                "none",
                "A1111"
              ],
              "color": "#232",
              "bgcolor": "#353"
            },
            {
              "id": 288,
              "type": "StringFunction|pysssss",
              "pos": [
                -13616,
                3055
              ],
              "size": {
                "0": 400,
                "1": 244
              },
              "flags": {
                "pinned": false,
                "collapsed": true
              },
              "order": 26,
              "mode": 0,
              "inputs": [
                {
                  "name": "text_a",
                  "type": "STRING",
                  "link": 1797,
                  "widget": {
                    "name": "text_a"
                  },
                  "label": "文本_A"
                },
                {
                  "name": "text_c",
                  "type": "STRING",
                  "link": null,
                  "widget": {
                    "name": "text_c"
                  },
                  "label": "文本_C"
                }
              ],
              "outputs": [
                {
                  "name": "STRING",
                  "type": "STRING",
                  "links": [
                    559
                  ],
                  "shape": 3,
                  "label": "字符串",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "StringFunction|pysssss"
              },
              "widgets_values": [
                "append",
                "yes",
                "",
                "(((masterpiece))),(((best quality))),((ultra-detailed))",
                ""
              ],
              "color": "#232",
              "bgcolor": "#353"
            },
            {
              "id": 21,
              "type": "BNK_CLIPTextEncodeAdvanced",
              "pos": [
                -13289,
                3005
              ],
              "size": {
                "0": 400,
                "1": 200
              },
              "flags": {
                "pinned": false,
                "collapsed": true
              },
              "order": 30,
              "mode": 0,
              "inputs": [
                {
                  "name": "clip",
                  "type": "CLIP",
                  "link": 1976,
                  "label": "CLIP",
                  "slot_index": 0
                },
                {
                  "name": "text",
                  "type": "STRING",
                  "link": 559,
                  "widget": {
                    "name": "text"
                  },
                  "label": "文本",
                  "slot_index": 1
                }
              ],
              "outputs": [
                {
                  "name": "CONDITIONING",
                  "type": "CONDITIONING",
                  "links": [
                    920
                  ],
                  "shape": 3,
                  "label": "条件",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "BNK_CLIPTextEncodeAdvanced"
              },
              "widgets_values": [
                "A girl with a red hat",
                "none",
                "A1111"
              ],
              "color": "#232",
              "bgcolor": "#353"
            },
            {
              "id": 690,
              "type": "CR Load LoRA",
              "pos": [
                -11175,
                3560
              ],
              "size": {
                "0": 262.0491638183594,
                "1": 173.54916381835938
              },
              "flags": {
                "pinned": false
              },
              "order": 29,
              "mode": 0,
              "inputs": [
                {
                  "name": "model",
                  "type": "MODEL",
                  "link": 1506,
                  "label": "模型"
                },
                {
                  "name": "clip",
                  "type": "CLIP",
                  "link": 1507,
                  "label": "CLIP"
                }
              ],
              "outputs": [
                {
                  "name": "MODEL",
                  "type": "MODEL",
                  "links": [
                    1603,
                    1972
                  ],
                  "shape": 3,
                  "label": "模型",
                  "slot_index": 0
                },
                {
                  "name": "CLIP",
                  "type": "CLIP",
                  "links": [
                    1508
                  ],
                  "shape": 3,
                  "label": "CLIP",
                  "slot_index": 1
                },
                {
                  "name": "show_help",
                  "type": "STRING",
                  "links": null,
                  "shape": 3,
                  "label": "show_help"
                }
              ],
              "properties": {
                "Node name for S&R": "CR Load LoRA"
              },
              "widgets_values": [
                "On",
                "风格/add_detail.safetensors",
                1,
                1
              ]
            },
            {
              "id": 927,
              "type": "SDXLPromptStyler",
              "pos": [
                -14086,
                2924
              ],
              "size": {
                "0": 301.13970947265625,
                "1": 150
              },
              "flags": {
                "collapsed": false
              },
              "order": 22,
              "mode": 0,
              "inputs": [
                {
                  "name": "text_positive",
                  "type": "STRING",
                  "link": 1795,
                  "widget": {
                    "name": "text_positive"
                  },
                  "label": "正面条件"
                },
                {
                  "name": "text_negative",
                  "type": "STRING",
                  "link": 1880,
                  "widget": {
                    "name": "text_negative"
                  },
                  "label": "负面条件"
                }
              ],
              "outputs": [
                {
                  "name": "text_positive",
                  "type": "STRING",
                  "links": [
                    1797
                  ],
                  "shape": 3,
                  "label": "正面条件",
                  "slot_index": 0
                },
                {
                  "name": "text_negative",
                  "type": "STRING",
                  "links": [
                    1798
                  ],
                  "shape": 3,
                  "label": "负面条件",
                  "slot_index": 1
                }
              ],
              "properties": {
                "Node name for S&R": "SDXLPromptStyler"
              },
              "widgets_values": [
                "advertising poster style,fashion design by hugo ferdinand bosschart, reg rutkowski and bill sienkiewicz, trending on artstation, chinese woodblock, film nior, artstation hd, character design by senior concept artist . Professional, modern, product-focused, commercial, eye-catching, highly detailed",
                "\n",
                "base",
                "No"
              ],
              "color": "#232",
              "bgcolor": "#353"
            },
            {
              "id": 299,
              "type": "CR Load LoRA",
              "pos": [
                -14223.678910556097,
                2405.2057609744393
              ],
              "size": {
                "0": 339.1977233886719,
                "1": 170
              },
              "flags": {
                "pinned": false
              },
              "order": 13,
              "mode": 0,
              "inputs": [
                {
                  "name": "model",
                  "type": "MODEL",
                  "link": 590,
                  "label": "模型"
                },
                {
                  "name": "clip",
                  "type": "CLIP",
                  "link": 591,
                  "label": "CLIP"
                }
              ],
              "outputs": [
                {
                  "name": "MODEL",
                  "type": "MODEL",
                  "links": [
                    595
                  ],
                  "shape": 3,
                  "label": "模型",
                  "slot_index": 0
                },
                {
                  "name": "CLIP",
                  "type": "CLIP",
                  "links": [
                    596
                  ],
                  "shape": 3,
                  "label": "CLIP",
                  "slot_index": 1
                },
                {
                  "name": "show_help",
                  "type": "STRING",
                  "links": [],
                  "shape": 3,
                  "slot_index": 2,
                  "label": "show_help"
                }
              ],
              "properties": {
                "Node name for S&R": "CR Load LoRA"
              },
              "widgets_values": [
                "Off",
                "AIX/绪儿-绝美彩虹天使_v1.0.safetensors",
                0.9,
                1
              ],
              "color": "#223",
              "bgcolor": "#335"
            },
            {
              "id": 326,
              "type": "ControlNetLoader",
              "pos": [
                -12730,
                2460
              ],
              "size": {
                "0": 382.07550048828125,
                "1": 58
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 3,
              "mode": 0,
              "outputs": [
                {
                  "name": "CONTROL_NET",
                  "type": "CONTROL_NET",
                  "links": [
                    659
                  ],
                  "shape": 3,
                  "label": "ControlNet",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "ControlNetLoader"
              },
              "widgets_values": [
                "control_v11p_sd15_inpaint.pth"
              ],
              "color": "#432",
              "bgcolor": "#653"
            },
            {
              "id": 331,
              "type": "ControlNetLoader",
              "pos": [
                -12730,
                2870
              ],
              "size": {
                "0": 380.9180603027344,
                "1": 58
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 4,
              "mode": 0,
              "outputs": [
                {
                  "name": "CONTROL_NET",
                  "type": "CONTROL_NET",
                  "links": [
                    667
                  ],
                  "shape": 3,
                  "label": "ControlNet",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "ControlNetLoader"
              },
              "widgets_values": [
                "control_v11p_sd15_openpose_fp16.safetensors"
              ],
              "color": "#432",
              "bgcolor": "#653"
            },
            {
              "id": 325,
              "type": "InpaintPreprocessor",
              "pos": [
                -12720,
                2660
              ],
              "size": {
                "0": 313.5903625488281,
                "1": 77.34700012207031
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 32,
              "mode": 0,
              "inputs": [
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 716,
                  "label": "图像"
                },
                {
                  "name": "mask",
                  "type": "MASK",
                  "link": 732,
                  "label": "遮罩"
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    660
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "InpaintPreprocessor"
              },
              "color": "#432",
              "bgcolor": "#653"
            },
            {
              "id": 339,
              "type": "KSampler",
              "pos": [
                -11640,
                2590
              ],
              "size": {
                "0": 303.89703369140625,
                "1": 474
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 40,
              "mode": 0,
              "inputs": [
                {
                  "name": "model",
                  "type": "MODEL",
                  "link": 1970,
                  "label": "模型"
                },
                {
                  "name": "positive",
                  "type": "CONDITIONING",
                  "link": 1560,
                  "label": "正面条件"
                },
                {
                  "name": "negative",
                  "type": "CONDITIONING",
                  "link": 1561,
                  "label": "负面条件"
                },
                {
                  "name": "latent_image",
                  "type": "LATENT",
                  "link": 935,
                  "label": "Latent"
                }
              ],
              "outputs": [
                {
                  "name": "LATENT",
                  "type": "LATENT",
                  "links": [
                    1977
                  ],
                  "shape": 3,
                  "label": "Latent",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "KSampler"
              },
              "widgets_values": [
                580099703059723,
                "randomize",
                20,
                8,
                "dpmpp_sde",
                "karras",
                1
              ],
              "color": "#232",
              "bgcolor": "#353"
            },
            {
              "id": 327,
              "type": "ControlNetApplyAdvanced",
              "pos": [
                -12210,
                2480
              ],
              "size": {
                "0": 315,
                "1": 166
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 36,
              "mode": 0,
              "inputs": [
                {
                  "name": "positive",
                  "type": "CONDITIONING",
                  "link": 920,
                  "label": "正面条件",
                  "slot_index": 0
                },
                {
                  "name": "negative",
                  "type": "CONDITIONING",
                  "link": 921,
                  "label": "负面条件",
                  "slot_index": 1
                },
                {
                  "name": "control_net",
                  "type": "CONTROL_NET",
                  "link": 659,
                  "label": "ControlNet"
                },
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 660,
                  "label": "图像"
                }
              ],
              "outputs": [
                {
                  "name": "positive",
                  "type": "CONDITIONING",
                  "links": [
                    665
                  ],
                  "shape": 3,
                  "label": "正面条件",
                  "slot_index": 0
                },
                {
                  "name": "negative",
                  "type": "CONDITIONING",
                  "links": [
                    666
                  ],
                  "shape": 3,
                  "label": "负面条件",
                  "slot_index": 1
                }
              ],
              "properties": {
                "Node name for S&R": "ControlNetApplyAdvanced"
              },
              "widgets_values": [
                1,
                0,
                0.5
              ],
              "color": "#432",
              "bgcolor": "#653"
            },
            {
              "id": 332,
              "type": "ControlNetApplyAdvanced",
              "pos": [
                -12200,
                2900
              ],
              "size": {
                "0": 315,
                "1": 166
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 38,
              "mode": 0,
              "inputs": [
                {
                  "name": "positive",
                  "type": "CONDITIONING",
                  "link": 665,
                  "label": "正面条件",
                  "slot_index": 0
                },
                {
                  "name": "negative",
                  "type": "CONDITIONING",
                  "link": 666,
                  "label": "负面条件",
                  "slot_index": 1
                },
                {
                  "name": "control_net",
                  "type": "CONTROL_NET",
                  "link": 667,
                  "label": "ControlNet"
                },
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 668,
                  "label": "图像"
                }
              ],
              "outputs": [
                {
                  "name": "positive",
                  "type": "CONDITIONING",
                  "links": [
                    1562
                  ],
                  "shape": 3,
                  "label": "正面条件",
                  "slot_index": 0
                },
                {
                  "name": "negative",
                  "type": "CONDITIONING",
                  "links": [
                    1563
                  ],
                  "shape": 3,
                  "label": "负面条件",
                  "slot_index": 1
                }
              ],
              "properties": {
                "Node name for S&R": "ControlNetApplyAdvanced"
              },
              "widgets_values": [
                1,
                0,
                1
              ],
              "color": "#432",
              "bgcolor": "#653"
            },
            {
              "id": 797,
              "type": "ControlNetApplyAdvanced",
              "pos": [
                -12190,
                3300
              ],
              "size": {
                "0": 315,
                "1": 166
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 39,
              "mode": 0,
              "inputs": [
                {
                  "name": "positive",
                  "type": "CONDITIONING",
                  "link": 1562,
                  "label": "正面条件"
                },
                {
                  "name": "negative",
                  "type": "CONDITIONING",
                  "link": 1563,
                  "label": "负面条件"
                },
                {
                  "name": "control_net",
                  "type": "CONTROL_NET",
                  "link": 1556,
                  "label": "ControlNet",
                  "slot_index": 2
                },
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 1557,
                  "label": "图像",
                  "slot_index": 3
                }
              ],
              "outputs": [
                {
                  "name": "positive",
                  "type": "CONDITIONING",
                  "links": [
                    1560,
                    1601
                  ],
                  "shape": 3,
                  "label": "正面条件",
                  "slot_index": 0
                },
                {
                  "name": "negative",
                  "type": "CONDITIONING",
                  "links": [
                    1561,
                    1602
                  ],
                  "shape": 3,
                  "label": "负面条件",
                  "slot_index": 1
                }
              ],
              "properties": {
                "Node name for S&R": "ControlNetApplyAdvanced"
              },
              "widgets_values": [
                0.5,
                0,
                1
              ],
              "color": "#432",
              "bgcolor": "#653"
            },
            {
              "id": 349,
              "type": "FeatheredMask",
              "pos": [
                -13580,
                3470
              ],
              "size": {
                "0": 378.0914306640625,
                "1": 88.2879638671875
              },
              "flags": {
                "pinned": false
              },
              "order": 27,
              "mode": 0,
              "inputs": [
                {
                  "name": "mask",
                  "type": "MASK",
                  "link": 1966,
                  "label": "遮罩"
                }
              ],
              "outputs": [
                {
                  "name": "MASK",
                  "type": "MASK",
                  "links": [
                    726,
                    732,
                    1392,
                    1393,
                    1978
                  ],
                  "shape": 3,
                  "label": "遮罩",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "FeatheredMask"
              },
              "widgets_values": [
                19,
                0.2
              ]
            },
            {
              "id": 1017,
              "type": "MaskToImage",
              "pos": [
                -13166,
                3301
              ],
              "size": {
                "0": 210,
                "1": 26
              },
              "flags": {
                "collapsed": false
              },
              "order": 35,
              "mode": 0,
              "inputs": [
                {
                  "name": "mask",
                  "type": "MASK",
                  "link": 1978,
                  "label": "遮罩"
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    1979
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "MaskToImage"
              }
            },
            {
              "id": 977,
              "type": "StringFunction|pysssss",
              "pos": [
                -14327,
                3120
              ],
              "size": {
                "0": 400,
                "1": 244
              },
              "flags": {
                "pinned": false,
                "collapsed": true
              },
              "order": 14,
              "mode": 0,
              "inputs": [
                {
                  "name": "text_a",
                  "type": "STRING",
                  "link": 1980,
                  "widget": {
                    "name": "text_a"
                  },
                  "label": "文本_A",
                  "slot_index": 0
                },
                {
                  "name": "text_c",
                  "type": "STRING",
                  "link": null,
                  "widget": {
                    "name": "text_c"
                  },
                  "label": "文本_C"
                }
              ],
              "outputs": [
                {
                  "name": "STRING",
                  "type": "STRING",
                  "links": [
                    1880
                  ],
                  "shape": 3,
                  "label": "字符串",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "StringFunction|pysssss"
              },
              "widgets_values": [
                "append",
                "yes",
                "",
                "NSFW,lowres,bad anatomy,bad hand,paintings,sketches,(worst quality:2),(low quality:2),(normal quality:2),lowres,((monochrome)),((grayscale)),skin spots,acnes,skin blemishes,age spot,glans,extra fingers,fewer fingers,((watermark:2)),(white letters:1),(multi nipples),bad anatomy,bad hands,text,error,missing fingers,missing arms,missing legs,extra digit,fewer digits,cropped,worst quality,jpeg artifacts,signature,watermark,username,bad feet,{Multiple people},blurry,poorly drawn hands,poorly drawn face,mutation,deformed,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands,polar lowres,bad body,bad proportions,gross proportions,wrong feet bottom render,abdominal stretch,briefs,knickers,kecks,thong,{{fused fingers}},{{bad body}},bad proportion body to legs,wrong toes,extra toes,missing toes,weird toes,2 body,2 pussy,2 upper,2 lower,2 head,3 hand,3 feet,extra long leg,super long leg,mirrored image,mirrored noise",
                ""
              ],
              "color": "#232",
              "bgcolor": "#353"
            },
            {
              "id": 774,
              "type": "GroundingDinoSAMSegment (segment anything)",
              "pos": [
                -14131,
                3443
              ],
              "size": {
                "0": 352.79998779296875,
                "1": 122
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 20,
              "mode": 0,
              "inputs": [
                {
                  "name": "sam_model",
                  "type": "SAM_MODEL",
                  "link": 1981,
                  "label": "SAM模型",
                  "slot_index": 0
                },
                {
                  "name": "grounding_dino_model",
                  "type": "GROUNDING_DINO_MODEL",
                  "link": 1982,
                  "label": "G-Dino模型",
                  "slot_index": 1
                },
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": 1983,
                  "label": "图像",
                  "slot_index": 2
                },
                {
                  "name": "prompt",
                  "type": "STRING",
                  "link": 1535,
                  "widget": {
                    "name": "prompt"
                  },
                  "label": "提示词",
                  "slot_index": 3
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [],
                  "shape": 3,
                  "label": " 图像",
                  "slot_index": 0
                },
                {
                  "name": "MASK",
                  "type": "MASK",
                  "links": [
                    1544
                  ],
                  "shape": 3,
                  "label": "遮罩",
                  "slot_index": 1
                }
              ],
              "properties": {
                "Node name for S&R": "GroundingDinoSAMSegment (segment anything)"
              },
              "widgets_values": [
                "character",
                0.3
              ]
            },
            {
              "id": 775,
              "type": "SAMLoader",
              "pos": [
                -14640,
                3344
              ],
              "size": {
                "0": 315,
                "1": 82
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 5,
              "mode": 0,
              "outputs": [
                {
                  "name": "SAM_MODEL",
                  "type": "SAM_MODEL",
                  "links": [
                    1981
                  ],
                  "shape": 3,
                  "label": "SAM模型"
                }
              ],
              "properties": {
                "Node name for S&R": "SAMLoader"
              },
              "widgets_values": [
                "sam_vit_b_01ec64.pth",
                "Prefer GPU"
              ]
            },
            {
              "id": 776,
              "type": "GroundingDinoModelLoader (segment anything)",
              "pos": [
                -14653,
                3510
              ],
              "size": {
                "0": 361.20001220703125,
                "1": 58
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 6,
              "mode": 0,
              "outputs": [
                {
                  "name": "GROUNDING_DINO_MODEL",
                  "type": "GROUNDING_DINO_MODEL",
                  "links": [
                    1982
                  ],
                  "shape": 3,
                  "label": "G-Dino模型"
                }
              ],
              "properties": {
                "Node name for S&R": "GroundingDinoModelLoader (segment anything)"
              },
              "widgets_values": [
                "GroundingDINO_SwinB (938MB)"
              ]
            },
            {
              "id": 1027,
              "type": "Simple String",
              "pos": [
                -14657,
                3108
              ],
              "size": {
                "0": 315,
                "1": 58
              },
              "flags": {
                "collapsed": false
              },
              "order": 7,
              "mode": 0,
              "outputs": [
                {
                  "name": "STRING",
                  "type": "STRING",
                  "links": [
                    1980
                  ],
                  "shape": 3,
                  "label": "字符串"
                }
              ],
              "properties": {
                "Node name for S&R": "Simple String"
              },
              "widgets_values": [
                "EasyNegative, badhandv4, verybadimagenegative_v1.3, bad-hands-5, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, Missing limbs, three arms, bad feet, text font ui, signature, blurry, text font ui, malformed hands, long neck, limb, Sleeveles, bad anatomy disfigured malformed mutated, (mutated hands and fingers :1.5).(long body :1.3), (mutation , poorly drawn :1.2), bad anatomy, disfigured, malformed, mutated, multiple breasts, futa, yaoi, three legs"
              ]
            },
            {
              "id": 1018,
              "type": "PreviewImage",
              "pos": [
                -13094,
                3525
              ],
              "size": {
                "0": 252.07533264160156,
                "1": 289.2881774902344
              },
              "flags": {
                "collapsed": false
              },
              "order": 37,
              "mode": 0,
              "inputs": [
                {
                  "name": "images",
                  "type": "IMAGE",
                  "link": 1979,
                  "label": "图像"
                }
              ],
              "properties": {
                "Node name for S&R": "PreviewImage"
              }
            },
            {
              "id": 777,
              "type": "String",
              "pos": [
                -14590,
                3680
              ],
              "size": {
                "0": 210,
                "1": 76
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 8,
              "mode": 0,
              "outputs": [
                {
                  "name": "STRING",
                  "type": "STRING",
                  "links": [
                    1535
                  ],
                  "shape": 3,
                  "label": "STRING",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "String"
              },
              "widgets_values": [
                "people"
              ]
            },
            {
              "id": 925,
              "type": "Text Multiline",
              "pos": [
                -14640,
                2823
              ],
              "size": {
                "0": 468.7767028808594,
                "1": 231.3159942626953
              },
              "flags": {
                "pinned": false
              },
              "order": 9,
              "mode": 0,
              "outputs": [
                {
                  "name": "STRING",
                  "type": "STRING",
                  "links": [
                    1795
                  ],
                  "shape": 3,
                  "label": "字符串",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "Text Multiline"
              },
              "widgets_values": [
                "hyper-detailed digital illustration, cyberpunk, single girl with techsuite hoodie and headphones in the street, neon lights, lighting bar, city, cyberpunk city, film still, backpack, in megapolis, pro-lighting, high-res, masterpiece, (/qingning/), (\\MBTI\\), (\\shen ming shao nv\\)\n"
              ],
              "color": "#232",
              "bgcolor": "#353"
            },
            {
              "id": 734,
              "type": "Any Switch (rgthree)",
              "pos": [
                -11192,
                3159
              ],
              "size": {
                "0": 210,
                "1": 106
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 43,
              "mode": 0,
              "inputs": [
                {
                  "name": "any_01",
                  "type": "IMAGE",
                  "link": null,
                  "label": "输入_01",
                  "dir": 3
                },
                {
                  "name": "any_02",
                  "type": "IMAGE",
                  "link": 1969,
                  "label": "输入_02",
                  "dir": 3
                },
                {
                  "name": "any_03",
                  "type": "IMAGE",
                  "link": null,
                  "label": "输入_03",
                  "dir": 3
                },
                {
                  "name": "any_04",
                  "type": "IMAGE",
                  "link": null,
                  "label": "输入_04",
                  "dir": 3
                },
                {
                  "name": "any_05",
                  "type": "IMAGE",
                  "link": null,
                  "label": "输入_05",
                  "dir": 3
                }
              ],
              "outputs": [
                {
                  "name": "*",
                  "type": "IMAGE",
                  "links": [
                    1490,
                    1491
                  ],
                  "shape": 3,
                  "label": "IMAGE",
                  "dir": 4,
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "Any Switch (rgthree)"
              }
            },
            {
              "id": 906,
              "type": "ImageScaleBy",
              "pos": [
                -11003,
                2827
              ],
              "size": {
                "0": 315,
                "1": 82
              },
              "flags": {
                "pinned": false,
                "collapsed": false
              },
              "order": 10,
              "mode": 0,
              "inputs": [
                {
                  "name": "image",
                  "type": "IMAGE",
                  "link": null,
                  "label": "图像"
                }
              ],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    1758,
                    1759
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                }
              ],
              "properties": {
                "Node name for S&R": "ImageScaleBy"
              },
              "widgets_values": [
                "nearest-exact",
                2
              ],
              "color": "#223",
              "bgcolor": "#335"
            },
            {
              "id": 488,
              "type": "UpscaleModelLoader",
              "pos": [
                -11317,
                3004
              ],
              "size": {
                "0": 315,
                "1": 58
              },
              "flags": {
                "collapsed": false,
                "pinned": false
              },
              "order": 11,
              "mode": 0,
              "outputs": [
                {
                  "name": "UPSCALE_MODEL",
                  "type": "UPSCALE_MODEL",
                  "links": [
                    959
                  ],
                  "shape": 3,
                  "label": "放大模型"
                }
              ],
              "properties": {
                "Node name for S&R": "UpscaleModelLoader"
              },
              "widgets_values": [
                "4x-UltraSharp.pth"
              ]
            },
            {
              "id": 1016,
              "type": "SaveImage",
              "pos": [
                -10701,
                4008
              ],
              "size": {
                "0": 1050.5535888671875,
                "1": 1527.7724609375
              },
              "flags": {},
              "order": 58,
              "mode": 0,
              "inputs": [
                {
                  "name": "images",
                  "type": "IMAGE",
                  "link": 1975,
                  "label": "图像"
                }
              ],
              "properties": {
                "Node name for S&R": "SaveImage"
              },
              "widgets_values": [
                "ComfyUI"
              ]
            },
            {
              "id": 144,
              "type": "LoadImage",
              "pos": [
                -13079,
                3894
              ],
              "size": {
                "0": 509.6673583984375,
                "1": 853.517822265625
              },
              "flags": {
                "pinned": false
              },
              "order": 12,
              "mode": 0,
              "inputs": [],
              "outputs": [
                {
                  "name": "IMAGE",
                  "type": "IMAGE",
                  "links": [
                    716,
                    719,
                    741,
                    1234,
                    1558,
                    1983
                  ],
                  "shape": 3,
                  "label": "图像",
                  "slot_index": 0
                },
                {
                  "name": "MASK",
                  "type": "MASK",
                  "links": [],
                  "shape": 3,
                  "label": "遮罩",
                  "slot_index": 1
                }
              ],
              "properties": {
                "Node name for S&R": "LoadImage"
              },
              "widgets_values": [
                input_image_name,
                "image"
              ],
              "color": "#222",
              "bgcolor": "#000"
            },
            {
              "id": 1013,
              "type": "SaveImage",
              "pos": [
                -12556,
                3919
              ],
              "size": {
                "0": 521.4520874023438,
                "1": 833.9967041015625
              },
              "flags": {},
              "order": 42,
              "mode": 0,
              "inputs": [
                {
                  "name": "images",
                  "type": "IMAGE",
                  "link": 1968,
                  "label": "图像"
                }
              ],
              "properties": {
                "Node name for S&R": "SaveImage"
              },
              "widgets_values": [
                "ComfyUI"
              ]
            }
          ],
          "links": [
            [
              63,
              40,
              0,
              41,
              0,
              "LATENT"
            ],
            [
              559,
              288,
              0,
              21,
              1,
              "STRING"
            ],
            [
              590,
              16,
              0,
              299,
              0,
              "MODEL"
            ],
            [
              591,
              16,
              1,
              299,
              1,
              "CLIP"
            ],
            [
              595,
              299,
              0,
              300,
              0,
              "MODEL"
            ],
            [
              596,
              299,
              1,
              300,
              1,
              "CLIP"
            ],
            [
              597,
              300,
              0,
              301,
              0,
              "MODEL"
            ],
            [
              598,
              300,
              1,
              301,
              1,
              "CLIP"
            ],
            [
              601,
              301,
              1,
              22,
              0,
              "CLIP"
            ],
            [
              612,
              16,
              2,
              40,
              1,
              "VAE"
            ],
            [
              659,
              326,
              0,
              327,
              2,
              "CONTROL_NET"
            ],
            [
              660,
              325,
              0,
              327,
              3,
              "IMAGE"
            ],
            [
              665,
              327,
              0,
              332,
              0,
              "CONDITIONING"
            ],
            [
              666,
              327,
              1,
              332,
              1,
              "CONDITIONING"
            ],
            [
              667,
              331,
              0,
              332,
              2,
              "CONTROL_NET"
            ],
            [
              668,
              333,
              0,
              332,
              3,
              "IMAGE"
            ],
            [
              677,
              16,
              2,
              338,
              1,
              "VAE"
            ],
            [
              716,
              144,
              0,
              325,
              0,
              "IMAGE"
            ],
            [
              719,
              144,
              0,
              333,
              0,
              "IMAGE"
            ],
            [
              726,
              349,
              0,
              41,
              1,
              "MASK"
            ],
            [
              732,
              349,
              0,
              325,
              1,
              "MASK"
            ],
            [
              741,
              144,
              0,
              360,
              0,
              "IMAGE"
            ],
            [
              743,
              360,
              0,
              40,
              0,
              "IMAGE"
            ],
            [
              920,
              21,
              0,
              327,
              0,
              "CONDITIONING"
            ],
            [
              921,
              22,
              0,
              327,
              1,
              "CONDITIONING"
            ],
            [
              935,
              41,
              0,
              339,
              3,
              "LATENT"
            ],
            [
              959,
              488,
              0,
              487,
              0,
              "UPSCALE_MODEL"
            ],
            [
              967,
              16,
              2,
              497,
              1,
              "VAE"
            ],
            [
              972,
              500,
              0,
              501,
              0,
              "STRING"
            ],
            [
              973,
              501,
              0,
              502,
              1,
              "STRING"
            ],
            [
              1026,
              510,
              0,
              497,
              0,
              "IMAGE"
            ],
            [
              1077,
              497,
              0,
              555,
              0,
              "LATENT"
            ],
            [
              1154,
              585,
              0,
              555,
              1,
              "MASK"
            ],
            [
              1158,
              586,
              0,
              510,
              2,
              "MASK"
            ],
            [
              1234,
              144,
              0,
              510,
              1,
              "IMAGE"
            ],
            [
              1343,
              487,
              0,
              673,
              0,
              "IMAGE"
            ],
            [
              1344,
              667,
              1,
              673,
              2,
              "INT"
            ],
            [
              1345,
              667,
              2,
              673,
              1,
              "INT"
            ],
            [
              1346,
              673,
              0,
              510,
              0,
              "IMAGE"
            ],
            [
              1371,
              555,
              0,
              677,
              3,
              "LATENT"
            ],
            [
              1392,
              349,
              0,
              585,
              0,
              "MASK"
            ],
            [
              1393,
              349,
              0,
              586,
              0,
              "MASK"
            ],
            [
              1423,
              692,
              0,
              691,
              2,
              "CONTROL_NET"
            ],
            [
              1424,
              694,
              0,
              691,
              3,
              "IMAGE"
            ],
            [
              1428,
              502,
              0,
              691,
              0,
              "CONDITIONING"
            ],
            [
              1429,
              22,
              0,
              691,
              1,
              "CONDITIONING"
            ],
            [
              1430,
              691,
              0,
              677,
              1,
              "CONDITIONING"
            ],
            [
              1431,
              691,
              1,
              677,
              2,
              "CONDITIONING"
            ],
            [
              1490,
              734,
              0,
              500,
              0,
              "IMAGE"
            ],
            [
              1491,
              734,
              0,
              487,
              1,
              "IMAGE"
            ],
            [
              1506,
              301,
              0,
              690,
              0,
              "MODEL"
            ],
            [
              1507,
              301,
              1,
              690,
              1,
              "CLIP"
            ],
            [
              1508,
              690,
              1,
              502,
              0,
              "CLIP"
            ],
            [
              1535,
              777,
              0,
              774,
              3,
              "STRING"
            ],
            [
              1544,
              774,
              1,
              783,
              0,
              "MASK"
            ],
            [
              1556,
              796,
              0,
              797,
              2,
              "CONTROL_NET"
            ],
            [
              1557,
              798,
              0,
              797,
              3,
              "IMAGE"
            ],
            [
              1558,
              144,
              0,
              798,
              0,
              "IMAGE"
            ],
            [
              1560,
              797,
              0,
              339,
              1,
              "CONDITIONING"
            ],
            [
              1561,
              797,
              1,
              339,
              2,
              "CONDITIONING"
            ],
            [
              1562,
              332,
              0,
              797,
              0,
              "CONDITIONING"
            ],
            [
              1563,
              332,
              1,
              797,
              1,
              "CONDITIONING"
            ],
            [
              1601,
              797,
              0,
              819,
              1,
              "CONDITIONING"
            ],
            [
              1602,
              797,
              1,
              819,
              2,
              "CONDITIONING"
            ],
            [
              1603,
              690,
              0,
              819,
              0,
              "MODEL"
            ],
            [
              1604,
              819,
              0,
              820,
              0,
              "LATENT"
            ],
            [
              1606,
              16,
              2,
              820,
              1,
              "VAE"
            ],
            [
              1751,
              903,
              0,
              904,
              0,
              "IMAGE"
            ],
            [
              1752,
              904,
              0,
              819,
              3,
              "LATENT"
            ],
            [
              1754,
              16,
              2,
              903,
              1,
              "VAE"
            ],
            [
              1755,
              16,
              2,
              904,
              1,
              "VAE"
            ],
            [
              1756,
              677,
              0,
              903,
              0,
              "LATENT"
            ],
            [
              1758,
              906,
              0,
              667,
              0,
              "IMAGE"
            ],
            [
              1759,
              906,
              0,
              694,
              0,
              "IMAGE"
            ],
            [
              1795,
              925,
              0,
              927,
              0,
              "STRING"
            ],
            [
              1797,
              927,
              0,
              288,
              0,
              "STRING"
            ],
            [
              1798,
              927,
              1,
              22,
              1,
              "STRING"
            ],
            [
              1880,
              977,
              0,
              927,
              1,
              "STRING"
            ],
            [
              1966,
              783,
              0,
              349,
              0,
              "MASK"
            ],
            [
              1968,
              338,
              0,
              1013,
              0,
              "IMAGE"
            ],
            [
              1969,
              338,
              0,
              734,
              1,
              "IMAGE"
            ],
            [
              1970,
              301,
              0,
              339,
              0,
              "MODEL"
            ],
            [
              1972,
              690,
              0,
              677,
              0,
              "MODEL"
            ],
            [
              1975,
              820,
              0,
              1016,
              0,
              "IMAGE"
            ],
            [
              1976,
              301,
              1,
              21,
              0,
              "CLIP"
            ],
            [
              1977,
              339,
              0,
              338,
              0,
              "LATENT"
            ],
            [
              1978,
              349,
              0,
              1017,
              0,
              "MASK"
            ],
            [
              1979,
              1017,
              0,
              1018,
              0,
              "IMAGE"
            ],
            [
              1980,
              1027,
              0,
              977,
              0,
              "STRING"
            ],
            [
              1981,
              775,
              0,
              774,
              0,
              "SAM_MODEL"
            ],
            [
              1982,
              776,
              0,
              774,
              1,
              "GROUNDING_DINO_MODEL"
            ],
            [
              1983,
              144,
              0,
              774,
              2,
              "IMAGE"
            ]
          ],
          "groups": [
            {
              "title": "模型lora选择区",
              "bounding": [
                -14669,
                2259,
                1858,
                465
              ],
              "color": "#a1309b",
              "font_size": 24,
              "locked": false
            },
            {
              "title": "提示词文本输入区",
              "bounding": [
                -14672,
                2734,
                1865,
                475
              ],
              "color": "#A88",
              "font_size": 24,
              "locked": false
            },
            {
              "title": "蒙版调整区",
              "bounding": [
                -14673,
                3212,
                1910,
                126
              ],
              "color": "#8A8",
              "font_size": 24,
              "locked": false
            },
            {
              "title": "controlnet选择区",
              "bounding": [
                -12803,
                2262,
                979,
                1567
              ],
              "color": "#8AA",
              "font_size": 24,
              "locked": false
            },
            {
              "title": "K采样器设置",
              "bounding": [
                -11819,
                2264,
                579,
                1566
              ],
              "color": "#3f789e",
              "font_size": 24,
              "locked": false
            },
            {
              "title": "提示词反推区域",
              "bounding": [
                -11233,
                2268,
                1983,
                426
              ],
              "color": "#b06634",
              "font_size": 24,
              "locked": false
            },
            {
              "title": "高清放大区域",
              "bounding": [
                -11232,
                2698,
                1986,
                1135
              ],
              "color": "#A88",
              "font_size": 24,
              "locked": false
            },
            {
              "title": "AI一键写真赛博之夜",
              "bounding": [
                -12953,
                1915,
                1816,
                262
              ],
              "color": "#a1309b",
              "font_size": 200,
              "locked": false
            }
          ],
          "config": {},
          "extra": {},
          "version": 0.4
        }
      }
    }
  });


  const res = await fetch(`${host}/prompt`, {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })

  const prompt = await res.json()
  return NextResponse.json(prompt)
}