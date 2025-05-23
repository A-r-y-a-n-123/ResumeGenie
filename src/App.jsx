
function App() {

  return (
    <>
      <h1 className='text-2xl font-bold p-4'>ResumeGenie</h1>
      <div className='p-3'>
        <div className='bg-gray-300 rounded-lg p-5 flex flex-col gap-10'>
          <h2 className='text-xl font-bold'>Upload Resume</h2>
          <input type='file' className='w-[220px] sm:w-[400px] md:w-[500px] lg:w-[600px] rounded-md border-2 border-gray-600' />
          <button className='bg-blue-500 text-white p-2 rounded-md w-[100px]'>Upload</button>
        </div>
      </div>
    </>
  )
}

export default App
