import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import DrawerForm from '@/components/DrawerForm';
import type { DrawerFormRef, OperationType } from '@/components/DrawerForm';
import {
  accountPage,
  accountDisable,
  accountEnable,
  accountAdd,
  accountUpdate,
  resetPassword,
} from '@/services/sys/account';
import { Button, Form, Input, Select, message } from 'antd';
import type { AccountType } from '@/services/sys/account';
import { roleList } from '@/services/sys/role';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
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
  const resetFormRef = useRef<DrawerFormRef>();
  const actionRef = useRef<ProCoreActionType>();
  const [operation, setOperation] = useState<OperationType>('see');
  const { run: disable, loading: disableLoading } = useRequest(accountDisable, {
    onSuccess: () => {
      message.success('操作成功');
    },
    manual: true,
  });
  const { run: enable, loading: enableLoading } = useRequest(accountEnable, {
    onSuccess: () => {
      message.success('操作成功');
    },
    manual: true,
  });

  const { data: roleListData } = useRequest(() =>
    roleList().then((res) => ({
      ...res,
      data: res.data.map((item) => ({ value: item.id, label: item.name })),
    })),
  );

  const columns: ProColumns<AccountType>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      search: false,
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      search: false,
    },
    // {
    //   title: '角色名',
    //   dataIndex: 'name',
    //   search: false,
    // },
    {
      title: '角色信息',
      dataIndex: 'roles',
      search: false,
      render: (_, { roles }) => {
        return roles?.map((item) => item.name).join(',');
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
      title: '修改人',
      dataIndex: 'updateBy',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_, { createTime }) => {
        return createTime ? dayjs(createTime).format('YYYY-MM-DD') : '-';
      },
      search: false,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      search: false,
      render: (_, { updateTime }) => {
        return updateTime ? dayjs(updateTime).format('YYYY-MM-DD') : '-';
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => {
        const formData = {
          ...record,
          roleIds: record.roles?.map((item) => item.id),
        };
        return (
          <div>
            {[
              <Button
                type="link"
                key="editable"
                onClick={() => {
                  setOperation('idea');
                  console.log(record);
                  drawerFormRef.current?.formRef?.setFieldsValue(formData);
                  drawerFormRef.current?.open();
                }}
              >
                编辑
              </Button>,
              <Button
                type="link"
                onClick={() => {
                  setOperation('see');
                  drawerFormRef.current?.formRef?.setFieldsValue(formData);
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

              <Button
                type="link"
                onClick={() => {
                  setOperation('see');
                  resetFormRef.current?.formRef?.setFieldsValue({
                    accountId: record.id!,
                  });
                  resetFormRef.current?.open();
                }}
                key="view"
              >
                重置密码
              </Button>,
            ]}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        request={accountPage}
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
            return accountAdd(value).then((res) => {
              actionRef.current?.reload();
              return res;
            });
          }
          return accountUpdate(value).then(() => actionRef.current?.reload());
        }}
      >
        <Form.Item noStyle name="id" />
        <Form.Item
          label="用户昵称"
          name="nickname"
          rules={[{ required: true, message: '请输入用户昵称' }]}
        >
          <Input placeholder="请输入用户昵称" />
        </Form.Item>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        {operation === 'new' && (
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        )}
        <Form.Item label="角色" name="roleIds" rules={[{ required: true, message: '请选择角色' }]}>
          <Select mode="multiple" placeholder="请选择角色" options={roleListData} />
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Select placeholder="请选择状态">
            <Option value="ENABLE">启用</Option>
            <Option value="DISABLE">禁用</Option>
          </Select>
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input placeholder="请输入描述信息" />
        </Form.Item>
      </DrawerForm>
      <DrawerForm
        drawerFormRef={resetFormRef}
        titleAfter="密码"
        operation="idea"
        onFinish={(value) => {
          return resetPassword(value).then(() => actionRef.current?.reload());
        }}
      >
        <Form.Item noStyle name="accountId" />
        <Form.Item
          label="新密码"
          name="password"
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          label="确认"
          name="confirmPassword"
          rules={[{ required: true, message: '请输入confirmPassword' }]}
        >
          <Input.Password placeholder="请输入confirmPassword" />
        </Form.Item>
      </DrawerForm>
    </div>
  );
};
