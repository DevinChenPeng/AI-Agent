import { getUserInfo } from '@renderer/api/user'
import { useMount } from '@renderer/hooks/useMount'
function List(): React.JSX.Element {
  useMount(() => {
    getUserInfo().then(res => {
      console.log(res)
    })
  })
  return <div className="list-container"></div>
}

export default List
