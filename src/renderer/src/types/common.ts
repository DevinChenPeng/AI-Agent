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

/**
 * InfoCode 数据项描述
 * @property {Record<string, unknown>} additionalMapValue - 额外的键值对数据
 * @property {Array<{ code: string; name: string }>} dataSource - 数据源数组
 * @property {string} dataTime - 数据时间
 * @property {string} dataValue - 数据值
 * @property {string} infoCode - 信息代码
 * @property {string} infoCodeName - 信息代码名称
 * @property {string} aliasName - 别名
 * @property {string} infoCodeType - 信息代码类型
 * @property {boolean} existsIotRule - 是否存在物联网规则
 * @property {string} relTemplateTypeId - 关联的模板类型ID
 * @property {number} sequence - 序列号
 * @property {string} originDataType - 原始数据类型
 */
export interface InfoCodeDataItem {
  additionalMapValue: Record<string, unknown>
  dataSource: Array<DataSource>
  dataTime: string
  dataValue: string
  infoCode: string
  infoCodeName: string
  aliasName: string
  infoCodeType: string
  existsIotRule: boolean
  relTemplateTypeId: string
  sequence: number
  originDataType: string
  unit?: string
}
/**
 * 数据源接口
 * @property {string} code - 代码
 * @property {string} name - 名称
 */
export interface DataSource {
  code: string
  name: string
}
/**
 * 信息代码组配置接口
 * @property {RelInfoCodeGroupConfig[]} [groupChildren] - 子组配置（可选）
 * @property {string} groupCode - 组代码
 * @property {string} groupName - 组名称
 * @property {number} groupOrder - 组顺序
 * @property {InfoCodeDataItem[]} relInfoCodeConfigs - 关联的信息代码配置
 */
export interface RelInfoCodeGroupConfig {
  groupChildren?: RelInfoCodeGroupConfig[]
  groupCode: string
  groupName: string
  groupOrder: number
  relInfoCodeConfigs: InfoCodeDataItem[]
}
/**
 * 设备详情接口
 * @property {string} id - 设备ID
 * @property {string} localName - 本地名称
 * @property {string} objType - 对象类型
 * @property {string} classCode - 类别代码
 * @property {string} dynamicName - 动态名称
 * @property {string} templateTypeId - 模板类型ID
 * @property {string} templateTypeName - 模板类型名称
 * @property {RelInfoCodeGroupConfig[]} relInfoCodeGroupConfigs - 关联的信息代码组配置
 */
export interface EquipmentDetail {
  id: string
  localName: string
  objType: string
  classCode: string
  dynamicName: string
  templateTypeId: string
  templateTypeName: string
  relInfoCodeGroupConfigs: RelInfoCodeGroupConfig[]
}
