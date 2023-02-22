import ProTable from '@/components/ProTable';
import type { ProColumns } from '@/components/ProTable';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import DrawerForm from '@/components/DrawerForm';
import type { DrawerFormRef, OperationType } from '@/components/DrawerForm';
import { bannerPage, addBanner, deleteBanner } from '@/services/business/banner';
import { Button, Form, Input, Select, Radio, Upload, Modal } from 'antd';
import type { UploadFile } from 'antd';
import type { ResType } from '@/services/business/banner';
import { useRef, useState, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default () => {
  const drawerFormRef = useRef<DrawerFormRef>();
  const actionRef = useRef<ProCoreActionType>();

  const [operation, setOperation] = useState<OperationType>('see');

  const columns: ProColumns<ResType>[] = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      search: false,
    },
    {
      title: '跳转链接',
      dataIndex: 'jumpLink',
      search: false,
    },
    {
      title: '是否显示',
      dataIndex: 'showDescription',
      search: false,
      // valueEnum: {
      //   1: '显示',
      //   2: '不显示',
      // },
    },
    {
      title: '类型',
      dataIndex: 'type',
      search: false,
      // valueEnum: {
      //   1: '首页轮播图',
      //   2: '其他轮播图',
      // },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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
            deleteBanner(record.id);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  const disabled = useMemo(() => operation === 'see', [operation]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);

  const [files, setFiles] = useState([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  return (
    <div>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        request={bannerPage}
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
        open={true}
        operation={operation}
        onFinish={(value) => {
          // if (operation === 'new') {
          return addBanner(value).then((res) => {
            actionRef.current?.reload();
            return res;
          });
          // }
          // return updateCampus(value).then(() => actionRef.current?.reload());
        }}
      >
        <Form.Item noStyle name="id" />
        <Form.Item
          label="标题"
          name="title"
          initialValue={'推广图'}
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input disabled={disabled} placeholder="请输入标题" />
        </Form.Item>
        <Form.Item label="排序" name="sort">
          <Input disabled={disabled} placeholder="请输入排序" />
        </Form.Item>
        <Form.Item label="跳转链接" name="jumpLink">
          <Input disabled={disabled} placeholder="请输入跳转链接" />
        </Form.Item>

        <Form.Item name="type" initialValue={1} label="轮播图类型">
          <Select
            disabled={disabled}
            placeholder="请选择分组"
            options={[
              {
                label: '首页轮播图',
                value: 1,
              },
              {
                label: '其他轮播图',
                value: 2,
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="isShow" initialValue={1} label="是否显示">
          <Radio.Group disabled={disabled}>
            <Radio value={1}>显示</Radio>
            <Radio value={0}>不显示</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="选择图片"
          name="file"
          normalize={(value) => {
            setFiles(value.fileList);
            return value.fileList;
          }}
        >
          <Upload maxCount={1} onPreview={handlePreview} listType="picture-card">
            {files.length === 0 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </DrawerForm>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};
