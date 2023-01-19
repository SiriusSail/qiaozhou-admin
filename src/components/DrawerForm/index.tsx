import { Drawer, Form, Button } from 'antd';
import type { DrawerProps, FormInstance, FormProps } from 'antd';
import { useImperativeHandle, useMemo, useRef, useCallback } from 'react';
import { useState } from 'react';
import Sotre from './store';

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

  const newOnFinish: FormProps['onFinish'] = useCallback(
    async (value) => {
      console.log(1111);
      if (onFinish) {
        await onFinish(value)?.then(close);
      }
    },
    [close, onFinish],
  );

  const drawerTitle = useMemo(() => {
    if (title) {
      return title;
    }
    return `${eumn[operation] || operation}${titleAfter}`;
  }, [title, titleAfter, operation]);

  return (
    <Sotre.Provider>
      <Drawer {...props} open={visible} title={drawerTitle}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          ref={(ref) => (formRef.current = ref)}
          onFinish={newOnFinish}
        >
          {children}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            {operation !== 'see' && (
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            )}
            <Button htmlType="button" onClick={close}>
              关闭
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Sotre.Provider>
  );
};

export default DrawerForm;
