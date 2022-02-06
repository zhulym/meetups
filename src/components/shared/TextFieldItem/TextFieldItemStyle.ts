import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  textField: {
    top: 0,
    border: 0,
    position: 'relative',
  },

  root: {
    fontSize: 14,
    color: '#5b6887',
    backgroundColor: '#FDFDFE',
    border: '1px solid #D5DCE7',
    transition: 'background-color .3s ease',
    '&:hover': {
      backgroundColor: '#f4f6fc',
    },
  },

  input: {
    height: 40,
  },

  error: {
    border: '1px solid #f00',
  },

  success: {
    border: '1px solid #009a73',
  },

  notchedOutline: {
    border: 'none !important'
  },

  focused: {
    backgroundColor: '#f4f6fc',
    border: '1px solid #8065EC',
  }
});

export default useStyles;
