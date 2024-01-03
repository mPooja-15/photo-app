
type Props = {
  title: string
}

export const Title = ({ title }: Props) => {
  return (
    <div className='container  mx-auto py-4'>
      <div className='text-center text-3xl max-[560px]:text-[15px] font-semibold capitalize'>
        {title}
      </div>
    </div>
  )
}