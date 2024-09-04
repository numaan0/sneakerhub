import React, { useState } from 'react';
import {
  Container, Typography, Button, List, ListItem, ListItemText,
  Divider, Avatar, Box, TextField, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { uploadProfilePic, updateUser, SERVERURL } from '../api';
import { toast } from 'react-toastify';

const Account = () => {
  const { handleLogout, user, setUser } = useAuth();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || 'John',
    lastName: user.lastName || 'Doe',
    gender: user.gender || 'male',
    email: user.email || '',
    mobileNumber: user.mobile_number || '123-456-7890',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePic ? SERVERURL + user.profilePic : '');

  const onLogout = () => {
    handleLogout(navigate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePic(event.target.files[0]);
    }
  };

  const handleProfilePicUpload = async () => {
    if (profilePic) {
      try {
        const formData = new FormData();
        formData.append('file', profilePic);

        const response = await uploadProfilePic(user.username, formData);

        if (response.status === 200) {
          const newProfilePicUrl = response.data;

          // Update the profilePicUrl state to reflect the new image
          setProfilePicUrl(SERVERURL + newProfilePicUrl);

          // Update the user profilePic URL
          const updatedUser = { ...user, profilePic: newProfilePicUrl };
          setUser(updatedUser);

          // Update the user object in localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));
          toast.success('Profile picture uploaded successfully');
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        toast.error('Error uploading profile picture');
      }
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateUser(user.username, formData);

      // Update the user in state and localStorage
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // If profile pic is uploaded, call the upload function
      if (profilePic) {
        await handleProfilePicUpload();
      } else {
        setEditMode(false);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="row" alignItems="flex-start" mt={4}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          width="25%"
          borderRight="1px solid #ccc"
        >
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: 80,
              height: 80,
              mb: 2,
              fontSize: '2rem',
            }}
            src={profilePicUrl} // Use the updated profilePic URL
          >
            {user.username.charAt(0)}
          </Avatar>
          <input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
            style={{ display: editMode ? 'block' : 'none' }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, px: 2, py: 1, fontSize: '0.75rem', whiteSpace: 'nowrap' }}
            onClick={handleProfilePicUpload}
            disabled={!profilePic || !editMode}
          >
            Upload
          </Button>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Hello,
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {user.username.toUpperCase()}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={onLogout}>
            Logout
          </Button>

          <List component="nav" sx={{ mt: 4, width: '100%' }}>
            <ListItem button>
              <ListItemText primary="My Orders" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Account Settings" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Payments" />
            </ListItem>
          </List>
        </Box>

        <Box flex={1} ml={4}>
          <Typography variant="h5" gutterBottom>
            Personal Information
            <Button variant="text" color="primary" sx={{ ml: 2 }} onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
          </Typography>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            margin="normal"
            onChange={handleChange}
            InputProps={{
              readOnly: !editMode,
            }}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            margin="normal"
            onChange={handleChange}
            InputProps={{
              readOnly: !editMode,
            }}
          />
          <RadioGroup
            row
            aria-label="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            sx={{ mt: 2 }}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" disabled={!editMode} />
            <FormControlLabel value="female" control={<Radio />} label="Female" disabled={!editMode} />
          </RadioGroup>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" gutterBottom>
            Email Address
            <Button variant="text" color="primary" sx={{ ml: 2 }} onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
          </Typography>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            margin="normal"
            onChange={handleChange}
            InputProps={{
              readOnly: !editMode,
            }}
          />

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" gutterBottom>
            Mobile Number
            <Button variant="text" color="primary" sx={{ ml: 2 }} onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
          </Typography>
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            margin="normal"
            onChange={handleChange}
            InputProps={{
              readOnly: !editMode,
            }}
          />

          {editMode && (
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 4 }}
              onClick={handleSave}
            >
              Save
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Account;
