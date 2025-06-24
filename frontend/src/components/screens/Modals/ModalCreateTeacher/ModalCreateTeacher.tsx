import Modal from '@/components/Modal.tsx/Modal';
import styles from './ModalCreateTeacher.module.scss'

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateTeacher = ({ isOpen, onClose }: ModalDeleteProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} name='Создание преподавателя'>
    <div>hi</div>
   </Modal>
  )
}

export default ModalCreateTeacher