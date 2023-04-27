import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useTheme } from '../Context/ThemeContest'

function TableData({ data }) {
    const { theme } = useTheme()
    const styles = { color: theme.textColor, textAlign: 'center' }
    return (
        <div className='table'>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={styles}>WPS</TableCell>
                            <TableCell style={styles}>Accucry</TableCell>
                            <TableCell style={styles}>Charters</TableCell>
                            <TableCell style={styles}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((i) =>
                        (<TableRow>
                            <TableCell style={styles}>{i.wpm}</TableCell>
                            <TableCell style={styles}>{i.accuracy}</TableCell>
                            <TableCell style={styles}>{i.Character}</TableCell>
                            <TableCell style={styles}>{i.timeStamp.toDate().toLocaleString()}</TableCell>
                        </TableRow>)
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableData