import NotFound from "../components/NotFound"
import Login from '../components/Login'
import Main from "../pages/Main"
import Transfer from "../pages/Transfer"
import Record from "../pages/Record"
import Statistics from "../pages/Statistics"
const luyou = [
    {
        path:'/login',
        element:<Login />,
        auth:false
    },
    {
        path:'/404',
        element:<NotFound />,
        auth:false

    },
    {
        path:'/',
        element:<Main />,
        auth:true,
        children:[
            {
                path:'/transfer',
                element:<Transfer />,
                auth:true
            },
            {
                path:'/record',
                element:<Record />,
                auth:true
            },
            {
                path:'statistics',
                element:<Statistics />,
                auth:true
            }
        ]
    }
]

export default luyou