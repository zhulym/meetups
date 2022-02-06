// libraries
import React, { FC } from 'react';
// components
import MeetupsCard from 'components/MeetupsCard';
import InfoPageComponent from 'components/shared/InfoPageComponent';
// constants
import { meetupsStatus } from 'constants/meetupsStatus';
// store
import { useAppSelector } from 'hooks/redux';

const Future: FC = () => {
  const { meetups } = useAppSelector(state => state.meetupsReducer);
  const filteredMeetups = meetups.filter(item => item.status === meetupsStatus.CONFIRMED);

  return (
    <>
      <InfoPageComponent meetupsAmount={filteredMeetups.length} />
      {filteredMeetups.map(item => (
        <MeetupsCard
          key={item.id}
          {...item}
        />
      ))
      }
    </>
  );
};

export default Future;
