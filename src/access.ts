/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  const pathAccess: Record<string, boolean> = {};
  currentUser?.pathAccess?.forEach((item) => {
    pathAccess[item.id] = true;
  });

  const accessCodes = currentUser?.pathAccess?.map((item) => item.id);
  // const pathJudgeAccess = (pathName: string) => {
  //   accessCodes?.includes()
  //   return
  // }
  const codeJudgeAccess = (code?: string) => (!code ? true : !!accessCodes?.includes(code));

  return {
    ...pathAccess,
    accessCodes: currentUser?.pathAccess?.map((item) => item.id),
    codeJudgeAccess,
    // canAdmin: currentUser && currentUser.access === 'admin',
  };
}
