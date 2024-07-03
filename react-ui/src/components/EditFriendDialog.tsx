import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./shadcn/ui/dialog";
import {Button} from "./shadcn/ui/button";
import {Input} from "./shadcn/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./shadcn/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "./shadcn/ui/popover";
import {cn} from "@/utils/cn";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "./shadcn/ui/calendar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./shadcn/ui/select";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import useCategories from "@/hooks/useCategories";
import {contactTypeOptions} from "@/enums/ContactTypes";
import useFriends from "@/hooks/useFriends";
import {Friend} from "@/models/Friend";
import {parseDate} from "@/utils/parseDate";

const EditFriendDialog = ({friend}: { friend?: Friend }) => {
    const {categories} = useCategories();
    const {addFriend} = useFriends();

    const formSchema = z.object({
        firstName: z.string().min(3).max(24),
        lastName: z.string().min(3).max(48),
        lastContactDate: z.date(),
        lastContactType: z.string(),
        desiredContactFrequency: z.number().min(1).max(7),
        categoryId: z.string().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: friend?.firstName ?? "",
            lastName: friend?.lastName ?? "",
            lastContactDate: parseDate(friend?.lastContactDate.toString()) ?? new Date(),
            lastContactType: friend?.lastContactType.toString() || "",
            desiredContactFrequency: friend?.desiredContactFrequency ?? 1,
            categoryId: friend?.categoryId?.toString() ?? undefined,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const newFriend: Friend = {
            id: friend ? friend.id : 0,
            firstName: values.firstName,
            lastName: values.lastName,
            lastContactDate: format(values.lastContactDate, "yyyy-MM-dd"),
            lastContactType: Number(values.lastContactType),
            desiredContactFrequency: values.desiredContactFrequency,
            categoryId: Number(values.categoryId),
        };

        if (friend) {
            console.log(friend)
            console.log(newFriend)
        } else {
            await addFriend(newFriend)
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">{friend ? "Edit" : "Add Friend"}</Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Add Friend</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastContactDate"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last Contacted At</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastContactType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last Contact Type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a contact type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {contactTypeOptions &&
                                                        contactTypeOptions.map((contactType) => (
                                                            <SelectItem
                                                                key={contactType.value}
                                                                value={contactType.value.toString()}
                                                            >
                                                                {contactType.label}
                                                            </SelectItem>
                                                        ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="desiredContactFrequency"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Desired Contact Frequency</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Number of maximum days without contact
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a category"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {categories &&
                                                        categories.map((category) => (
                                                            <SelectItem
                                                                key={category.id}
                                                                value={category.id.toString()}
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">{friend ? "Save" : "Add"}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditFriendDialog;
