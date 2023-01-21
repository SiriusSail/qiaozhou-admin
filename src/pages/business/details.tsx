import { getActivityById } from '@/services/business/activity';
import { Descriptions } from 'antd';
import { useLocation } from 'umi';
import { useRequest } from 'umi';

export default () => {
  const location = useLocation();
  const [, , , id] = location.pathname.split('/');
  console.log(id);
  const { data } = useRequest(() => getActivityById(id));

  console.log(data);
  return (
    <Descriptions title="活动详情" bordered>
      <Descriptions.Item label="活动名称">{data?.actName}</Descriptions.Item>
      <Descriptions.Item label="活动内容">{data?.actContent}</Descriptions.Item>
      <Descriptions.Item label="活动描述">{data?.actDescribe}</Descriptions.Item>
      <Descriptions.Item label="活动结束时间">{data?.actEndTime}</Descriptions.Item>
      <Descriptions.Item label="活动开始时间">{data?.actStartTime}</Descriptions.Item>
      <Descriptions.Item label="活动状态">{data?.actStatus}</Descriptions.Item>
      <Descriptions.Item label="创建人">{data?.createBy}</Descriptions.Item>
      <Descriptions.Item label="创建时间">{data?.createTime}</Descriptions.Item>
      <Descriptions.Item label="描述">{data?.description}</Descriptions.Item>
      <Descriptions.Item label="id">{data?.id}</Descriptions.Item>
      <Descriptions.Item label="红包最高金额">{data?.maxAmount}</Descriptions.Item>
      <Descriptions.Item label="商户名称">{data?.merName}</Descriptions.Item>
      <Descriptions.Item label="商户ID">{data?.merchantId}</Descriptions.Item>
      <Descriptions.Item label="红包最低金额">{data?.minAmount}</Descriptions.Item>
      <Descriptions.Item label="红包总量">{data?.total}</Descriptions.Item>
      <Descriptions.Item label="修改人">{data?.updateBy}</Descriptions.Item>
      <Descriptions.Item label="修改时间">{data?.updateTime}</Descriptions.Item>
      <Descriptions.Item label="核销数量">{data?.useNum}</Descriptions.Item>
    </Descriptions>
  );
};
