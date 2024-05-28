import { useMediaQuery } from '@mui/material';
import { List, SimpleList, Datagrid, TextField,Pagination, EmailField } from 'react-admin';
import PostPagination from './MyPagination';


export const DestinationList = () => {
    return (
        <List  pagination={<PostPagination />}>
                <Datagrid rowClick="show">
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="location" />
                    <TextField source="averageRating" />
                    <TextField source="averagePrice" />
                    <TextField source="x" />
                    <TextField source="y" />
                    <TextField source="category" />
                    <TextField source="createdAt" />
                </Datagrid>
        </List>
    );
};

// {
//     "id": "1",
//     "userId": null,
//     "name": "Cơm Tấm Thanh Trường - Lương Nhữ Hộc",
//     "location": "139 Lương Nhữ Hộc, Quận Cẩm Lệ, Đà Nẵng",
//     "description": "Không ngon không lấy tiến",
//     "image": "https://mms.img.susercontent.com/vn-11134513-7r98o-lsty4hwi2z7od8@resize_ss640x400!@crop_w640_h400_cT",
//     "startTime": "08:00:00",
//     "endTime": "22:00:00",
//     "averageRating": 4.5,
//     "averagePrice": 90000,
//     "x": 16.0333,
//     "y": 108.211,
//     "isActive": true,
//     "isDeleted": false,
//     "category": "food",
//     "createdAt": "2024-05-15T10:01:59.000Z",
//     "updatedAt": "2024-05-15T10:01:59.000Z"
// },