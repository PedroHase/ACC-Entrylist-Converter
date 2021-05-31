import "./styles.css";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Send } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 2)
  },
  root: {
    background: "#e5e5e5"
  },
  alert: {
    margin: theme.spacing(1, 0)
  }
}));

export default function App() {
  const [entrylist, setEntrylist] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const submit = () => {
    if (!entrylist) {
      setError("Bitte die Entrylist einfügen");
    }

    try {
      const json = JSON.parse(entrylist);
    } catch (error) {
      console.log(entrylist);
      console.error(error);
      setError(
        "Es ist ein Fehler beim importieren aufgetreten. Bitte prüf, ob die Entrylist valide ist (z.b. mit jsonlint.com)."
      );
    }

    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 10000);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="top"
        style={{ minHeight: "100vh", paddingTop: "10vh" }}
      >
        <Grid item xs={12} style={{ width: "80vw" }}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
              ACC-Entrylist konvertieren
            </Typography>
            <Typography component="p" style={{ paddingBottom: "0.5rem" }}>
              Nutze dieses Tool um die Entrylist in das Google Sheet zu laden
            </Typography>
            <TextField
              label="entrylist"
              id="margin-normal"
              name="name"
              variant="filled"
              className={classes.textField}
              helperText="entrylist.json hier einfügen"
              style={{ width: "100%" }}
              multiline
              rows={8}
              onChange={(v) => setEntrylist(v)}
            />
            <Grid container justify="flex-end">
              <div>
                {/* <HeartIcon /> */}
                <Button
                  raised
                  color="primary"
                  style={{ justifyContent: "flex-end" }}
                  onClick={submit}
                >
                  Konvertieren <Send />
                </Button>
              </div>
            </Grid>
          </Paper>
          {success && (
            <Alert className={classes.alert} severity="info">
              {success}
            </Alert>
          )}
          {error && (
            <Alert className={classes.alert} severity="error">
              {error}
            </Alert>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
