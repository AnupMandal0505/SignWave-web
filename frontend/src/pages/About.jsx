const About = () => {
  return (
    <div>
      <div className="container mt-36">
        <div className="row">
                <div className="col-md-8 flex justify-end items-end h-96 bg-[url(https://media.istockphoto.com/id/1262282672/photo/smiling-indian-female-doctor-holding-phone-talk-to-patient-make-telemedicine-online.jpg?s=2048x2048&w=is&k=20&c=X1pSAAZ_UGzkChij6navw_fP0EyFWktBT6VOL1Rn1-Y=)] bg-cover bg-center border border-gray-200 rounded-lg shadow">
                <p className="text-white font-bold text-1xl">
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, rerum veniam. Quod minus ullam ipsa amet libero, aut omnis saepe eum nam animi fugiat quibusdam, excepturi numquam atque magnam facilis.
</p>
        </div>
          <div className="col-md-4 flex items-center justify-center ">

            <div className=" flex items-center justify-center w-60 h-60 bg-[url(https://cdn.pixabay.com/photo/2024/05/11/11/04/call-center-8754751_1280.jpg)] bg-cover bg-center bg-white border border-gray-200 rounded-full shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6 flex justify-between">
          <button type="button" className=" border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
            <i className="fas fa-microphone text-red-500 hover:text-white "></i>

              <span className="sr-only">Icon description</span>
            </button>
            <button type="button" className=" border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
            <i className="fas fa-camera text-red-500 hover:text-white "></i>

              <span className="sr-only">Icon description</span>
            </button>

            <button type="button" className=" border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
            <i className="fas fa-phone text-red-500 hover:text-white "></i>

              <span className="sr-only">Icon description</span>
            </button>

            <button type="button" className=" border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
            <i className="fas fa-camera text-red-500 hover:text-white "></i>

              <span className="sr-only">Icon description</span>
            </button>
          
          </div>
         
        </div>
      </div>


    </div>
  )
}

export default About