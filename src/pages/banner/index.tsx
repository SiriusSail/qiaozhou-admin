import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import DrawerForm from '@/components/DrawerForm';
import type { DrawerFormRef, OperationType } from '@/components/DrawerForm';
import { campusPage, addCampus, updateCampus } from '@/services/business/campus';
import { Button, Form, Input, Select } from 'antd';
import type { CampusType } from '@/services/business/campus';
import { useRef, useState, useMemo } from 'react';

export default () => {
  const drawerFormRef = useRef<DrawerFormRef>();
  const actionRef = useRef<ProCoreActionType>();

  const [operation, setOperation] = useState<OperationType>('see');

  const columns: ProColumns<CampusType>[] = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      search: false,
    },
    {
      title: '跳转链接',
      dataIndex: 'jumpLink',
      search: false,
    },
    {
      title: '是否显示',
      dataIndex: 'isShow',
      search: false,
      valueEnum: {
        1: '显示',
        2: '不显示',
      },
    },
    {
      title: '类型',
      dataIndex: 'isShow',
      search: false,
      valueEnum: {
        1: '首页轮播图',
        2: '其他轮播图',
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <Button
          type="link"
          key="editable"
          onClick={() => {
            setOperation('idea');
            console.log(record);
            drawerFormRef.current?.formRef?.setFieldsValue(record);
            drawerFormRef.current?.open();
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  const disabled = useMemo(() => operation === 'see', [operation]);
  return (
    <div>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        request={campusPage}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setOperation('new');
              drawerFormRef.current?.open();
            }}
          >
            新增
          </Button>,
        ]}
      />
      <DrawerForm
        drawerFormRef={drawerFormRef}
        titleAfter="角色信息"
        operation={operation}
        onFinish={(value) => {
          if (operation === 'new') {
            return addCampus(value).then((res) => {
              console.log(res);
              actionRef.current?.reload();
              return res;
            });
          }
          return updateCampus(value).then(() => actionRef.current?.reload());
        }}
      >
        <Form.Item noStyle name="id" />
        <Form.Item
          label="校区名称"
          name="campusName"
          rules={[{ required: true, message: '请输入校区名称' }]}
        >
          <Input disabled={disabled} placeholder="请输入校区名称" />
        </Form.Item>

        <Form.Item name="groupId" label="分组">
          <Select disabled={disabled} mode="multiple" placeholder="请选择分组" options={[]} />
        </Form.Item>
        <Form.Item label="纬度" name="campusLng">
          <Input disabled={disabled} placeholder="请输入纬度" />
        </Form.Item>
        <Form.Item label="经度" name="campusLat">
          <Input disabled={disabled} placeholder="请输入经度" />
        </Form.Item>
      </DrawerForm>
    </div>
  );
};
