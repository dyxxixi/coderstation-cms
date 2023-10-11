import { request } from '@umijs/max';

/**
 * 获取所有的管理员
 */
export function getAdminApi() {
  return request('/api/admin', {
    method: 'GET',
  });
}

/**
 * 新增管理员
 */
export function addAdminApi(newAdminInfo) {
  return request('/api/admin', {
    method: 'POST',
    data: newAdminInfo,
  });
}

/**
 * 删除管理员
 */
export function deleteAdminApi(adminId) {
  return request(`/api/admin/${adminId}`, {
    method: 'DELETE',
  });
}

/**
 * 修改管理员信息
 */
export function editAdminApi(adminId, newAdminInfo) {
  return request(`/api/admin/${adminId}`, {
    method: 'PATCH',
    data: newAdminInfo,
  });
}

/**
 * 根据 id 获取管理员
 */
export function getAdminByIdApi(adminId) {
  return request(`/api/admin/${adminId}`, {
    method: 'GET',
  });
}

/**
 * 根据 loginId 查找用户
 */
export function adminIsExistApi(loginId) {
  return request(`/api/admin/adminIsExist/${loginId}`, {
    method: 'GET',
  });
}
