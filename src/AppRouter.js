import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import StoreIcon from '@material-ui/icons/Store';
import WorkIcon from '@material-ui/icons/Work';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AttachMoney from '@material-ui/icons/AttachMoney';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ClientFormPage from "./pages/client/form";
import ClientListPage from "./pages/client/list";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ProductListPage from "./pages/product/list";
import ProductFormPage from "./pages/product/form";
import OrderListPage from "./pages/order/list";
import OrderFormPage from "./pages/order/form";
import EmployeeListPage from "./pages/employee/list";
import EmployeeFormPage from "./pages/employee/form";
import DashboardPage from "./pages/dashboard";
import OrderLineFormPage from "./pages/order/form/order-line";
import ProviderListPage from "./pages/provider/list";
import ProviderFormPage from "./pages/provider/form";
import DebtPaymentFormPage from "./pages/debt-payment/form";
import DebtPaymentListPage from "./pages/debt-payment/list";
import EmployeeWorkDayListPage from "./pages/employee-work-day/list";
import EmployeeWorkDayFormPage from "./pages/employee-work-day/form";
import Currency from "./pages/currency";

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
    icon: <WorkIcon />,
    component: <EmployeeListPage />
  },
  {
    path: '/form/employees',
    component: <EmployeeFormPage />
  },
  {
    path: '/list/providers',
    text: 'Fornecedor',
    icon: <BuildIcon />,
    component: <ProviderListPage />
  },
  {
    path: '/form/providers',
    component: <ProviderFormPage />
  },
  {
    path: '/list/debt-payments',
    text: 'Despesas',
    icon: <AttachMoney />,
    component: <DebtPaymentListPage />
  },
  {
    path: '/form/debt-payments',
    component: <DebtPaymentFormPage />
  },
  {
    path: '/list/employees-work-day',
    text: 'Dia Trab. Func.',
    icon: <AccessTimeIcon />,
    component: <EmployeeWorkDayListPage />
  },
  {
    path: '/form/employees-work-day',
    component: <EmployeeWorkDayFormPage />
  },

  {
    path: '/currency',
    component: <Currency />
  },

  {
    path: '/formbuilder',
    component: <OrderLineFormPage />
  }
];

export default router;
