import Modal from '@/components/Modal.tsx/Modal';
import styles from './ModalEditStudent.module.scss'
interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEditStudent = ({ isOpen, onClose }: ModalDeleteProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} name='Редактирование студента'>
    <div>hi</div>
   </Modal>
  )
}

export default ModalEditStudent