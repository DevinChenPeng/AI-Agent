import ExpansionCollapse from '@renderer/components/ExpansionCollapse'
import styles from './index.module.less'
import { cn } from '@renderer/utils/classNames'
import { useState } from 'react'
import Left from './left'
import { useBaseData } from './hooks/useBaseData'
import { AppContext } from './contexts'

function List(): React.JSX.Element {
  const [isFold, setIsFold] = useState(false)
  const { toiletSpaceMap, toiletTreeData, loading, objectInfo, objectDataMap, getObjectDataByInfoCode } = useBaseData()
  return (
    <div className={cn(styles.run_monitor, 'wh-full')}>
      <AppContext.Provider value={{ toiletSpaceMap, objectInfo, objectDataMap, getObjectDataByInfoCode }}>
        <ExpansionCollapse
          isFold={isFold}
          setIsFold={setIsFold}
          left={<Left toiletTreeData={toiletTreeData} loading={loading} />}
        ></ExpansionCollapse>
      </AppContext.Provider>
    </div>
  )
}

export default List
