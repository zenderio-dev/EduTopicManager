import Modal from '@/components/Modal.tsx/Modal';
import styles from './ModalCreateUsersFromFile.module.scss'
interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateUsersFromFile = ({ isOpen, onClose }: ModalDeleteProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} name='Загрузка с файла'>
    <div>hi</div>
   </Modal>
  )
}

export default ModalCreateUsersFromFile