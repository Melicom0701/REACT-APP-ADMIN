import { useMediaQuery } from '@mui/material';
import { Edit,SimpleForm,useRecordContext,TextInput,ReferenceInput ,List, SimpleList, Datagrid, TextField, EmailField } from 'react-admin';
import PostPagination from './MyPagination';

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
];

const PostTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const UserEdit = () => (
    <Edit title={<PostTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="roleId" />
        </SimpleForm>
    </Edit>
);





export const UserList = () => {
    return (
        <List  filters={postFilters}  pagination={<PostPagination />}>
                <Datagrid rowClick="show">
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="username" />
                    <EmailField source="email" />
                    <TextField source="phone" />
                    <TextField source="roleId" />
                    <TextField source="avatar" />
                    <TextField source="createdAt" />
                </Datagrid>
        </List>
    );
};

//['id', 'name', 'username', 'email', 'avatar', 'phone','roleId','createdAt']