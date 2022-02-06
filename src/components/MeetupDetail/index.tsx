// libraries
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
// components
import CardMini from 'components/shared/CardMini';
import generalImage from 'assets/images/meetup-image.jpg';
import MeetupImage from 'components/shared/MeetupImage';
import Button, { ButtonType } from 'components/shared/Button';
import User from 'components/User';
import Avatar from 'components/Avatar';
import Loader from 'components/shared/Loader';
// store
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// api
import { updateMeetup, getParticipants, addParticipant, deleteParticipant, getMeetup } from 'api/MeetupService';
// constants
import { meetupsStatus } from 'constants/meetupsStatus';
import { maxDisplayedUsers } from 'constants/users';
import { userRole } from 'constants/userRole';
// helpers
import { getFullDate, getTime } from 'helpers/dates';
import { sortUsers } from 'helpers/sortUsers';
// types
import { UserType, FormValuesType, MeetupsType } from 'types/meetupsTypes';
import { ParamsType } from 'types/generalTypes';
// static
import { ReactComponent as DateIcon } from 'assets/images/icons/calendar.svg';
import { ReactComponent as TimeIcon } from 'assets/images/icons/clock.svg';
import { ReactComponent as MarkerIcon } from 'assets/images/icons/marker.svg';
// styles
import styles from './MeetupDetail.module.scss';

type MeetupDetailProps = {
  setIsPreview: (isPreview: boolean) => void
  previewData?: FormValuesType
};

const MeetupDetail: FC<MeetupDetailProps> = ({ setIsPreview, previewData }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { id } = useParams<ParamsType>();
  const { participants } = useAppSelector(state => state.participantsReducer);
  const { user } = useAppSelector(state => state.userReducer);
  const [meetupItem, setMeetupItem] = useState<MeetupsType | null>();
  const isChief = user?.roles === userRole.CHIEF;
  const isModeration = meetupItem?.status === meetupsStatus.REQUEST;
  const meetupData = previewData || meetupItem;
  const isFuture = meetupItem?.status === meetupsStatus.CONFIRMED;
  const { t } = useTranslation();

  const fetchMeetup = useCallback(async () => {
    const data = await getMeetup(id);
    setMeetupItem(data);
  }, [id]);

  useEffect(() => {
    fetchMeetup();
  }, [fetchMeetup]);

  const restParticipants = useMemo(() => participants.length - maxDisplayedUsers, [participants]);

  const isUserParticipant = useMemo(() => {
    if (!user || !isFuture || !participants?.length) {
      return false;
    }
    return participants.some(item => item.id === user.id);
  }, [participants]);

  const displayedParticipants = useMemo(() => sortUsers(participants, maxDisplayedUsers, user?.id), [participants, user]);

  const handleParticipantsClick = () => {
    if (isUserParticipant) {
      deleteParticipant(id);
    } else {
      addParticipant(id, user);
    }
    dispatch(getParticipants(id));
  };

  useEffect(() => {
    dispatch(getParticipants(id));
  }, [dispatch, id]);

  const confirmMeetup = () => {
    updateMeetup({ id, status: meetupsStatus.CONFIRMED });
    history.goBack();
  };

  if (!meetupData) {
    return <Loader />;
  }

  return (
    <>
      <h1 className={styles.heading}>{t('page-headings.meetup-detail')}</h1>
      <CardMini extraClass='subject'>
        <MeetupImage
          image={meetupData.image || generalImage}
          alt='meetup-image'
          className={styles.image}
        />
        <p className={styles.topic}>{meetupData.subject}</p>
      </CardMini>

      <CardMini extraClass='date' subtitle={t('meetups.subtitles.place')}>
        <div className={styles.dateWrapper}>
          <DateIcon />
          <span className={styles.timePlace}>{getFullDate(meetupData.start)}</span>
        </div>
        <div className={styles.dateWrapper}>
          <TimeIcon />
          <span className={styles.timePlace}>{getTime(meetupData.start)} &mdash; {getTime(meetupData.finish)}</span>
        </div>
        <div className={styles.dateWrapper}>
          <MarkerIcon />
          <span className={styles.timePlace}>{meetupData.place}</span>
        </div>
      </CardMini>

      <CardMini extraClass='speaker' subtitle={t('meetups.subtitles.speaker')}>
        {!!previewData && <p>{previewData.speaker}</p>}
        {meetupData.speakers?.map((speaker: UserType) => (
          <User
            key={speaker.id}
            author={speaker}
            extraClass={styles.avatarImage}
          />
        ))}
      </CardMini>

      <CardMini extraClass='excerpt' subtitle={t('meetups.subtitles.description')}>
        {meetupData.excerpt?.split('.').filter(Boolean).map(item => (
          <p className={styles.excerpt} key={item}>{item}.</p>
        ))}
      </CardMini>

      {isFuture && (
        <CardMini extraClass='support' subtitle={t('meetups.subtitles.signed')}>
          {displayedParticipants?.map(item => (
            <Avatar
              key={item.id}
              extraClass={styles.avatarParticipant}
              {...item}
            />
          ))}

          {restParticipants > 0 && (
            <span className={classnames(styles.avatarParticipant, styles.restParticipants)}>
              +{restParticipants}
            </span>
          )}

          {!displayedParticipants.length && <span>No participants here</span>}
        </CardMini>
      )
      }

      <CardMini extraClass='meetupButtons'>
        <Button
          variant={ButtonType.dark}
          onClick={() => previewData ? setIsPreview(false) : history.goBack()}
        >
          {t('buttons.back')}
        </Button>

        {(isFuture && !previewData) && (
          <Button
            variant={ButtonType.primary}
            onClick={handleParticipantsClick}
          >
            {isUserParticipant ? t('buttons.cancel-booking') : t('buttons.book')}
          </Button>
        )}

        {(isModeration && isChief && !previewData) && (
          <Button
            variant={ButtonType.primary}
            onClick={confirmMeetup}
          >
            {t('buttons.confirm')}
          </Button>
        )}
      </CardMini>
    </>
  );
};

export default MeetupDetail;
