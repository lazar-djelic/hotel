import React from "react";

const HomePage: React.FC = () => {
  return <div></div>;
  // return (
  //   <div className="flex flex-col min-h-screen">
  //     {/* HERO CAROUSEL */}
  //     <div className="carousel w-full h-[500px]">
  //       <div id="slide1" className="carousel-item relative w-full">
  //         <img
  //           src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
  //           className="w-full object-cover"
  //         />
  //         <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
  //           <a href="#slide3" className="btn btn-circle">
  //             ❮
  //           </a>
  //           <a href="#slide2" className="btn btn-circle">
  //             ❯
  //           </a>
  //         </div>

  //         <div className="absolute bottom-20 left-10 text-white">
  //           <h1 className="text-5xl font-bold">Luxury Stay</h1>
  //           <p className="mt-2 text-lg">Experience comfort like never before</p>
  //           <button className="btn btn-primary mt-4">Book Now</button>
  //         </div>
  //       </div>

  //       <div id="slide2" className="carousel-item relative w-full">
  //         <img
  //           src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
  //           className="w-full object-cover"
  //         />
  //         <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
  //           <a href="#slide1" className="btn btn-circle">
  //             ❮
  //           </a>
  //           <a href="#slide3" className="btn btn-circle">
  //             ❯
  //           </a>
  //         </div>
  //       </div>

  //       <div id="slide3" className="carousel-item relative w-full">
  //         <img
  //           src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
  //           className="w-full object-cover"
  //         />
  //         <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
  //           <a href="#slide2" className="btn btn-circle">
  //             ❮
  //           </a>
  //           <a href="#slide1" className="btn btn-circle">
  //             ❯
  //           </a>
  //         </div>
  //       </div>
  //     </div>

  //     {/* HOTEL INFO */}
  //     <section className="py-16 px-6 bg-base-100 text-center">
  //       <h2 className="text-4xl font-bold mb-6">Welcome to Our Hotel</h2>
  //       <p className="max-w-3xl mx-auto text-lg opacity-80">
  //         Enjoy luxury rooms, world-class service, and a relaxing atmosphere.
  //         Whether you are visiting for business or leisure, our hotel provides
  //         the perfect combination of comfort and elegance.
  //       </p>
  //     </section>

  //     {/* ROOM HIGHLIGHTS */}
  //     <section className="py-16 px-6 bg-base-200">
  //       <h2 className="text-3xl font-bold text-center mb-10">Our Rooms</h2>

  //       <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
  //         <div className="card bg-base-100 shadow-xl">
  //           <figure>
  //             <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32" />
  //           </figure>
  //           <div className="card-body">
  //             <h3 className="card-title">Standard Room</h3>
  //             <p>Comfortable room perfect for short stays.</p>
  //             <div className="card-actions justify-end">
  //               <button className="btn btn-primary">View</button>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="card bg-base-100 shadow-xl">
  //           <figure>
  //             <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427" />
  //           </figure>
  //           <div className="card-body">
  //             <h3 className="card-title">Deluxe Room</h3>
  //             <p>Spacious and elegant with premium amenities.</p>
  //             <div className="card-actions justify-end">
  //               <button className="btn btn-primary">View</button>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="card bg-base-100 shadow-xl">
  //           <figure>
  //             <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461" />
  //           </figure>
  //           <div className="card-body">
  //             <h3 className="card-title">Luxury Suite</h3>
  //             <p>Top tier luxury with a beautiful view.</p>
  //             <div className="card-actions justify-end">
  //               <button className="btn btn-primary">View</button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* AMENITIES */}
  //     <section className="py-16 px-6 bg-base-100">
  //       <h2 className="text-3xl font-bold text-center mb-10">Amenities</h2>

  //       <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
  //         <div className="p-6 shadow rounded-lg bg-base-200">
  //           <h3 className="font-bold text-lg">Free Wi-Fi</h3>
  //           <p className="opacity-70">
  //             High speed internet throughout the hotel.
  //           </p>
  //         </div>

  //         <div className="p-6 shadow rounded-lg bg-base-200">
  //           <h3 className="font-bold text-lg">Restaurant</h3>
  //           <p className="opacity-70">Enjoy local and international cuisine.</p>
  //         </div>

  //         <div className="p-6 shadow rounded-lg bg-base-200">
  //           <h3 className="font-bold text-lg">Spa & Wellness</h3>
  //           <p className="opacity-70">Relax and recharge.</p>
  //         </div>

  //         <div className="p-6 shadow rounded-lg bg-base-200">
  //           <h3 className="font-bold text-lg">Swimming Pool</h3>
  //           <p className="opacity-70">Indoor heated pool available.</p>
  //         </div>
  //       </div>
  //     </section>

  //     {/* CTA */}
  //     <section className="py-20 bg-primary text-primary-content text-center">
  //       <h2 className="text-4xl font-bold mb-4">Book Your Stay Today</h2>
  //       <p className="mb-6">
  //         Experience comfort, elegance, and exceptional service.
  //       </p>
  //       <button className="btn btn-secondary btn-lg">Reserve Now</button>
  //     </section>

  //     {/* FOOTER */}
  //     <footer className="footer p-10 bg-neutral text-neutral-content">
  //       <div>
  //         <span className="footer-title">Hotel</span>
  //         <p>
  //           Grand Hotel <br />
  //           Luxury & Comfort
  //         </p>
  //       </div>

  //       <div>
  //         <span className="footer-title">Address</span>
  //         <p>123 Main Street</p>
  //         <p>City, Country</p>
  //       </div>

  //       <div>
  //         <span className="footer-title">Working Hours</span>
  //         <p>Reception: 24/7</p>
  //         <p>Restaurant: 7:00 - 22:00</p>
  //       </div>

  //       <div>
  //         <span className="footer-title">Contact</span>
  //         <p>+1 234 567 890</p>
  //         <p>hotel@email.com</p>
  //       </div>
  //     </footer>
  //   </div>
  // );
};

export default HomePage;
