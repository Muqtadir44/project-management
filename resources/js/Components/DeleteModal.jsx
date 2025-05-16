import Modal from '@/Components/Modal';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';
import { router } from '@inertiajs/react';

export function DeleteModal({ show, deleteId, deleteRoute, onClose }) {

    const deleteRecord = (deleteId, deleteRoute) => {
        router.delete(route(deleteRoute, deleteId), {
            onSuccess: () => closeModal(),
        });
    }

    const closeModal = () => {
        onClose();
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to delete this user?
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    This action cannot be undone.
                </p>

                <div className="flex justify-end mt-6">
                    <SecondaryButton onClick={onClose}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton className="ml-3" onClick={() => deleteRecord(deleteId, deleteRoute)}>
                        Delete
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}
