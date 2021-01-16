import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import StoreIcon from '@material-ui/icons/Store';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ClientFormPage from "./pages/client/form";
import ClientListPage from "./pages/client/list";
import {Template} from "./components/template";
import ProductListPage from "./pages/product/list";
import ProductFormPage from "./pages/product/form";
import OrderListPage from "./pages/order/list";
import OrderFormPage from "./pages/order/form";
import EmployeeListPage from "./pages/employee/list";
import EmployeeFormPage from "./pages/employee/form";
import DashboardPage from "./pages/dashboard";
import OrderLineFormPage from "./pages/order/form/order-line";
const router = [
  {
    path: '/',
    text: 'Dashboard',
    icon: <DashboardIcon />,
    component: <DashboardPage />
  },
  {
    path: '/list/clients',
    text: 'Clientes',
    icon: <PersonIcon />,
    component: <ClientListPage />
  },
  {
    path: '/form/clients',
    component: <ClientFormPage />
  },
  {
    path: '/list/products',
    text: 'Produtos',
    icon: <StoreIcon />,
    component: <ProductListPage />
  },
  {
    path: '/form/products',
    component: <ProductFormPage />
  },
  {
    path: '/list/orders',
    text: 'Serviços',
    icon: <ListAltIcon />,
    component: <OrderListPage />
  },
  {
    path: '/form/orders',
    component: <OrderFormPage />
  },
  {
    path: '/list/employees',
    text: 'Funcionários',
    icon: <BuildIcon />,
    component: <EmployeeListPage />
  },
  {
    path: '/form/employees',
    component: <EmployeeFormPage />
  },


  {
    path: '/formbuilder',
    component: <OrderLineFormPage />
  }
];

export default router;
