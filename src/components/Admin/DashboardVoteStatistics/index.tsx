import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Column } from '@ant-design/charts';
import { Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { TbChevronLeft } from 'react-icons/tb';

import Navigation from '../../../pages/admin/Navigation';
import {
  BACK_BUTTON,
  NB_VOTES,
  REFRESH_GRAPH_INTERVAL,
  TITLE_VOTE_STATISTICS,
  WINNER_VOTE,
} from './DashboardVoteStatistics.constants';
import { VoteService } from '../../../services/admin/vote/vote.service';
import { IVote, IVoteAnswer } from '../../../services/admin/vote/vote.interface';
import { theme } from '../../../constants/theme';
import { RouterUrl } from '../../../constants';

interface AnswersGraph {
  answer: string;
  count: number;
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

const DashboardVoteStatistics = () => {
  const { voteId } = useParams();
  const [vote, setVote] = useState<IVote | null>(null);

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

  const formattedAnswers = answersToAnswersCount(vote?.answers || []).sort((a, b) => b.count - a.count);

  const highestAnswer = formattedAnswers.reduce(
    (allAnswers, currentAnswer) => (allAnswers.count > currentAnswer.count ? allAnswers : currentAnswer),
    { count: 0, answer: '' }
  );

  return (
    <Navigation>
      <Flex>
        <Link to={RouterUrl.adminVote} className="underline flex items-center">
          <TbChevronLeft />
          {BACK_BUTTON}
        </Link>
      </Flex>
      <span>
        <span>{TITLE_VOTE_STATISTICS}</span>
        <Typography.Text italic strong className="text-xl">
          {vote?.title || ''}
        </Typography.Text>
      </span>
      <div>
        {WINNER_VOTE}
        <Typography.Text italic strong className="text-xl text-red">
          {highestAnswer.answer}
        </Typography.Text>
      </div>
      <Column
        colorField={theme.token.colorPrimary}
        data={formattedAnswers}
        xField="answer"
        yField="count"
        height={450}
        tooltip={{
          name: NB_VOTES,
          field: 'count',
        }}
      />
    </Navigation>
  );
};

export default DashboardVoteStatistics;
