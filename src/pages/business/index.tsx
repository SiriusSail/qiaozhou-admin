import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import { activityPage } from '@/services/business/activity';
import menuStore from '@/sotre/menuStore';
import { Button } from 'antd';
import type { ActivityType } from '@/services/business/activity';
import { useRef } from 'react';
import { history } from 'umi';

export default () => {
  const actionRef = useRef<ProCoreActionType>();
  const { campusList } = menuStore.useContainer();

  const columns: ProColumns<ActivityType>[] = [
    {
      title: '商户名称',
      dataIndex: 'merName',
    },
    {
      title: '活动名称',
      dataIndex: 'actName',
    },
    {
      title: '开始时间',
      dataIndex: 'actStartTime',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '活动时间',
      dataIndex: 'actStartTime',
      search: false,
    },
    {
      title: '结束时间',
      dataIndex: 'actEndTime',
      search: false,
    },
    {
      title: '校区',
      dataIndex: 'campusId',
      valueEnum: campusList,
      valueType: 'select',
      hideInTable: true,
    },
    {
      title: '活动状态',
      dataIndex: 'actStatus',
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
      title: '描述',
      dataIndex: 'description',
      search: false,
    },
    {
      title: '红包最高金额',
      dataIndex: 'maxAmount',
      search: false,
    },
    {
      title: '红包最低金额',
      dataIndex: 'minAmount',
      search: false,
    },
    {
      title: '红包总量',
      dataIndex: 'total',
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
      title: '核销数量',
      dataIndex: 'useNum',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        // <Button
        //   type="link"
        //   key="editable"
        //   onClick={() => {
        //     setOperation('idea');
        //     console.log(record);
        //     drawerFormRef.current?.formRef?.setFieldsValue(record);
        //     drawerFormRef.current?.open();
        //   }}
        // >
        //   编辑
        // </Button>,
        <Button
          type="link"
          onClick={() => {
            history.push(`/business/details/${record.id}`);
          }}
          key="view"
        >
          查看
        </Button>,
      ],
    },
  ];
  return (
    <div>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        request={activityPage}
        rowKey="id"
        // toolBarRender={() => [
        //   <Button
        //     type="primary"
        //     key="primary"
        //     onClick={() => {
        //       setOperation('new');
        //       drawerFormRef.current?.open();
        //     }}
        //   >
        //     新增
        //   </Button>,
        // ]}
      />
    </div>
  );
};
