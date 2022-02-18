import { useRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'
import { FormHandles, SubmitHandler } from '@unform/core'

import { Form } from './styles'
import { IFood } from '../../types'
import Modal from '../Modal'
import Input from '../Input'

interface IFormData {
  name: string
  description: string
  price: string
  image: string
}

interface IModalEditFood {
  isOpen: boolean
  editingFood: IFood
  setIsOpen: () => void
  handleUpdateFood: (food: IFormData) => Promise<void>
}

export const ModalEditFood = ({
  isOpen,
  editingFood,
  setIsOpen,
  handleUpdateFood,
}: IModalEditFood) => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<IFormData> = data => {
    handleUpdateFood(data)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-test-id="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalEditFood
