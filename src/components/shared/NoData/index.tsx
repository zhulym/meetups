// libraries
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
// components
import Button, { ButtonType } from 'components/shared/Button';
// styles
import styles from './NoData.module.scss';

type NoDataProps = {
  categoryName: string
};

const NoData: FC<NoDataProps> = ({ categoryName }) => {
  const history = useHistory();
  return (
    <div className={styles.container}>
      <p className={styles.text}>THERE ARE NO {categoryName} HERE!</p>
      <Button
        variant={ButtonType.dark}
        onClick={() => history.goBack()}>
        Назад
      </Button>
    </div>
  );
};

export default NoData;
