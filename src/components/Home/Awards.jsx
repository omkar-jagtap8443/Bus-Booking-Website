

const Awards = () => {

    const awards = [
        {
            img: "https://i.pinimg.com/736x/4f/bd/37/4fbd37c8bb2c55dd9520e715f77b407f.jpg",
            title: "Best Travel Agency 2022",
            desc: "Awarded for exceptional service and customer satisfaction."
        },
        {
            img: "https://i.pinimg.com/736x/4f/bd/37/4fbd37c8bb2c55dd9520e715f77b407f.jpg",
            title: "Best Travel Agency 2022",
            desc: "Awarded for exceptional service and customer satisfaction."
        },
        {
            img: "https://i.pinimg.com/736x/4f/bd/37/4fbd37c8bb2c55dd9520e715f77b407f.jpg",
            title: "Best Travel Agency 2022",
            desc: "Awarded for exceptional service and customer satisfaction."
        },
        {
            img: "https://i.pinimg.com/736x/4f/bd/37/4fbd37c8bb2c55dd9520e715f77b407f.jpg",
            title: "Best Travel Agency 2022",
            desc: "Awarded for exceptional service and customer satisfaction."
        },
    ];
    return (
        <div className='  bg-white/90 mt-6 mx-4 md:mx-10 lg:mx-16 p-6 md:p-10 rounded-2xl text-black'>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-orange-400">
                Awards
            </h1>

            <p className='text-black/60'>
                more than 20+ years of excellence in the travel industry, recognized for outstanding service, safety, and customer satisfaction.
            </p>

            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 '>
                {awards.map((award, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 
             transition-all duration-300">


                        <div className="h-85 overflow-hidden ">
                            <img
                                src={`${award.img}?auto=format&fit=crop&w=800&q=80`}
                                alt={award.title}
                                className=" object-cover rounded-2xl  transition-transform duration-700 hover:scale-110"
                            />
                        </div>
                        <div className="p-5 text-center">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {award.title}
                            </h3>
                            <p className="text-gray-600">{award.desc}</p>
                        </div>

                    </div>
                ))}


            </div>

        </div>
    )
}

export default Awards