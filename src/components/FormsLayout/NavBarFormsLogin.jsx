import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  UserIcon,
  ArrowsPointingOutIcon,
  ArrowLongLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";

export function NavBarFormsLogin({ loginG }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav, sidenavColor } = controller;

  return (
    <nav class="bg-pink-500    rounded-none shadow-xl">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a class="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="./img/Home/Extintor_logo7.png"
            class="h-14"
            alt="Extintor"
          />
          {/* 
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Xtintor
            </span>
            */}
        </a>

        <div>
          <div
            className="h-auto bg-white  flex items-center justify-center mt-4 cursor-pointer text-center  mx-auto w-full rounded-lg shadow-2xl shadow-purple-700 hover:shadow-white hover:bg-pink-50"
            onClick={loginG}
          >
            <div className="p-2">
              <img
                className="h-7 w-7 rounded-full"
                src="./img/Home/Google.png"
                alt="User image"
              />
            </div>
            <div className="ml-2 font-bold text-blue-gray-600 p-2 ">
              Continuar con Google
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

NavBarFormsLogin.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default NavBarFormsLogin;
