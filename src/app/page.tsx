import Image from "next/image";
import SectionAbout from "@/components/pages/Home/SectionAbout";
import SectionWhatWeBelieve from "@/components/pages/Home/SectionWhatWeBelieve";
import SectionOurVision from "@/components/pages/Home/SectionOurVision";
import { Button } from "@/components/ui/button";

import BannerCertificate from "../../public/certificate.jpg";
import ether from "../../public/images/ether.png";
import polygon from "../../public/images/polygon.png";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center items-center mt-0 lg:mt-48 px-6 md:px-14 lg:px-24 2xl:px-60">
        <div className="w-fit">
          <div className="text-2xl lg:text-3xl 2xl:text-4xl col-span-1 font-bold">
            Using blockchain technology and NFTs, Syncible
            <br className="hidden md:block xl:block" />
            revolutionizes the way academic achievements are recognized.
          </div>
          <div className="my-6 text-lg lg:text-base font-bold">Powered by</div>
          <div className="flex flex-wrap gap-6 items-center">
            <Image
              src={polygon}
              alt="polygon"
              width={130}
              height={40}
              loading="lazy"
              style={{ width: "100px", height: "auto" }}
            />
            <Image
              src={ether}
              alt="ether"
              width={130}
              loading="lazy"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
          <Button className="px-16 py-6 text-base mt-9 rounded-full">
            Contact us
          </Button>
        </div>
        <div className="w-auto h-auto rounded-lg overflow-hidden">
          <Image
            src={BannerCertificate}
            alt="/ảnh NFT Certificate"
            className="w-full h-full col-span-1 rounded-lg"
            priority={false}
          />
        </div>
      </div>

      <div>
        <SectionAbout />
        <SectionWhatWeBelieve />
        <SectionOurVision />
      </div>
    </div>
  );
}
