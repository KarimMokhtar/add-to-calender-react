import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import { generateEventURLs, CALENDAR_OPTIONS, MEETING_DATA } from "./utils";

export default function AddToCalendarBtn() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const eventURLs = generateEventURLs({
    name: `Goldman Sachs: Meeting with ${MEETING_DATA.interviewer}`,
    location: `Zoom ID: ${MEETING_DATA.zoom_id} Password: ${MEETING_DATA.zooom_password}`,
    details: MEETING_DATA.details,
    startsAt: MEETING_DATA.startAt,
    endsAt: MEETING_DATA.endAt,
    timeZone: MEETING_DATA.timeZone,
  });

  const handleToggle = () => setOpen(prevOpen => !prevOpen);

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleMenuItemClick = (type, index) => {
    setSelectedIndex(index);
    setOpen(false);
    window.open(eventURLs[type], "_blank");
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button onClick={handleToggle}>Add to Calendar</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {CALENDAR_OPTIONS.map((option, index) => (
                    <MenuItem
                      key={option.value}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(option.value, index)}>
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
