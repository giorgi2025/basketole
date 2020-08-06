import React, {useRef, useState} from 'react'
import {connect} from 'react-redux';

import MaskedInput from 'react-text-mask'

import CssBaseline from '@material-ui/core/CssBaseline'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Switch from '@material-ui/core/Switch'

import { allAttendees, getExistingAttendee, addNewAttendee, searchAttendees, logoutUser } from "../../actions/authActions";

import './Dashboard.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    maxWidth: 600
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
    width: '100%'
  },
  error: {
    marginLeft: 0,
    marginBottom: 0
  },
  title: {
    flexGrow: 1
  },
  formGroupContainer: {
    marginBottom: theme.spacing(4),
    position: 'relative'
  },
  formGroupContentHidden: {
    visibility: 'hidden'
  },
  popupFormField: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'white',
    zIndex: 1200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 96,
    whiteSpace: 'nowrap',
    flexDirection: 'column'
  },
  logo: {
    margin: '0 auto',
    display: 'block',
    width: '100%',
    maxWidth: 600,
    marginTop: theme.spacing(4)
  },
  dialogButton: {
    margin: theme.spacing(2)
  }
}))

const APP_NAME = 'COVID-19 Attendee Tracker'

const PhoneMask = props => {
  return (
    <MaskedInput
      {...props}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d?/, /\d?/]}
      placeholderChar={'_'}
    />
  )
}

const SimpleDialog = ({ children, title = '', data, onClose, open }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <List dense>
        {Object.keys(data || {}).map(key => (
          <ListItem key={key}>
            <ListItemText primary={data[key]} secondary={key} />
          </ListItem>
        ))}
      </List>
      {children}
    </Dialog>
  )
}

