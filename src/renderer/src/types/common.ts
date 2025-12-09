import { BaseLocationEntityObjType } from './enums'

/**
 * 基础响应接口
 * @template T - 响应数据的类型
 * @property {string} code - 响应状态码
 * @property {T} data - 响应数据
 * @property {string} [message] - 响应消息（可选）
 */
export interface BaseResponse<T> {
  [x: string]: unknown
  code: string
  data: T
  message?: string
}

/**
 * HTTP响应类型
 * @template T - 响应数据的类型
 */
export type HttpResponse<T> = Promise<BaseResponse<T>>

/**
 * 基础对象接口
 * @property {string} id - 对象ID
 * @property {string} name - 对象名称
 */
export interface BaseObject {
  id: string
  name: string
}

/**
 * 基础位置实体接口
 * @property {string} localId - 本地ID
 * @property {string} localName - 本地名称
 * @property {BaseLocationEntityObjType} objType - 对象类型
 */
export interface BaseLocationEntity extends BaseObject {
  localId: string
  localName: string
  objType: BaseLocationEntityObjType
}

/**
 * 建筑信息接口
 * @property {Floor[]} floors - 楼层列表
 */
export interface Build extends BaseLocationEntity {
  floors: Floor[]
}

/**
 * 楼层信息接口
 * @property {string} buildingId - 所属建筑ID
 * @property {number} floorSequenceId - 楼层序号
 */
export interface Floor extends BaseLocationEntity {
  buildingId: string
  floorSequenceId: number
}

/**
 * 空间信息接口
 * @property {string} buildingId - 所属建筑ID
 * @property {string} floorId - 所属楼层ID
 */
export interface Space extends BaseLocationEntity {
  buildingId: string
  floorId: string
}
