import React, { useContext } from 'react';
import axios from "axios";
import { GlobalContext } from '@/context';
import {
  Input,
  Button,
  Form,
  Space,
  Message,
  Skeleton,
} from '@arco-design/web-react';

axios.defaults.baseURL = "http://bj.memorywzd.tk:9308";
//axios.defaults.baseURL = 'http://localhost:8080';

function InfoForm({ loading }: { loading?: boolean }) {
  const [form] = Form.useForm();
  const { lang } = useContext(GlobalContext);

  const handleSave = async () => {
    try {
      await form.validate();
      const values = form.getFieldsValue();
      axios.post('/api/user/addUser',values).then((res)=>{
        if(res.status === 200){
          Message.success('添加成功');
        }else{
          Message.error('添加失败');
        }
      }).catch(()=>{
        Message.error('添加失败');
      });
    } catch (_) {}
  };

  const handleReset = () => {
    form.resetFields();
  };

  const loadingNode = (rows = 1) => {
    return (
      <Skeleton
        text={{
          rows,
          width: new Array(rows).fill('100%'),
        }}
        animation
      />
    );
  };

  return (
    <Form
      style={{ width: '500px', marginTop: '6px' }}
      form={form}
      labelCol={{ span: lang === 'en-US' ? 7 : 6 }}
      wrapperCol={{ span: lang === 'en-US' ? 17 : 18 }}
      initialValues={{
        avatar: 'https://d2gcddobrfo1pj.cloudfront.net/user.png',
      }}
    >
      <Form.Item
        label={'用户名'}
        field="username"
        rules={[
          {
            required: true,
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Input />
        )}
      </Form.Item>
      <Form.Item
        label={'密码'}
        field="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Input type={'password'} />
        )}
      </Form.Item>
      <Form.Item
        label={'头像'}
        field="avatar"
      >
        {loading ? (
            loadingNode()
        ) : (
            <Input />
        )}
      </Form.Item>

      <Form.Item label=" ">
        <Space>
          <Button type="primary" onClick={handleSave}>{'提交'}</Button>
          <Button onClick={handleReset}>{'重置'}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default InfoForm;
