import { Admin, Resource, ShowGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import { UserList,UserEdit } from './users.js';
import { Dashboard } from './Dashboard';
import { DestinationList,DestinationEdit } from './destination.js';

const API = process.env.REACT_APP_ENDPOINT;
console.log(API);
const dataProvider = jsonServerProvider('http://127.0.0.1:8000');

const AdminApp = () => (
    <Admin
        dataProvider={dataProvider}
        dashboard={Dashboard}
    >
        <Resource 
          
            name="destination"
            list={DestinationList}
            // create={PostCreate}
            show={ShowGuesser}
            search = {false}
            edit = {DestinationEdit}
            icon={PostIcon}
        />
        <Resource
            name="user"
            list={UserList}
            edit={UserEdit}
            show={ShowGuesser}
            icon={UserIcon}
        />
    </Admin>
);

export default AdminApp;
