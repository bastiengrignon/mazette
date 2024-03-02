import axiosInstance from '../../axios';
import { IVote } from './vote.interface';

export class VoteService {
  static getAll = async (): Promise<IVote[]> => await axiosInstance.get('/vote').then((r) => r.data);

  static getVoteById = async (id: string): Promise<IVote> => await axiosInstance.get(`/vote/${id}`).then((r) => r.data);

  static create = async (vote: IVote): Promise<IVote> => await axiosInstance.post('/vote', vote).then((r) => r.data);

  static setVoteActivation = async (id: string, activated: boolean): Promise<IVote> =>
    await axiosInstance.patch(`/vote/${id}`, { activated }).then((r) => r.data);

  static deleteVote = async (id: string): Promise<void> =>
    await axiosInstance.delete(`/vote/${id}`).then((r) => r.data);

  static answerVoteChoice = async (voteId: string, choiceId: string, userId: string): Promise<void> =>
    await axiosInstance.post(`/vote/${voteId}/answer`, { choiceId, userId }).then((r) => r.data);

  static getActivatedVotes = async (): Promise<IVote[]> =>
    await axiosInstance.get('/vote/activated').then((r) => r.data);
}
