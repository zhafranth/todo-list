"use client";

import * as React from "react";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { formatDate } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useTask } from "@/actions/hooks";
import { Task } from "@prisma/client";

interface IFormTask {
  mode: "add" | "edit";
  data?: Task;
  isOpen: boolean;
  toggle: () => void;
}

const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  dueAt: z.date({
    required_error: "Due date is required",
  }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

const FormTask: React.FC<IFormTask> = ({ mode, isOpen, toggle, data }) => {
  const { mutateCreateTask, mutateUpdateTask } = useTask();
  const defaultValues = React.useMemo(() => {
    if (data && mode === "edit") {
      const dueAt = new Date(data.dueAt);
      return {
        title: data.title,
        description: data.description,
        dueAt,
        priority: data.priority,
      };
    }
    return {
      priority: "LOW",
    };
  }, [data, mode]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues as z.infer<typeof formSchema>,
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    const payload = {
      title: value.title,
      description: value.description,
      dueAt: new Date(value.dueAt),
      priority: value.priority,
    };
    if (mode === "edit" && data) {
      mutateUpdateTask(
        {
          id: data.id,
          data: payload,
        },
        {
          onSuccess: () => {
            form.reset();
            toggle();
          },
        }
      );
    } else {
      mutateCreateTask(payload, {
        onSuccess: () => {
          form.reset();
          toggle();
        },
      });
    }
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={toggle}
      onClose={() => {
        toggle();
        form.reset();
      }}
    >
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader>
                <DrawerTitle>
                  {mode === "add" ? "Create" : "Edit"} Task
                </DrawerTitle>
              </DrawerHeader>

              <div className="space-y-8 px-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex space-y-1"
                          defaultValue={field.value}
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="LOW" />
                            </FormControl>
                            <FormLabel className="font-normal">Low</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="MEDIUM" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Medium
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="HIGH" />
                            </FormControl>
                            <FormLabel className="font-normal">High</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueAt"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  formatDate(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    );
                  }}
                />
              </div>

              <DrawerFooter>
                <Button type="submit">Submit</Button>
                <DrawerClose asChild>
                  <Button onClick={toggle} variant="outline">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default FormTask;
