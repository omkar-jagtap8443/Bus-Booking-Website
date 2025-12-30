import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoDiscordAlt } from "react-icons/bi";
import { BiLogoPeriscope } from "react-icons/bi";
import { PiDevToLogoFill } from "react-icons/pi";
import { div, label } from "framer-motion/client";


const OurBrands = () => {

    const brands = [
        {
            icon: IoLogoWhatsapp,
            label: "WhatsApp"
        },
        {
            icon: BiLogoDiscordAlt,
            label: "Discord"
        },
        {
            icon: BiLogoPeriscope,
            label: "Periscope"
        },
        {
            icon: PiDevToLogoFill,
            label: "Dev.to"
        },
    ];
    return (


        <>
            <div className='bg-white/80 mt-6 mx-4 md:mx-10 lg:mx-16 p-6 md:p-10 rounded-2xl'>



                <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-orange-400">
                    Our Brands
                </h1>


                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {brands.map((brand, index) => {
                        const Icon = brand.icon;

                        return (
                            <div className="bg-white rounded-xl  shadow:md hover:shadow-xl
                              hover:-translate-y-2 transition-all duration-300
                p-6 flex flex-col items-center text-center border border-orange-400">


                                <div className="bg-gray-200 p-6 rounded-full mb-4 text-orange-400">
                                    <Icon size={32} />
                                </div>

                                <h2 className="text-2xl font-bold text-black/60">
                                    {brand.label}
                                </h2>
                            </div>
                        )

                    })}


                </div>




            </div>

        </>
    )
}

export default OurBrands