import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import { chargeStatisticsPage } from '@/services/business/chargeStatistics';
import type { ResType } from '@/services/sys/log';
import menuStore from '@/sotre/menuStore';

export default () => {
  const { campusList } = menuStore.useContainer();
  const columns: ProColumns<ResType>[] = [
    // {
    //   title: '数据ID',
    //   dataIndex: 'id',
    //   search: false,
    // },
    {
      title: '校区',
      dataIndex: 'campusId',
      valueEnum: campusList,
      valueType: 'select',
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
    // {
    //   title: '总金额',
    //   dataIndex: 'allAmount',
    //   search: false,
    // },
    {
      title: '所有金额',
      dataIndex: 'totalAmount',
      search: false,
    },
  ];
  return (
    <div>
      <ProTable columns={columns} request={chargeStatisticsPage} rowKey="id" />
    </div>
  );
};
