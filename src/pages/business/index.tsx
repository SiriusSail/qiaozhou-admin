import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import { activityPage } from '@/services/business/activity';
import { Button } from 'antd';
import type { ActivityType } from '@/services/business/activity';
import { useRef } from 'react';
import { history } from 'umi';
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

  const columns: ProColumns<ActivityType>[] = [
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
      title: '活动状态',
      dataIndex: 'actStatus',
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
      title: '商户名称',
      dataIndex: 'merName',
    },
    {
      title: '商户ID',
      dataIndex: 'merchantId',
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
