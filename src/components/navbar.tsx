import { signIn, signOut, useSession } from "next-auth/react";
import { Dropdown,Navbar } from "flowbite-react";
import Link from "next/link";
const Navbar2: React.FC = () => {
  const { data: sessionData } = useSession();
  return (

    <Navbar
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Flowbite
    </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse >
        <Navbar.Link
          href="/"
          active={true}
        >
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">
          About
        </Navbar.Link>
        <Navbar.Link href="/navbars">
          Services
        </Navbar.Link>
        <Navbar.Link href="/navbars">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="/navbars">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
      <Dropdown label={sessionData ? "Sign out" : "Sign in"}  >
        <Dropdown.Item>
          Dashboard
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href={"/user"}>
            Settings
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href={"/shop"}>
            Shop
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <button
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </Dropdown.Item>
      </Dropdown>
    </Navbar>

);
};
export default Navbar2;

