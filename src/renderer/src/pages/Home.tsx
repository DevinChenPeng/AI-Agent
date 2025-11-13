import { getUserInfo } from '@renderer/api/user'
function Home(): React.JSX.Element {
  return <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}></div>
}

getUserInfo().then(res => {
  console.log(res)
})
export default Home
