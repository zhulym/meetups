// libraries
import React, { FC, useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
// components
import Avatar from 'components/Avatar';
import Button, { ButtonType } from 'components/shared/Button';
import CardMini from 'components/shared/CardMini';
import NoData from 'components/shared/NoData';
import User from 'components/User';
// store
import { useAppSelector, useAppDispatch } from 'hooks/redux';
// api
import { addVoted, deleteVoted, getVoted, updateMeetup } from 'api/MeetupService';
// helpers
import { sortUsers } from 'helpers/sortUsers';
// constants
import { userRole } from 'constants/userRole';
import { maxDisplayedUsers } from 'constants/users';
import { meetupsStatus } from 'constants/meetupsStatus';
// types
import { ParamsType } from 'types/generalTypes';
// styles
import styles from './TopicDetail.module.scss';

const TopicDetail: FC = () => {
  const { id } = useParams<ParamsType>();
  const { meetups } = useAppSelector(state => state.meetupsReducer);
  const { voted } = useAppSelector(state => state.votedReducer);
  const [topic] = meetups.filter(meetup => meetup.id === id);
  const { user } = useAppSelector(state => state.userReducer);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isChief = user?.roles === userRole.CHIEF;
  const restVoted = useMemo(() => voted.length - maxDisplayedUsers, [voted]);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getVoted(id));
  }, [dispatch, id]);

  const isUserVoted = useMemo(() => {
    if (!user || !voted?.length) {
      return false;
    }
    return voted.some(item => item.id === user.id);
  }, [voted]);

  const displayedVoted = useMemo(() => sortUsers(voted, maxDisplayedUsers, user?.id), [voted, user]);

  const handleVotedClick = () => {
    if (isUserVoted) {
      deleteVoted(id);
    } else {
      addVoted(id, user);
    }
    dispatch(getVoted(id));
  };

  const approveTopic = () => {
    updateMeetup({ id, status: meetupsStatus.REQUEST });
    history.goBack();
  };

  if (!topic) {
    return <NoData categoryName="TOPICS" />;
  }

  return (
    <>
      <h1 className={styles.heading} data-cy="topic-page-heading">{t('page-headings.topic')}</h1>
      <CardMini extraClass='subject' subtitle={t('topics.subtitles.subject')}>
        <p className={styles.topic} data-cy="topic-page-subject">{topic.subject}</p>
      </CardMini>

      <CardMini extraClass='author' subtitle={t('topics.subtitles.author')}>
        <User author={topic.author} extraClass={styles.avatarImage} />
      </CardMini>

      <CardMini extraClass='excerpt' subtitle={t('topics.subtitles.description')}>
        {topic.excerpt?.split('.').filter(Boolean).map(item => (
          <p className={styles.description} key={item}>{item}.</p>
        ))}
      </CardMini>

      <CardMini extraClass='support' subtitle={t('topics.subtitles.support')}>
        {displayedVoted?.map(item => (
          <Avatar
            key={item.id}
            extraClass={styles.avatarVoted}
            {...item}
          />
        ))}

        {restVoted > 0 && (
          <span className={classnames(styles.avatarVoted, styles.restVoted)}>
            +{restVoted}
          </span>
        )}
        {!displayedVoted.length && <span>No voted users here</span>}
      </CardMini>

      <CardMini extraClass='topicButtons'>
        <Button
          test="topic-back-btn"
          variant={ButtonType.dark}
          onClick={() => history.goBack()}>
          {t('buttons.back')}
        </Button>

        {isChief && (
          <Button
            onClick={approveTopic}
            variant={ButtonType.secondary}>
            {t('buttons.approve-topic')}
          </Button>
        )}

        <Button
          onClick={handleVotedClick}
          variant={ButtonType.primary}>
          {isUserVoted ? t('buttons.not-support') : t('buttons.support')}
        </Button >
      </CardMini >
    </>
  );
};

export default TopicDetail;
