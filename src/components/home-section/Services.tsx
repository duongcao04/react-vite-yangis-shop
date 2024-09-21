import services from '@/constants/services'

function Services() {
    return (
        <div className="bg-white py-24">
            <div className="mx-auto laptop:w-[943px] flex flex-col laptop:flex-row items-center justify-between gap-[88px]">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center gap-6"
                    >
                        <img src={service.icon} alt={service.title} />
                        <div className="text-center">
                            <p className="text-xl font-semibold">
                                {service.title}
                            </p>
                            <p className="mt-2 text-sm">
                                {service.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Services
