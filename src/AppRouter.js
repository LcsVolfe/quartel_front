import PersonIcon from '@material-ui/icons/Person';
import ClientFormPage from "./pages/client/form";
import ClientListPage from "./pages/client/list";
import {Template} from "./components/template";
import BuildIcon from '@material-ui/icons/Build';
import ProductListPage from "./pages/product/list";

const router = [
  {
    path: '/list/client',
    text: 'Clientes',
    icon: <PersonIcon />,
    component: <Template content={<ClientListPage />} />
  },
  {
    path: '/form/client',
    text: 'Form Cliente',
    component: <Template content={<ClientFormPage />} />
  },
  {
    path: '/list/product',
    text: 'Produto',
    icon: <BuildIcon />,
    component: <Template content={<ProductListPage />} />
  },
  // {
  //   path: '/list/order',
  //   text: 'Ordem',
  //   icon: <InboxIcon />,
  //   component: <Template content={<OrderListPage />} />
  // },
  // {
  //   path: '/form/product',
  //   text: 'FORM Produto',
  //   icon: <InboxIcon />,
  //   component: <Template content={<ProductFormPage />} ></Template>
  // },

  // {
  //   path: '/form/order',
  //   text: 'Form Ordem',
  //   icon: <InboxIcon />,
  //   component: <Template content={<OrderFormPage />} ></Template>
  // },
  // {
  //   path: '/formbuilder',
  //   text: 'Form Builder',
  //   icon: <InboxIcon />,
  //   component: <Template content={<FormBuilderComponent />} ></Template>
  // }
];

export default router;
