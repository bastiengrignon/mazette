import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { allEditions, PreviousEdition } from '../../../constants';
import { IMovie, MovieService } from '../../../services';
import { Form, FormInstance, message } from 'antd';
import useModal from '../../../constants/hooks';
import { showErrorFormMessage } from '../../../lib/validation';

interface IDashboardMovieHooks {
  isOpen: boolean
  previewURL: string
  editions: PreviousEdition[]
  movies: IMovie[]
  addRowModalVisible: boolean
  selectedEdition: string
  formRowAddition: FormInstance
  formRowEdition: FormInstance
  isMovieLoading: boolean
  setSelectedEdition: Dispatch<SetStateAction<string>>
  setEditingId: Dispatch<SetStateAction<number>>
  setNewMovies: Dispatch<SetStateAction<IMovie[]>>
  setAddRowModalVisible: Dispatch<SetStateAction<boolean>>
  isEditing: (record: IMovie) => boolean
  openModalPreview: (imageId: string) => void
  handleOkModal: () => void
  toggle: () => void
}

export const useDashboardMovieHooks = (): IDashboardMovieHooks => {
  const editions = allEditions(true);
  const [isMovieLoading, setIsMovieLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [newMovies, setNewMovies] = useState<IMovie[]>([]);
  const [selectedEdition, setSelectedEdition] = useState<string>(editions[0].value);

  // Row edition
  const [editingId, setEditingId] = useState<number>(0);
  const [formRowEdition] = Form.useForm();

  // Add row modal
  const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false);
  const [formRowAddition] = Form.useForm();

  // Preview modal
  const { isOpen, toggle } = useModal();
  const [previewURL, setPreviewURL] = useState<string>('');

  const handleOkModal = () => {
    const hideLoadingMessage = message.loading('Ajout en cours', 0);
    formRowAddition
      .validateFields()
      .then((values) => {
        MovieService.create(values)
          .then((movie) => {
            setMovies([...movies, movie]);
            message.success('Court-métrage ajouté', 2.5);
          })
          .catch((err) => message.error(`Erreur lors de l'ajout: ${err}`, 2.5))
          .finally(() => {
            hideLoadingMessage();
            formRowAddition.resetFields();
          });
        setAddRowModalVisible(false);
      })
      .catch(() => showErrorFormMessage())
      .finally(() => hideLoadingMessage());
  };

  const openModalPreview = (imageId: string) => {
    setPreviewURL(imageId);
    toggle();
  };

  const isEditing = (record: IMovie): boolean => record.id === editingId;
  
  useEffect(() => {
    setIsMovieLoading(true);
    MovieService.getAll()
      .then(setMovies)
      .finally(() => setIsMovieLoading(false));
  }, [newMovies]);

  return {
    isOpen,
    previewURL,
    editions,
    movies,
    addRowModalVisible,
    selectedEdition,
    formRowAddition,
    formRowEdition,
    isMovieLoading,
    setSelectedEdition,
    setEditingId,
    setNewMovies,
    setAddRowModalVisible,
    isEditing,
    openModalPreview,
    handleOkModal,
    toggle,
  };
};
