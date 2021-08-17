import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '550px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: '10px',
  },
  marginBottom: {
    marginBottom: '40px',
  },
  list: {
    marginTop: '20px',
    height: '80vh',
    overflow: 'auto',
    padding: '5px',
    display: 'flex',
    flexdirection: 'column',
    justifyItems: 'center',
    justifyContent: 'center',
  },
}));
