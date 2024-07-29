import WebIcon from "../icons/WebIcon";
import TwitterIcon from "../icons/TwitterIcon";
import LinkedinlIcon from "../icons/LinkedinIcon";
import FacebookIcon from "../icons/FacebookIcon";
import EmailIcon from "../icons/EmailIcon";
import Link from "next/link";

const listSocialMedia = [
  { link: "/#", icon: <WebIcon /> },
  { link: "/#", icon: <TwitterIcon /> },
  { link: "/#", icon: <LinkedinlIcon /> },
  { link: "/#", icon: <FacebookIcon /> },
  { link: "/#", icon: <EmailIcon /> },
];

export default function Footer() {
  return (
    <footer className="mt-56 flex items-center px-4 md:px-8 xl:px-24 py-4">
      <div className="flex items-center gap-5">
        {listSocialMedia.map(({ link, icon }, index) => {
          return (
            <Link href={link} key={index}>
              {icon}
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
