import React, { useState } from 'react'
import { Database } from '../supabase/supabase'
import { Button, ButtonGroup, Checkbox, Dialog, DialogContent, DialogTitle, Grow, Switch, Typography } from '@mui/material'

interface TripsButtonsProps {
    propertyId: number,
    setSelectedDueBefore: React.Dispatch<React.SetStateAction<string>>,
}

const TripsButtons = (props: TripsButtonsProps) => {
    const { propertyId, setSelectedDueBefore } = props

    const [dialogOpen, setDialogOpen] = useState(false);
    const [unknownEndDate, setUnknownEndate] = useState(false);
    const handleClose = () => {
        setDialogOpen(false);
    }

    return (
        <div>
            <Button
                disableElevation
                variant='contained'
                onClick={() => setDialogOpen(true)}
            >
                Maintainence Visit?
            </Button>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                maxWidth='md'
            >
                <DialogTitle>Maintainence Visit</DialogTitle>
                <DialogContent>
                    <Typography>Visit date</Typography>
                    <input type='date' />
                    <Grow in={!unknownEndDate} children={
                        <div style={{ marginTop: '10px' }}>
                            <Typography>Next visit date</Typography>
                            <input type='date' />
                        </div>
                    } />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Switch
                            checked={unknownEndDate}
                            onChange={(event) => setUnknownEndate(event.target.checked)}
                        />
                        <Typography>
                            I don't know when I'll be back
                        </Typography>
                    </div>
                    <Grow in={unknownEndDate} children={
                        <Typography>No worries, we'll show you everyting due up through the 10th day after your current visit.</Typography>
                    } />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TripsButtons