import {
  AlipayOutlined,
  DingdingOutlined,
  TaobaoOutlined,
} from '@ant-design/icons';
import { Button, List } from 'antd';
import React from 'react';

const bindingData = [
  {
    title: 'Bind Taobao',
    description: 'Currently not bound to a Taobao account',
    actions: [
      <Button key="Bind" type="link">
        Bind
      </Button>,
    ],
    avatar: <TaobaoOutlined className="taobao" />,
  },
  {
    title: 'Bind Alipay',
    description: 'Currently not bound to an Alipay account',
    actions: [
      <Button key="Bind" type="link">
        Bind
      </Button>,
    ],
    avatar: <AlipayOutlined className="alipay" />,
  },
  {
    title: 'Bind DingTalk',
    description: 'Currently not bound to a DingTalk account',
    actions: [
      <Button key="Bind" type="link">
        Bind
      </Button>,
    ],
    avatar: <DingdingOutlined className="dingding" />,
  },
];

const BindingView: React.FC = () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={bindingData}
      renderItem={(item) => (
        <List.Item actions={item.actions}>
          <List.Item.Meta
            avatar={item.avatar}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default BindingView;
