import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import { setOnloadEvent } from '../../utilities/helper';


const ColorLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: '#1f54b6',
    },
    barColorPrimary: {
      backgroundColor: '#8f98a9',
    },
  })(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed !important',
    zIndex: 2147483647,
    
    top: 0,
    left: '-6px',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  colorPrimary: {
      color: "#1f54b6",
  },
}));

export default function LinearBar({time}) {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);
  console.log(`LinearBuffertime`, time)
  React.useEffect(() => {
    function progress() {
       
      setCompleted((oldCompleted) => {
        console.log(`oldCompleted`, oldCompleted)
        if (oldCompleted === time) {
          return 0;
        }
        const diff = (time) * .20;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      {/* <LinearProgress   /> */}
      <ColorLinearProgress 
        value={completed}
      />
    </div>
  );
}
