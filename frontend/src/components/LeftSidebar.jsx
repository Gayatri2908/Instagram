import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";


const LeftSidebar = () => {
    const navigate = useNavigate();
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const createPostHandler = ()=>{
        setOpen(true);
    }

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') logoutHandler();
        else if(textType === "Create") createPostHandler();
    };

    const sidebarItems = [
        { icon: <Home className="w-6 h-6" />, text: "Home" },
        { icon: <Search className="w-6 h-6" />, text: "Search" },
        { icon: <TrendingUp className="w-6 h-6" />, text: "Explore" },
        { icon: <MessageCircle className="w-6 h-6" />, text: "Messages" },
        { icon: <Heart className="w-6 h-6" />, text: "Notification" },
        { icon: <PlusSquare className="w-6 h-6" />, text: "Create" },
        { 
            icon: (
                <Avatar className="w-6 h-6">
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ), 
            text: "Profile" 
        },
        { icon: <LogOut />, text: "Logout" }
    ];
    

    return (
        <div 
            className="fixed top-0 left-0 z-10 h-screen bg-white shadow-md border-r border-gray-300 p-4 transition-all duration-300 
            w-20 md:w-64"
        >
            <h1 className="text-lg font-bold mb-6 hidden md:block">LOGO</h1>

            <div>
                {sidebarItems.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => sidebarHandler(item.text)} 
                        className="flex items-center gap-4 hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
                    >
                        {item.icon}
                        <span className="hidden md:block">{item.text}</span>
                    </div>
                ))}
            </div>
            <CreatePost open={open} setOpen={setOpen}/>
        </div>
    );
};

export default LeftSidebar;
