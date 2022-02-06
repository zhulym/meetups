// libraries
import React, { FC, useState, useEffect, useCallback } from 'react';
import { useFormik, FormikProps } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// components
import Steps from 'components/CreateMeetup/Steps';
import ObligatoryFields from 'components/CreateMeetup/ObligatoryFields';
import ExtraFields from 'components/CreateMeetup/ExtraFields';
import FormButtons from 'components/CreateMeetup/FormButtons';
import MeetupDetail from 'components/MeetupDetail';
// api 
import { createMeetup, updateMeetup } from 'api/MeetupService';
// store
import { useAppSelector } from 'hooks/redux';
// helpers
import { generateMeetupData } from 'helpers/generateMeetupData';
// constants
import { MEETUPS_PAGE } from 'constants/routes';
import { validationSchema } from 'constants/schemas';
import { STEP_FIELDS } from 'constants/formSteps';
// types
import { MeetupsType, FormValuesType } from 'types/meetupsTypes';
import { ParamsType } from 'types/generalTypes';
// static
import backImage from 'assets/images/create-back.png';
// styles
import styles from './CreateMeetup.module.scss';

export type CreateMeetupProps = {
  meetup?: MeetupsType
  isEditForm?: boolean
};

const CreateMeetup: FC<CreateMeetupProps> = ({ meetup, isEditForm }) => {
  const history = useHistory();
  const { id } = useParams<ParamsType>();
  const { user } = useAppSelector(state => state.userReducer);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const isLastStep = STEP_FIELDS.length === step;
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleSubmit = async (values: FormValuesType) => {
    if (step < STEP_FIELDS.length && !meetup) {
      return;
    };
    try {
      const request = meetup ? updateMeetup : createMeetup;
      const generatedValues = generateMeetupData(values, user, id);
      await request(generatedValues);
      history.push(MEETUPS_PAGE.path);
    } catch (e) {
      setErrorMessage('All fields must be filled!');
    }
  };

  const formik: FormikProps<FormValuesType> = useFormik<FormValuesType>({
    initialValues: {
      start: meetup?.start || '',
      finish: meetup?.finish || '',
      subject: meetup?.subject || '',
      speaker: meetup ? `${meetup?.speakers[0].name} ${meetup?.speakers[0].surname}` : '',
      excerpt: meetup?.excerpt || '',
      place: meetup?.place || '',
      image: meetup?.image || '',
    },
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const meetupPreview = useCallback(() => {
    setIsPreview(true);
  }, []);

  useEffect(() => {
    const stepOneFields: Array<keyof FormValuesType> = ['excerpt', 'subject', 'speaker'];
    if (!formik.touched.subject) {
      return;
    }
    const isError = stepOneFields.some((item) => formik.errors[item]);
    setIsNextDisabled(isError);
  }, [formik.errors, setIsNextDisabled]);

  const handlePrevStep = useCallback(() => {
    if (step === 1) {
      history.goBack();
      return;
    }
    setStep(prev => prev - 1);
  }, [step, history]);

  const handleNextStep = useCallback(() => {
    if (isLastStep) {
      return;
    }
    setStep(prev => prev + 1);
  }, [isLastStep]);

  if (isPreview) {
    return <MeetupDetail setIsPreview={setIsPreview} previewData={formik.values} />;
  }

  return (
    <div>
      {!meetup && <Steps step={step} />}

      <div>
        <h3 className={styles.heading}>{meetup ? t('page-headings.editing-meetup') : t('page-headings.new-meetup')}</h3>
        {!meetup && (
          <p className={styles.headingText}>
            {t('meetups-form.text')}
          </p>
        )}
      </div>

      <div>
        <form onSubmit={formik.handleSubmit} data-cy="creating-form">
          {(step === 1 && !meetup) && (
            <div className={styles.container}>
              <ObligatoryFields formik={formik} isEditForm={isEditForm} />
            </div>
          )}

          {(step === 2 && !meetup) && (
            <div className={styles.container}>
              <ExtraFields formik={formik} isEditForm={isEditForm} />
            </div>
          )}

          {meetup && (
            <div className={styles.container}>
              <ExtraFields formik={formik} isEditForm={isEditForm} />
              <ObligatoryFields formik={formik} isEditForm={isEditForm} />
            </div>
          )}

          {!!errorMessage && (<div className={styles.error}>{errorMessage}</div>)}

          <FormButtons
            isLastStep={isLastStep}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
            isNextDisabled={isNextDisabled}
            meetupPreviewCallBack={meetupPreview}
          />
        </form>
      </div>

      {!meetup && (
        <div className={styles.backImage}>
          <img src={backImage} alt="back" />
        </div>
      )}
    </div>
  );
};

export default CreateMeetup;
