import React from 'react';
import { Column } from '@ant-design/charts';
import { Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { TbChevronLeft } from 'react-icons/tb';

import Navigation from '../../../pages/admin/Navigation';
import {
  BACK_BUTTON,
  NB_VOTES,
  TITLE_VOTE_STATISTICS,
  WINNER_VOTE,
} from './DashboardVoteStatistics.constants';
import { theme } from '../../../constants/theme';
import { RouterUrl } from '../../../constants';
import { useDashboardVoteStatisticsHooks } from './DashboardVoteStatistics.hooks';

const DashboardVoteStatistics = () => {
  const {
    vote,
    highestAnswer,
    formattedAnswers,
  } = useDashboardVoteStatisticsHooks();
  return (
    <Navigation>
      <Flex>
        <Link to={RouterUrl.adminVote} className="underline flex items-center">
          <TbChevronLeft/>
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
