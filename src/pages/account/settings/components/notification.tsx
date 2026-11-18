import { List, Switch } from 'antd';
import React from 'react';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const notificationAction = (key: string) => (
  <Switch
    key={key}
    checkedChildren="On"
    unCheckedChildren="Off"
    defaultChecked
  />
);

const notificationData = [
  {
    key: 'user-message',
    title: 'User messages',
    description: 'Messages from other users will be notified as site messages',
    actions: [notificationAction('user-message-switch')],
  },
  {
    key: 'system-message',
    title: 'System messages',
    description: 'System messages will be notified as site messages',
    actions: [notificationAction('system-message-switch')],
  },
  {
    key: 'todo-task',
    title: 'To-do tasks',
    description: 'To-do tasks will be notified as site messages',
    actions: [notificationAction('todo-task-switch')],
  },
];

const NotificationView: React.FC = () => {
  const data = notificationData;
  return (
    <List<Unpacked<typeof data>>
      rowKey="key"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item actions={item.actions}>
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );
};

export default NotificationView;
