import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import { memberPage } from '@/services/business/member';
import type { ResType } from '@/services/business/member';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<ProCoreActionType>();

  const columns: ProColumns<ResType>[] = [
    {
      title: '会员名称',
      dataIndex: 'menberName',
      search: false,
    },
    {
      title: '会员类型',
      dataIndex: 'menberType',
      search: false,
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      search: false,
    },
    {
      title: '校区',
      dataIndex: 'campusList',
      search: false,
    },
    {
      title: '会员结束时间',
      dataIndex: 'endTime',
      search: false,
    },
    {
      title: '会员开始时间',
      dataIndex: 'startTime',
      search: false,
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
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
      title: '用户ID',
      dataIndex: 'userId',
      search: false,
    },
  ];
  return (
    <div>
      <ProTable actionRef={actionRef} columns={columns} request={memberPage} rowKey="id" />
    </div>
  );
};
