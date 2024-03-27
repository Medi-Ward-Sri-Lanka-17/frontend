import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { getNurses } from '../../Data/wardDetails/nursesService.js'
import Theme from '../Theme'
import EditStaffMemberForm from '../Forms/editStaffMemberDetails.jsx'
import { useAuth } from '../../Security/AuthContext.js'

export default function NursesTable() {
  const theme = Theme()
  const [nurses, setNurses] = useState([])
  const [filteredNurses, setFilteredNurses] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loggedUserPosition, setLoggedUserPosition] = useState()

  const authContext = useAuth()

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const fetchedNurses = await getNurses()
        const position = authContext.position
        setNurses(fetchedNurses)
        setFilteredNurses(fetchedNurses) // Initially set filteredNurses to all nurses
        setLoggedUserPosition(position)
      } catch (error) {
        console.error('Error fetching nurses:', error)
      }
    }

    fetchNurses()
  }, [])

  useEffect(() => {
    // Filter nurses based on the search query when it changes
    const filtered = nurses.filter(
      (nurse) =>
        nurse.fullName &&
        nurse.fullName.toLowerCase().includes(searchQuery?.toLowerCase())
    )
    setFilteredNurses(filtered)
  }, [searchQuery, nurses])

  //Function for delete button
  const handleDelete = (serviceId) => {
    console.log(`Delete clicked for ID ${serviceId}`)
  }

  //Function for edit button
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)
  const [selectedNurseId, setSelectedNurseId] = useState(null)

  const handleEdit = (serviceId) => {
    console.log(`Edit clicked for ID ${serviceId}`)
    setIsEditFormOpen(true)
    setSelectedNurseId(serviceId)
  }

  //Function for search button
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div style={{ width: '100%', margin: '0' }}>
      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Custom Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            style={{
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            <TableRow>
              <TableCell
                style={{
                  color: 'white',
                }}
              >
                ID
              </TableCell>

              <TableCell
                style={{
                  color: 'white',
                }}
              >
                Service ID
              </TableCell>

              <TableCell
                style={{
                  color: 'white',
                }}
              >
                Name
              </TableCell>

              <TableCell
                style={{
                  color: 'white',
                }}
              >
                Mobile No
              </TableCell>

              <TableCell
                style={{
                  color: 'white',
                }}
              >
                Email
              </TableCell>

              {loggedUserPosition !== 'nurse' && (
                <>
                  <TableCell
                    style={{
                      color: 'white',
                    }}
                  >
                    Edit details
                  </TableCell>
                  <TableCell
                    style={{
                      color: 'white',
                    }}
                  >
                    Delete
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNurses.map((nurse) => (
              <TableRow key={nurse.serviceId}>
                <TableCell>{nurse.id}</TableCell>
                <TableCell>{nurse.serviceId}</TableCell>
                <TableCell>{nurse.fullName}</TableCell>
                <TableCell>{nurse.mobileNo}</TableCell>
                <TableCell>{nurse.email}</TableCell>
                {loggedUserPosition !== 'nurse' && (
                  <>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: theme.palette.success.main }}
                        onClick={() => handleEdit(nurse.serviceId)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        style={{ color: 'red', borderColor: 'red' }}
                        onClick={() => handleDelete(nurse.serviceId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* EditStaffMemberForm component */}
      <EditStaffMemberForm
        open={isEditFormOpen}
        handleClose={() => setIsEditFormOpen(false)}
        staffId={selectedNurseId}
        // Add other necessary props
      />
    </div>
  )
}
