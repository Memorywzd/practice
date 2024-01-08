import React, { useContext } from 'react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import { GlobalContext } from '@/context';
import {
  Input,
  Select,
  Cascader,
  Button,
  Form,
  Space,
  Message,
  Skeleton,
} from '@arco-design/web-react';

function InfoForm({ loading }: { loading?: boolean }) {
  const t = useLocale(locale);
  const [form] = Form.useForm();
  const { lang } = useContext(GlobalContext);

  const handleSave = async () => {
    try {
      await form.validate();
      Message.success('userSetting.saveSuccess');
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
    >
      <Form.Item
        label={'用户名'}
        field="email"
        rules={[
          {
            type: 'email',
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
        field="nickName"
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
        label={'头像'}
        field="rangeArea"
      >
        {loading ? (
            loadingNode()
        ) : (
            <Input />
        )}
      </Form.Item>

      <Form.Item label=" ">
        <Space>
          <Button type="primary" onClick={handleSave}>
            {'提交'}
          </Button>
          <Button onClick={handleReset}>{t['userSetting.reset']}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default InfoForm;
