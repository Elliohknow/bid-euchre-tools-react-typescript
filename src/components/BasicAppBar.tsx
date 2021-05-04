import AppBar from '@material-ui/core/AppBar'
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: 0,
      marginBottom: 10,
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
  })
)

const StyledAppBar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.primary.main,
    },
  })
)(AppBar)

export default function BasicAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Bid Euchre Tools
          </Typography>
        </Toolbar>
      </StyledAppBar>
    </div>
  )
}
