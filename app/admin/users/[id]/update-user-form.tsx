'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUser } from '@/lib/actions/user.actions';
import { USER_ROLES } from '@/lib/constants';
import { updateUserSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z3, { z } from 'zod';

export default function UpdateUserForm({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const onSubmit = async (values: z3.infer<typeof updateUserSchema>) => {
    try {
      const res = await updateUser({ ...values, id: user.id });

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        form.reset();
        router.push('/admin/users');
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof updateUserSchema>,
                  'email'
                >;
              }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        placeholder="Enter user email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Name */}
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof updateUserSchema>,
                  'name'
                >;
              }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter user name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Role */}
          <div>
            <FormField
              control={form.control}
              name="role"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof updateUserSchema>,
                  'role'
                >;
              }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {USER_ROLES.map((role) => {
                          return (
                            <SelectItem key={role} value={role}>
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="flex-between mt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Submitting...' : 'Update User'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
