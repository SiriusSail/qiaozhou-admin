import { Drawer, Form, Button, Space } from 'antd';
import type { DrawerProps, FormInstance } from 'antd';
import { useImperativeHandle, useMemo, useRef, useCallback } from 'react';
import { useState } from 'react';
import Sotre from './store';
import { useRequest } from 'umi';

export type OperationType = 'see' | 'new' | 'idea';

const eumn = {
  new: '新增',
  see: '查看',
  idea: '修改',
};
export type DrawerFormRef = {
  close: () => void;
  open: () => void;
  formRef: FormInstance | null | undefined;
};

interface PropsType<T = Record<string, any>> extends DrawerProps {
  children?: React.ReactNode;
  drawerFormRef?: React.MutableRefObject<DrawerFormRef | undefined>;
  // 表单初始值
  initValue?: T;
  operation?: OperationType;
  title?: string;
  titleAfter?: string;
  onFinish?: (value: T) => Promise<any> | undefined;
}
const DrawerForm: React.FC<PropsType> = ({
  drawerFormRef,
  children,
  operation = 'see',
  onFinish,
  titleAfter,
  title,
  ...props
}) => {
  const formRef = useRef<FormInstance | null>();
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => {
    setVisible(true);
  }, []);
  const close = useCallback(() => {
    setVisible(false);
    formRef.current?.resetFields();
  }, []);

  useImperativeHandle(
    drawerFormRef,
    () => {
      return {
        formRef: formRef.current,
        open,
        close,
      };
    },
    [close, open],
  );

  const { run: newOnFinish, loading } = useRequest(
    () => {
      if (!formRef.current) {
        return Promise.reject(false);
      }
      return formRef.current?.validateFields().then(async (res) => {
        await onFinish?.(res)?.then(close);
      });
    },
    {
      manual: true,
    },
  );

  const drawerTitle = useMemo(() => {
    if (title) {
      return title;
    }
    return `${eumn[operation] || operation}${titleAfter}`;
  }, [title, titleAfter, operation]);

  return (
    <Sotre.Provider>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        ref={(ref) => {
          formRef.current = ref;
        }}
      >
        <Drawer {...props} open={visible} title={drawerTitle}>
          {children}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space size="middle">
              {operation !== 'see' && (
                <Button type="primary" loading={loading} htmlType="submit" onClick={newOnFinish}>
                  提交
                </Button>
              )}
              <Button htmlType="button" onClick={close}>
                关闭
              </Button>
            </Space>
          </Form.Item>
        </Drawer>
      </Form>
    </Sotre.Provider>
  );
};

export default DrawerForm;
