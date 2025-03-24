"use client";

const Hero = () => {
  return (
    <section className="relative h-[40vw] w-full">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full blur-[2px] object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/HeroVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Light Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-10 backdrop-blur-md"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Your Health, Our Priority
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-90">
          Find the best doctors, book appointments, and manage your health seamlessly.
        </p>

        {/* Search Bar */}
        {/* <div className="relative w-full max-w-lg mt-4">
          <Input
            type="text"
            placeholder="Search doctors, services..."
            className="w-full py-3 px-4 rounded-full text-2xl font-bold  text-black placeholder-black   border border-black border-opacity-50 focus:ring-2 focus:ring-black focus:outline-none"
          />
          <Button className="absolute top-1/2 right-0 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 px-6 rounded-full shadow-md">
            Search
          </Button> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default Hero;

