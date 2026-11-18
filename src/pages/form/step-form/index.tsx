import {
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Divider,
  Form,
  Result,
  Statistic,
} from 'antd';
import React, { useState } from 'react';
import type { StepDataType } from './data.d';
import useStyles from './style.style';

const StepDescriptions: React.FC<{
  stepData: StepDataType;
  bordered?: boolean;
}> = ({ stepData, bordered }) => {
  const { payAccount, receiverAccount, receiverName, amount } = stepData;
  const items = [
    { key: 'payAccount', label: 'Payment account', children: payAccount },
    {
      key: 'receiverAccount',
      label: 'Receiving account',
      children: receiverAccount,
    },
    { key: 'receiverName', label: 'Payee name', children: receiverName },
    {
      key: 'amount',
      label: 'Transfer amount',
      children: (
        <Statistic
          value={amount}
          suffix={<span style={{ fontSize: 14 }}>USD</span>}
          precision={2}
        />
      ),
    },
  ];
  return <Descriptions column={1} bordered={bordered} items={items} />;
};
const StepResult: React.FC<{
  onFinish: () => Promise<void>;
  children?: React.ReactNode;
}> = (props) => {
  const { styles } = useStyles();
  return (
    <Result
      status="success"
      title="Operation successful"
      subTitle="Expected to arrive within two hours"
      extra={
        <>
          <Button type="primary" onClick={props.onFinish}>
            Transfer again
          </Button>
          <Button>View bill</Button>
        </>
      }
      className={styles.result}
    >
      {props.children}
    </Result>
  );
};
const StepForm: React.FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  const [stepData, setStepData] = useState<StepDataType>({
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
    receiverMode: 'alipay',
  });
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm<StepDataType>();
  return (
    <PageContainer content="Split a lengthy or unfamiliar form task into multiple steps to guide the user through completion.">
      <Card variant="borderless">
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm<StepDataType>
            formRef={{
              current: form,
            }}
            title="Fill in transfer information"
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <ProFormSelect
              label="Payment account"
              width="md"
              name="payAccount"
              rules={[
                {
                  required: true,
                  message: 'Please select a payment account',
                },
              ]}
              valueEnum={{
                'ant-design@alipay.com': 'ant-design@alipay.com',
              }}
            />

            <ProForm.Group title="Receiving account" size={8}>
              <ProFormSelect
                name="receiverMode"
                rules={[
                  {
                    required: true,
                    message: 'Please select a payment account',
                  },
                ]}
                valueEnum={{
                  alipay: 'Alipay',
                  bank: 'Bank account',
                }}
              />
              <ProFormText
                name="receiverAccount"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the payee account',
                  },
                  {
                    type: 'email',
                    message: 'Account name should be in email format',
                  },
                ]}
                placeholder="test@example.com"
              />
            </ProForm.Group>
            <ProFormText
              label="Payee name"
              width="md"
              name="receiverName"
              rules={[
                {
                  required: true,
                  message: 'Please enter the payee name',
                },
              ]}
              placeholder="Please enter the payee name"
            />
            <ProFormDigit
              label="Transfer amount"
              name="amount"
              width="md"
              rules={[
                {
                  required: true,
                  message: 'Please enter the transfer amount',
                },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: 'Please enter a valid amount',
                },
              ]}
              placeholder="Please enter amount"
              fieldProps={{
                prefix: '$',
              }}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="Confirm transfer information">
            <div className={styles.result}>
              <Alert
                closable
                showIcon
                title="After confirming the transfer, funds will be deposited directly into the recipient's account and cannot be refunded."
                style={{
                  marginBottom: 24,
                }}
              />
              <StepDescriptions stepData={stepData} bordered />
              <Divider
                style={{
                  margin: '24px 0',
                }}
              />
              <ProFormText.Password
                label="Payment password"
                width="md"
                name="password"
                required={false}
                rules={[
                  {
                    required: true,
                    message: 'Payment password is required to proceed',
                  },
                ]}
              />
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="Done">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                form.resetFields();
              }}
            >
              <StepDescriptions stepData={stepData} />
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
        <Divider
          style={{
            margin: '40px 0 24px',
          }}
        />
        <div>
          <h3>Notes</h3>
          <h4>Transfer to Alipay account</h4>
          <p>
            If needed, you can place some FAQ about the product here. If needed,
            you can place some FAQ about the product here. If needed, you can
            place some FAQ about the product here.
          </p>
          <h4>Transfer to bank card</h4>
          <p>
            If needed, you can place some FAQ about the product here. If needed,
            you can place some FAQ about the product here. If needed, you can
            place some FAQ about the product here.
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};
export default StepForm;
