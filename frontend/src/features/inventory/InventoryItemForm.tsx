import React from 'react'
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
} from '@mui/material'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

export type InventoryItemFormValues = {
  name: string
  alternateNames?: string
  description?: string
  status: 'active' | 'inactive'
  categoryId: string
  unitId: string
  parLevels: Record<string, number>
  locationIds: string[]
  prepForms: {
    name: string
    unitId: string
    conversionRate: number
    default?: boolean
  }[]
}

interface Props {
  defaultValues: InventoryItemFormValues
  categoryOptions: { id: string; name: string }[]
  unitOptions: { id: string; name: string }[]
  locationOptions: { id: string; name: string }[]
  onSubmit: (data: InventoryItemFormValues) => void
  onCancel: () => void
}

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

const InventoryItemForm: React.FC<Props> = ({
  defaultValues,
  categoryOptions,
  unitOptions,
  locationOptions,
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<InventoryItemFormValues>({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'prepForms',
  })

  const handleAddPrepForm = () => {
    append({ name: '', unitId: '', conversionRate: 1, default: false })
  }

  // const currentDefaultIndex = watch('prepForms').findIndex(p => p.default)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box p={2} display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">Basic Info</Typography>

        <TextField
          label="Name"
          {...register('name', { required: true })}
          fullWidth
        />

        <TextField
          label="Alternate Names (comma-separated)"
          {...register('alternateNames')}
          fullWidth
        />

        <TextField
          label="Description"
          {...register('description')}
          multiline
          minRows={2}
          fullWidth
        />

        <TextField
          label="Status"
          select
          {...register('status')}
          fullWidth
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>

        <TextField
          label="Category"
          select
          {...register('categoryId', { required: true })}
          fullWidth
        >
          {categoryOptions.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Unit"
          select
          {...register('unitId', { required: true })}
          fullWidth
        >
          {unitOptions.map((unit) => (
            <MenuItem key={unit.id} value={unit.id}>
              {unit.name}
            </MenuItem>
          ))}
        </TextField>

        <Divider />
        <Typography variant="h6">Par Levels</Typography>
        <Grid container spacing={2}>
          {daysOfWeek.map((day) => (
            <Grid size={{ xs: 6, sm: 4 }} key={day}>
              <TextField
                type="number"
                label={day}
                {...register(`parLevels.${day}` as const)}
                fullWidth
              />
            </Grid>
          ))}
        </Grid>

        <Divider />
        <Typography variant="h6">Locations</Typography>
        <Grid container spacing={2}>
          {locationOptions.map((loc) => (
            <Grid size={{ xs:6 }} key={loc.id}>
              <FormControlLabel
                control={
                  <Controller
                    name="locationIds"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value.includes(loc.id)}
                        onChange={(e) => {
                          const newIds = e.target.checked
                            ? [...field.value, loc.id]
                            : field.value.filter((id) => id !== loc.id)
                          field.onChange(newIds)
                        }}
                      />
                    )}
                  />
                }
                label={loc.name}
              />
            </Grid>
          ))}
        </Grid>

        <Divider />
        <Typography variant="h6">Prep Forms</Typography>
        {fields.map((item, index) => (
          <Box key={item.id} display="flex" gap={1} alignItems="center">
            <TextField
              label="Form Name"
              {...register(`prepForms.${index}.name` as const, { required: true })}
            />
            <TextField
              label="Unit"
              select
              {...register(`prepForms.${index}.unitId` as const, { required: true })}
              sx={{ minWidth: 120 }}
            >
              {unitOptions.map((u) => (
                <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Conversion Rate"
              type="number"
              {...register(`prepForms.${index}.conversionRate` as const, { required: true })}
              sx={{ width: 120 }}
            />
            <FormControlLabel
              label="Default"
              control={
                <Checkbox
                  checked={watch(`prepForms.${index}.default`)}
                  onChange={() => {
                    fields.forEach((_, i) =>
                      setValue(`prepForms.${i}.default`, i === index)
                    )
                  }}
                />
              }
            />
            <Button onClick={() => remove(index)}>Remove</Button>
          </Box>
        ))}
        <Button onClick={handleAddPrepForm}>Add Prep Form</Button>

        <Divider />
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </Box>
      </Box>
    </form>
  )
}

export default InventoryItemForm
