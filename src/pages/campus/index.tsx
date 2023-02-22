import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import DrawerForm from '@/components/DrawerForm';
import type { DrawerFormRef, OperationType } from '@/components/DrawerForm';
import { campusPage, addCampus, updateCampus, deleteCampus } from '@/services/business/campus';
import { Button, Form, Input, Select, message, Popconfirm } from 'antd';
import type { CampusType } from '@/services/business/campus';
import { useRef, useState, useMemo } from 'react';
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
  const drawerFormRef = useRef<DrawerFormRef>();
  const actionRef = useRef<ProCoreActionType>();

  const { run: del, loading } = useRequest(deleteCampus, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      actionRef.current?.reload();
    },
  });

  const [operation, setOperation] = useState<OperationType>('see');

  const columns: ProColumns<CampusType>[] = [
    {
      title: '校区名称',
      dataIndex: 'campusName',
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      search: false,
    },
    {
      title: '纬度',
      dataIndex: 'campusLat',
      search: false,
    },
    {
      title: '经度',
      dataIndex: 'campusLng',
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
      title: '排序',
      dataIndex: 'sort',
      search: false,
    },
    {
      title: '分组',
      dataIndex: 'groupId',
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
        <Popconfirm
          key="del"
          title="是否删除该校区"
          onConfirm={() => {
            del(record.id!);
          }}
          okText="是"
          cancelText="否"
        >
          <Button loading={loading} type="link" danger key="dele">
            删除
          </Button>
        </Popconfirm>,
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
        <Form.Item name="sort" label="排序">
          <Input disabled={disabled} placeholder="请输入排序" />
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
