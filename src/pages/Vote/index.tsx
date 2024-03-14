import React, { useEffect, useState } from 'react';
import { Button, Flex, message, Radio, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { BUTTON_SEND_VOTE, NO_VOTE_AVAILABLE, REFRESH_PAGE } from './Vote.constants';
import { VoteService } from '../../services/admin/vote/vote.service';
import { IVote } from '../../services/admin/vote/vote.interface';
import { MAZETTE_USER_ID } from '../../constants';

const { Title } = Typography;

const VotePage = () => {
  const userId = localStorage.getItem(MAZETTE_USER_ID);
  const [votes, setVotes] = useState<IVote[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const navigate = useNavigate();

  const answerVoteChoice = (voteId: string) => {
    if (userId) {
      if (selectedChoice) {
        VoteService.answerVoteChoice(voteId, selectedChoice, userId)
          .then(() => message.success('Vote enregistré', 2))
          .catch((error) => message.error(error.response.data, 4));
      } else {
        message.error('Veuillez sélectionner un choix', 2);
      }
    }
  };

  useEffect(() => {
    if (!userId) {
      localStorage.setItem(MAZETTE_USER_ID, uuidv4());
    }
  }, []);

  useEffect(() => {
    VoteService.getActivatedVotes(userId).then(setVotes);
  }, []);

  return (
    <Flex align="flex-start" justify="center" className="p-2">
      <div className="flex flex-col">
        {votes.length > 0 ? (
          <>
            {votes.map((vote) => (
              <div key={vote.id}>
                <Title level={3}>{vote.title}</Title>
                <Flex vertical>
                  <Radio.Group onChange={({ target: { value } }) => setSelectedChoice(value)}>
                    <Flex vertical gap="middle">
                      {vote.choices.map((choice) => (
                        <Radio
                          key={choice.id}
                          value={choice.id}
                          className={`${selectedChoice === choice.id ? 'bg-slate-400' : 'bg-gray-200'} rounded-md p-3`}>
                          {choice.label}
                        </Radio>
                      ))}
                    </Flex>
                  </Radio.Group>
                </Flex>
                <Button type="primary" className="mt-4 button" onClick={() => answerVoteChoice(vote.id || '')}>
                  {BUTTON_SEND_VOTE}
                </Button>
                <div className="mb-6" />
              </div>
            ))}
          </>
        ) : (
          <Flex className="flex flex-col">
            <Title level={4}>{NO_VOTE_AVAILABLE}</Title>
            <Button type="primary" className="mt-4 button" onClick={() => navigate(0)}>
              {REFRESH_PAGE}
            </Button>
          </Flex>
        )}
      </div>
    </Flex>
  );
};

export default VotePage;
