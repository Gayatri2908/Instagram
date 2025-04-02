import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import axios from 'axios';

const CreatePost = ({ open, setOpen }) => {
    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataUrl = await readFileAsDataURL(file);
            setImagePreview(dataUrl);
        }
    }

    const createPostHandler = async (e) => {
        const formData = new FormData();
        formData.append("caption", caption);
        if(imagePreview) formData.app
        try {
            const res = await axios.post('http://localhost:8000/api/v1/post/addpost')
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <Dialog open={open}>
            <DialogContent aria-describedby={undefined} onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="text-center font-semibold">Create New Post</DialogHeader>
                    <DialogTitle className='hidden'>Hidden Dialog Title</DialogTitle>
                <div className='flex gap-3 items-center'>
                    <Avatar className="w-6 h-6">
                        <AvatarImage src={User?.profilePicture} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs'>Username</h1>
                        <span className='text-gray-600 text-xs'>Bio here...</span>
                    </div>
                </div>
                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="write a caption..." />
                <input ref={imageRef} type="file" className='hidden' onChange={fileChangeHandler} />
                {
                    imagePreview && (
                        <div className='w-full h-64 flex items-center justify-center'>
                            <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
                        </div>
                    )
                }
                <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095f6] hover:bg-[rgb(34,130,195)]'>Select from Computer</Button>
                {
                    imagePreview && (
                        loading ? (
                            <Button>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <Button onClick={createPostHandler} type="submit" className='w-full'>Post</Button>
                        )
                    )
                }

            </DialogContent>
        </Dialog>
    )
}

export default CreatePost