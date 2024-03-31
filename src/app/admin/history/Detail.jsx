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
import { Col, Row, Space, message, Button, Image, Progress } from 'antd'
import { useRef, useState } from 'react'


const LAYOUT_TYPE_HORIZONTAL = 'horizontal'

const waitTime = (time = 100) => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

}
const Page = ({ data, status, someEvent }) => {
  const formRef = useRef()

  const [readonly, setReadonly] = useState(status === "edit" && data.creator === "user")
  const [formLayoutType, setFormLayoutType] = useState(
    LAYOUT_TYPE_HORIZONTAL,
  )
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  const handleSave = () => {
    console.log('formData', formRef?.current.getFieldsFormatValue())
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
                    <Button htmlType="button" onClick={() => handleCancel()} key="cancel">
                      取消
                    </Button>,
                    ...doms,
                    <Button htmlType="button" onClick={handleSave} key="save">
                      保存
                    </Button>]}</Space>
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
        <ProFormText
          width="md"
          name="displayName"
          label="Name"
          // tooltip="最长为 24 位"
          placeholder={"给bot起个名字"}
          rules={[{ required: true }]}
        />
        <ProFormTextArea width="xl" label="Scene Prompt" name="prompt" placeholder={"please input prompt"} />
        <ProFormText
          name="segment anything"
          label="Mask Prompt"
          // tooltip="最长为 24 位"
          placeholder="例如：people, People hold weapons.（重绘保留人物）"
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
          name="mask"
        />
        <ProFormUploadButton
          width="md"
          max={1}
          extra="建议尺寸640*360，小于10M的JPG、 PNG格式图片"
          label="Input Image"
          name="input_image"
          title="点击上传"
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
          }}
        />
      </ProForm>
      <div className="mt-2">
        <div className="flex mt-4">
          <div className='w-32 text-right'>
            Progress：
          </div>
          <div className="w-64">
            <Progress percent={30} />
          </div>
        </div>
        <div className="flex mt-4">
          <div className='w-32 text-right'>
            Save Image：
          </div>
          <Image
            alt='output'
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
      </div>
    </>
  )
}

export default Page