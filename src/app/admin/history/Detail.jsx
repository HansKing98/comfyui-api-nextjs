'use client'

import {
  ProForm,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormText,
  ProFormSwitch,
  ProFormUploadButton,
  ProFormUploadDragger
} from '@ant-design/pro-components'
import { Col, Row, Space, message, Button, Image, Progress, Modal } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { commonGet, commonPost } from '@/api/util'


let newTimer = null

let maxQueueSize =0
let queueSize=0
let currentQueueIndex=0

const LAYOUT_TYPE_HORIZONTAL = 'horizontal'

const waitTime = (time = 100) => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

}
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Page = ({ data, status, someEvent }) => {
  const formRef = useRef()

  const [readonly, setReadonly] = useState(status === "edit" && data.creator === "user")
  const [formLayoutType, setFormLayoutType] = useState(
    LAYOUT_TYPE_HORIZONTAL,
  )
  const [queue, setQueue] = useState({
    "queue_running": [],
    "queue_pending": []
  })
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [promptId, setPromptId] = useState('');
  const [outputImages, setOutputImages] = useState([])
  const [progress, setProgress] = useState(0);


  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }


  useEffect(() => {
    getQueue()
    return () => {
      console.log("App挂了");
      clearInterval(newTimer)
    };
  }, [])
  const getQueue = (prompt_id) => {
    commonGet(`/api/queue?b=${Math.random()}`).then(res => {
      // console.log('res', res)
      let currentIndex = 0
      let maxSize = res.queue_pending.length + res.queue_running.length
      
      if (queueSize < maxSize) {
        maxQueueSize = maxSize
      }else{
        maxSize = maxQueueSize
      }

      if (prompt_id) {
        if (res.queue_running[0].prompt_id === prompt_id) {
          currentQueueIndex = currentIndex
        } else {
          currentIndex += 1
          res.queue_pending.forEach(el => {
            if (el.prompt_id === prompt_id) {
              currentQueueIndex = currentIndex
            }else{
              currentIndex += 1
            }
          })
        }
        let p = Number(( (maxSize - currentIndex) / maxSize *100 ).toFixed(2))
        setProgress(p)
        if (p > 95) {
          setProgress(95.5)
        } else {
          setProgress(p)
        }
      }
      // setProgress(progress + 10)
      setQueue(res)
    })
  }

  const getCurrentComfyUI = ({ prompt_id }) => {
    return commonGet(`/api/history?prompt_id=${prompt_id}`)
  }
  const upProgress = () => {
    // console.log(progress);
    // if (progress < 90) {
    //   
    // } else if (progress < 95) {
    //   setProgress(progress + 0.5)
    // } else {
    // }
  }
  const handleSave = () => {
    console.log('formData', formRef?.current.validateFieldsReturnFormatValue())
    const formData = formRef?.current.getFieldsFormatValue()
    const input_image = formData.input_image[0].name
    commonPost('/api/prompt', { ...formData, input_image, }).then(res => {
      setProgress(Math.floor(Math.random() * 10 + 1))
      setOutputImages([])
      setPromptId(res.prompt_id)
      const prompt_id = res.prompt_id
      clearInterval(newTimer)
      newTimer = setInterval(() => {
        getQueue(res.prompt_id)
        getCurrentComfyUI({ prompt_id: res.prompt_id }).then(res => {
          upProgress()
          if (res?.[0]) {
            getQueue(res.prompt_id)
            console.log('prompt_id', res)
            setOutputImages(res[0].output_images)
            clearInterval(newTimer)
            setProgress(100)
          }

        })
      }, 2000)
    })

  }
  const handleCancel = (event, params) => {
    someEvent && someEvent['cancel']()
  }
  return (
    <>
      <ProForm
        {...formItemLayout}
        formRef={formRef}
        layout={formLayoutType}
        readonly={readonly}
        submitter={{
          render: (props, doms) => {
            return <Row>
              <Col span={14} offset={4}>
                <Space>{readonly ? [<Button htmlType="button" onClick={() => handleCancel()} key="cancel">
                  取消
                </Button>]
                  :
                  [
                    // <Button htmlType="button" onClick={() => handleCancel()} key="cancel">
                    //   取消
                    // </Button>,
                    // ...doms,
                    <Button htmlType="button" type="primary" onClick={handleSave} key="queue">
                      加入队列
                    </Button>,
                    <Button htmlType="button" onClick={getQueue} key="refreshQueue">
                      刷新队列
                    </Button>
                  ]}</Space>
              </Col>
            </Row>
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000)
          console.log(values)
          message.success('提交成功')
        }}
        params={{}}
        request={async () => {
          await waitTime(100)
          return {
            ...data,
            avatar: data.avatar && [{
              uid: '-1',
              name: 'avatar',
              status: 'done',
              url: data.avatar
            }],
            scenario: data.scenario && [{
              uid: '-1',
              name: 'scenario',
              status: 'done',
              url: data.scenario
            }],
            tags: data.tags.length ? data.tags.join() : ''
          }
        }}
      >
        {/* <ProFormText
          width="md"
          name="displayName"
          label="Name"
          // tooltip="最长为 24 位"
          placeholder={"给bot起个名字"}
        /> */}
        <div className="ml-28">
        默认为赛博夜景AI写真。建议不填写prompt先试一张(20s出图)。
        <br />
        <span className='text-blue-400'>
        不开启4x-UltraSharp为效果预览，开全后效果绝佳。(2分钟出图)
        </span>
        </div>
        <ProFormTextArea width="xl" label="Scene Prompt" name="prompt" placeholder={"please input prompt"} />
        <ProFormText
          name="segment_anything"
          label="Mask Prompt"
          // tooltip="最长为 24 位"
          placeholder="默认值：people（重绘保留人物）"
        />
        <ProFormSwitch
          colProps={{
            span: 4,
          }}
          checkedChildren="InvertMask" unCheckedChildren="NoInvertMask"
          fieldProps={{
            onChange: (e) => console.log(e),
          }}
          label="InvertMask"
          name="invertMask"
        />
        <ProFormSwitch
          colProps={{
            span: 4,
          }}
          checkedChildren="4k" unCheckedChildren="720p"
          fieldProps={{
            onChange: (e) => console.log(e),
          }}
          label="4x-UltraSharp"
          name="open4k"
        />
        <ProFormUploadButton
          width="md"
          max={1}
          extra="建议尺寸640*360，小于10M的JPG、 PNG格式图片"
          label="Input Image"
          name="input_image"
          title="点击上传"
          rules={[{ required: true }]}
          onChange={(file) => {
            if (file.fileList[0]?.response) {
              let fileList = [{ url: file.fileList[0]?.response.fileAddress }]
              formRef?.current && formRef.current.setFieldValue('senario', fileList)
            }
          }}
          action='/api/upload'
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            onPreview: async (file) => {
              if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
              }
              setPreviewImage(file.url || file.preview);
              setPreviewOpen(true);
              setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
            }
          }}
        />
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal>
      </ProForm>
      <div className="mt-2">
        <div className="flex mt-4">
          <div className='w-32 text-right'>
            Queue：
          </div>
          {queue.queue_running.length || queue.queue_pending.length ? (<div className="w-64 flex flex-col">
            <span className='text-blue-400'>queue_running</span>
            {queue.queue_running.map(el => {
              return <div className="flex" key={el.prompt_id}>
                <div className="">{el.queue_code}： </div>
                <div className="">{el.prompt_id === promptId ? <span className='text-green-700'>-{'>'} {promptId}</span> : el.prompt_id}</div>
              </div>
            })}
            <span className='text-orange-400'>
              queue_pending
            </span>
            {queue.queue_pending.length ? queue.queue_pending.map(el => {
              return <div className="flex" key={el.prompt_id}>
                <div className="">{el.queue_code}： </div>
                <div className="">{el.prompt_id === promptId ? <span className='text-green-700'>-{'>'} {promptId}</span> : el.prompt_id}</div>
              </div>
            }) : 'None'}
          </div>) : '当前无队列'}
        </div>
        <div className="flex mt-4">
          <div className='w-32 text-right'>
            Progress：
          </div>
          <div className="w-64">
            <Progress percent={progress} />
          </div>
        </div>
        {outputImages.length ? JSON.stringify(outputImages) : null}
        {outputImages.length ? <div className="flex mt-0">
          <div className='w-32 text-right'>
            Output Image：
          </div>
          {outputImages.map(el => {
            return <Image
              key={el}
              alt='output'
              width={200}
              src={el}
            />
          })}
        </div> : null}

      </div>

    </>
  )
}

export default Page