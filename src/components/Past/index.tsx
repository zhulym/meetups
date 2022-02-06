// libraries
import React, { FC } from 'react';
// components
import MeetupsCard from 'components/MeetupsCard';
import InfoPageComponent from 'components/shared/InfoPageComponent';
// store
import { useAppSelector } from 'hooks/redux';
// helpers
import { filterPastMeetups } from 'helpers/pastMeetups';

const Past: FC = () => {
  const { meetups } = useAppSelector(state => state.meetupsReducer);
  const filteredMeetups = meetups.filter(filterPastMeetups);

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

export default Past;
