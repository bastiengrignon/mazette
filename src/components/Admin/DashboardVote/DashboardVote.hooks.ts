import { Dispatch, Ref, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { InputRef } from 'antd';
import { IVote } from '../../../services/admin/vote/vote.interface';
import { VoteService } from '../../../services/admin/vote/vote.service';
import { QRCODE_ID } from './DashboardVote.constants';

interface IDashboardVoteHooks {
  addChoiceInputRef: Ref<InputRef>
  votes: IVote[]
  newVoteTitle: string
  newChoice: string
  voteChoices: string[]
  isModalVisible: boolean
  setNewVoteTitle: Dispatch<SetStateAction<string>>
  setNewChoice: Dispatch<SetStateAction<string>>
  setIsModalVisible: Dispatch<SetStateAction<boolean>>
  addChoice: () => void
  handleAddVote: () => void
  toggleVoteActivation: (id: string) => (checked: boolean) => void
  deleteVote: (id: string) => void
  handleCloseModal: () => void
  downloadQRCode: () => void
}

export const useDashboardVoteHooks = (): IDashboardVoteHooks => {
  const addChoiceInputRef = useRef<InputRef>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [voteChoices, setVoteChoices] = useState<string[]>([]);
  const [newChoice, setNewChoice] = useState<string>('');
  const [votes, setVotes] = useState<IVote[]>([]);
  const [newVoteTitle, setNewVoteTitle] = useState<string>('');

  const addChoice = useCallback(() => {
    if (newChoice !== '') {
      setVoteChoices([...voteChoices, newChoice]);
    }
    setNewChoice('');
    addChoiceInputRef.current?.focus();
  }, [newChoice, voteChoices]);

  const handleAddVote = () => {
    setIsModalVisible(false);
    VoteService.create({
      title: newVoteTitle,
      activated: false,
      choices: voteChoices.map((value) => ({ label: value })),
    }).then((vote) => {
      setVotes([...votes, vote]);
      setVoteChoices([]);
      setNewVoteTitle('');
    });
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setVoteChoices([]);
    setNewVoteTitle('');
  };

  const toggleVoteActivation = (id: string) => (checked: boolean) => {
    VoteService.setVoteActivation(id, checked).then((vote) =>
      setVotes(votes.map((v) => (v.id === vote.id ? vote : v)))
    );
  };

  const deleteVote = (id: string) => {
    VoteService.deleteVote(id).then(() => setVotes(votes.filter((v) => v.id !== id)));
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById(QRCODE_ID)?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  useEffect(() => {
    VoteService.getAll().then((votes) => setVotes(votes));
  }, []);

  return {
    addChoiceInputRef,
    votes,
    newVoteTitle,
    newChoice,
    voteChoices,
    isModalVisible,
    setNewVoteTitle,
    setNewChoice,
    setIsModalVisible,
    addChoice,
    handleAddVote,
    toggleVoteActivation,
    deleteVote,
    handleCloseModal,
    downloadQRCode,
  };
};
