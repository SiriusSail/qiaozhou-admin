import type { ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ParamsType } from '@ant-design/pro-provider';
import type { ProColumns as AntdProColumns } from '@ant-design/pro-table/lib/typing.d';
import type { SortOrder } from 'antd/lib/table/interface';
import { useCallback } from 'react';

export type ProColumns<T = any, ValueType = 'text'> = AntdProColumns<T, ValueType>;

export interface ProTablePropsType<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
> extends Omit<ProTableProps<DataType, Params, ValueType>, 'request'> {
  request?: (
    params: API.RequestListReqType<Params>,
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[] | null>,
  ) => Promise<API.PropsType<API.RequestListResType<DataType>>>;
}

export default <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>({
  request,
  ...props
}: ProTablePropsType<DataType, Params, ValueType>) => {
  const tableRequest: ProTableProps<DataType, Params, ValueType>['request'] = useCallback(
    async ({ current, keyword, ...params }, sort, filter) => {
      if (!request) {
        return { data: [] };
      }
      return request(
        {
          pageNo: current,
          ...params,
        },
        sort,
        filter,
      ).then((res) => {
        return {
          ...res.data,
          data: res.data.records,
        };
      });
    },
    [request],
  );
  return <ProTable {...props} request={request ? tableRequest : undefined} />;
};
