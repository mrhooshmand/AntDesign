import {
  PageContainer,
  ProForm,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, message } from 'antd';
import type { FC } from 'react';
import { fakeSubmitForm } from './service';
import useStyles from './style.style';

const BasicForm: FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  const queryClient = useQueryClient();
  const { mutate: run } = useMutation({
    mutationFn: fakeSubmitForm,
    onSuccess: () => {
      message.success('Submitted successfully');
      queryClient.invalidateQueries({ queryKey: ['basic-form'] });
    },
  });
  const onFinish = async (values: Record<string, any>) => {
    run(values);
  };
  return (
    <PageContainer content="Form pages are used to collect or validate information from users. Basic forms are common when there are few data items.">
      <Card variant="borderless">
        <ProForm
          requiredMark={false}
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter a title',
              },
            ]}
            placeholder="Give the goal a name"
          />
          <ProFormDateRangePicker
            label="Start and end dates"
            width="md"
            name="date"
            rules={[
              {
                required: true,
                message: 'Please select start and end dates',
              },
            ]}
            placeholder={['Start date', 'End date']}
          />
          <ProFormTextArea
            label="Goal description"
            width="xl"
            name="goal"
            rules={[
              {
                required: true,
                message: 'Please enter a goal description',
              },
            ]}
            placeholder="Please enter your interim work goals"
          />

          <ProFormTextArea
            label="Metrics"
            name="standard"
            width="xl"
            rules={[
              {
                required: true,
                message: 'Please enter metrics',
              },
            ]}
            placeholder="Please enter metrics"
          />

          <ProFormText
            width="md"
            label={
              <span>
                Client
                <em className={styles.optional}> (optional)</em>
              </span>
            }
            tooltip="The target audience for this goal"
            name="client"
            placeholder="Describe the clients you serve; for internal clients, @name/employee ID directly"
          />

          <ProFormText
            width="md"
            label={
              <span>
                Invitees
                <em className={styles.optional}> (optional)</em>
              </span>
            }
            name="invites"
            placeholder="@name/employee ID directly; invite up to 5 people"
          />

          <ProFormDigit
            label={
              <span>
                Weight
                <em className={styles.optional}> (optional)</em>
              </span>
            }
            name="weight"
            placeholder="Please enter"
            min={0}
            max={100}
            width="xs"
            fieldProps={{
              formatter: (value) => `${value || 0}%`,
              parser: (value) => Number(value ? value.replace('%', '') : '0'),
            }}
          />

          <ProFormRadio.Group
            options={[
              {
                value: '1',
                label: 'Public',
              },
              {
                value: '2',
                label: 'Partially public',
              },
              {
                value: '3',
                label: 'Private',
              },
            ]}
            label="Goal visibility"
            help="Clients and invitees are shared by default"
            name="publicType"
          />
          <ProFormDependency name={['publicType']}>
            {({ publicType }) => {
              return (
                <ProFormSelect
                  width="md"
                  name="publicUsers"
                  fieldProps={{
                    style: {
                      margin: '8px 0',
                      display:
                        publicType && publicType === '2' ? 'block' : 'none',
                    },
                  }}
                  options={[
                    {
                      value: '1',
                      label: 'Colleague A',
                    },
                    {
                      value: '2',
                      label: 'Colleague B',
                    },
                    {
                      value: '3',
                      label: 'Colleague C',
                    },
                  ]}
                />
              );
            }}
          </ProFormDependency>
        </ProForm>
      </Card>
    </PageContainer>
  );
};
export default BasicForm;
