import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import { userPage, userDisable, userEnable } from '@/services/business/user';
import { Button, message } from 'antd';
import type { ResType } from '@/services/business/user';
import { useRef } from 'react';
import { useRequest } from 'umi';
// code	编码	string
// createTime	创建时间	string
// description	描述	string
// id	id	string
// menuIds	菜单权限ids	array	string
// name	角色名	string
// status	状态 启用'ENABLE' 禁用'DISABLE'	string
// updateTime	修改时间

export default () => {
  const actionRef = useRef<ProCoreActionType>();

  const { run: disable, loading: disableLoading } = useRequest(userDisable, {
    onSuccess: () => {
      message.success('操作成功');
    },
    manual: true,
  });
  const { run: enable, loading: enableLoading } = useRequest(userEnable, {
    onSuccess: () => {
      message.success('操作成功');
    },
    manual: true,
  });

  const columns: ProColumns<ResType>[] = [
    {
      title: '头像',
      dataIndex: 'avatarurl',
      search: false,
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
    },
    {
      title: '性别',
      dataIndex: 'gender',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '国家',
      dataIndex: 'country',
      search: false,
    },
    {
      title: '城市',
      dataIndex: 'city',
    },
    {
      title: '省份',
      dataIndex: 'province',
      search: false,
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      search: false,
    },
    {
      title: '描述',
      dataIndex: 'description',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      search: false,
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
      title: '修改时间',
      dataIndex: 'updateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
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
  return (
    <div>
      <ProTable actionRef={actionRef} columns={columns} request={userPage} rowKey="id" />
    </div>
  );
};
