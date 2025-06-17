import React from "react";

export const Contactus = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Google Map */}
            <div className="w-full h-[500px] lg:h-auto">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62829.59430525588!2d125.59173189003632!3d7.072255549252267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f90dbbc2f8f9f7%3A0x2fd84fd4cf8d78d3!2sChavez%20St%2C%20Poblacion%20District%2C%20Davao%20City%2C%20Davao%20del%20Sur!5e0!3m2!1sen!2sph!4v1718599999999!5m2!1sen!2sph"
                    width="100%"
                    height="100%"
                    allowFullScreen={true}
                    loading="lazy"
                    className="border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className="bg-gradient-to-r from-white to-green-100 p-10 flex flex-col justify-center items-center text-gray-800">
                <img
                    src="/denr_logo.png"
                    alt="DENR Logo"
                    className="w-16 h-16 mb-4"
                />
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Environmental Management Bureau XI
                </h2>

                <div className="space-y-4 text-3xl md:text-xl sm:text-lg">
                    <div>
                        <p className="font-bold">Address:</p>
                        <p>
                            3rd Avenue corner V. Guzman St., Brgy. 27-C Sta.
                            Ana, Davao City
                        </p>
                        <p>
                            <span className="font-bold">Tel.:</span> (082)
                            234-0061
                        </p>
                    </div>
                    <div>
                        <p className="font-bold">Address:</p>
                        <p>
                            Chavez St., Poblacion District, Davao City, Davao
                            del Sur
                        </p>
                        <p>
                            <span className="font-bold">Tel.:</span> (082)
                            228-9514
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="font-bold">Email:</span>{" "}
                            embdavao@emb.gov.ph
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
