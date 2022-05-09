interface ErrorProps {
  message: string
}

function Error({ message }: ErrorProps) {
  return (
    <div className='flex flex-col items-center justify-center text-lg font-medium h-screen w-screen'>
      <h2>Oh no! Error while fetching your Data 😰</h2>
      <p>{message}</p>
      <h2>Please reload 🙏😊</h2>
    </div>
  )
}

export default Error
