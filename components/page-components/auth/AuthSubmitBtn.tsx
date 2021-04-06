import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type AuthSubmitBtnProps = {
  isSubmitting: boolean;
  defaultText: string;
  submittingText: string;
};

export const AuthSubmitBtn: React.FC<AuthSubmitBtnProps> = ({
  isSubmitting,
  defaultText,
  submittingText,
}) => {
  const styles = useStyles();

  return (
    <Button
      fullWidth
      type="submit"
      variant="contained"
      color="primary"
      className={styles.button}
      disabled={isSubmitting}
    >
      {isSubmitting ? submittingText : defaultText}
    </Button>
  );
};
