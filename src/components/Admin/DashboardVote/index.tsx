import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { TbChevronRight } from 'react-icons/tb';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import Navigation from '../../../pages/admin/Navigation';
import {
  Button,
  Input,
  List,
  Modal,
  Typography,
  Space,
  Card,
  Row,
  Col,
  Flex,
  Switch,
  Collapse,
  Popconfirm,
  InputRef,
  QRCode,
} from 'antd';
import {
  BUTTON_CREATE_NEW_VOTE, GO_TO_VOTE_PAGE,
  MODAL_BUTTON_ADD_CHOICE,
  MODAL_BUTTON_VOTE_OK,
  MODAL_INPUT_PLACEHOLDER_ADD_CHOICE,
  MODAL_INPUT_PLACEHOLDER_TITLE,
  MODAL_TITLE_NEW_VOTE, QRCODE_ID,
  SHOW_QR_CODE,
  TITLE_VOTE,
  VOTE_STATISTICS, WEBSITE_VOTE_PAGE,
} from './DashboardVote.constants';
import { VoteService } from '../../../services/admin/vote/vote.service';
import { IVote } from '../../../services/admin/vote/vote.interface';
import { RouterUrl } from '../../../constants';
import { theme } from '../../../constants/theme';

const { Title } = Typography;

const DashboardVote = () => {
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

  const showQrCodeModal = () => {
    const websiteURL = window.location.origin.replace('admin.', '');
    Modal.info({
      okButtonProps: { className: 'button' },
      title: 'QR Code',
      content: (
        <Flex vertical align="center" justify="center">
          <Typography.Text>{GO_TO_VOTE_PAGE} <a href={WEBSITE_VOTE_PAGE} target="_blank" rel="noreferrer">de vote</a></Typography.Text>
          <Typography.Text>OU</Typography.Text>
          <Flex vertical justify="center" gap="0.5rem" id={QRCODE_ID}>
            <QRCode
              size={300}
              bordered={false}
              value={`${websiteURL}/vote`}
              color={theme.token.colorPrimary}
            />
            <Button type="primary" className="button" icon={<DownloadOutlined />} onClick={downloadQRCode}>
              Download
            </Button>
          </Flex>
        </Flex>
      ),
    });
  };

  useEffect(() => {
    VoteService.getAll().then((votes) => setVotes(votes));
  }, []);

  return (
    <Navigation>
      <Flex justify="space-between" align="center">
        <Title>{TITLE_VOTE}</Title>
        <Button type="link" onClick={showQrCodeModal}>
          {SHOW_QR_CODE}
        </Button>
      </Flex>
      <Button type="primary" className="button" onClick={() => setIsModalVisible(true)}>
        {BUTTON_CREATE_NEW_VOTE}
      </Button>
      <div className="my-6" />
      <Row gutter={[24, 24]}>
        {votes.map((vote) => (
          <Col key={vote.id} className="gutter-row" xs={24} sm={12} xl={8}>
            <Card>
              <Flex justify="space-between">
                <Typography.Title level={5}>{vote.title}</Typography.Title>
                <div className="text-slate-500 text-xs">{dayjs(vote.createdAt).format('D MMM YY')}</div>
              </Flex>
              <Flex justify="space-between">
                <div className="space-x-2">
                  <span>Activer</span>
                  <Switch checked={vote.activated} onChange={toggleVoteActivation(vote.id || '')} />
                </div>
                <Popconfirm
                  title="Suppression du vote"
                  description={`Êtes-vous sûr de vouloir supprimer le vote ${vote.title} ?`}
                  okText="Oui"
                  cancelText="Non"
                  okButtonProps={{ className: 'button' }}
                  onConfirm={() => vote.id && deleteVote(vote.id)}>
                  <Button type="primary" className="bg-red" icon={<DeleteOutlined />} />
                </Popconfirm>
              </Flex>
              <Collapse
                className="my-2"
                size="small"
                defaultActiveKey={[1]}
                bordered
                items={[
                  {
                    key: 1,
                    label: 'Choix disponibles',
                    children: (
                      <List
                        size="small"
                        dataSource={vote.choices}
                        renderItem={({ id, label }) => <List.Item key={id}>{label}</List.Item>}
                      />
                    ),
                  },
                ]}
              />
              {(vote.answers?.length ?? 0) > 0 && (
                <Flex justify="flex-end">
                  <Link to={`${RouterUrl.adminVote}/${vote.id}`} className="underline">
                    <Flex align="center">
                      {VOTE_STATISTICS}
                      <TbChevronRight />
                    </Flex>
                  </Link>
                </Flex>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={MODAL_TITLE_NEW_VOTE}
        open={isModalVisible}
        onOk={handleAddVote}
        onCancel={handleCloseModal}
        okButtonProps={{ className: 'button' }}
        okText={MODAL_BUTTON_VOTE_OK}>
        <Input
          placeholder={MODAL_INPUT_PLACEHOLDER_TITLE}
          value={newVoteTitle}
          onChange={({ target: { value } }) => setNewVoteTitle(value)}
        />
        <div className="my-4" />
        <Space.Compact className="w-full">
          <Input
            ref={addChoiceInputRef}
            placeholder={MODAL_INPUT_PLACEHOLDER_ADD_CHOICE}
            value={newChoice}
            onChange={({ target: { value } }) => setNewChoice(value)}
            onKeyDown={({ key }) => key === 'Enter' && addChoice()}
          />
          <Button type="primary" className="button" onClick={addChoice}>
            {MODAL_BUTTON_ADD_CHOICE}
          </Button>
        </Space.Compact>
        <div className="my-4" />
        <List
          bordered
          itemLayout="horizontal"
          dataSource={voteChoices}
          renderItem={(item) => (
            <List.Item key={item} className="rounded-md">
              {item}
            </List.Item>
          )}
        />
      </Modal>
    </Navigation>
  );
};

export default DashboardVote;
