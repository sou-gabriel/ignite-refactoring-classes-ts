import { useState, useEffect } from 'react'

import Header from '../../components/Header'
import api from '../../services/api'
import Food from '../../components/Food'
import ModalAddFood from '../../components/ModalAddFood'
import ModalEditFood from '../../components/ModalEditFood'
import { IFood } from '../../types'
import { FoodsContainer } from './styles'

interface INewFood {
  name: string
  description: string
  price: string
  image: string
}

const Dashboard = () => {
  const [foods, setFoods] = useState<IFood[]>([])
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    api.get('/foods').then(response => setFoods(response.data))
  }, [])

  const handleAddFood = async (food: INewFood) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      })

      setFoods(prevFoods => [...prevFoods, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateFood = async (food: INewFood) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      })

      const foodsUpdated = foods.map(food =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data
      )

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter(food => food.id !== id)

    setFoods(foodsFiltered)
  }

  const toggleModal = () => {
    setModalOpen(prevModalOpen => !prevModalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(prevEditModalOpen => !prevEditModalOpen)
  }

  const handleEditFood = (food: IFood) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDeleteFood={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}

export default Dashboard