const Dashboard = (props) => {
  const classes = useStyles()

  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ field: null, error: null })
  const [newAttendeeId, setNewAttendeeId] = useState(null)
  const [newAttendeeData, setNewAttendeeData] = useState(null)
  const [existingAttendeeDone, setExistingAttendeeDone] = useState(false)
  const [existingAttendeeData, setExistingAttendeeData] = useState(null)
  const [results, setResults] = useState(null)

  const form = useRef(null)

  const newAttendee = async () => {
    const name = form.current.name.value
    const phone = form.current.mobile.value
    const dataUsage = form.current.data_usage.checked
    const blueBadge = form.current.blue_badge.checked

    let attendeeObj = {
        name: name,
        mobile: phone,
        storeConsent: dataUsage,
        badgeHolder: blueBadge,
    }

    setLoading(true)
    try {

        props.addNewAttendee(attendeeObj);
        let errors = { props };

        if (errors.success === false) {
            setError({ field: errors.field, error: errors.error })
        } else {
            setError({ field: null, error: null })
            setNewAttendeeData(errors.data)
            // setNewAttendeeId(errors.data.id)
        }
    } finally {
      setExistingAttendeeDone(false)
      setResults(null)
      setLoading(false)
    }
  }

  const addExistingAttendee = async () => {
    let id = form.current.id.value
    if (id === '') {
      setError({ field: 'id', error: 'Enter ID' })
      return;
    }
    setLoading(true)
    try {

        let attendeeObj = {
            id: id,
            session: session
        }

        props.getExistingAttendee(attendeeObj);

        let errors = { props };
        if (errors === false) {
            setError({ field: errors.field, error: errors.error })
        } else {
            setError({ field: null, error: null })
            // setExistingAttendeeData(json.found)
            setExistingAttendeeDone(true)
        }
    } finally {
    //   setNewAttendeeId(null)
      setResults(null)
      setLoading(false)
    }
  }

  const searchAttendees = async () => {
    const phone = form.current.search_phone.value
console.log(phone)
    let attendeeObj = {
        mobile: phone
    }

    setLoading(true)
    try {

        props.searchAttendees(attendeeObj);
        
        let errors = { props };
        if (errors === false) {
            setError({ field: errors.field, error: errors.error })
            setResults(null)
        } else {
            setError({ field: null, error: null })
            setResults(errors.result)
        }
    } finally {
      setExistingAttendeeDone(false)
    //   setNewAttendeeId(null)
      setLoading(false)
    }
  }

  const existingAttendeeDoneClose = () => {
    form.current.reset()
    setSession(null)
    setExistingAttendeeDone(false)
  }

  const newAttendeeDoneClose = () => {
    form.current.reset()
    setSession(null)
    // setNewAttendeeId(null)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
            {/* <Typography variant='h6' className={classes.title}>{APP_NAME}</Typography> */}
            <img alt='Logo' style={{width: "150px", height: "50px" }} src={require('./basketole-logo.png')} />
            <span style={{fontSize: "13px", textAlign: "right", cursor: 'pointer', margin: '0 0 0 auto'}} onClick={() => props.allAttendees()}>
                VIEW DATA
            </span>

            <span style={{fontSize: "13px", textAlign: "right", cursor: 'pointer', marginLeft: '20px'}} onClick={() => props.logoutUser()}>
                LOG OUT
            </span>
        </Toolbar>
      </AppBar>

      <img alt='Logo' className={classes.logo} src={require('./basketole-logo2.png')} />

      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography style={{textAlign: 'center'}} variant='h3' gutterBottom>Attendee Tracker</Typography>

            <form ref={form}>
              <Typography variant='h6' gutterBottom>Session</Typography>

              <div className={classes.formGroupContainer}>
                <FormControl variant='outlined' className={classes.formControl} error={error.field === 'session'}>
                  <InputLabel>Select Session</InputLabel>
                  <Select
                    value={session}
                    onChange={e => setSession(e.target.value)}
                    label='Select Session'
                  >
                    <MenuItem value={1}>Session 1</MenuItem>
                    <MenuItem value={2}>Session 2</MenuItem>
                    <MenuItem value={3}>Session 3</MenuItem>
                    <MenuItem value={4}>Session 4</MenuItem>
                    <MenuItem value={5}>Session 5</MenuItem>
                  </Select>
                  {error.field === 'session' && <FormHelperText className={classes.error}>{error.error}</FormHelperText>}
                </FormControl>
              </div>

              <Typography variant='h6' gutterBottom>Existing Attendee</Typography>

              <div className={classes.formGroupContainer}>
                {/* <SimpleDialog title="Attendee Recorded" open={existingAttendeeDone === true} onClose={existingAttendeeDoneClose} data={existingAttendeeData}>
                  <Button
                    variant='contained'
                    color='secondary'
                    className={classes.dialogButton}
                    onClick={existingAttendeeDoneClose}
                  >
                    Again
                  </Button>
                </SimpleDialog> */}
                <TextField
                  label='ID'
                  id='id'
                  variant='outlined'
                  className={classes.formControl}
                  error={error.field === 'id'}
                  helperText={error.field === 'id' ? error.error : null}
                  FormHelperTextProps={{className: classes.error}}
                />
                <Button disabled={loading} variant='contained' color='primary' size='large' onClick={addExistingAttendee}>Submit</Button>
              </div>

              <Typography variant='h6' gutterBottom>New Attendee</Typography>

              <div className={classes.formGroupContainer}>
                {/* <SimpleDialog title="Attendee Recorded" open={newAttendeeId != null} onClose={newAttendeeDoneClose} data={newAttendeeData}>
                  <Button
                    variant='contained'
                    color='secondary'
                    className={classes.dialogButton}
                    onClick={newAttendeeDoneClose}
                  >
                    Again
                  </Button>
                </SimpleDialog> */}
                <TextField
                  label='Name'
                  id='name'
                  variant='outlined'
                  className={classes.formControl}
                  error={error.field === 'name'}
                  helperText={error.field === 'name' ? error.error : null}
                  FormHelperTextProps={{className: classes.error}}
                />
                <br />
                <FormControl variant='outlined' className={classes.formControl} error={error.field === 'phone'}>
                  <InputLabel htmlFor='mobile'>Mobile</InputLabel>
                  <OutlinedInput id='mobile' label='Mobile' variant='outlined' /> { /*inputComponent={PhoneMask} /> */}
                  {error.field === 'phone' && <FormHelperText className={classes.error}>{error.error}</FormHelperText>}
                </FormControl>
                <br />
                <FormControlLabel
                  control={<Switch id='blue_badge' name='blue_badge' color='primary'/>}
                  label='Is the user a blue badge holder?'
                />
                <br />
                <FormControlLabel
                  control={<Switch id='data_usage' name='data_usage' color='primary'/>}
                  label='Does the user consent to their data being stored and used?'
                />
                <br />
                <Button disabled={loading} variant='contained' color='primary' size='large' onClick={newAttendee}>Submit</Button>
              </div>

              <Typography variant='h6' gutterBottom>Forgot ID</Typography>

              <div className={classes.formGroupContainer}>
                <FormControl variant='outlined' className={classes.formControl} error={error.field === 'search_phone'}>
                  <InputLabel htmlFor='search_phone'>Mobile</InputLabel>
                  <OutlinedInput disabled={results != null} id='search_phone' label='Mobile' variant='outlined' /> { /*inputComponent={PhoneMask} /> */}
                  {error.field === 'search_phone' && <FormHelperText className={classes.error}>{error.error}</FormHelperText>}
                </FormControl>
                <br />
                {results == null && <Button disabled={loading} variant='contained' color='primary' size='large' onClick={searchAttendees}>Submit</Button>}
                {results != null && <Button
                  disabled={loading}
                  variant='contained'
                  color='secondary'
                  size='large'
                  onClick={_ => {
                    form.current.reset()
                    setResults(null)
                  }}
                >
                  Reset
                </Button>}
              </div>

              {/* {(results && results.length > 0) && (
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell title='Session'>Ses...</TableCell>
                        <TableCell title='Data Store Consent'>Data...</TableCell>
                        <TableCell title='Blue Badge Holder'>Blue...</TableCell>
                        <TableCell align='right'>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results.map((row) => (
                        <TableRow key={row.date}>
                          <TableCell component='th' scope='row'>
                            {row.id}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.session}</TableCell>
                          <TableCell>{row['Data Store Consent']}</TableCell>
                          <TableCell>{row['Blue Badge Holder']}</TableCell>
                          <TableCell align='right' style={{whiteSpace: 'nowrap'}}>{row.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )} */}
            </form>
          </Grid>
        </Grid>
      </Paper>

    </React.Fragment>
  );
}

// Action
const mapDispatchToProps = (dispatch, ownProps) => ({
    allAttendees: () => dispatch(allAttendees()),
    getExistingAttendee: (attendeeObj) => dispatch(getExistingAttendee(attendeeObj)),
    addNewAttendee: (attendeeObj) => dispatch(addNewAttendee(attendeeObj)),
    searchAttendees: (attendeeObj) => dispatch(searchAttendees(attendeeObj)),
    logoutUser: () => dispatch(logoutUser()),
});

// State
const mapStateToProps = (state) => ({
    errors: state.errors
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
