// libraries
import React, { FC } from 'react';
// store
import { useAppSelector } from 'hooks/redux';
// components
import TopicCard from 'components/TopicCard';
import InfoPageComponent from 'components/shared/InfoPageComponent';
import NoData from 'components/shared/NoData';
// constants
import { meetupsStatus } from 'constants/meetupsStatus';

const Topics: FC = () => {
  const { meetups } = useAppSelector(state => state.meetupsReducer);
  const filteredMeetups = meetups.filter(item => item.status === meetupsStatus.DRAFT);

  if (!meetups.length) {
    return <NoData categoryName="TOPICS" />;
  }

  return (
    <>
      <InfoPageComponent meetupsAmount={filteredMeetups.length} />
      {filteredMeetups.map(item => (
        <TopicCard
          key={item.id}
          {...item}
        />
      ))
      }
    </>
  );
};

export default Topics;
