"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { ConnectButton } from "thirdweb/react";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { client } from "@/app/client";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
  createWallet("com.trustwallet.app"),
];

const Menu = [
  { title: "About Us", link: "#about" },
  { title: "Experience", link: "/experience" },
  { title: "Explorer", link: "/explorer" },
  { title: "Pricing", link: "/pricing" },
  { title: "Blog", link: "/blog" },
];

const Navbar = () => {
  return (
    <div className="h-28">
      <div className="flex h-full w-full items-center justify-between px-6 md:px-8 xl:px-24">
        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger asChild className="text-white">
              <Button
                variant="outline"
                className="border-none bg-transparent text-2xl px-0 active:bg-none hover:bg-transparent hover:text-white"
              >
                &#9776;
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="text-black">
              <nav className="mr-5 md:mr-10 lg:mr-20">
                <ul className="flex flex-col gap-5 md:gap-11 lg:gap-16 items-center ">
                  {Menu.map(({ title, link }) => (
                    <li key={title}>
                      <Link href={link} className="text-base">
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="hidden lg:block h-fit">
          <div className="h-10 w-32 text-4xl">Syncible</div>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden lg:block mx-5 ">
            <ul className="flex gap-5 md:gap-7 lg:gap-9 items-center">
              {Menu.map(({ title, link }) => (
                <li key={title}>
                  <Link
                    href={link}
                    className="text-base"
                    target={title === "Experience" ? "_blank" : "_self"}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ConnectButton
            wallets={wallets}
            theme={"dark"}
            connectModal={{ size: "wide" }}
            connectButton={{
              label: "Signing",
              style: {
                color: "white",
                background: "blue",
                borderRadius: "99px",
              },
            }}
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
