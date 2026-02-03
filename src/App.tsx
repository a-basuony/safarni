function App() {

  return (
    <>
<div className="container">

    <header className=" grid grid-cols-1 md:grid-cols-2 bg-slate-500">
         <div>
            <h1>Visit The Most</h1>
              <h2>Beautiful Places In The World</h2>
              <p>"Explore stunning destinations around the globe. Find travel inspiration, top attractions, and plan your next adventure—all from one platform."</p>
         </div>

         <figure className=" allImg grid grid-cols-3">
            {/* <div>
                    <img src={img1} alt="" />
                    <img src={img2} alt="" />
            </div> */}
         </figure>
    </header>
  </div>
    </>
  )
}

export default App
