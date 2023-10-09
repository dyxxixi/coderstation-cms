// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://jsd.cdn.zzko.cn/gh/dyxxixi/my-images@main/coderstation/1696854619297.webp',
    menu: {
      locale: false,
    },
  };
};
