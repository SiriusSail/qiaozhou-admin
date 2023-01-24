declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design Dedicated environment variable, please do not use it in your project.
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

declare namespace API {
  type PropsType<T = any> = {
    code: keyof typeof codeMessage;
    data: T;
    message: string;
    success: boolean;
    timestamp: number;
  };
  type RequestListReqType<T = any> = {
    pageNo: number;
    pageSize: number;
  } & T;
  type RequestListResType<T = any> = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    pages?: number;
    size?: number;
    total?: number;
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    orders?: { asc: boolean; column: stirng }[];
    records: T[];
  };
}
