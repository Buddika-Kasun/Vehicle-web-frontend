import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../../components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '../../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { type } from '@testing-library/user-event/dist/type'

const validVehicleIds = [1]

const currentDate = new Date().toISOString().split('T')[0]

//const dateRegex = /^\d{4}-\d{2}-\d{2}$/ // Regex to validate yyyy-mm-dd format

const formSchema = z.object({
    date: z
        .string()
        // .regex(dateRegex, {
        //     message: 'Maintenance date must be in yyyy-mm-dd format'
        // })
        .refine((dateStr) => new Date(dateStr) <= new Date(currentDate), {
            message: 'Maintenance date must not be in the future'
        }),
    vehicleId: z.number().refine((vehicleId) => validVehicleIds.includes(vehicleId), {
        message: 'Invalid Vehicle ID'
    }),
    type: z.string({
        required_error: 'Maintenance Type is required'
    }),
    description: z.string({
        message: 'Maintenance Type is required'
    })
})

export default function EditMaintenance() {
    const { maintenanceId } = useParams() // Access route parameter
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: '',
            description: '',
            vehicleId: 0
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:5062/api/VehicleMaintenance/${maintenanceId}`
            try {
                const { data } = await axios.get(url)
                console.log(data.date)
                console.log(data.description)
                console.log(data.type)
                console.log(data.vehicleId)
                console.log(data)

                reset({
                    date: data.date,
                    description: data.description,
                    maintenanceType: data.type,
                    vehicleId: data.vehicleId
                })
            } catch (error) {
                console.error('Failed to fetch maintenance', error)
            }
        }
        fetchData()
    }, [maintenanceId, reset])

    const handleSave = async (data) => {
        const url = `http://localhost:5062/api/VehicleMaintenance/${maintenanceId}`
        try {
            const formData = {
                Date: data.date,
                Description: data.description,
                Type: data.type,
                VehicleId: data.vehicleId
            }

            const result = await axios.put(url, formData)
            console.log(result)
            reset()
        } catch (error) {
            console.error('Failed to update vehicle maintenance', error)
        }
    }

    return (
        <Form {...control}>
            <form
                onSubmit={handleSubmit(handleSave)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormDescription>Basic Information</FormDescription>
                <FormField
                    control={control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Maintenance Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    className="w-full"
                                    onChange={(e) => {
                                        const dateValue = e.target.value // This is the input string in "yyyy-MM-dd"
                                        field.onChange(dateValue) // Pass the string directly to your form's state
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.maintenanceDate && errors.maintenanceDate.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="vehicleId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Vehicle Id</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.vehicleId && errors.vehicleId.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Maintenance Type</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                                {...field}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Maintenance Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="oilChange">Oil and Fluid Changes</SelectItem>
                                    <SelectItem value="tireRotation">Tyre Rotation</SelectItem>
                                    <SelectItem value="brakeChecks">Brake Checks</SelectItem>
                                    <SelectItem value="batteryMaintenance">Battery Maintenance</SelectItem>
                                    <SelectItem value="airConditioningChecks">Air Conditioning Checks</SelectItem>
                                    <SelectItem value="replacements">Replacements</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage>{errors.type && errors.type.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Explain any damages caused by the user."
                                    className="resize-none w-full h-20"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormMessage>{errors.description && errors.description.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <Button type="submit" className="bg-indigo-600">
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    )
}
