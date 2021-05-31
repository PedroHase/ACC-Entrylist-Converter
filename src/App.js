import "./styles.css";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Send } from "@material-ui/icons";

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 2)
  },
  root: {
    background: "#e5e5e5"
  },
  alert: {
    margin: theme.spacing(1, 0)
  },
  copyright: {
    marginTop: "10px",
    color: "#9e9e9e",
    textAlign: "center"
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
      const list = [];
      if (json.entries) {
        json.entries.forEach((entry) => {
          // set number
          let name = [];
          entry.drivers.forEach((driver) =>
            driver.firstName && driver.lastName
              ? name.push(`${driver.firstName} ${driver.lastName}`)
              : "No name"
          );
          if (!entry.raceNumber) {
            return;
          }
          list.push({ carNumber: entry.raceNumber, name: name.join(", ") });
        });
        copyToClipboard(JSON.stringify(list));
        setSuccess(
          "Entrylist erfolgreich konvertiert und in das Clipboard kopiert!"
        );
      } else {
        setError("Bitte prüfe die Entrylist!");
      }
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
    }, 8000);
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
              onChange={(v) => setEntrylist(v.target.value)}
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
          <Typography
            component="p"
            variant="subtitle2"
            className={classes.copyright}
          >
            Made by Peter Hase 🐰 2021
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
