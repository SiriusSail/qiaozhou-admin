import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import DrawerForm from '@/components/DrawerForm';
import type { DrawerFormRef, OperationType } from '@/components/DrawerForm';
import { rolePage, roleDisable, roleEnable, roleAdd, roleUpdate } from '@/services/sys/role';
import { Button, Form, Input, Select, message } from 'antd';
import type { ResType } from '@/services/sys/role';
import menuStore from '@/sotre/menuStore';
import dayjs from 'dayjs';
import { useRef, useState, useMemo } from 'react';
import { useRequest } from 'umi';
const { Option } = Select;
// code	编码	string
// createTime	创建时间	string
// description	描述	string
// id	id	string
// menuIds	菜单权限ids	array	string
// name	角色名	string
// status	状态 启用'ENABLE' 禁用'DISABLE'	string
// updateTime	修改时间

export default () => {
  const drawerFormRef = useRef<DrawerFormRef>();
  const actionRef = useRef<ProCoreActionType>();
  const { menuListOptions, menuListValueEnum } = menuStore.useContainer();

  const [operation, setOperation] = useState<OperationType>('see');
  const { run: disable, loading: disableLoading } = useRequest(roleDisable, {
    onSuccess: () => {
      message.success('操作成功');
    },
    manual: true,
  });
  const { run: enable, loading: enableLoading } = useRequest(roleEnable, {
    onSuccess: () => {
      message.success('操作成功');
    },
    manual: true,
  });

  const columns: ProColumns<ResType>[] = [
    {
      title: '角色名',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
      render: (_, { createTime }) => {
        return createTime ? dayjs(createTime).format('YYYY-MM-DD') : '-';
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        ENABLE: '启用',
        DISABLE: '禁用',
      },
    },
    {
      title: '菜单权限',
      dataIndex: 'menuIds',
      valueEnum: menuListValueEnum,
    },
    {
      title: '修改时间',
      dataIndex: 'createTime',
      search: false,
      render: (_, { createTime }) => {
        return createTime ? dayjs(createTime).format('YYYY-MM-DD') : '-';
      },
    },
    {
      title: '修改时间',
      dataIndex: 'createTime',
      search: false,
      render: (_, { createTime }) => {
        return createTime ? dayjs(createTime).format('YYYY-MM-DD') : '-';
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
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
          编辑
        </Button>,
        <Button
          type="link"
          onClick={() => {
            setOperation('see');
            drawerFormRef.current?.formRef?.setFieldsValue(record);
            drawerFormRef.current?.open();
          }}
          key="view"
        >
          查看
        </Button>,
        record.status === 'DISABLE' ? (
          <Button
            type="link"
            loading={disableLoading}
            onClick={() => {
              enable(record.id!);
              action?.reload();
            }}
            key="view"
          >
            启用
          </Button>
        ) : (
          <Button
            type="link"
            loading={enableLoading}
            onClick={() => {
              disable(record.id!);
              action?.reload();
            }}
            key="view"
          >
            禁用
          </Button>
        ),
      ],
    },
  ];
  const disabled = useMemo(() => operation === 'see', [operation]);
  return (
    <div>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        request={rolePage}
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
            return roleAdd(value).then((res) => {
              actionRef.current?.reload();
              return res;
            });
          }
          return roleUpdate(value).then(() => actionRef.current?.reload());
        }}
      >
        <Form.Item noStyle name="id" />
        <Form.Item label="角色名" name="name" rules={[{ required: true, message: '请输入角色名' }]}>
          <Input disabled={disabled} placeholder="请输入角色名" />
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Select disabled={disabled} placeholder="请选择状态">
            <Option value="ENABLE">启用</Option>
            <Option value="DISABLE">禁用</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="描述"
          rules={[{ required: true, message: '请输入描述信息' }]}
        >
          <Input disabled={disabled} placeholder="请输入描述信息" />
        </Form.Item>
        <Form.Item
          name="menuIds"
          label="菜单权限"
          rules={[{ required: true, message: '请输入菜单权限' }]}
        >
          <Select
            disabled={disabled}
            mode="multiple"
            placeholder="请选择菜单权限"
            options={menuListOptions}
          />
        </Form.Item>
      </DrawerForm>
    </div>
  );
};
