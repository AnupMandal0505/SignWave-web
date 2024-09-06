// import React from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './css/Service.css'; // Ensure you import your CSS file

const Service = () => {
  return (
    <div>
        <Navbar />
      <section className="py-3 py-md-5 py-xl-8 mt-11">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-12">
            <h1 ><span>-</span>Service<span>-</span></h1>
            <p  >
              Explore Our Recent Creations, Demonstrating Our Commitment to Delivering Transformative Digital Solutions.
            </p>
            <button type="button" className="btn btn-lg btn-primary mb-3 mb-md-4 mb-xl-5">Connect Now</button>
          </div>
        </div>
        
        <div className="container">
      <div className="row gy-3 gy-md-4 gy-lg-0">
        <div className="col-12 col-lg-6">
          <div className="card bg-light p-3 m-0">
            <div className="row gy-3 gy-md-0 align-items-md-center">
              <div className="col-md-5">
                <img
                  src="https://cdn.pixabay.com/photo/2018/01/05/07/07/house-painter-3062248_1280.jpg"
                  className="img-fluid rounded-start card-img"
                  alt="Why Choose Us?"
                />
              </div>
              <div className="col-md-7">
                <div className="card-body p-0">
                  <h2 className="card-title h4 mb-3">Why Choose Us?</h2>
                  <p className="card-text lead">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ea, illo cumque dolore atque optio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card bg-light p-3 m-0">
            <div className="row gy-3 gy-md-0 align-items-md-center">
              <div className="col-md-5">
                <img
                  src="https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg"
                  className="img-fluid rounded-start card-img"
                  alt="Visionary Team"
                />
              </div>
              <div className="col-md-7">
                <div className="card-body p-0">
                  <h2 className="card-title h4 mb-3">Visionary Team</h2>
                  <p className="card-text lead">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente eaque aliquid voluptates ratione similique sint labore deserunt. Distinctio at rerum quasi a, ex repudiandae ipsum?.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </section>


    <section className="py-3 py-md-5 py-xl-8">
      <div className="container our-journey">
        <div className="d-flex justify-content-center align-items-center">
          <div className="row w-100 pt-5">
            <div className="col-12 col-md-10 col-lg-8 mx-auto text-center">
              <h2 className="display-6 mb-3 pt-5">
                Our journey began with a dream of redefining how the world perceives design.
              </h2>
              <button type="button" className="btn btn-lg btn-primary mb-3 mb-md-4 mb-xl-5">Discover More</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container overflow-hidden mt-5">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-12">
            <h1 data-aos="slide-up"><span>-</span>Our Vision<span>-</span></h1>
          </div>
        </div>
        <div className="row gy-4 gy-lg-0">
          <div className="col-12 col-lg-6">
            <article>
              <div className="card border-0">
                <img
                  data-aos="zoom-in-up"
                  className="card-img-top img-fluid m-0"
                  loading="lazy"
                  src="https://cdn.pixabay.com/photo/2020/02/24/15/52/board-4876630_1280.jpg"
                  alt="Our Vision"
                />
                <div className="card-body border bg-white p-4">
                  <div className="entry-header mb-3">
                    <h2 className="card-title entry-title h4 mb-0">
                      <a className="link-dark text-decoration-none" href="#!">Our Vision</a>
                    </h2>
                  </div>
                  <p data-aos="zoom-in-down" className="card-text entry-summary text-secondary mb-3">
                    From sleek modernism to timeless elegance, we infuse every creation with a touch of our artistic ingenuity. As a design agency, great design can shape perceptions, inspire action, and leave an indelible mark on the world.
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div className="col-12 col-lg-6">
            <article>
              <div className="card border-0">
                <img
                  data-aos="zoom-in-up"
                  className="card-img-top img-fluid m-0"
                  loading="lazy"
                  src="https://cdn.pixabay.com/photo/2020/06/15/16/53/hands-5302566_1280.jpg"
                  alt="Our Approach"
                />
                <div className="card-body border bg-white p-4">
                  <div className="entry-header mb-3">
                    <h2 className="card-title entry-title h4 mb-0">
                      <a className="link-dark text-decoration-none" href="#!">Our Approach</a>
                    </h2>
                  </div>
                  <p data-aos="zoom-in-down" className="card-text entry-summary text-secondary mb-3">
                    Welcome to our design agency, where creativity knows no bounds and innovation takes center stage. We are a team of dedicated designers, strategists, and visionaries with a passion for transforming ideas into captivating visuals.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

<Footer /> 

    </div>
  )
}

export default Service
