import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/guests");
        setGuests(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des hotes:", error);
      }
    };
    fetchGuests();
  }, []);

  const handleDelete = async (roomNumber) => {
    try {
      await axios.delete(`http://localhost:5000/api/guests/${roomNumber}`);
      setGuests(guests.filter((guest) => guest.roomNumber !== roomNumber));
    } catch (error) {
      console.error("Erreur lors de la suppression du bébé:", error);
    }
  };

  const filteredGuests = guests.filter((guest) =>
    guest.guestName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: "#6A5ACD" }}>Liste des hotes</h2>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Chercher par nom..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nom</strong></TableCell>
              <TableCell><strong>Numéro de salle</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGuests.map((guest) => (
              <TableRow key={guest.roomNumber}>
                <TableCell>{guest.guestName}</TableCell>
                <TableCell>{guest.roomNumber}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/admin-dashboard/Bébés/DetailleGuest/${guest.roomNumber}`)}>
                    <PeopleIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(guest.roomNumber)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
