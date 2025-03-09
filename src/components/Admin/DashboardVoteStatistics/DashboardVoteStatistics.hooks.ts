import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IVote, IVoteAnswer } from '../../../services/admin/vote/vote.interface';
import { VoteService } from '../../../services/admin/vote/vote.service';
import { REFRESH_GRAPH_INTERVAL } from './DashboardVoteStatistics.constants';

interface AnswersGraph {
  answer: string;
  count: number;
}

interface IDashboardVoteStatisticsHooks {
  vote: IVote | null
  highestAnswer: AnswersGraph
  formattedAnswers: AnswersGraph[]
}

const answersToAnswersCount = (answers: IVoteAnswer[]): AnswersGraph[] =>
  Object.values(
    answers.reduce((allAnswers, currentAnswer) => {
      const answerLabel = currentAnswer.voteChoice.label;
      return {
        ...allAnswers,
        [answerLabel]: allAnswers[answerLabel]
          ? { ...allAnswers[answerLabel], count: allAnswers[answerLabel].count + 1 }
          : { answer: answerLabel, count: 1 },
      };
    }, {})
  );

export const useDashboardVoteStatisticsHooks = (): IDashboardVoteStatisticsHooks => {
  const { voteId } = useParams();
  const [vote, setVote] = useState<IVote | null>(null);

  const formattedAnswers = answersToAnswersCount(vote?.answers || []).sort((a, b) => b.count - a.count);

  const highestAnswer = formattedAnswers.reduce(
    (allAnswers, currentAnswer) => (allAnswers.count > currentAnswer.count ? allAnswers : currentAnswer),
    { count: 0, answer: '' }
  );

  useEffect(() => {
    if (voteId) {
      VoteService.getVoteById(voteId).then(setVote);
    }
  }, [voteId]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (voteId) {
        VoteService.getVoteById(voteId).then(setVote);
      }
    }, REFRESH_GRAPH_INTERVAL);
    return () => clearTimeout(timer);
  }, []);

  return {
    vote,
    highestAnswer,
    formattedAnswers,
  };
};
