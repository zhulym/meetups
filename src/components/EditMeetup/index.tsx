// libraries
import React, { FC, useCallback, useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import { useParams } from 'react-router-dom';
// components
import CreateMeetup from 'components/CreateMeetup';
import Loader from 'components/shared/Loader';
// api
import { getMeetup } from 'api/MeetupService';
// types
import { MeetupsType, FormValuesType } from 'types/meetupsTypes';
import { ParamsType } from 'types/generalTypes';

export type EditFormFieldsProps = {
  formik: FormikProps<FormValuesType>
};

const EditMeetup: FC = () => {
  const [meetup, setMeetup] = useState<MeetupsType | null>();
  const { id } = useParams<ParamsType>();

  const fetchMeetup = useCallback(async () => {
    const data = await getMeetup(id);
    setMeetup(data);
  }, [id]);

  useEffect(() => {
    fetchMeetup();
  }, [fetchMeetup]);

  if (!meetup) {
    return <Loader />;
  }

  return (
    <>
      <CreateMeetup meetup={meetup} isEditForm />
    </>
  );
};

export default EditMeetup;
