import InboxIcon from "@material-ui/icons/MoveToInbox";
import PersonIcon from '@material-ui/icons/Person';
import ProductListPage from "./pages/product/list";
import ProductFormPage from "./pages/product/form";
import Template from "./components/template";
import ClientFormPage from "./pages/client/form";
import ClientListPage from "./pages/client/list";
import OrderListPage from "./pages/order/list";
import OrderFormPage from "./pages/order/form";


const router = [
  {
    path: '/list/client',
    text: 'Cliente',
    icon: <PersonIcon />,
    component: <Template content={<ClientListPage />} />
  },
  {
    path: '/list/product',
    text: 'Produto',
    icon: <InboxIcon />,
    component: <Template content={<ProductListPage />} />
  },
  {
    path: '/list/order',
    text: 'Ordem',
    icon: <InboxIcon />,
    component: <Template content={<OrderListPage />} />
  },
  {
    path: '/form/product',
    text: 'FORM Produto',
    icon: <InboxIcon />,
    component: <Template content={<ProductFormPage />} ></Template>
  },
  {
    path: '/form/client',
    text: 'Form Cliente',
    icon: <InboxIcon />,
    component: <Template content={<ClientFormPage />} ></Template>
  },
  {
    path: '/form/order',
    text: 'Form Ordem',
    icon: <InboxIcon />,
    component: <Template content={<OrderFormPage />} ></Template>
  }
];

export default router;
