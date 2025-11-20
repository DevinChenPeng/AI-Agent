import { getUserInfo } from '@renderer/api/user'
function List(): React.JSX.Element {
  getUserInfo().then(res => {
    console.log(res)
  })
  return <div className="list-container"></div>
}

export default List
