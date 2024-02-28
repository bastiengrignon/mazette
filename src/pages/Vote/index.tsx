import React, { useState } from 'react';
import { Button, Flex, Radio, Typography } from 'antd';
import { BUTTON_SEND_VOTE, NO_VOTE_AVAILABLE, TITLE_VOTE } from './Vote.constants';

const { Title } = Typography;

const VotePage = () => {
  const isVoteActivated = true;
  const moviesToVote = [
    {
      id: '88e5068f-8f43-49fa-8264-75e4e9347fab',
      title: 'Star Wars',
    },
    {
      id: '88e5068f-8f43-49fa-8264-75e4e9347fac',
      title: 'The beekeeper',
    },
    {
      id: '88e5068f-8f43-49fa-8264-75e4e9347fad',
      title: 'The Lord of the Rings',
    },
    {
      id: '88e5068f-8f43-49fa-8264-75e4e9347fae',
      title:
        'The Matrix atchoum tu as un nom super long quand même j espère que ça va passer sur plusieurs lignes sinon c est la merde',
    },
    {
      id: '88e5068f-8f43-49fa-8264-75e4e9347faf',
      title: 'The Shining',
    },
  ];
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  return (
    <Flex align="flex-start" justify="center" className="p-2">
      <div className="flex flex-col">
        {isVoteActivated ? (
          <>
            <Title level={3}>{TITLE_VOTE}</Title>
            <Radio.Group onChange={({ target: { value } }) => setSelectedVote(value)}>
              <Flex vertical gap="middle">
                {moviesToVote.map((movie) => (
                  <Radio
                    key={movie.id}
                    value={movie.id}
                    className={`${selectedVote === movie.id ? 'bg-slate-400' : 'bg-gray-200'} rounded-md px-3 py-3`}>
                    {movie.title}
                  </Radio>
                ))}
              </Flex>
            </Radio.Group>
            <Button type="primary" className="mt-4 button">
              {BUTTON_SEND_VOTE}
            </Button>
          </>
        ) : (
          <Title level={4}>{NO_VOTE_AVAILABLE}</Title>
        )}
      </div>
    </Flex>
  );
};

export default VotePage;
