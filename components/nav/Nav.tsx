import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useContext, useState } from "react";
import { AppInfoCtx } from "../../context";
import { Link } from "../Link";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navTitle: {
    flexGrow: 1,
  },
  navBtn: {
    color: "white",
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: 250,
    height: "100vh",
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.grey[50],
  },
  drawerItemIcon: {
    color: "white",
  },
}));

type NavItem = {
  label?: string;
  href?: string;
  icon?: JSX.Element;
  onClick?: () => void;
  hideOnNavbar?: boolean;
  hideLabelOnNavbar?: boolean;
  hideIconOnNavbar?: boolean;
  hideOnDrawer?: boolean;
  hideLabelOnDrawer?: boolean;
  hideIconOnDrawer?: boolean;
};

type NavProps = {
  items: NavItem[];
};

export const Nav: React.FC<NavProps> = ({ items: navItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const appInfo = useContext(AppInfoCtx);

  const styles = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <Box display={{ lg: "none" }}>
            <IconButton
              edge="start"
              className={styles.navBtn}
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu />
            </IconButton>
          </Box>

          <Typography variant="h6" className={styles.navTitle}>
            <Link href="/" color="inherit">
              {appInfo.name}
            </Link>
          </Typography>

          <Box display={{ xs: "none", lg: "block" }}>
            {navItems
              .filter((item) => !item.hideOnNavbar)
              .map((item) => {
                const btn =
                  (item.hideLabelOnNavbar || !item.label) && item.icon ? (
                    <IconButton color="inherit" className={styles.navBtn}>
                      {item.icon}
                    </IconButton>
                  ) : (item.hideIconOnNavbar || !item.icon) && item.label ? (
                    <Button color="inherit" className={styles.navBtn}>
                      {item.label}
                    </Button>
                  ) : (
                    <Button
                      color="inherit"
                      className={styles.navBtn}
                      startIcon={item.icon}
                    >
                      {item.label}
                    </Button>
                  );

                return (
                  <Link href={item.href || ""} onClick={item.onClick}>
                    {btn}
                  </Link>
                );
              })}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List className={styles.drawer}>
          {navItems
            .filter((item) => !item.hideOnDrawer)
            .map((item) => {
              const handleClick = () => {
                if (item.onClick) {
                  item.onClick();
                } else {
                  setDrawerOpen(false);
                }
              };

              return (
                <Link href={item.href || ""} color="inherit">
                  <ListItem button onClick={handleClick}>
                    {item.icon && !item.hideIconOnDrawer && (
                      <ListItemIcon className={styles.drawerItemIcon}>
                        {item.icon}
                      </ListItemIcon>
                    )}
                    {item.label && !item.hideLabelOnDrawer && (
                      <ListItemText primary={item.label} />
                    )}
                  </ListItem>
                </Link>
              );
            })}
        </List>
      </Drawer>
    </>
  );
};
