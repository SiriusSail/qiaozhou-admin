import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import { logPage } from '@/services/sys/log';
import type { ResType } from '@/services/sys/log';

export default () => {
  const columns: ProColumns<ResType>[] = [
    {
      title: '操作人员',
      dataIndex: 'operName',
      search: false,
    },
    {
      title: '校区',
      dataIndex: 'logType',
    },
    {
      title: '时间',
      dataIndex: 'operTime',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '请求方式',
      dataIndex: 'requestMethod',
      search: false,
    },
    {
      title: '操作状态',
      dataIndex: 'status',
      valueEnum: {
        0: '正常',
        1: '异常',
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      search: false,
    },
    {
      title: '请求url',
      dataIndex: 'url',
    },
  ];
  return (
    <div>
      <ProTable columns={columns} request={logPage} rowKey="id" />
    </div>
  );
};