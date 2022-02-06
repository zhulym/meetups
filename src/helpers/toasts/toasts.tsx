import React from 'react';
import CustomToast from 'components/shared/CustomToast';
import SuccessIcon from 'assets/images/toasts/success.svg';
import ErrorIcon from 'assets/images/toasts/error.svg';
import WarnIcon from 'assets/images/toasts/warning.svg';
import InfoIcon from 'assets/images/toasts/info.svg';
import { toast } from 'react-toastify';
import './toasts.scss';

const toastConfig = {
  icon: false,
  autoClose: 1000,
  pauseOnFocusLoss: false,
  className: 'toastContainer',
  progressClassName: 'progressSuccess',
};

export function showToasts(name: string) {
  switch (true) {
    case name === 'success':
      return toast.success(<CustomToast icon={SuccessIcon} heading="Success" message="Everything is OK!" />, {
        ...toastConfig,
        progressClassName: 'progressSuccess',
      });
    case name === 'error':
      return toast.error(<CustomToast icon={ErrorIcon} heading="Error" message="Something is wrong!" />, {
        ...toastConfig,
        progressClassName: 'progressError',
      });
    case name === 'warn':
      return toast.warn(<CustomToast icon={WarnIcon} heading="Warning" message="Something goes wrong!" />, {
        ...toastConfig,
        progressClassName: 'progressWarn',
      });
    case name === 'info':
      return toast.info(<CustomToast icon={InfoIcon} heading="Info" message="Need help? Just send us email!" />, {
        ...toastConfig,
        progressClassName: 'progressInfo',
      });
    default:
      return null;
  }
}
