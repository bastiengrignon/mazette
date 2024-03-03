import React from 'react';
import { Button, Flex, Typography } from 'antd';
import { PAGE_NOT_FOUND_BUTTON_GO_HOME, PAGE_NOT_FOUND_DESCRIPTION, PAGE_NOT_FOUND_TITLE } from './NotFound.constants';
import { useNavigate } from 'react-router-dom';
import { RouterUrl } from '../../constants';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex align="center" justify="center">
      <Flex vertical align="center">
        <Typography.Title>{PAGE_NOT_FOUND_TITLE}</Typography.Title>
        <Typography.Title level={3}>{PAGE_NOT_FOUND_DESCRIPTION}</Typography.Title>
        <Button type="link" onClick={() => navigate(RouterUrl.home)}>
          {PAGE_NOT_FOUND_BUTTON_GO_HOME}
        </Button>
      </Flex>
    </Flex>
  );
};

export default NotFound;
