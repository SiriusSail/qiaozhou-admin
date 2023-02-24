import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import menuStore from '@/sotre/menuStore';
import {
  merchantPage,
  merchantDisable,
  merchantEnable,
  merchantExamineeNotPass,
  merchantDelete,
  merchantExamineePass,
} from '@/services/business/merchant';
import { Button, Space, Descriptions, message, Drawer, Popconfirm } from 'antd';
import type { ResType } from '@/services/business/merchant';
import { useRef, useState } from 'react';
import { useRequest } from 'umi';

export default () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectData, setSelectData] = useState<ResType>();
  const { campusList, menuMap } = menuStore.useContainer();
  const actionRef = useRef<ProCoreActionType>();

  // 禁用
  const { run: disable, loading: disableLoading } = useRequest(merchantDisable, {
    onSuccess: () => {
      message.success('操作成功');
      actionRef.current?.reload();
    },
    manual: true,
  });
  // 启用
  const { run: enable, loading: enableLoading } = useRequest(merchantEnable, {
    onSuccess: () => {
      message.success('操作成功');
      actionRef.current?.reload();
    },
    manual: true,
  });
  // 启用
  const { run: del, loading: delLoading } = useRequest(merchantDelete, {
    onSuccess: () => {
      message.success('删除成功');
      actionRef.current?.reload();
    },
    manual: true,
  });
  // 审核不通过
  const { run: notPass, loading: notPassLoading } = useRequest(
    () => merchantExamineeNotPass(selectData?.id),
    {
      onSuccess: () => {
        message.success('操作成功');
        actionRef.current?.reload();
        setDrawerOpen(false);
        setSelectData(undefined);
      },
      manual: true,
    },
  );
  // 审核通过
  const { run: pass, loading: passLoading } = useRequest(
    () => merchantExamineePass(selectData?.id),
    {
      onSuccess: () => {
        message.success('操作成功');
        actionRef.current?.reload();
        setDrawerOpen(false);
        setSelectData(undefined);
      },
      manual: true,
    },
  );

  const columns: ProColumns<ResType>[] = [
    {
      title: '商铺名称',
      dataIndex: 'merName',
    },
    {
      title: '商户编号',
      dataIndex: 'merNo',
    },
    {
      title: '校区',
      dataIndex: 'campusId',
      valueEnum: campusList,
      valueType: 'select',
      hideInTable: true,
    },
    {
      title: '负责人',
      dataIndex: 'merPerson',
      search: false,
    },
    {
      title: '联系人电话',
      dataIndex: 'merPersonTel',
      search: false,
    },
    {
      title: '商铺类型',
      dataIndex: 'merTypeName',
      valueType: 'select',
      formItemProps: {
        name: 'merType',
      },
      valueEnum: menuMap.merType,
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
      title: '审核状态',
      dataIndex: 'examine',
      valueType: 'select',
      valueEnum: menuMap.examine,
    },
    {
      title: '商铺地址',
      dataIndex: 'merAddress',
      search: false,
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      search: false,
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: menuMap.status,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <Button
          type="link"
          onClick={() => {
            setSelectData(record);
            setDrawerOpen(true);
          }}
          key="view"
        >
          查看
        </Button>,
        record.status === '禁用' ? (
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

        <Popconfirm
          key="del"
          title="是否删除该商家"
          onConfirm={() => {
            del(record.id!);
          }}
          okText="是"
          cancelText="否"
        >
          <Button type="link" danger loading={delLoading} key="view">
            删除
          </Button>
        </Popconfirm>,
        ,
      ],
    },
  ];
  return (
    <div>
      <ProTable actionRef={actionRef} columns={columns} request={merchantPage} rowKey="id" />
      <Drawer
        width="50%"
        open={drawerOpen}
        title="商户信息"
        footer={[
          <Space key="1" size="middle">
            {selectData?.examine === '未审核' && (
              <>
                <Button
                  type="primary"
                  loading={notPassLoading || passLoading}
                  htmlType="submit"
                  onClick={pass}
                >
                  审核通过
                </Button>
                <Button
                  type="primary"
                  loading={notPassLoading || passLoading}
                  htmlType="submit"
                  onClick={notPass}
                  danger
                >
                  审核不通过
                </Button>
              </>
            )}
            <Button htmlType="button" onClick={close}>
              关闭
            </Button>
          </Space>,
        ]}
        onClose={() => setDrawerOpen(false)}
      >
        <Descriptions>
          <Descriptions.Item label="商铺名称">{selectData?.merName || '-'}</Descriptions.Item>
          <Descriptions.Item label="商户编号">{selectData?.merNo || '-'}</Descriptions.Item>
          <Descriptions.Item label="商铺负责人">{selectData?.merPerson || '-'}</Descriptions.Item>
          <Descriptions.Item label="联系人电话">
            {selectData?.merPersonTel || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="商铺类型">{selectData?.merType || '-'}</Descriptions.Item>
          <Descriptions.Item label="商铺类型名称">
            {selectData?.merTypeName || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="用户昵称">{selectData?.nickname || '-'}</Descriptions.Item>
          <Descriptions.Item label="商铺坐标纬度">{selectData?.merLat || '-'}</Descriptions.Item>
          <Descriptions.Item label="商铺坐标经度">{selectData?.merLng || '-'}</Descriptions.Item>
          <Descriptions.Item label="创建人">{selectData?.createBy || '-'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{selectData?.createTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="用户ID">{selectData?.userId || '-'}</Descriptions.Item>
          <Descriptions.Item label="描述">{selectData?.description || '-'}</Descriptions.Item>
          <Descriptions.Item label="商铺地址">{selectData?.merAddress || '-'}</Descriptions.Item>
          <Descriptions.Item label="是否启用">{selectData?.status || '-'}</Descriptions.Item>
          <Descriptions.Item label="修改人">{selectData?.updateBy || '-'}</Descriptions.Item>
          <Descriptions.Item label="修改时间">{selectData?.updateTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="是否通过审核">{selectData?.examine || '-'}</Descriptions.Item>
          <Descriptions.Item label="审核时间">{selectData?.examineTime || '-'}</Descriptions.Item>
        </Descriptions>
      </Drawer>
    </div>
  );
};
