'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { sendMail } from '@/lib/actions/mail.action';
import { useState } from 'react';
import { createBlog } from '@/lib/actions/blog.action';

const formSchema = z.object({
  title: z.string(),
  description: z.string().min(10),
});

const AdminForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await createBlog(values);
      toast({
        title: 'Success',
        description: res.message,
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: 'Success',
        description: 'An error while creating blog,',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Blog title'
                  className='outline-none focus:border-none w-full'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={7}
                  placeholder='Type your description'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className='w-full disabled:bg-zinc-700'
          type='submit'
        >
          {loading ? 'Loading...' : 'Share a blog write'}
        </Button>
      </form>
    </Form>
  );
};

export default AdminForm;
