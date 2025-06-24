import Modal from '@/components/Modal.tsx/Modal';
import styles from './ModalEditTeacher.module.scss'
interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEditTeacher = ({ isOpen, onClose }: ModalDeleteProps) => {
  return (
   <Modal isOpen={isOpen} onClose={onClose} name='Редактирование преподавателя'>
    <div>hi</div>
   </Modal>
  )
}

export default ModalEditTeacher