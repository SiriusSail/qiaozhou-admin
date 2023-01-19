import { createContainer } from 'unstated-next';
import { useState } from 'react';

export default createContainer((props: any) => {
  const [detail, setDetail] = useState<any>();
  return {
    ...props,
    detail,
    setDetail,
  };
});
