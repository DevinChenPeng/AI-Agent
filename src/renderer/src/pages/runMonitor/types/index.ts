import { BaseObject, InfoCodeDataItem } from '@renderer/types/common'

/**
 * 设备信息接口
 * @property {string} id - 设备ID
 * @property {string} localName - 本地名称
 * @property {string} objType - 对象类型
 * @property {string} classCode - 类别代码
 * @property {string[]} relObjIds - 关联对象ID列表
 * @property {string} dynamicName - 动态名称
 * @property {string} floorId - 楼层ID
 * @property {string} buildingId - 建筑ID
 * @property {string} [funcType] - 功能类型（可选）
 */
export interface Equipment {
  id: string
  localName: string
  objType: string
  classCode: string
  relObjIds: string[]
  dynamicName: string
  floorId: string
  buildingId: string
  funcType?: string
}

/**
 * 卫生间信息接口
 * @property {string} localName - 本地名称
 * @property {string} objType - 对象类型
 * @property {string} classCode - 类别代码
 * @property {string} roomFuncType - 房间功能类型
 * @property {string} buildingId - 建筑ID
 * @property {string} floorId - 楼层ID
 * @property {string} roomFuncTypeName - 房间功能类型名称
 * @property {Equipment[]} equipments - 设备列表
 */
export interface ToiletSpaceItem extends BaseObject {
  localName: string
  objType: string
  classCode: string
  roomFuncType: string
  buildingId: string
  floorId: string
  roomFuncTypeName: string
  equipments: Equipment[]
}

/**
 * 楼层卫生间分组接口
 * @property {string} floorId - 楼层ID
 * @property {string} floorName - 楼层名称
 * @property {ToiletSpaceItem[]} toilets - 该楼层的卫生间列表
 */
export interface FloorToiletGroup {
  floorId: string
  floorName: string
  toilets: ToiletSpaceItem[]
}

/**
 * 建筑卫生间树形结构接口
 * @property {string} buildingId - 建筑ID
 * @property {string} buildingName - 建筑名称
 * @property {FloorToiletGroup[]} floors - 楼层分组列表
 */
export interface BuildingToiletTree {
  buildingId: string
  buildingName: string
  floors: FloorToiletGroup[]
}
