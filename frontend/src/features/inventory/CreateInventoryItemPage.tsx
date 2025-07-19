import {
  Box, Button, TextField, Typography,
  Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../../services/axios'
import type { InventoryCategory, Unit } from '../../types/inventory'

interface FormData {
  name: string
  alternateNames: string
  description: string
  note: string
  categoryId: string
  unitId: string
  isActive: boolean
}

const CreateInventoryItemPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>()
  const navigate = useNavigate()
  const [categories, setCategories] = useState<InventoryCategory[]>([])
  const [units, setUnits] = useState<Unit[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [catRes, unitRes] = await Promise.all([
        api.get('/inventory-categories'),
        api.get('/units'),
      ])
      setCategories(catRes.data)
      setUnits(unitRes.data)
    }
    fetchData()
  }, [])

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      parLevels: {
        mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0
      },
    }
    await api.post('/inventory-items', payload)
    navigate('/inventory')
  }

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>Create Inventory Item</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Name" {...register('name')} margin="normal" />
        <TextField fullWidth label="Alternate Names" {...register('alternateNames')} margin="normal" />
        <TextField fullWidth label="Description" {...register('description')} margin="normal" multiline rows={2} />
        <TextField fullWidth label="Note" {...register('note')} margin="normal" multiline rows={2} />

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select defaultValue="" {...register('categoryId')} label="Category">
            {categories.map(c => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Unit</InputLabel>
          <Select defaultValue="" {...register('unitId')} label="Unit">
            {units.map(u => (
              <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Switch defaultChecked {...register('isActive')} />}
          label="Active"
        />

        <Box mt={2}>
          <Button variant="contained" type="submit">Create</Button>
        </Box>
      </form>
    </Box>
  )
}

export default CreateInventoryItemPage
