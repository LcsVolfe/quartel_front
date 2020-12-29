import InboxIcon from "@material-ui/icons/MoveToInbox";
import PersonIcon from '@material-ui/icons/Person';
import ProductListPage from "./pages/product/list";
import ProductFormPage from "./pages/product/form";
import Template from "./components/template";


const router = [
  {
    path: '/list/client',
    text: 'Cliente',
    icon: <PersonIcon />,
    component: <Template content={<ProductListPage />} />
  },
  {
    path: '/list/product',
    text: 'Produto',
    icon: <InboxIcon />,
    component: <Template content={<ProductListPage />} />
  },
  {
    path: '/form/product',
    text: 'FORM Produto',
    icon: <InboxIcon />,
    component: <Template content={<ProductFormPage />} ></Template>
  }
];

export default router;
