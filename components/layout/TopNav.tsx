"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Input,
} from "@nextui-org/react";
import Link from "next/link";
import { navItems } from "@/configs/site/navigation";
import { FaXTwitter, FaGithub, FaTelegram, FaDiscord } from "react-icons/fa6";

const TopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      maxWidth="full"
      classNames={{
        base: "container",
        wrapper: "px-0",
      }}
    >
      <NavbarContent className="gap-8">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex-grow-0">
          <h4 className="font-bold text-inherit text-xl">DegenStarter</h4>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <NavbarItem>
            <Input
              variant="bordered"
              size="sm"
              radius="full"
              placeholder="Search"
              classNames={{
                inputWrapper: "border shadow-none min-w-[300px]",
              }}
            />
          </NavbarItem>
          {navItems.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link href={item.href}>{item.label}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarContent justify="end" className="hidden sm:flex gap-1">
          <NavbarItem>
            <Button variant="light" radius="full" isIconOnly>
              <FaXTwitter size={20} />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="light" radius="full" isIconOnly>
              <FaGithub size={20} />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="light" radius="full" isIconOnly>
              <FaTelegram size={20} />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="light" radius="full" isIconOnly>
              <FaDiscord size={24} />
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarItem>
          <Button as={Link} href="#" radius="full" color="primary">
            Connect Wallet
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="#">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default TopNav;
