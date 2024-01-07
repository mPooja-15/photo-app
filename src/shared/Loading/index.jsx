import loadingImage from './loading.svg'

 const Loading = () => {
  return (
    <div className='w-[80vw] mx-auto flex justify-center'>
      <img src={loadingImage} className='h-8 w-8 loading-icon' alt=''/>
    </div>
  )
}
export default Loading