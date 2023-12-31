import AdminForm from '@/components/AdminForm';
import { MotionDiv } from '@/components/MotionDiv';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminBlog from '@/components/AdminBlog';

const Admin = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
      className='container w-full md:w-1/2  flex flex-col justify-start py-6 lg:py-24  items-center gap-6 flex-1'
    >
      <h2 className='text-5xl font-bold text-center '>Admin</h2>
      <p className='text-center text-md text-zinc-600'>
        Enter your blog write title and description.
      </p>
      <Tabs defaultValue='add' className='w-full'>
        <TabsList>
          <TabsTrigger value='add'>Add Blog</TabsTrigger>
          <TabsTrigger value='delete'>Delete Blog</TabsTrigger>
        </TabsList>
        <TabsContent value='add'>
          <AdminForm />
        </TabsContent>
        <TabsContent value='delete'>
          <AdminBlog />
        </TabsContent>
      </Tabs>
    </MotionDiv>
  );
};

export default Admin;
