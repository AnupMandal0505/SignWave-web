const CallWrapper = ({ socketContext, canvasRef }) => {
  return (
    <div>
      <div className="container mt-10">
        <div className="row">
          <div className="col-md-8 flex justify-end items-end h-96 bg-cover bg-center border border-gray-200 rounded-lg shadow">
            <video
              autoPlay
              ref={socketContext?.remoteVideoRef}
              className='absolute h-full w-full z-[1]'
            // style={{
            //     position: "absolute",
            //     top: 0,
            //     left: 0,
            //     width: "100%",
            //     height: "100%",
            //     objectFit: "cover",
            //     zIndex: 1,
            // }}
            />
            <canvas
              ref={canvasRef}
              className='absolute h-full w-full z-[2] bg-transparent'
            // style={{
            //   position: "absolute",
            //   top: 0,
            //   left: 0,
            //   width: "100%",
            //   height: "100%",
            //   zIndex: 2,
            // }}
            />
            {socketContext?.remoteUserName && <p style={{ position: "absolute", bottom: "10px", left: "10px", color: "white", backgroundColor: "rgba(0,0,0,0.5)", padding: "5px", zIndex:99999999999 }}>{socketContext.remoteUserName}</p>}
          </div>
          <div className="col-md-4 flex items-center justify-center ">

            <div className=" flex items-center justify-center w-60 h-60 bg-cover bg-center bg-white border border-gray-200 rounded-full shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <video
                autoPlay
                ref={socketContext?.localVideoRef}
                className='w-full h-full object-cover'
                // style={{
                //   width: "100%",
                //   height: "100%",
                //   objectFit: "cover",
                // }}
              />
            </div>
          </div>
        </div>

        <div className="row mt-5">
        </div>
      </div>


    </div>
  )
}

export default CallWrapper;