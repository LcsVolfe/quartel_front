import PersonIcon from '@material-ui/icons/Person';
import ClientFormPage from "./pages/client/form";
import ClientListPage from "./pages/client/list";
import {Template} from "./components/template";
import BuildIcon from '@material-ui/icons/Build';
import StoreIcon from '@material-ui/icons/Store';
import ProductListPage from "./pages/product/list";
import ProductFormPage from "./pages/product/form";
import ListAltIcon from '@material-ui/icons/ListAlt';
import OrderListPage from "./pages/order/list";
import OrderFormPage from "./pages/order/form";
import EmployeeListPage from "./pages/employee/list";
import EmployeeFormPage from "./pages/employee/form";
const router = [
  {
    path: '/list/clients',
    text: 'Clientes',
    icon: <PersonIcon />,
    component: <Template content={<ClientListPage />} />
  },
  {
    path: '/form/clients',
    component: <Template content={<ClientFormPage />} />
  },
  {
    path: '/list/products',
    text: 'Produtos',
    icon: <StoreIcon />,
    component: <Template content={<ProductListPage />} />
  },
  {
    path: '/form/products',
    component: <Template content={<ProductFormPage />} />
  },
  {
    path: '/list/orders',
    text: 'Serviços',
    icon: <ListAltIcon />,
    component: <Template content={<OrderListPage />} />
  },
  {
    path: '/form/orders',
    component: <Template content={<OrderFormPage />} ></Template>
  },
  {
    path: '/list/employees',
    text: 'Funcionários',
    icon: <BuildIcon />,
    component: <Template content={<EmployeeListPage />} />
  },
  {
    path: '/form/employees',
    component: <Template content={<EmployeeFormPage />} ></Template>
  },


  // {
  //   path: '/formbuilder',
  //   text: 'Form Builder',
  //   icon: <InboxIcon />,
  //   component: <Template content={<FormBuilderComponent />} ></Template>
  // }
];

export default router;
