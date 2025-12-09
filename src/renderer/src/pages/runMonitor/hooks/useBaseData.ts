import { treeBuildingFloorSpace } from '@renderer/api/common'
import { TOILET } from '@renderer/api/runMonitor'
import { Build, Floor } from '@renderer/types/common'
import getCancelToken from '@renderer/utils/http/getCancelToken'
import { useEffect, useRef, useState } from 'react'
import { ToiletSpaceItem, BuildingToiletTree } from '../types'
import { HTTP_STATUS } from '@renderer/constants/http'
const { cancelToken, cancelQuest } = getCancelToken()

/**
 * Hook基础数据接口
 * @property {Map<string, Build | Floor>} buildFloorMap - 建筑楼层映射表
 * @property {Map<string, ToiletSpaceItem>} toiletSpaceMap - 卫生间映射表
 * @property {BuildingToiletTree[]} toiletTreeData - 卫生间树形结构数据
 */
export interface BaseData {
  buildFloorMap: Map<string, Build | Floor>
  toiletSpaceMap: Map<string, ToiletSpaceItem>
  toiletTreeData: BuildingToiletTree[]
}
export const useBaseData = (): BaseData => {
  const [buildFloorMap, setBuildFloorMap] = useState<Map<string, Build | Floor>>(new Map())
  const [toiletSpaceMap, setToiletSpaceMap] = useState<Map<string, ToiletSpaceItem>>(new Map())
  const [toiletTreeData, setToiletTreeData] = useState<BuildingToiletTree[]>([])
  const getLocaltionData = async (): Promise<void> => {
    cancelQuest()
    try {
      const map = new Map()
      const res = await treeBuildingFloorSpace({ cancelToken: cancelToken() })
      res.data.forEach(item => {
        map.set(item.id, item)
        item.floors.forEach(floor => {
          map.set(floor.id, floor)
        })
      })
      setBuildFloorMap(map)
    } catch (error) {
      console.log(error)
    }
  }
  const getToiletList = async (): Promise<void> => {
    try {
      const map = new Map()
      const res = await TOILET(
        {
          withColumns: ['id', 'buildingId', 'localName', 'floorId', 'classCode', 'funcType', 'roomFuncType', 'objType']
        },
        { cancelToken: cancelToken() }
      )

      if (res.code === HTTP_STATUS.SUCCESS_CODE) {
        res.data?.forEach(item => {
          map.set(item.id, item)
        })
        setToiletSpaceMap(map)
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 将卫生间列表转换为树形结构
   * @param toilets - 卫生间列表
   * @param buildFloorMap - 建筑楼层映射表
   * @returns 树形结构数据
   */
  const buildToiletTree = (
    toilets: ToiletSpaceItem[],
    buildFloorMap: Map<string, Build | Floor>
  ): BuildingToiletTree[] => {
    // 按建筑ID分组
    const buildingMap = new Map<string, ToiletSpaceItem[]>()
    toilets.forEach(toilet => {
      const existing = buildingMap.get(toilet.buildingId) || []
      buildingMap.set(toilet.buildingId, [...existing, toilet])
    })

    // 构建树形结构
    const treeData: BuildingToiletTree[] = []
    buildingMap.forEach((toiletsInBuilding, buildingId) => {
      const building = buildFloorMap.get(buildingId) as Build | undefined

      // 按楼层ID分组
      const floorMap = new Map<string, ToiletSpaceItem[]>()
      toiletsInBuilding.forEach(toilet => {
        const existing = floorMap.get(toilet.floorId) || []
        floorMap.set(toilet.floorId, [...existing, toilet])
      })

      // 构建楼层分组
      const floors = Array.from(floorMap.entries()).map(([floorId, toilets]) => {
        const floor = buildFloorMap.get(floorId) as Floor | undefined
        return {
          floorId,
          floorName: floor?.localName || floor?.name || floorId,
          toilets
        }
      })

      treeData.push({
        buildingId,
        buildingName: building?.localName || building?.name || buildingId,
        floors
      })
    })

    return treeData
  }
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await getLocaltionData()
      getToiletList()
    }
    fetchData()
    return () => {
      cancelQuest()
    }
  }, [])

  // 当数据更新时，重新构建树形结构
  useEffect(() => {
    if (toiletSpaceMap.size > 0 && buildFloorMap.size > 0) {
      const arr = Array.from(toiletSpaceMap.values())
      const tree = buildToiletTree(arr, buildFloorMap)
      setToiletTreeData(tree)
    }
  }, [toiletSpaceMap, buildFloorMap])

  return { buildFloorMap, toiletSpaceMap, toiletTreeData }
}
