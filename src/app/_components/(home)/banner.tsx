import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative overflow-hidden">
      <Image
        src="/path/to/banner-image.jpg"
        alt="Ecommerce Banner"
        layout="responsive"
        width={1920}
        height={1080}
        objectFit="cover"
        className="w-full h-auto"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Our Store
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Shop the latest trends in fashion and accessories.
          </p>
          <a
            href="/shop"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-bold text-lg"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
