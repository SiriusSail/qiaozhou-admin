import { useRef, useState, useMemo } from 'react';
import ProTable from '@/components/ProTable';
import EditableProTable from '@/components/EditableProTable';
import type { ProColumns } from '@/components/ProTable';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import {
  dataDictionaryDisable,
  dataDictionaryEnable,
  dataDictionaryAdd,
  dataDictionaryPage,
  dataDictionaryUpdate,
} from '@/services/sys/dataDictionary';
import { Button, message, Modal, Form, Input, Select } from 'antd';
import type { ResType } from '@/services/sys/dataDictionary';
import type { DrawerFormRef } from '@/components/DrawerForm';
import { useRequest } from 'umi';
import menuStore from '@/sotre/menuStore';
import DrawerForm from '@/components/DrawerForm';
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
  const drawerFormRef = useRef<DrawerFormRef>();

  const {
    dataDictionaryList: dataSource,
    dataSourceValueEnum,
    dataDictionaryListLoading,
    getDataDictionaryList,
  } = menuStore.useContainer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parentId, setParentId] = useState<string>();
  const { run: disable, loading: disableLoading } = useRequest(dataDictionaryDisable, {
    onSuccess: () => {
      message.success('操作成功');
    },
    manual: true,
  });
  const { run: enable, loading: enableLoading } = useRequest(dataDictionaryEnable, {
    onSuccess: () => {
      message.success('操作成功');
    },
    manual: true,
  });

  const columns: ProColumns<ResType>[] = useMemo(
    () => [
      {
        title: '数据名称',
        dataIndex: 'dataValue',
      },
      {
        title: '数据编码',
        dataIndex: 'dataCode',
      },
      {
        title: '父级id',
        dataIndex: 'parentId',
        valueEnum: dataSourceValueEnum,
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
          initialValue: parentId,
        },
        // renderFormItem: () => {
        //   return (
        //     <Form.Item name="parentId" initialValue={parentId}>
        //       <Select
        //         options={dataSource?.map((item) => ({
        //           [item.id!]: `${item.dataValue}: ${item.id}`,
        //         }))}
        //       />
        //     </Form.Item>
        //   );
        // },
      },
      // {
      //   title: '顺序',
      //   dataIndex: 'sortNo',
      //   renderFormItem: () => undefined,
      // },
      {
        title: '状态',
        dataIndex: 'status',
        valueEnum: {
          ENABLE: '启用',
          DISABLE: '禁用',
        },
      },
    ],
    [dataSourceValueEnum, parentId],
  );

  const parentColumns = useMemo<ProColumns<ResType>[]>(() => {
    return [
      ...columns,
      {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text, record) => [
          <Button
            type="link"
            onClick={() => {
              setParentId(record.id);
              setIsModalOpen(true);
              actionRef.current?.reload();
            }}
            key="view"
          >
            字典详情
          </Button>,

          record.status === 'DISABLE' ? (
            <Button
              type="link"
              loading={disableLoading}
              onClick={() => {
                enable(record.id!);
                getDataDictionaryList();
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
                getDataDictionaryList();
              }}
              key="view"
            >
              禁用
            </Button>
          ),
        ],
      },
    ];
  }, [columns, disable, disableLoading, enable, enableLoading, getDataDictionaryList]);

  const chilendColumns = useMemo<ProColumns<ResType>[]>(() => {
    return [
      ...columns,
      {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
          <Button
            type="link"
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id!);
            }}
          >
            编辑
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
  }, [columns, disable, disableLoading, enable, enableLoading]);

  return (
    <div>
      <ProTable
        options={{
          reload: getDataDictionaryList,
        }}
        columns={parentColumns}
        loading={dataDictionaryListLoading}
        dataSource={dataSource}
        rowKey="id"
        pagination={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={drawerFormRef.current?.open}>
            新增
          </Button>,
        ]}
      />
      <Modal
        title="字典详情"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          getDataDictionaryList();
        }}
        width="80%"
        footer={<Button onClick={() => setIsModalOpen(false)}>关闭</Button>}
      >
        <EditableProTable
          key={parentId}
          columns={chilendColumns}
          actionRef={actionRef}
          editable={{
            onSave: async (key, { id, ...rows }) => {
              const dataDictionaryRequest = id === 'new' ? dataDictionaryAdd : dataDictionaryUpdate;
              await dataDictionaryRequest({
                parentId,
                ...rows,
                id: id === 'new' ? undefined : id,
              }).then((res) => {
                actionRef.current?.reload();
                return res;
              });
              // await waitTime(2000);
            },
          }}
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 20,
          }}
          request={(params) => dataDictionaryPage({ parentId, ...params })}
          rowKey="id"
          recordCreatorProps={{
            record: () => {
              return { id: 'new' };
            },
          }}
        />
      </Modal>

      <DrawerForm
        drawerFormRef={drawerFormRef}
        titleAfter="角色信息"
        operation="new"
        onFinish={(value) => {
          return dataDictionaryAdd(value).then((res) => {
            getDataDictionaryList();
            return res;
          });
        }}
      >
        <Form.Item noStyle name="parentId" initialValue="0" />
        <Form.Item
          label="数据名称"
          name="dataValue"
          rules={[{ required: true, message: '请输入数据名称' }]}
        >
          <Input placeholder="请输入数据名称" />
        </Form.Item>

        <Form.Item
          label="数据编码"
          name="dataCode"
          rules={[{ required: true, message: '请输入数据编码' }]}
        >
          <Input placeholder="请输入数据编码" />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select
            placeholder="请选择状态"
            options={[
              {
                value: 'ENABLE',
                label: '启用',
              },
              {
                value: 'DISABLE',
                label: '禁用',
              },
            ]}
          />
        </Form.Item>
      </DrawerForm>
    </div>
  );
};
